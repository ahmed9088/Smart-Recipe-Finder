// components/Header.js
import React from 'react';

const Header = ({ darkMode, setDarkMode, savedRecipesCount }) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <h1 className="logo">
            <span className="logo-icon">🍳</span>
            Smart Recipe Finder
          </h1>
          
          <div className="header-actions">
            <button 
              className="saved-recipes-btn"
              title="View Saved Recipes"
            >
              <span className="icon">❤️</span>
              <span className="count">{savedRecipesCount}</span>
            </button>
            
            <button 
              className="theme-toggle"
              onClick={() => setDarkMode(!darkMode)}
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;