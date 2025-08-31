import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FundraisingWidget from './FundraisingWidget';

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check if user is already authenticated from localStorage
    return localStorage.getItem('adminAuthenticated') === 'true';
  });
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('campaign'); // 'campaign' or 'dedications'
  
  // Campaign data
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

  // Dedications data
  const [dedications, setDedications] = useState([]);
  const [editingDedication, setEditingDedication] = useState(null);
  const [newDedication, setNewDedication] = useState({
    title: '',
    amount: '',
    status: 'available',
    phase: ''
  });

  // Simple password - you can change this
  const ADMIN_PASSWORD = 'chabad2024';

  useEffect(() => {
    // Load current campaign data
    fetch('/api/campaign-data')
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
        console.log('Using default campaign data:', error);
      });

    // Load dedications data
    fetch('/api/dedications')
      .then(response => response.json())
      .then(data => {
        setDedications(data);
      })
      .catch(error => {
        console.log('Using default dedications data:', error);
        // Load default dedications if API fails
        loadDefaultDedications();
      });
  }, []);

  const loadDefaultDedications = () => {
    // This would be your current dedications data
    const defaultDedications = [
      { id: 1, title: 'Campus Dedication', amount: '$900,000', status: 'available' },
      { id: 7, title: 'Playground', amount: '$300,000', status: 'available' },
      { id: 6, title: 'Soccer Field', amount: '$300,000', status: 'sold' },
      { id: 3, title: 'Basketball Court', amount: '$250,000', status: 'available' },
      { id: 2, title: 'Baseball Field', amount: '$200,000', status: 'available' },
      { id: 4, title: 'Pickleball Court', amount: '$180,000', status: 'available' },
      { id: 5, title: 'Kids Car Track', amount: '$100,000', status: 'sold' },
      { id: 8, title: 'Nature Trail', amount: '$100,000', status: 'available' },
      { id: 9, title: 'Nature Nest', amount: '$75,000', status: 'available' },
      { id: 10, title: 'Water Slides', amount: '$25,000', status: 'available' },
      { id: 11, title: 'Gazebos', amount: '$25,000', status: 'available' },
      { id: 12, title: 'Bleachers', amount: '$5,000', status: 'available' },
      { id: 13, title: 'Benches', amount: '$3,600', status: 'available' },
      { id: 14, title: 'Retreat House', amount: '$850,000', status: 'available', phase: 'Phase 2' },
      { id: 15, title: 'Gym', amount: '$4,000,000', status: 'available', phase: 'Phase 2' }
    ];
    setDedications(defaultDedications);
  };

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

  const handleUpdate = async (e) => {
    // Prevent any form submission or page refresh
    if (e) e.preventDefault();
    
    setIsUpdating(true);
    setMessage('');

    try {
      console.log('Updating campaign with data:', tempData);
      
      const response = await fetch('/api/update-campaign', {
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

  // Dedication management functions
  const handleDedicationUpdate = async (dedication) => {
    try {
      const response = await fetch('/api/update-dedication', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dedication)
      });

      if (response.ok) {
        setDedications(prev => 
          prev.map(d => d.id === dedication.id ? dedication : d)
        );
        setEditingDedication(null);
        setMessage('Dedication updated successfully!');
      } else {
        setMessage('Error updating dedication. Please try again.');
      }
    } catch (error) {
      setMessage('Error updating dedication. Please try again.');
    }
  };

  const handleAddDedication = async () => {
    if (!newDedication.title || !newDedication.amount) {
      setMessage('Please fill in all required fields.');
      return;
    }

    const dedication = {
      id: Date.now(), // Simple ID generation
      ...newDedication,
      amount: newDedication.amount.startsWith('$') ? newDedication.amount : `$${newDedication.amount}`
    };

    try {
      const response = await fetch('/api/add-dedication', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dedication)
      });

      if (response.ok) {
        setDedications(prev => [...prev, dedication]);
        setNewDedication({ title: '', amount: '', status: 'available', phase: '' });
        setMessage('Dedication added successfully!');
      } else {
        setMessage('Error adding dedication. Please try again.');
      }
    } catch (error) {
      setMessage('Error adding dedication. Please try again.');
    }
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
            Admin Dashboard
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
      <div className="max-w-6xl mx-auto">
        {/* Sticky Header with Logout */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="sticky top-16 z-30 bg-white rounded-xl shadow-xl p-6 mb-6"
        >
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-secondary-900">
              Admin Dashboard
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

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-xl p-6 mb-6">
          <div className="flex space-x-4 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('campaign')}
              className={`py-2 px-4 font-medium rounded-t-lg transition-colors duration-200 ${
                activeTab === 'campaign'
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              Campaign Updates
            </button>
            <button
              onClick={() => setActiveTab('dedications')}
              className={`py-2 px-4 font-medium rounded-t-lg transition-colors duration-200 ${
                activeTab === 'dedications'
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              Dedications Management
            </button>
          </div>
        </div>

        {/* Message Display */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-lg mb-6 ${
              message.includes('successfully') 
                ? 'bg-green-100 text-green-800 border border-green-200' 
                : 'bg-red-100 text-red-800 border border-red-200'
            }`}
          >
            {message}
          </motion.div>
        )}

        {/* Campaign Tab Content */}
        {activeTab === 'campaign' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
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
          </motion.div>
        )}

        {/* Dedications Tab Content */}
        {activeTab === 'dedications' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Add New Dedication */}
            <div className="bg-white rounded-xl shadow-xl p-6">
              <h2 className="text-xl font-bold text-secondary-900 mb-6">
                Add New Dedication
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input
                  type="text"
                  placeholder="Title (e.g., Tennis Court)"
                  value={newDedication.title}
                  onChange={(e) => setNewDedication(prev => ({ ...prev, title: e.target.value }))}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Amount (e.g., $50,000)"
                  value={newDedication.amount}
                  onChange={(e) => setNewDedication(prev => ({ ...prev, amount: e.target.value }))}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <select
                  value={newDedication.status}
                  onChange={(e) => setNewDedication(prev => ({ ...prev, status: e.target.value }))}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="available">Available</option>
                  <option value="sold">Sold</option>
                  <option value="reserved">Reserved</option>
                </select>
                <button
                  onClick={handleAddDedication}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  Add Dedication
                </button>
              </div>
            </div>

            {/* Manage Existing Dedications */}
            <div className="bg-white rounded-xl shadow-xl p-6">
              <h2 className="text-xl font-bold text-secondary-900 mb-6">
                Manage Dedications
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold">Title</th>
                      <th className="text-left py-3 px-4 font-semibold">Amount</th>
                      <th className="text-left py-3 px-4 font-semibold">Status</th>
                      <th className="text-left py-3 px-4 font-semibold">Phase</th>
                      <th className="text-left py-3 px-4 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dedications.map((dedication) => (
                      <tr key={dedication.id} className="border-b border-gray-100">
                        <td className="py-3 px-4">
                          {editingDedication?.id === dedication.id ? (
                            <input
                              type="text"
                              value={editingDedication.title}
                              onChange={(e) => setEditingDedication(prev => ({ ...prev, title: e.target.value }))}
                              className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                          ) : (
                            dedication.title
                          )}
                        </td>
                        <td className="py-3 px-4">
                          {editingDedication?.id === dedication.id ? (
                            <input
                              type="text"
                              value={editingDedication.amount}
                              onChange={(e) => setEditingDedication(prev => ({ ...prev, amount: e.target.value }))}
                              className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                          ) : (
                            dedication.amount
                          )}
                        </td>
                        <td className="py-3 px-4">
                          {editingDedication?.id === dedication.id ? (
                            <select
                              value={editingDedication.status}
                              onChange={(e) => setEditingDedication(prev => ({ ...prev, status: e.target.value }))}
                              className="px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            >
                              <option value="available">Available</option>
                              <option value="sold">Sold</option>
                              <option value="reserved">Reserved</option>
                            </select>
                          ) : (
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              dedication.status === 'available' ? 'bg-green-100 text-green-800' :
                              dedication.status === 'sold' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {dedication.status.charAt(0).toUpperCase() + dedication.status.slice(1)}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          {editingDedication?.id === dedication.id ? (
                            <input
                              type="text"
                              value={editingDedication.phase || ''}
                              onChange={(e) => setEditingDedication(prev => ({ ...prev, phase: e.target.value }))}
                              placeholder="Phase 2 (optional)"
                              className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                          ) : (
                            dedication.phase || '-'
                          )}
                        </td>
                        <td className="py-3 px-4">
                          {editingDedication?.id === dedication.id ? (
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleDedicationUpdate(editingDedication)}
                                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition-colors duration-200"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setEditingDedication(null)}
                                className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm transition-colors duration-200"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setEditingDedication(dedication)}
                              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors duration-200"
                            >
                              Edit
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
