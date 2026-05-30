const { updateCampaignData } = require('../vercel/campaignSupabase');

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

  const raised = Number(body.raised);

  if (!Number.isInteger(raised) || raised < 0) {
    return res.status(400).json({ message: 'Raised total must be a non-negative whole number' });
  }

  try {
    const data = await updateCampaignData(raised);
    return res.status(200).json({ data });
  } catch (error) {
    console.error('Campaign data update failed', error);
    return res.status(500).json({ message: 'Campaign update failed' });
  }
};
