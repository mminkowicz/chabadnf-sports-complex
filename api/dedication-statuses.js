const { readDedicationStatuses, updateDedicationStatuses } = require('../vercel/campaignSupabase');

const parseBody = (body) => {
  if (!body) {
    return {};
  }

  if (typeof body === 'string') {
    return JSON.parse(body);
  }

  return body;
};

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');

  if (req.method === 'GET') {
    try {
      const statuses = await readDedicationStatuses();
      return res.status(200).json({ data: { statuses } });
    } catch (error) {
      console.error('Dedication status read failed', error);
      return res.status(500).json({ message: 'Dedication statuses unavailable' });
    }
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const adminPassword = process.env.UPDATE_TOTAL_PASSWORD;

  if (!adminPassword) {
    return res.status(500).json({ message: 'Update password is not configured' });
  }

  let body;

  try {
    body = parseBody(req.body);
  } catch (error) {
    return res.status(400).json({ message: 'Invalid request body' });
  }

  if (body.password !== adminPassword) {
    return res.status(401).json({ message: 'Invalid password' });
  }

  if (!body.statuses || typeof body.statuses !== 'object' || Array.isArray(body.statuses)) {
    return res.status(400).json({ message: 'Statuses are required' });
  }

  try {
    const statuses = await updateDedicationStatuses(body.statuses);
    return res.status(200).json({ data: { statuses } });
  } catch (error) {
    console.error('Dedication status update failed', error);
    return res.status(500).json({ message: 'Dedication status update failed' });
  }
};
