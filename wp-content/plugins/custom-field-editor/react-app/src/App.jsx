import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';

const App = () => {
  const [pages, setPages] = useState([
    { name: 'Группы полей', url: '/wp-admin/admin.php?page=cfe-main' }
  ]);

  const handleAddPage = () => {
    const exists = pages.some(p => p.url === '/wp-admin/admin.php?page=cfe-settings-group');
    if (!exists) {
      setPages([...pages, { name: 'Настройки группы', url: '/wp-admin/admin.php?page=cfe-settings-group' }]);
    }
  };

  return (
    <Router>
      <Header pages={pages} />

      <Routes>
        <Route path="/wp-admin/admin.php?page=cfe-main" element={<div>Группы полей</div>} />
        <Route path="/wp-admin/admin.php?page=cfe-settings-group" element={<div>Настройки группы</div>} />
      </Routes>
      <div style={{ padding: '20px' }}>
        <button onClick={handleAddPage}>Добавить вкладку "Настройки группы"</button>
      </div>
    </Router>
  );
};

export default App;
