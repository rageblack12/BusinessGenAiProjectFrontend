import React, { useState } from 'react';
import PostManager from '../components/admin/PostManager';
import ComplaintManager from '../components/admin/ComplaintManager';
import CommentManager from '../components/admin/CommentManager';
import Analytics from '../components/admin/Analytics';

const AdminDashboard = () => {
  const [tabValue, setTabValue] = useState(0);

  const tabs = [
    { label: 'Posts' },
    { label: 'Complaints' },
    { label: 'Comments' },
    { label: 'Analytics' },
  ];

  const TabPanel = ({ children, value, index }) => (
    <div className={`${value !== index ? 'hidden' : ''} py-6`}>
      {value === index && children}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="border-b border-gray-200">
        <nav className="flex space-x-4">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setTabValue(index)}
              className={`px-4 py-2 text-sm font-medium rounded-t-md transition-colors
                ${tabValue === index
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="bg-white shadow-md rounded-b-md p-4 mt-0">
        <TabPanel value={tabValue} index={0}>
          <PostManager />
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <ComplaintManager />
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <CommentManager />
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Analytics />
        </TabPanel>
      </div>
    </div>
  );
};

export default AdminDashboard;
