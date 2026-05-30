const { readCampaignData } = require('../vercel/campaignSupabase');

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const data = await readCampaignData();
    return res.status(200).json({ data });
  } catch (error) {
    console.error('Campaign data read failed', error);
    return res.status(500).json({ message: 'Campaign data unavailable' });
  }
};
