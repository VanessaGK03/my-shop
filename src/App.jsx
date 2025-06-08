import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import WomanPage from './pages/WomanPage';
import Admin from './pages/Admin';

const App = () => {
  return (
   <Router>
      <div className="wrapper">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/woman" element={<Woman />} />
          <Route path="/admin" element={<Admin />} />
          {/* други страници */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
