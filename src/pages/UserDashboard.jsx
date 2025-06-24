import React, { useState } from 'react';

const UserDashboard = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (index) => {
    setTabValue(index);
  };

  const TabPanel = ({ children, value, index }) => (
    <div className={`${value !== index ? 'hidden' : ''} py-6`}>
      {value === index && children}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Customer Dashboard</h1>

      {/* Tabs */}
      <div className="flex space-x-4 border-b border-gray-200 mb-4">
        <button
          className={`py-2 px-4 font-medium border-b-2 ${
            tabValue === 0
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-600 hover:text-blue-600'
          }`}
          onClick={() => handleTabChange(0)}
        >
          Posts
        </button>
        <button
          className={`py-2 px-4 font-medium border-b-2 ${
            tabValue === 1
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-600 hover:text-blue-600'
          }`}
          onClick={() => handleTabChange(1)}
        >
          Profile
        </button>
        {/* Add more tabs as needed */}
      </div>

      {/* Tab Panels */}
      <TabPanel value={tabValue} index={0}>
        <p>This is the Posts tab content.</p>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <p>This is the Profile tab content.</p>
      </TabPanel>
    </div>
  );
};

export default UserDashboard;
