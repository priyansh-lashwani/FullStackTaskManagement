import React, { useState } from 'react';

import './EditTaskModal.css';



const EditTaskModal = ({ task, onClose, onSave }) => {

  const [formData, setFormData] = useState(task);



  // Define options based on your backend enums

  const statusOptions = ['INITIATED', 'IN_PROGRESS', 'COMPLETED', 'ARCHIVED'];

  const assigneeOptions = ['RAJESH', 'BOB', 'ALICE', 'CHARLIE', 'DAVID', 'EVE'];



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

        <h2>Edit Task</h2>

        <form onSubmit={handleSubmit}>

          <div className="form-group">

            <label>Number</label>

            <input type="text" name="number" value={formData.number} onChange={handleChange} />

          </div>

          <div className="form-group">

            <label>Title</label>

            <input type="text" name="title" value={formData.title} onChange={handleChange} />

          </div>

          <div className="form-group">

            <label>Description</label>

            <textarea name="description" value={formData.description} onChange={handleChange}></textarea>

          </div>



          {/* --- MODIFIED THIS SECTION --- */}

          <div className="form-group">

            <label>Assignee</label>

            <select name="assignee" value={formData.assignee || ''} onChange={handleChange}>

              <option value="">None</option> {/* For unassigned tasks */}

              {assigneeOptions.map(option => (

                <option key={option} value={option}>

                  {option}

                </option>

              ))}

            </select>

          </div>

          {/* --------------------------- */}



          <div className="form-group">

            <label>Status</label>

            <select name="status" value={formData.status} onChange={handleChange}>

              {statusOptions.map(option => (

                <option key={option} value={option}>

                  {option}

                </option>

              ))}

            </select>

          </div>



          <div className="form-group">

            <label>Due Date</label>

            <input

              type="date"

              name="dueDate"

              value={formData.dueDate ? formData.dueDate.substring(0, 10) : ''}

              onChange={handleChange}

            />

          </div>


          <div className="modal-actions">

            <button type="submit" className="save-btn">Save Changes</button>

            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>

          </div>

        </form>

      </div>

    </div>

  );

};



export default EditTaskModal;