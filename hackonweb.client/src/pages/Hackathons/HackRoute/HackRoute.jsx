import React from 'react';
import { Outlet } from 'react-router-dom'
import HackNavigationBar from '../../../components/HackNavigationBar';
import './HackRoute.css'
function HackRoute() {
  return (
      <div className="content-container rot">
          <div>
              <HackNavigationBar/>

          </div>
          <div className="page1">
              {/* Render your components based on designData */}
              <Outlet />
          </div>
          {/* <div className="footer-container">
            <Footer />
          </div> */}
      </div>
  );
}

export default HackRoute;