export const CAMPAIGN_DEFAULTS = {
  goal: 150000,
  raised: 10400,
  match: 150000,
  lastUpdated: '2026-05-29',
};

const EXTERNAL_API_BASE_URL = 'https://chabadnf-backend.vercel.app/api';
const SUPABASE_TABLE = process.env.REACT_APP_SUPABASE_CAMPAIGN_TABLE || 'campaign_totals';
const SUPABASE_ROW_ID = process.env.REACT_APP_SUPABASE_CAMPAIGN_ROW_ID || 'last-mile-campaign';

const asNumber = (value, fallback) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
};

const getApiBases = () => {
  const configuredUrl = process.env.REACT_APP_CAMPAIGN_API_URL;

  if (configuredUrl) {
    return [configuredUrl.replace(/\/$/, '')];
  }

  return [EXTERNAL_API_BASE_URL];
};

const getSupabaseConfig = () => {
  const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
  const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  return {
    anonKey: supabaseAnonKey,
    rowId: SUPABASE_ROW_ID,
    table: SUPABASE_TABLE,
    url: supabaseUrl.replace(/\/$/, ''),
  };
};

const getPayloadData = (payload) => {
  const data = Array.isArray(payload) ? payload[0] : payload?.data || payload || {};

  return {
    ...data,
    lastUpdated: data.lastUpdated || data.last_updated,
  };
};

const createCampaignError = (message, code) => Object.assign(new Error(message), { code });

export const normalizeCampaignData = (payload) => {
  const data = getPayloadData(payload);
  const goal = asNumber(data.goal, CAMPAIGN_DEFAULTS.goal);

  if (goal !== CAMPAIGN_DEFAULTS.goal) {
    return CAMPAIGN_DEFAULTS;
  }

  return {
    goal,
    raised: asNumber(data.raised, CAMPAIGN_DEFAULTS.raised),
    match: asNumber(data.match, CAMPAIGN_DEFAULTS.match),
    lastUpdated: data.lastUpdated || CAMPAIGN_DEFAULTS.lastUpdated,
  };
};

export const formatCurrency = (amount) => (
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
);

const readCampaignDataFromSiteApi = async () => {
  const response = await fetch(`/api/campaign-data?t=${Date.now()}`, {
    cache: 'no-store',
    headers: {
      Accept: 'application/json',
      'Cache-Control': 'no-cache',
    },
  });

  if (!response.ok) {
    throw new Error(`Site campaign API returned ${response.status}`);
  }

  return normalizeCampaignData(await response.json());
};

const getSupabaseHeaders = (config) => ({
  apikey: config.anonKey,
  Authorization: `Bearer ${config.anonKey}`,
  Accept: 'application/json',
  'Content-Type': 'application/json',
});

const readCampaignDataFromSupabase = async () => {
  const config = getSupabaseConfig();

  if (!config) {
    return null;
  }

  const rowFilter = encodeURIComponent(config.rowId);
  const response = await fetch(
    `${config.url}/rest/v1/${config.table}?id=eq.${rowFilter}&select=id,goal,raised,match,last_updated&limit=1`,
    {
      cache: 'no-store',
      headers: getSupabaseHeaders(config),
    }
  );

  if (!response.ok) {
    throw new Error(`Supabase campaign read returned ${response.status}`);
  }

  const payload = await response.json();

  if (!Array.isArray(payload) || payload.length === 0) {
    throw new Error('Supabase campaign row is missing');
  }

  return normalizeCampaignData(payload[0]);
};

export const readCampaignData = async () => {
  try {
    return await readCampaignDataFromSiteApi();
  } catch (error) {
    console.warn('Site campaign API unavailable', error);
  }

  try {
    const supabaseData = await readCampaignDataFromSupabase();

    if (supabaseData) {
      return supabaseData;
    }
  } catch (error) {
    console.warn('Supabase campaign data unavailable', error);
  }

  for (const apiBase of getApiBases()) {
    try {
      const response = await fetch(`${apiBase}/campaign-data?t=${Date.now()}`, {
        cache: 'no-store',
        headers: {
          Accept: 'application/json',
          'Cache-Control': 'no-cache',
        },
      });

      if (!response.ok) {
        throw new Error(`Campaign API returned ${response.status}`);
      }

      const payload = await response.json();
      return normalizeCampaignData(payload);
    } catch (error) {
      console.warn(`Campaign API unavailable at ${apiBase}`, error);
    }
  }

  try {
    const response = await fetch(`/campaign-data.json?t=${Date.now()}`, {
      cache: 'no-store',
      headers: {
        Accept: 'application/json',
        'Cache-Control': 'no-cache',
      },
    });

    if (!response.ok) {
      throw new Error(`Campaign file returned ${response.status}`);
    }

    const payload = await response.json();
    return normalizeCampaignData(payload);
  } catch (error) {
    console.warn('Static campaign data unavailable', error);
  }

  return CAMPAIGN_DEFAULTS;
};

export const updateCampaignTotal = async (raised, password) => {
  if (!password) {
    throw createCampaignError('Password is required', 'missing_password');
  }

  const response = await fetch('/api/update-campaign', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      password,
      raised,
    }),
  });

  if (response.status === 401) {
    throw createCampaignError('Invalid password', 'invalid_password');
  }

  if (!response.ok) {
    throw new Error(`Campaign update returned ${response.status}`);
  }

  const updatedData = normalizeCampaignData(await response.json());

  if (updatedData.raised !== raised) {
    throw new Error('Campaign update did not return the saved total');
  }

  return updatedData;
};
