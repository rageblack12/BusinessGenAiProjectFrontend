// import React, { useState, useEffect } from 'react';
// import { getComplaintsByUser, sendComplaintReply, closeComplaint } from '../../api/complaintAPI';
// import { FaPaperPlane } from 'react-icons/fa';


// const MyComplaints = () => {
//   const [complaints, setComplaints] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [expandedComplaint, setExpandedComplaint] = useState(null);
//   const [replyTexts, setReplyTexts] = useState({});

//   useEffect(() => {
//     loadComplaints();
//   }, []);

//   const loadComplaints = async () => {
//     try {
//       const response = await getComplaintsByUser();
//       setComplaints(response.data || []);
//       const replies = {};
//       (response.data || []).forEach((c) => replies[c._id] = '');
//       setReplyTexts(replies);
//     } catch (error) {
//       console.error('Error loading complaints:', error);
//     }
//     setLoading(false);
//   };

//   const handleToggleExpand = (id) => {
//     setExpandedComplaint(expandedComplaint === id ? null : id);
//   };

//   const handleMarkResolved = async (id) => {
//     try {
//       await closeComplaint(id);
//       await loadComplaints();
//     } catch (error) {
//       console.error('Error marking complaint as resolved:', error);
//     }
//   };

//   const handleReplyChange = (id, value) => {
//     setReplyTexts({ ...replyTexts, [id]: value });
//   };

//   const handleSendReply = async (id) => {
//     const reply = replyTexts[id];
//     if (!reply.trim()) return;
//     try {
//       await sendComplaintReply(id, reply);
//       await loadComplaints();
//     } catch (error) {
//       console.error('Error sending reply:', error);
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'resolved': return 'bg-green-100 text-green-700 border-green-300';
//       case 'In Progress': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
//       case 'open': return 'bg-blue-100 text-blue-700 border-blue-300';
//       default: return 'bg-gray-100 text-gray-700 border-gray-300';
//     }
//   };

//   if (loading) return <p className="text-lg font-medium">Loading complaints...</p>;

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-6">My Complaints</h2>

//       {complaints.length === 0 ? (
//         <div className="bg-blue-100 text-blue-800 p-4 rounded-md border border-blue-300">
//           No complaints found. You can raise a new complaint from the dashboard.
//         </div>
//       ) : (
//         complaints.map((complaint) => (
//           <div key={complaint._id} onClick={() => handleToggleExpand(complaint._id)} className="bg-white shadow-md rounded-lg mb-4 p-4 relative">
//             <div className="flex cursor-pointer justify-between items-start mb-3">
//               <h3
//                 className="text-lg font-semibold cursor-pointer"
//               >
//                 Order #{complaint.orderId}
//               </h3>

//               <div className="flex items-center gap-2">
//                 <span className={`px-2 py-1 text-sm rounded border capitalize ${getStatusColor(complaint.status)}`}>
//                   {complaint.status}
//                 </span>
//                 {!complaint.status || complaint.status !== 'Resolved' ? (
//                   <button
//                     onClick={() => handleMarkResolved(complaint._id)}
//                     className="text-black border border-black text-sm px-3 py-1 rounded"
//                   >
//                   Close issue
//                   </button>
//                 ) : null}
//               </div>
//             </div>

//             <p className="text-sm text-gray-600 mb-2">
//               Product: {complaint.productType}
//             </p>
//             <p className="text-base mb-3">{complaint.description}</p>
//             <p className="text-xs text-gray-500">
//               Submitted: {new Date(complaint.createdAt).toLocaleDateString()}
//             </p>

//             {expandedComplaint === complaint._id && (
//               <>
//                 {complaint.replies?.length > 0 && (
//                   <div className="bg-gray-100 p-3 rounded mt-4 mb-2">
//                     <p className="font-medium text-sm mb-2">Replies:</p>
//                     {complaint.replies.map((reply, index) => (
//                       <p key={index} className="text-sm mb-1">
//                         <strong>{reply.userId?.name || 'User'}:</strong> {reply.content}
//                       </p>
//                     ))}
//                   </div>
//                 )}

//                 <div className="flex flex-col md:flex-row gap-3 mt-3">
//                   <textarea
//                     rows={2}
//                     className="w-full border rounded outline-none p-1 text-sm"
//                     placeholder="Write a reply..."
//                     value={replyTexts[complaint._id] || ''}
//                     onChange={(e) => handleReplyChange(complaint._id, e.target.value)}
//                   />
//                   <button
//                     onClick={() => handleSendReply(complaint._id)}
//                     disabled={!replyTexts[complaint._id]?.trim()}
//                     className="bg-green-600 text-white px-4 py-1 rounded disabled:opacity-50"
//                   >
//                    <span> <FaPaperPlane/> </span>
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default MyComplaints;


