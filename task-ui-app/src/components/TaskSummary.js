import React, { useMemo } from 'react';
import './TaskSummary.css';

const TaskSummary = ({ tasks }) => {
  const summary = useMemo(() => {
    const total = tasks.length;
    const inProgress = tasks.filter(t => t.status === 'IN_PROGRESS').length;
    const completed = tasks.filter(t => t.status === 'COMPLETED').length;
    const initiated = tasks.filter(t => t.status === 'INITIATED').length;
    return { total, inProgress, completed, initiated };
  }, [tasks]);

  return (
    <div className="summary-container">
      <div className="summary-card">
        <h3>Total Tasks</h3>
        <p>{summary.total}</p>
      </div>
      <div className="summary-card">
        <h3>In Progress</h3>
        <p>{summary.inProgress}</p>
      </div>
      <div className="summary-card">
        <h3>Completed</h3>
        <p>{summary.completed}</p>
      </div>
      <div className="summary-card">
        <h3>Initiated</h3>
        <p>{summary.initiated}</p>
      </div>
    </div>
  );
};

export default TaskSummary;