import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// API Base URL - Update this to your deployed backend URL
const API_BASE_URL = 'https://chabadnf-backend.vercel.app/api';

const FundraisingWidget = ({ 
  goal: propGoal = 1800000, 
  raised: propRaised = 400000, 
  title = "Campaign Progress",
  buttonText = "Donate Now",
  onDonateClick 
}) => {
  const [campaignData, setCampaignData] = useState({
    goal: propGoal,
    raised: propRaised
  });

  useEffect(() => {
    // Fetch campaign data from the API
    fetch(`${API_BASE_URL}/campaign-data`)
      .then(response => response.json())
      .then(response => {
        // Check if we have saved data in localStorage
        const savedData = localStorage.getItem('chabadnf_campaign_data');
        let dataToUse = response.data;
        
        if (savedData) {
          const parsedSavedData = JSON.parse(savedData);
          console.log('API data:', dataToUse);
          console.log('Saved data:', parsedSavedData);
          
          // Always prefer localStorage data if it exists (since API resets)
          dataToUse = parsedSavedData;
          console.log('Using saved campaign data from localStorage');
        }
        
        setCampaignData({
          goal: dataToUse?.goal || propGoal,
          raised: dataToUse?.raised || propRaised
        });
      })
      .catch(error => {
        console.log('Using default campaign data:', error);
        // Try to load from localStorage as fallback
        const savedData = localStorage.getItem('chabadnf_campaign_data');
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          setCampaignData({
            goal: parsedData.goal || propGoal,
            raised: parsedData.raised || propRaised
          });
          console.log('Using localStorage fallback due to API error');
        } else {
          // Fallback to props if API doesn't exist
          setCampaignData({
            goal: propGoal,
            raised: propRaised
          });
          console.log('No localStorage data available, using props');
        }
      });
  }, [propGoal, propRaised]);

  const { goal, raised } = campaignData;
  const percentage = Math.min((raised / goal) * 100, 100);
  const formattedGoal = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(goal);
  
  const formattedRaised = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(raised);

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="max-w-lg mx-auto bg-white rounded-xl shadow-xl overflow-hidden border-2 border-primary-200"
    >
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-6">
        <h3 className="text-xl font-bold text-secondary-900 mb-6 text-center" style={{ fontFamily: 'Arial Black, Helvetica Bold, sans-serif' }}>
          {title}
        </h3>
        
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-4 shadow-inner">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1.2, delay: 0.5 }}
              className="bg-gradient-to-r from-primary-500 to-primary-600 h-4 rounded-full shadow-md"
            />
          </div>
        </div>
        
        {/* Financial Update */}
        <div className="text-center mb-6">
          <div className="text-2xl font-bold text-secondary-900 mb-2">
            {formattedRaised} <span className="text-primary-600">raised</span>
          </div>
          <div className="text-lg text-secondary-600 mb-1">
            of {formattedGoal} goal
          </div>
          <div className="text-sm font-semibold text-primary-600 bg-primary-100 px-3 py-1 rounded-full inline-block">
            {Math.round(percentage)}% Complete
          </div>
        </div>
        
        {/* Donate Button */}
        <button
          onClick={onDonateClick}
          className="w-full bg-primary-500 hover:bg-primary-600 text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          {buttonText}
        </button>
      </div>
    </motion.div>
  );
};

export default FundraisingWidget;
