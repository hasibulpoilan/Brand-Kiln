import React from 'react';
import { useDispatch } from 'react-redux';
import { TextField } from '@mui/material';
import { setSearchQuery } from '../store/slices/tasksSlice';

const TaskSearch = () => {
  const dispatch = useDispatch();

  const handleSearch = (event) => {
    dispatch(setSearchQuery(event.target.value));
  };

  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Search tasks by title"
      onChange={handleSearch}
      sx={{ marginBottom: 2 }}
    />
  );
};

export default TaskSearch;
