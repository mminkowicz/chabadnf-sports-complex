const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3001;

// File operation locks to prevent race conditions
const fileLocks = new Map();

// Helper function to acquire file lock
const acquireLock = async (filePath) => {
  if (fileLocks.has(filePath)) {
    // Wait for existing lock to be released
    while (fileLocks.has(filePath)) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
  fileLocks.set(filePath, true);
};

// Helper function to release file lock
const releaseLock = (filePath) => {
  fileLocks.delete(filePath);
};

// Helper function for safe file operations
const safeFileOperation = async (filePath, operation) => {
  await acquireLock(filePath);
  try {
    return await operation();
  } finally {
    releaseLock(filePath);
  }
};

// Middleware
app.use(cors());
app.use(express.json());

// API endpoints
app.post('/api/update-campaign', async (req, res) => {
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

    // Write to the JSON file with file locking
    const filePath = path.join(__dirname, 'public', 'campaign-data.json');
    await safeFileOperation(filePath, async () => {
      await fs.writeFile(filePath, JSON.stringify(campaignData, null, 2));
    });

    res.json({ 
      message: 'Campaign updated successfully',
      data: campaignData
    });
  } catch (error) {
    console.error('Error updating campaign:', error);
    res.status(500).json({ message: 'Error updating campaign. Please try again.' });
  }
});

app.get('/api/campaign-data', async (req, res) => {
  try {
    // Add cache-busting headers to prevent browser caching
    res.set({
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    });
    
    const filePath = path.join(__dirname, 'public', 'campaign-data.json');
    const data = await fs.readFile(filePath, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading campaign data:', error);
    res.status(500).json({ message: 'Error reading campaign data' });
  }
});

// Dedications API endpoints
app.get('/api/dedications', async (req, res) => {
  try {
    const filePath = path.join(__dirname, 'public', 'dedications-data.json');
    const data = await fs.readFile(filePath, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading dedications data:', error);
    res.status(500).json({ message: 'Error reading dedications data' });
  }
});

app.post('/api/update-dedication', async (req, res) => {
  try {
    const updatedDedication = req.body;
    
    // Read and update dedications with file locking
    const filePath = path.join(__dirname, 'public', 'dedications-data.json');
    await safeFileOperation(filePath, async () => {
      let dedications = [];
      
      try {
        const data = await fs.readFile(filePath, 'utf8');
        dedications = JSON.parse(data);
      } catch (error) {
        // File doesn't exist, start with empty array
      }

      // Update the specific dedication
      dedications = dedications.map(d => 
        d.id === updatedDedication.id ? updatedDedication : d
      );

      // Write back to file
      await fs.writeFile(filePath, JSON.stringify(dedications, null, 2));
    });

    res.json({ 
      message: 'Dedication updated successfully',
      data: updatedDedication
    });
  } catch (error) {
    console.error('Error updating dedication:', error);
    res.status(500).json({ message: 'Error updating dedication. Please try again.' });
  }
});

app.post('/api/add-dedication', async (req, res) => {
  try {
    const newDedication = req.body;
    
    // Read and add dedication with file locking
    const filePath = path.join(__dirname, 'public', 'dedications-data.json');
    await safeFileOperation(filePath, async () => {
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
    });

    res.json({ 
      message: 'Dedication added successfully',
      data: newDedication
    });
  } catch (error) {
    console.error('Error adding dedication:', error);
    res.status(500).json({ message: 'Error adding dedication. Please try again.' });
  }
});

// Serve static files
app.use(express.static('public'));

// Serve React app
app.use(express.static('build'));

// Catch-all route for React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
