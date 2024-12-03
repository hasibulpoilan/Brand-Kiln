import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../store/slices/tasksSlice';
import { ButtonGroup, Button } from '@mui/material';

const TaskFilter = () => {
  const dispatch = useDispatch();
  const activeFilter = useSelector((state) => state.tasks.filter);

  const filters = ['all', 'completed', 'pending', 'overdue'];

  return (
    <ButtonGroup variant="outlined" aria-label="task filters" sx={{ marginBottom: 2 }}>
      {filters.map((filter) => (
        <Button
          key={filter}
          onClick={() => dispatch(setFilter(filter))}
          variant={filter === activeFilter ? 'contained' : 'outlined'}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default TaskFilter;
