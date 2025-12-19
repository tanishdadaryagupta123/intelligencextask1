import React, { useState, useEffect } from 'react';
import { taskAPI } from '../services/api';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import './Dashboard.css';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Fetch all tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await taskAPI.getAll();
      setTasks(response.data.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  // Create a new task
  const handleCreateTask = async (taskData) => {
    const response = await taskAPI.create(taskData);
    setTasks([response.data.data, ...tasks]);
    setShowForm(false);
  };

  // Update an existing task
  const handleUpdateTask = async (taskData) => {
    const response = await taskAPI.update(editingTask._id, taskData);
    setTasks(tasks.map(task => 
      task._id === editingTask._id ? response.data.data : task
    ));
    setEditingTask(null);
  };

  // Delete a task
  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskAPI.delete(taskId);
        setTasks(tasks.filter(task => task._id !== taskId));
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete task');
      }
    }
  };

  // Toggle task status between pending and completed
  const handleToggleStatus = async (task) => {
    try {
      const newStatus = task.status === 'pending' ? 'completed' : 'pending';
      const response = await taskAPI.update(task._id, { status: newStatus });
      setTasks(tasks.map(t => 
        t._id === task._id ? response.data.data : t
      ));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update task status');
    }
  };

  // Handle edit button click
  const handleEditClick = (task) => {
    setEditingTask(task);
    setShowForm(false);
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>My Tasks</h1>
        <button 
          className="btn btn-primary"
          onClick={() => {
            setShowForm(!showForm);
            setEditingTask(null);
          }}
        >
          {showForm ? '✕ Close' : '+ Add Task'}
        </button>
      </div>

      {/* Add Task Form */}
      {showForm && !editingTask && (
        <div className="form-container">
          <TaskForm onSubmit={handleCreateTask} />
        </div>
      )}

      {/* Edit Task Form */}
      {editingTask && (
        <div className="form-container">
          <TaskForm 
            onSubmit={handleUpdateTask} 
            initialData={editingTask}
            onCancel={handleCancelEdit}
          />
        </div>
      )}

      {/* Task Statistics */}
      {!loading && tasks.length > 0 && (
        <div className="task-stats">
          <div className="stat">
            <span className="stat-number">{tasks.length}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="stat">
            <span className="stat-number pending">
              {tasks.filter(t => t.status === 'pending').length}
            </span>
            <span className="stat-label">Pending</span>
          </div>
          <div className="stat">
            <span className="stat-number completed">
              {tasks.filter(t => t.status === 'completed').length}
            </span>
            <span className="stat-label">Completed</span>
          </div>
        </div>
      )}

      {/* Task List */}
      <TaskList 
        tasks={tasks}
        loading={loading}
        error={error}
        onEdit={handleEditClick}
        onDelete={handleDeleteTask}
        onToggleStatus={handleToggleStatus}
      />
    </div>
  );
};

export default Dashboard;
