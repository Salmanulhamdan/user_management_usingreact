import React from 'react';
import backgroundImage from '../assets/bgimg1.jpg';
import './LandingPage.css'; // Create this CSS file to add custom styling

export const LandingPage = () => {
  return (
    <div className="landing-container">
      <div className="bg-cover bg-center min-h-screen d-flex justify-content-center align-items-center">
        <div className="text-center">
          <h1 className="display-4">Welcome to Auth System</h1>
          <p className="lead">This is an incredible authentication system with production level features</p>
          {/* Content below the header */}
        </div>
      </div>
      {/* Footer */}
    </div>
  );
};
