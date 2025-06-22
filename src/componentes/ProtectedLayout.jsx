import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const ProtectedLayout = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ marginLeft: '220px', padding: '20px', width: '100%' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default ProtectedLayout;
