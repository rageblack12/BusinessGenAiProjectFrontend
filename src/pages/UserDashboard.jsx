import React, { useState } from 'react';
import ViewPosts from '../components/user/ViewPosts';
import RaiseComplaint from '../components/user/RaiseComplaint';
import MyComplaints from '../components/user/MyComplaints';

const TABS = [
  { label: 'View Posts', icon: '📝' },
  { label: 'Raise Complaint', icon: '🚨' },
  { label: 'My Complaints', icon: '📋' },
];

const UserDashboard = () => {
  const [tabValue, setTabValue] = useState(0);

  const TabPanel = ({ children, index }) => (
    <div hidden={tabValue !== index} className="py-4">
      {tabValue === index && <div>{children}</div>}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">
        Customer Dashboard
      </h1>

      <div className="border-b border-gray-300 mb-4">
        <div className="flex space-x-4">
          {TABS.map((tab, index) => (
            <button
              key={index}
              onClick={() => setTabValue(index)}
              className={`flex items-center gap-2 px-4 py-2 font-medium rounded-t-md transition ${
                tabValue === index
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <TabPanel index={0}>
        <ViewPosts />
      </TabPanel>

      <TabPanel index={1}>
        <RaiseComplaint />
      </TabPanel>

      <TabPanel index={2}>
        <MyComplaints />
      </TabPanel>
    </div>
  );
};

export default UserDashboard;
