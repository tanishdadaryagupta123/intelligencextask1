import React from 'react';
import TaskItem from './TaskItem';
import './TaskList.css';

const TaskList = ({ tasks, loading, error, onEdit, onDelete, onToggleStatus }) => {
  if (loading) {
    return <div className="task-list-message loading">Loading tasks...</div>;
  }

  if (error) {
    return <div className="task-list-message error">{error}</div>;
  }

  if (tasks.length === 0) {
    return (
      <div className="task-list-message empty">
        <p>No tasks found!</p>
        <p>Add your first task using the form above.</p>
      </div>
    );
  }

  // Separate pending and completed tasks
  const pendingTasks = tasks.filter(task => task.status === 'pending');
  const completedTasks = tasks.filter(task => task.status === 'completed');

  return (
    <div className="task-list">
      {pendingTasks.length > 0 && (
        <div className="task-section">
          <h3 className="section-title">
            📋 Pending Tasks ({pendingTasks.length})
          </h3>
          {pendingTasks.map(task => (
            <TaskItem
              key={task._id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleStatus={onToggleStatus}
            />
          ))}
        </div>
      )}

      {completedTasks.length > 0 && (
        <div className="task-section">
          <h3 className="section-title">
            ✅ Completed Tasks ({completedTasks.length})
          </h3>
          {completedTasks.map(task => (
            <TaskItem
              key={task._id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleStatus={onToggleStatus}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
