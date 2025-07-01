import React, { useState } from 'react';
import ViewPosts from '../components/user/ViewPosts';
import RaiseComplaint from '../components/user/RaiseComplaint';
import MyComplaints from '../components/user/MyComplaints';
import { BsFileEarmarkPost } from "react-icons/bs";


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
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Dashboard
      </h1>

      <div className="border-b border-gray-300 mb-4 overflow-x-auto">
        <div className="inline-flex space-x-2 px-2 sm:px-0 min-w-full">
          {TABS.map((tab, index) => (
            <button
              key={index}
              onClick={() => setTabValue(index)}
              className={`flex items-center gap-2 px-4 py-2 rounded-3xl transition font-medium
          text-sm sm:text-base md:text-lg whitespace-nowrap cursor-pointer
          ${tabValue === index
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-700 shadow-md'
                }`}
            >
              <span className="text-base sm:text-lg">{tab.icon}</span>
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
