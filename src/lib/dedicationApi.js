import { BASE_DEDICATIONS, DEDICATION_STATUSES } from '../data/dedications';

const SUPABASE_TABLE = process.env.REACT_APP_SUPABASE_DEDICATION_STATUS_TABLE || 'dedication_statuses';
const ALLOWED_STATUSES = Object.keys(DEDICATION_STATUSES);

const getSupabaseConfig = () => {
  const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
  const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  return {
    anonKey: supabaseAnonKey,
    table: SUPABASE_TABLE,
    url: supabaseUrl.replace(/\/$/, ''),
  };
};

const createDedicationError = (message, code) => Object.assign(new Error(message), { code });

export const getDefaultDedicationStatuses = () => (
  BASE_DEDICATIONS.reduce((statuses, dedication) => ({
    ...statuses,
    [dedication.id]: dedication.status,
  }), {})
);

const normalizeDedicationStatuses = (payload) => {
  const source = payload?.data?.statuses || payload?.statuses || payload?.data || payload || [];
  const rows = Array.isArray(source)
    ? source
    : Object.entries(source).map(([id, status]) => ({
      dedication_id: id,
      status,
    }));

  if (!Array.isArray(rows)) {
    return getDefaultDedicationStatuses();
  }

  return rows.reduce((statuses, row) => {
    const id = Number(row.dedication_id || row.dedicationId || row.id);
    const status = row.status;

    if (Number.isInteger(id) && ALLOWED_STATUSES.includes(status)) {
      return {
        ...statuses,
        [id]: status,
      };
    }

    return statuses;
  }, getDefaultDedicationStatuses());
};

const readDedicationStatusesFromSiteApi = async () => {
  const response = await fetch(`/api/dedication-statuses?t=${Date.now()}`, {
    cache: 'no-store',
    headers: {
      Accept: 'application/json',
      'Cache-Control': 'no-cache',
    },
  });

  if (!response.ok) {
    throw new Error(`Site dedication API returned ${response.status}`);
  }

  return normalizeDedicationStatuses(await response.json());
};

const readDedicationStatusesFromSupabase = async () => {
  const config = getSupabaseConfig();

  if (!config) {
    return null;
  }

  const response = await fetch(
    `${config.url}/rest/v1/${config.table}?select=dedication_id,status`,
    {
      cache: 'no-store',
      headers: {
        apikey: config.anonKey,
        Authorization: `Bearer ${config.anonKey}`,
        Accept: 'application/json',
        'Cache-Control': 'no-cache',
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Supabase dedication read returned ${response.status}`);
  }

  return normalizeDedicationStatuses(await response.json());
};

export const readDedicationStatuses = async () => {
  try {
    return await readDedicationStatusesFromSiteApi();
  } catch (error) {
    console.warn('Site dedication API unavailable', error);
  }

  try {
    const supabaseStatuses = await readDedicationStatusesFromSupabase();

    if (supabaseStatuses) {
      return supabaseStatuses;
    }
  } catch (error) {
    console.warn('Supabase dedication statuses unavailable', error);
  }

  return getDefaultDedicationStatuses();
};

export const updateDedicationStatuses = async (statuses, password) => {
  if (!password) {
    throw createDedicationError('Password is required', 'missing_password');
  }

  const response = await fetch('/api/dedication-statuses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      password,
      statuses,
    }),
  });

  if (response.status === 401) {
    throw createDedicationError('Invalid password', 'invalid_password');
  }

  if (!response.ok) {
    throw new Error(`Dedication update returned ${response.status}`);
  }

  return normalizeDedicationStatuses(await response.json());
};
