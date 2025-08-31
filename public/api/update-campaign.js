// This is a simple API endpoint for updating campaign data
// In a real implementation, you'd want to use a proper backend server

// For now, we'll use a simple approach that works with static hosting
// The actual update will be handled by the frontend

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { goal, raised, lastUpdated } = req.body;

  // Validate input
  if (!goal || !raised || !lastUpdated) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // In a real implementation, you would:
  // 1. Validate the data
  // 2. Write to a database or file
  // 3. Return success response

  // For now, we'll return success and let the frontend handle the file update
  return res.status(200).json({ 
    message: 'Campaign updated successfully',
    data: { goal, raised, lastUpdated }
  });
}
