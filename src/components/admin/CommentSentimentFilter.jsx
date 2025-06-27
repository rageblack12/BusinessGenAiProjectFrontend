import React, { useState, useEffect } from 'react';
import { API } from '../../api/api';

const CommentSentimentFilter = () => {
  const [posts, setPosts] = useState([]);
  const [sentimentFilter, setSentimentFilter] = useState('');
  const [replyTexts, setReplyTexts] = useState({});
  const [commentSentiments, setCommentSentiments] = useState({});

  useEffect(() => {
    loadPostsWithComments();
  }, []);

  const loadPostsWithComments = async () => {
    try {
      const response = await API.getPosts();
      const postsWithComments = response.data.filter(post => post.comments?.length > 0);
      setPosts(postsWithComments);

      const replies = {};
      const sentiments = {};

      for (const post of postsWithComments) {
        for (const comment of post.comments) {
          replies[comment.id] = '';
          try {
            const sentimentResponse = await API.getSentiment(comment.text);
            sentiments[comment.id] = sentimentResponse.data.sentiment;
          } catch (error) {
            sentiments[comment.id] = 'Neutral';
          }
        }
      }

      setReplyTexts(replies);
      setCommentSentiments(sentiments);
    } catch (error) {
      console.error('Error loading posts with comments:', error);
    }
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'Positive': return 'bg-green-100 text-green-700';
      case 'Negative': return 'bg-red-100 text-red-700';
      case 'Neutral': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredComments = () => {
    let allComments = [];
    posts.forEach(post => {
      post.comments?.forEach(comment => {
        allComments.push({
          ...comment,
          postTitle: post.title,
          postId: post.id,
          sentiment: commentSentiments[comment.id]
        });
      });
    });

    if (sentimentFilter) {
      allComments = allComments.filter(comment => comment.sentiment === sentimentFilter);
    }

    return allComments;
  };

  const handleSuggestReply = async (commentId, commentText) => {
    try {
      const response = await API.getSuggestedReply(commentText);
      setReplyTexts(prev => ({ ...prev, [commentId]: response.data.reply }));
    } catch (error) {
      console.error('Error getting suggested reply:', error);
    }
  };

  const handleSendReply = async (commentId) => {
    const reply = replyTexts[commentId];
    if (!reply.trim()) return;

    try {
      console.log('Reply sent:', reply);
      setReplyTexts(prev => ({ ...prev, [commentId]: '' }));
      alert('Reply sent successfully!');
    } catch (error) {
      console.error('Error sending reply:', error);
    }
  };

  const handleReplyChange = (commentId, value) => {
    setReplyTexts(prev => ({ ...prev, [commentId]: value }));
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Comment Sentiment Analysis</h1>

      {/* Filter dropdown */}
      <div className="bg-white shadow p-4 mb-6 rounded-md flex gap-4 items-center">
        <span className="font-medium text-gray-700">Filter by Sentiment:</span>
        <select
          className="border border-gray-300 rounded px-3 py-2"
          value={sentimentFilter}
          onChange={(e) => setSentimentFilter(e.target.value)}
        >
          <option value="">All Sentiments</option>
          <option value="Positive">Positive</option>
          <option value="Neutral">Neutral</option>
          <option value="Negative">Negative</option>
        </select>
      </div>

      {/* Comment Cards */}
      {filteredComments().map(comment => (
        <div key={comment.id} className="bg-white shadow rounded-md p-4 mb-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h2 className="text-lg font-semibold">{comment.userName}</h2>
              <p className="text-sm text-gray-500">On post: “{comment.postTitle}”</p>
            </div>
            <span className={`px-3 py-1 text-sm rounded-full ${getSentimentColor(comment.sentiment)}`}>
              {comment.sentiment}
            </span>
          </div>

          <p className="text-gray-800 italic mb-1">“{comment.text}”</p>
          <p className="text-xs text-gray-400 mb-3">{new Date(comment.timestamp).toLocaleDateString()}</p>

          <hr className="my-2" />

          <div className="flex gap-2 mb-2">
            <button
              onClick={() => handleSuggestReply(comment.id, comment.text)}
              className="px-3 py-1 border border-gray-300 text-sm rounded hover:bg-gray-100"
            >
              💡 Suggest Reply
            </button>
          </div>

          <div className="flex gap-2">
            <textarea
              className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
              rows={2}
              placeholder="Write your reply..."
              value={replyTexts[comment.id] || ''}
              onChange={(e) => handleReplyChange(comment.id, e.target.value)}
            />
            <button
              className={`px-4 py-2 rounded text-sm text-white ${
                replyTexts[comment.id]?.trim() ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'
              }`}
              onClick={() => handleSendReply(comment.id)}
              disabled={!replyTexts[comment.id]?.trim()}
            >
              ➤ Send
            </button>
          </div>
        </div>
      ))}

      {filteredComments().length === 0 && (
        <div className="text-center py-8 text-gray-500 border rounded bg-white">
          No comments found matching the current filter.
        </div>
      )}
    </div>
  );
};

export default CommentSentimentFilter;
