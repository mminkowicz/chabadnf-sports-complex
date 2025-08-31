import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FundraisingWidget from './FundraisingWidget';

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check if user is already authenticated from localStorage
    return localStorage.getItem('adminAuthenticated') === 'true';
  });
  const [password, setPassword] = useState('');
  
  console.log('AdminDashboard rendered, isAuthenticated:', isAuthenticated);
  const [campaignData, setCampaignData] = useState({
    goal: 1800000,
    raised: 400000
  });
  const [tempData, setTempData] = useState({
    goal: 1800000,
    raised: 400000
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState('');

  // Simple password - you can change this
  const ADMIN_PASSWORD = 'chabad2024';

  useEffect(() => {
    // Load current campaign data
    fetch('http://localhost:3001/api/campaign-data')
      .then(response => response.json())
      .then(data => {
        setCampaignData({
          goal: data.goal || 1800000,
          raised: data.raised || 400000
        });
        setTempData({
          goal: data.goal || 1800000,
          raised: data.raised || 400000
        });
      })
      .catch(error => {
        console.log('Using default campaign data');
      });
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuthenticated', 'true');
      setMessage('');
    } else {
      setMessage('Incorrect password');
    }
  };

  const handleInputChange = (field, value) => {
    // Remove all non-numeric characters except decimal point
    const cleanValue = value.replace(/[^0-9.]/g, '');
    const numericValue = parseInt(cleanValue) || 0;
    setTempData(prev => ({
      ...prev,
      [field]: numericValue
    }));
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleUpdate = async (e) => {
    // Prevent any form submission or page refresh
    if (e) e.preventDefault();
    
    setIsUpdating(true);
    setMessage('');

    try {
      console.log('Updating campaign with data:', tempData);
      
      const response = await fetch('http://localhost:3001/api/update-campaign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          goal: tempData.goal,
          raised: tempData.raised,
          lastUpdated: new Date().toISOString().split('T')[0]
        })
      });

      console.log('Response status:', response.status);

      if (response.ok) {
        const result = await response.json();
        console.log('Update successful:', result);
        setCampaignData(tempData);
        setMessage('Campaign updated successfully! Changes are now live on the website.');
        
        // Don't reload the page - just show success message
        // The widget will automatically fetch updated data
      } else {
        const error = await response.json();
        console.log('Update failed:', error);
        setMessage(error.message || 'Error updating campaign. Please try again.');
      }
    } catch (error) {
      console.log('Update error:', error);
      setMessage('Error updating campaign. Please try again.');
    }

    setIsUpdating(false);
  };

  const handleCancel = () => {
    setTempData(campaignData);
    setMessage('');
  };

  const percentage = Math.min((tempData.raised / tempData.goal) * 100, 100);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full"
        >
          <h2 className="text-2xl font-bold text-secondary-900 mb-6 text-center">
            Campaign Admin
          </h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter admin password"
                required
              />
            </div>
            {message && (
              <p className="text-red-600 text-sm">{message}</p>
            )}
            <button
              type="submit"
              className="w-full bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Login
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 pt-24 pb-4 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Sticky Header with Logout */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="sticky top-16 z-30 bg-white rounded-xl shadow-xl p-6 mb-6"
        >
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-secondary-900">
              Campaign Update Dashboard
            </h1>
            <button
              onClick={() => {
                setIsAuthenticated(false);
                localStorage.removeItem('adminAuthenticated');
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-bold text-base shadow-lg transition-all duration-200 transform hover:scale-105 whitespace-nowrap"
            >
              🔓 Logout
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form Section */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-xl p-6"
          >
            <h2 className="text-xl font-bold text-secondary-900 mb-6">
              Update Campaign Totals
            </h2>

            <div className="space-y-6">
              {/* Campaign Goal */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Campaign Goal
                </label>
                <input
                  type="text"
                  value={tempData.goal.toLocaleString()}
                  onChange={(e) => handleInputChange('goal', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg font-semibold"
                  placeholder="1800000"
                />
              </div>

              {/* Amount Raised */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount Raised
                </label>
                <input
                  type="text"
                  value={tempData.raised.toLocaleString()}
                  onChange={(e) => handleInputChange('raised', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg font-semibold"
                  placeholder="400000"
                />
              </div>

              {/* Progress Preview */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Progress Preview
                </h3>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                  <div
                    className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600">
                  {Math.round(percentage)}% Complete
                </p>
              </div>

              {/* Message */}
              {message && (
                <div className={`p-3 rounded-lg text-sm ${
                  message.includes('successfully') 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {message}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={handleUpdate}
                  disabled={isUpdating}
                  className="flex-1 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  {isUpdating ? 'Updating...' : 'Update Campaign'}
                </button>
                <button
                  onClick={handleCancel}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>

          {/* Preview Section */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-xl p-6"
          >
            <h2 className="text-xl font-bold text-secondary-900 mb-6">
              Live Preview
            </h2>
            <div className="flex justify-center">
              <FundraisingWidget
                goal={tempData.goal}
                raised={tempData.raised}
                title="Campaign Progress"
                buttonText="Donate Now"
                onDonateClick={() => {}}
              />
            </div>
            <p className="text-sm text-gray-600 mt-4 text-center">
              This is how the widget will appear on the donate page
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
