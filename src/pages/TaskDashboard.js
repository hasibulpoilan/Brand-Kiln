import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, setFilter } from '../store/slices/tasksSlice';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import { Button, Stack } from '@mui/material';

const TaskDashboard = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const filter = useSelector((state) => state.tasks.filter);

  const [showForm, setShowForm] = useState(false);

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    if (filter === 'overdue') return new Date(task.dueDate) < new Date();
    return true; 
  });

  const handleAddTask = (taskData) => {
    const newTask = {
      id: Date.now(), 
      ...taskData,
      completed: false,
    };
    dispatch(addTask(newTask));
    setShowForm(false);
  };

  return (
    <div>
      <h1>Task Management Dashboard for Brand Kiln</h1>
      <Stack direction="row" spacing={1}>
        <Button onClick={() => dispatch(setFilter('all'))}>All</Button>
        <Button onClick={() => dispatch(setFilter('completed'))}>Completed</Button>
        <Button onClick={() => dispatch(setFilter('pending'))}>Pending</Button>
        <Button onClick={() => dispatch(setFilter('overdue'))}>Overdue</Button>
      </Stack>
      <Button variant="contained" onClick={() => setShowForm(!showForm)} sx={{ margin: '10px 0' }}>
        {showForm ? 'Hide Form' : 'Add Task'}
      </Button>
      {showForm && <TaskForm onSubmit={handleAddTask} />}
      <TaskList tasks={filteredTasks} />
    </div>
  );
};

export default TaskDashboard;
