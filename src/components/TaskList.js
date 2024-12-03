import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask, setSearchQuery, updateTask, toggleTaskCompleted } from '../store/slices/tasksSlice';
import {
  Stack,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  TextField,
} from '@mui/material';
import { useSpring, animated } from 'react-spring';
import { Box } from '@mui/material';

const AnimatedCard = animated(Card);

const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks, filter, searchQuery } = useSelector((state) => state.tasks);

  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState({ title: '', description: '', dueDate: '' });

  const handleOpenDelete = (taskId) => {
    setSelectedTaskId(taskId);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setSelectedTaskId(null);
  };

  const handleDelete = () => {
    if (selectedTaskId !== null) {
      dispatch(deleteTask(selectedTaskId));
    }
    handleCloseDelete();
  };

  const handleOpenEdit = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setEditedTask({
      title: taskToEdit.title,
      description: taskToEdit.description,
      dueDate: taskToEdit.dueDate,
    });
    setSelectedTaskId(taskId);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setSelectedTaskId(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = () => {
    if (selectedTaskId !== null) {
      dispatch(updateTask({ id: selectedTaskId, ...editedTask }));
    }
    handleCloseEdit();
  };

  const handleSearchChange = (event) => {
    dispatch(setSearchQuery(event.target.value));
  };

  const handleToggleCompleted = (taskId) => {
    dispatch(toggleTaskCompleted(taskId));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed' && !task.completed) return false;
    if (filter === 'pending' && task.completed) return false;
    if (filter === 'overdue' && new Date(task.dueDate) >= new Date()) return false;
    if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const springProps = useSpring({ opacity: 1, from: { opacity: 0 } });

  return (
    <>
      <TextField
        label="Search Tasks"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearchChange}
        sx={{ mb: 2 }}
      />

      <Stack spacing={2}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {filteredTasks.map((task) => (
            <AnimatedCard key={task.id} style={springProps}>
              <Card sx={{ backgroundColor: task.completed ? '#e0f7fa' : '#fff' }}>
                <CardContent>
                  <Typography variant="h5">{task.title}</Typography>
                  <Typography variant="body2">{task.description}</Typography>
                  <Typography
                    variant="body2"
                    color={new Date(task.dueDate) < new Date() ? 'error' : 'textSecondary'}
                  >
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleOpenEdit(task.id)}
                    sx={{ mt: 2 }}
                  >
                    Edit Task
                  </Button>
                  <Button
                    variant="outlined"
                    color={task.completed ? 'default' : 'success'}
                    onClick={() => handleToggleCompleted(task.id)}
                    sx={{ mt: 2 }}
                  >
                    {task.completed ? 'Mark as Pending' : 'Mark as Completed'}
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleOpenDelete(task.id)}
                    sx={{ mt: 2 }}
                  >
                    Delete Task
                  </Button>
                </CardContent>
              </Card>
            </AnimatedCard>
          ))}
        </Box>
      </Stack>

      <Dialog open={openEdit} onClose={handleCloseEdit}>
        <DialogTitle>Edit Task</DialogTitle>
        <CardContent>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            name="title"
            value={editedTask.title}
            onChange={handleEditChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            name="description"
            value={editedTask.description}
            onChange={handleEditChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Due Date"
            variant="outlined"
            fullWidth
            name="dueDate"
            value={editedTask.dueDate}
            onChange={handleEditChange}
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ mb: 2 }}
          />
        </CardContent>
        <DialogActions>
          <Button onClick={handleCloseEdit} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveEdit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDelete} onClose={handleCloseDelete}>
        <DialogTitle>Are you sure you want to delete this task?</DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TaskList;
