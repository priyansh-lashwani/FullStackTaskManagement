import React, { useState, useEffect } from 'react';
import APIService from '../services/apiService';
import './ViewTaskModal.css';

const ViewTaskModal = ({ task, onClose }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loadingComments, setLoadingComments] = useState(true);
  const [error, setError] = useState(null);

  const fetchComments = async () => {
    try {
      setLoadingComments(true);
      const fetchedComments = await APIService.getCommentsForTask(task.id);
      setComments(fetchedComments);
    } catch (err) {
      setError('Failed to load comments.');
    } finally {
      setLoadingComments(false);
    }
  };

  useEffect(() => {
    if (task) {
      fetchComments();
    }
  }, [task]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      // --- THIS IS THE ONLY CHANGE ---
      const commentData = {
        userName: task.assignee, // Use the assignee's name from the task
        comment: newComment,
      };
      // -----------------------------
      await APIService.addComment(task.id, commentData);
      setNewComment('');
      fetchComments(); // Refresh comments list
    } catch (err) {
      setError('Failed to post comment.');
    }
  };

  const isCommentDisabled = !task.assignee;

  return (
    <div className="modal-overlay">
      <div className="modal-content view-modal">
        <div className="modal-header">
          <h2>{task.title}</h2>
          <button onClick={onClose} className="close-btn">&times;</button>
        </div>
        <div className="task-details">
          <p><strong>Task Number:</strong> {task.number}</p>
          <p><strong>Status:</strong> <span className={`status-badge ${task.status.toLowerCase().replace(' ', '-')}`}>{task.status}</span></p>
          <p><strong>Assignee:</strong> {task.assignee || 'None'}</p>
          <p><strong>Due Date:</strong> {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}</p>
          <p><strong>Description:</strong></p>
          <p className="description-box">{task.description || 'No description provided.'}</p>
        </div>
        <div className="comments-section">
          <h3>Comments</h3>
          {loadingComments ? <p>Loading comments...</p> : (
            <div className="comments-list">
              {comments.length > 0 ? comments.map(c => (
                <div key={c.id} className="comment">
                  <strong>{c.userName}</strong>
                  <small>{new Date(c.createdAt).toLocaleString()}</small>
                  <p>{c.comment}</p>
                </div>
              )) : <p>No comments yet.</p>}
            </div>
          )}
          <form onSubmit={handleAddComment} className="comment-form">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={isCommentDisabled ? "An assignee must be set to comment." : "Add a comment..."}
              disabled={isCommentDisabled}
            />
            <button type="submit" disabled={isCommentDisabled}>Post Comment</button>
          </form>
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default ViewTaskModal;