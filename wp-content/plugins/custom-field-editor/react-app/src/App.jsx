import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header/Header';
import ExtraPanel from './components/ExtraPanel/ExtraPanel';

const App = () => {
  const [pages, setPages] = useState([
        { name: 'Группы полей', url: '/' }
  ]);

  const handleAddPage = () => {
    const exists = pages.some(p => p.url === '/cfe-settings-group');
    if (!exists) {
      setPages([...pages, { name: 'Настройки группы', url: '/cfe-settings-group' }]);
    }
  };

  return (
    <Router>
      <Header pages={pages} handleAddPage={handleAddPage} />

      <Routes>
        <Route path="/" element={<div></div>} />
        <Route path="/cfe-settings-group" element={<div></div>} />
      </Routes>

      <ExtraPanel onAddPage={handleAddPage} />
    </Router>
  );
};

export default App;
