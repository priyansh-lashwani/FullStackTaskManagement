import React, { useState, useEffect } from 'react';
import './EditTaskModal.css'; // Reusing the same styles as the Edit modal

let currentTaskNumber = 4; // Global or imported from a service, starts from T-005

const getNextTaskNumber = () => {
  currentTaskNumber += 1;
  return `T-${String(currentTaskNumber).padStart(3, '0')}`;
};

const CreateTaskModal = ({ onClose, onSave }) => {
  const initialTaskState = {
    number: '',
    title: '',
    description: '',
    status: 'INITIATED',
    assignee: '',
    dueDate: '',
    priority: 'MEDIUM',
  };

  const [formData, setFormData] = useState(initialTaskState);

  const statusOptions = ['INITIATED', 'IN_PROGRESS', 'COMPLETED', 'ARCHIVED'];
  const assigneeOptions = ['RAJESH', 'BOB', 'ALICE', 'CHARLIE', 'DAVID', 'EVE'];
  const priorityOptions = ['HIGH', 'MEDIUM', 'LOW'];

  useEffect(() => {
    const newTaskNumber = getNextTaskNumber();
    setFormData(prev => ({ ...prev, number: newTaskNumber }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Create New Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Number</label>
            <input
              type="text"
              name="number"
              value={formData.number}
              readOnly
            />
          </div>

          <div className="form-group">
            <label>Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
          </div>

          <div className="form-group">
            <label>Assignee</label>
            <select name="assignee" value={formData.assignee} onChange={handleChange}>
              <option value="">None</option>
              {assigneeOptions.map(option => <option key={option} value={option}>{option}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>Status</label>
            <select name="status" value={formData.status} onChange={handleChange}>
              {statusOptions.map(option => <option key={option} value={option}>{option}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>Priority</label>
            <select name="priority" value={formData.priority} onChange={handleChange}>
              {priorityOptions.map(option => <option key={option} value={option}>{option}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>Due Date</label>
            <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} />
          </div>

          <div className="modal-actions">
            <button type="submit" className="save-btn">Create Task</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskModal;
