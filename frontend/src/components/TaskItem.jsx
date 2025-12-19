import React from 'react';
import './TaskItem.css';

const TaskItem = ({ task, onEdit, onDelete, onToggleStatus }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`task-item ${task.status === 'completed' ? 'completed' : ''}`}>
      <div className="task-content">
        <div className="task-header">
          <h4 className="task-title">{task.title}</h4>
          <span className={`task-status status-${task.status}`}>
            {task.status}
          </span>
        </div>
        
        {task.description && (
          <p className="task-description">{task.description}</p>
        )}
        
        <span className="task-date">
          Created: {formatDate(task.createdAt)}
        </span>
      </div>

      <div className="task-actions">
        <button
          className={`btn btn-toggle ${task.status === 'completed' ? 'btn-undo' : 'btn-complete'}`}
          onClick={() => onToggleStatus(task)}
          title={task.status === 'completed' ? 'Mark as Pending' : 'Mark as Completed'}
        >
          {task.status === 'completed' ? '↩️ Undo' : '✓ Complete'}
        </button>
        <button
          className="btn btn-edit"
          onClick={() => onEdit(task)}
          title="Edit Task"
        >
          ✏️ Edit
        </button>
        <button
          className="btn btn-delete"
          onClick={() => onDelete(task._id)}
          title="Delete Task"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
