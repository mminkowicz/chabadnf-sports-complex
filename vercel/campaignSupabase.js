const CAMPAIGN_DEFAULTS = {
  goal: 150000,
  raised: 10400,
  match: 150000,
  lastUpdated: '2026-05-29',
};

const getConfig = ({ requireServiceRole = false } = {}) => {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.REACT_APP_SUPABASE_URL;
  const supabaseKey = requireServiceRole
    ? process.env.SUPABASE_SERVICE_ROLE_KEY
    : process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase environment is not configured');
  }

  return {
    key: supabaseKey,
    rowId: process.env.SUPABASE_CAMPAIGN_ROW_ID || process.env.REACT_APP_SUPABASE_CAMPAIGN_ROW_ID || 'last-mile-campaign',
    table: process.env.SUPABASE_CAMPAIGN_TABLE || process.env.REACT_APP_SUPABASE_CAMPAIGN_TABLE || 'campaign_totals',
    url: supabaseUrl.replace(/\/$/, ''),
  };
};

const normalizeCampaignData = (payload) => {
  const data = Array.isArray(payload) ? payload[0] : payload?.data || payload || {};
  const goal = Number(data.goal);

  if (goal !== CAMPAIGN_DEFAULTS.goal) {
    return CAMPAIGN_DEFAULTS;
  }

  return {
    goal,
    raised: Number.isFinite(Number(data.raised)) ? Number(data.raised) : CAMPAIGN_DEFAULTS.raised,
    match: Number.isFinite(Number(data.match)) ? Number(data.match) : CAMPAIGN_DEFAULTS.match,
    lastUpdated: data.lastUpdated || data.last_updated || CAMPAIGN_DEFAULTS.lastUpdated,
  };
};

const supabaseHeaders = (config) => ({
  apikey: config.key,
  Authorization: `Bearer ${config.key}`,
  Accept: 'application/json',
  'Content-Type': 'application/json',
});

const readCampaignData = async () => {
  const config = getConfig();
  const rowFilter = encodeURIComponent(config.rowId);
  const response = await fetch(
    `${config.url}/rest/v1/${config.table}?id=eq.${rowFilter}&select=id,goal,raised,match,last_updated&limit=1`,
    {
      headers: supabaseHeaders(config),
    }
  );

  if (!response.ok) {
    throw new Error(`Supabase read returned ${response.status}`);
  }

  const payload = await response.json();

  if (!Array.isArray(payload) || payload.length === 0) {
    return CAMPAIGN_DEFAULTS;
  }

  return normalizeCampaignData(payload[0]);
};

const updateCampaignData = async (raised) => {
  const config = getConfig({ requireServiceRole: true });
  const payload = {
    id: config.rowId,
    goal: CAMPAIGN_DEFAULTS.goal,
    raised,
    match: CAMPAIGN_DEFAULTS.match,
    last_updated: new Date().toISOString().split('T')[0],
  };

  const response = await fetch(
    `${config.url}/rest/v1/${config.table}?on_conflict=id&select=id,goal,raised,match,last_updated`,
    {
      method: 'POST',
      headers: {
        ...supabaseHeaders(config),
        Prefer: 'resolution=merge-duplicates,return=representation',
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    throw new Error(`Supabase update returned ${response.status}`);
  }

  return normalizeCampaignData(await response.json());
};

module.exports = {
  readCampaignData,
  updateCampaignData,
};
