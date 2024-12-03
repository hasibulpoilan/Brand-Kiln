import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskDashboard from './pages/TaskDashboard';

function App() {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<TaskDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
