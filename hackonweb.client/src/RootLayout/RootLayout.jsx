import React from 'react';
import { Outlet } from 'react-router-dom'
import NavigationBar from '../components/NavigationBar/NavigationBar';
import './RouteLayout.css'
function RootLayout() {
  return (
      <div className="content-container rot">
          <div>
              <NavigationBar />

          </div>
          <div className="page">
              {/* Render your components based on designData */}
              <Outlet />
          </div>
          {/* <div className="footer-container">
            <Footer />
          </div> */}
      </div>
  );
}

export default RootLayout;