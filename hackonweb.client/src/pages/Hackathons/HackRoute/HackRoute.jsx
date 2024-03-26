import React from 'react';
import { Outlet } from 'react-router-dom'
import HackNavigationBar from '../../../components/HackNavigationBar';
function HackRoute() {
  return (
      <div>
          <HackNavigationBar/>
          <Outlet />
      </div>
  );
}

export default HackRoute;