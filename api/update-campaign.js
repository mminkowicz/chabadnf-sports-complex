const fs = require('fs').promises;
const path = require('path');

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      const { goal, raised, lastUpdated } = req.body;
      
      // Validate input
      if (!goal || !raised || !lastUpdated) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      // Create the updated data
      const campaignData = {
        goal: parseInt(goal),
        raised: parseInt(raised),
        lastUpdated: lastUpdated
      };

      // Write to the JSON file
      const filePath = path.join(process.cwd(), 'public', 'campaign-data.json');
      await fs.writeFile(filePath, JSON.stringify(campaignData, null, 2));

      res.json({ 
        message: 'Campaign updated successfully',
        data: campaignData
      });
    } catch (error) {
      console.error('Error updating campaign:', error);
      res.status(500).json({ message: 'Error updating campaign' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
