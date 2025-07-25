import React, { useState, useEffect, useCallback } from 'react';
import APIService from '../services/apiService';
import './TaskTable.css';
import EditTaskModal from './EditTaskModal';
import ViewTaskModal from './ViewTaskModal';
import CreateTaskModal from './CreateTaskModal';

const TaskTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalTasks, setTotalTasks] = useState(0);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewingTask, setViewingTask] = useState(null);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await APIService.getAllTasks();
      if (response.success) {
        setTasks(response.data);
        setTotalTasks(response.total);
      } else {
        setError('Failed to fetch tasks');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while fetching tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  const searchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await APIService.searchTasks(searchTerm);
      if (response.success) {
        setTasks(response.data);
        setTotalTasks(response.total);
      } else {
        setError('Failed to search tasks');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while searching tasks');
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm.trim()) {
        searchTasks();
      } else {
        fetchTasks();
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, searchTasks, fetchTasks]);

  const handleUpdateTask = async (updatedTask) => {
    try {
      await APIService.updateTask(updatedTask.id, updatedTask);
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );
      setIsEditModalOpen(false);
      setEditingTask(null);
    } catch (err) {
      setError(err.message || "Failed to update task.");
    }
  };
  
  const handleCreateTask = async (taskData) => {
    try {
      await APIService.createTask(taskData);
      setIsCreateModalOpen(false);
      fetchTasks();
    } catch (err) {
      setError(err.message || "Failed to create task.");
    }
  };

  const handleEdit = (id) => {
    const taskToEdit = tasks.find(task => task.id === id);
    if (taskToEdit) {
      setEditingTask(taskToEdit);
      setIsEditModalOpen(true);
    }
  };

  const handleView = (id) => {
    const taskToView = tasks.find(task => task.id === id);
    if (taskToView) {
      setViewingTask(taskToView);
      setIsViewModalOpen(true);
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this task?');
      if (!confirmDelete) return;
      setLoading(true);
      const response = await APIService.deleteTask(id);
      if (response.success) {
        fetchTasks();
      } else {
        setError('Failed to delete task');
        setLoading(false);
      }
    } catch (err) {
      setError(err.message || 'An error occurred while deleting task');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="task-table-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading tasks...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="task-table-container">
        <div className="error-container">
          <p className="error-message">{error}</p>
          <button onClick={fetchTasks} className="retry-button">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="task-table-container">
      <div className="table-header">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button className="search-button">🔍</button>
        </div>
        <div>
          <button className="filters-button">🔽 Filters</button>
          <button className="create-task-btn" onClick={() => setIsCreateModalOpen(true)}>+ Create Task</button>
        </div>
      </div>
      
      <table className="task-table">
        <thead>
          <tr>
            <th><input type="checkbox" /></th>
            <th>#</th>
            <th>Title <span className="sort-arrow">↕</span></th>
            <th>Description</th>
            <th>Assignee(s)</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td><input type="checkbox" /></td>
              <td>
                <div className="action-buttons">
                  <button className="action-btn edit-btn" onClick={() => handleEdit(task.id)}>Edit</button>
                  <button className="action-btn view-btn" onClick={() => handleView(task.id)}>View</button>
                  <button className="action-btn delete-btn" onClick={() => handleDelete(task.id)}>Delete</button>
                </div>
                <div className="task-number">{task.number}</div>
              </td>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.assignee}</td>
              <td>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}</td>
              <td>
                <span className={`status-badge ${task.status.toLowerCase().replace('_', '-')}`}>
                  {task.status.replace('_', ' ')}
                  </span>
              </td>
              <td>
                <span className="lock-icon">🔒</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="table-footer">
        <span>{tasks.length} of {totalTasks}</span>
        <div className="pagination">
          <span>Page:</span>
          <select value={currentPage} onChange={(e) => setCurrentPage(parseInt(e.target.value))}>
            <option value={1}>1</option>
          </select>
          <button disabled={currentPage === 1}>‹</button>
          <button disabled={currentPage === 1}>›</button>
        </div>
      </div>

      {isEditModalOpen && (
        <EditTaskModal
          task={editingTask}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleUpdateTask}
        />
      )}

      {isViewModalOpen && (
        <ViewTaskModal
          task={viewingTask}
          onClose={() => setIsViewModalOpen(false)}
        />
      )}
      
      {isCreateModalOpen && (
        <CreateTaskModal
          onClose={() => setIsCreateModalOpen(false)}
          onSave={handleCreateTask}
        />
      )}
    </div>
  );
};

export default TaskTable;