const CAMPAIGN_DEFAULTS = {
  goal: 150000,
  raised: 10400,
  match: 150000,
  lastUpdated: '2026-05-29',
};

const DEFAULT_DEDICATION_STATUSES = {
  1: 'available',
  2: 'available',
  3: 'available',
  4: 'available',
  5: 'sold',
  6: 'sold',
  7: 'available',
  8: 'sold',
  9: 'sold',
  10: 'available',
  11: 'available',
  12: 'available',
  13: 'available',
  14: 'available',
  15: 'available',
  16: 'available',
};

const ALLOWED_DEDICATION_STATUSES = ['available', 'reserved', 'sold'];

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
    dedicationTable: process.env.SUPABASE_DEDICATION_STATUS_TABLE || process.env.REACT_APP_SUPABASE_DEDICATION_STATUS_TABLE || 'dedication_statuses',
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

const normalizeDedicationStatuses = (payload) => {
  const rows = Array.isArray(payload) ? payload : payload?.data || [];

  if (!Array.isArray(rows)) {
    return DEFAULT_DEDICATION_STATUSES;
  }

  return rows.reduce((statuses, row) => {
    const id = Number(row.dedication_id || row.dedicationId || row.id);
    const status = row.status;

    if (Number.isInteger(id) && ALLOWED_DEDICATION_STATUSES.includes(status)) {
      return {
        ...statuses,
        [id]: status,
      };
    }

    return statuses;
  }, DEFAULT_DEDICATION_STATUSES);
};

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

const readDedicationStatuses = async () => {
  const config = getConfig();
  const response = await fetch(
    `${config.url}/rest/v1/${config.dedicationTable}?select=dedication_id,status`,
    {
      headers: supabaseHeaders(config),
    }
  );

  if (!response.ok) {
    throw new Error(`Supabase dedication read returned ${response.status}`);
  }

  return normalizeDedicationStatuses(await response.json());
};

const updateDedicationStatuses = async (statuses) => {
  const config = getConfig({ requireServiceRole: true });
  const payload = Object.entries(statuses).reduce((rows, [id, status]) => {
    const dedicationId = Number(id);

    if (!Number.isInteger(dedicationId) || !ALLOWED_DEDICATION_STATUSES.includes(status)) {
      return rows;
    }

    return [
      ...rows,
      {
        dedication_id: dedicationId,
        status,
      },
    ];
  }, []);

  if (payload.length === 0) {
    return normalizeDedicationStatuses([]);
  }

  const response = await fetch(
    `${config.url}/rest/v1/${config.dedicationTable}?on_conflict=dedication_id&select=dedication_id,status`,
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
    throw new Error(`Supabase dedication update returned ${response.status}`);
  }

  return normalizeDedicationStatuses(await response.json());
};

module.exports = {
  readCampaignData,
  readDedicationStatuses,
  updateCampaignData,
  updateDedicationStatuses,
};
