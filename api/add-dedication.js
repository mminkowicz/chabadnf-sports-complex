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
      const newDedication = req.body;
      
      // Read current dedications
      const filePath = path.join(process.cwd(), 'public', 'dedications-data.json');
      let dedications = [];
      
      try {
        const data = await fs.readFile(filePath, 'utf8');
        dedications = JSON.parse(data);
      } catch (error) {
        // File doesn't exist, start with empty array
      }

      // Add new dedication
      dedications.push(newDedication);

      // Write back to file
      await fs.writeFile(filePath, JSON.stringify(dedications, null, 2));

      res.json({ 
        message: 'Dedication added successfully',
        data: newDedication
      });
    } catch (error) {
      console.error('Error adding dedication:', error);
      res.status(500).json({ message: 'Error adding dedication' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
