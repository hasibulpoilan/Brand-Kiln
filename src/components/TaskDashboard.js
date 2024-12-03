import React from 'react';
import TaskForm from './TaskForm';
import TaskFilter from './TaskFilter';
import TaskSearch from './TaskSearch';
import TaskList from './TaskList';

const TaskDashboard = () => {
  return (
    <div>
      <TaskForm />
      <TaskSearch />
      <TaskFilter />
      <TaskList />
    </div>
  );
};

export default TaskDashboard;