import React, { useState, useEffect } from 'react';
import { getComplaintsByUser, sendComplaintReply, closeComplaint } from '../../api/complaintAPI';
import { FaPaperPlane } from 'react-icons/fa';


const MyComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedComplaint, setExpandedComplaint] = useState(null);
  const [replyTexts, setReplyTexts] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const complaintsPerPage = 3;

  useEffect(() => {
    loadComplaints(currentPage);
  }, []);

  const loadComplaints = async (page = 1) => {
    setLoading(true);
    try {
      const response = await getComplaintsByUser(page, complaintsPerPage);
      const data = response.data.complaints || [];
      setComplaints(data);
      setTotalPages(response.data.totalPages || 1);
      setCurrentPage(response.data.currentPage || 1);

      const replies = {};
      data.forEach((c) => (replies[c._id] = ''));
      setReplyTexts(replies);
    } catch (error) {
      console.error('Error loading complaints:', error);
    }
    setLoading(false);
  };

  const handleToggleExpand = (id) => {
    setExpandedComplaint(expandedComplaint === id ? null : id);
  };

  const handleMarkResolved = async (id) => {
    try {
      await closeComplaint(id);
      await loadComplaints(currentPage);
    } catch (error) {
      console.error('Error marking complaint as resolved:', error);
    }
  };

  const handleReplyChange = (id, value) => {
    setReplyTexts({ ...replyTexts, [id]: value });
  };

  const handleSendReply = async (id) => {
    const reply = replyTexts[id];
    if (!reply.trim()) return;
    try {
      await sendComplaintReply(id, reply);
      await loadComplaints(currentPage);
    } catch (error) {
      console.error('Error sending reply:', error);
    }
  };


  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
    loadComplaints(pageNumber);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved': return 'bg-green-100 text-green-700 border-green-300';
      case 'In Progress': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'open': return 'bg-blue-100 text-blue-700 border-blue-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  if (loading) return <p className="text-lg font-medium">Loading complaints...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">My Complaints</h2>

      {complaints.length === 0 ? (
        <div className="bg-blue-100 text-blue-800 p-4 rounded-md border border-blue-300">
          No complaints found. You can raise a new complaint from the dashboard.
        </div>
      ) : (
        complaints.map((complaint) => (
          <div key={complaint._id}  className="bg-white shadow-md rounded-lg mb-4 p-4 relative">
            <div className="flex cursor-pointer justify-between items-start mb-3">
              <h3
                className="text-lg font-semibold cursor-pointer"
                onClick={() => handleToggleExpand(complaint._id)}
              >
                Order #{complaint.orderId}
              </h3>

              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 text-sm rounded border capitalize ${getStatusColor(complaint.status)}`}>
                  {complaint.status}
                </span>
                {!complaint.status || complaint.status !== 'Resolved' ? (
                  <button
                    onClick={() => handleMarkResolved(complaint._id)}
                    className="text-black border border-black text-sm px-3 py-1 rounded"
                  >
                    Close issue
                  </button>
                ) : null}
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-2">
              Product: {complaint.productType}
            </p>
            <p className="text-base mb-3">{complaint.description}</p>
            <p className="text-xs text-gray-500">
              Submitted: {new Date(complaint.createdAt).toLocaleDateString()}
            </p>

            {expandedComplaint === complaint._id && (
              <>
                {complaint.replies?.length > 0 && (
                  <div className="bg-gray-100 p-3 rounded mt-4 mb-2">
                    <p className="font-medium text-sm mb-2">Replies:</p>
                    {complaint.replies.map((reply, index) => (
                      <p key={index} className="text-sm mb-1">
                        <strong>{reply.userId?.name || 'User'}:</strong> {reply.content}
                      </p>
                    ))}
                  </div>
                )}

                <div className="flex flex-col md:flex-row gap-3 mt-3">
                  <textarea
                    rows={2}
                    className="w-full border rounded outline-none p-1 text-sm"
                    placeholder="Write a reply..."
                    value={replyTexts[complaint._id] || ''}
                    onChange={(e) => handleReplyChange(complaint._id, e.target.value)}
                  />
                  <button
                    onClick={() => handleSendReply(complaint._id)}
                    disabled={!replyTexts[complaint._id]?.trim()}
                    className="bg-green-600 text-white px-4 py-1 rounded disabled:opacity-50"
                  >
                    <span> <FaPaperPlane /> </span>
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      )}


      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`px-3 py-1 rounded border ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>

    </div>
  );
};

export default MyComplaints;

