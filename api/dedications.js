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

  if (req.method === 'GET') {
    try {
      const filePath = path.join(process.cwd(), 'public', 'dedications-data.json');
      const data = await fs.readFile(filePath, 'utf8');
      res.json(JSON.parse(data));
    } catch (error) {
      console.error('Error reading dedications data:', error);
      res.status(500).json({ message: 'Error reading dedications data' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
