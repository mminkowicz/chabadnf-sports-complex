export const CAMPAIGN_DEFAULTS = {
  goal: 150000,
  raised: 10400,
  match: 150000,
  lastUpdated: '2026-05-29',
};

const EXTERNAL_API_BASE_URL = 'https://chabadnf-backend.vercel.app/api';

const asNumber = (value, fallback) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
};

const getApiBases = () => {
  const configuredUrl = process.env.REACT_APP_CAMPAIGN_API_URL;

  if (configuredUrl) {
    return [configuredUrl.replace(/\/$/, '')];
  }

  return ['/api', EXTERNAL_API_BASE_URL];
};

const getPayloadData = (payload) => payload?.data || payload || {};

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

export const readCampaignData = async () => {
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

export const updateCampaignTotal = async (raised) => {
  const payload = {
    goal: CAMPAIGN_DEFAULTS.goal,
    raised,
    match: CAMPAIGN_DEFAULTS.match,
    lastUpdated: new Date().toISOString().split('T')[0],
  };

  let lastError;

  for (const apiBase of getApiBases()) {
    try {
      const response = await fetch(`${apiBase}/update-campaign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Campaign update returned ${response.status}`);
      }

      const result = await response.json();
      return normalizeCampaignData(result);
    } catch (error) {
      lastError = error;
      console.warn(`Campaign update unavailable at ${apiBase}`, error);
    }
  }

  throw lastError || new Error('Campaign update failed');
};
