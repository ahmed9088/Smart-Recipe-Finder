// components/FridgeScanner.js
import React, { useState, useEffect } from 'react'; // Make sure useEffect is imported
import IngredientInput from './IngredientInput';
import FridgeVisual from './FridgeVisual';

const FridgeScanner = ({ 
  ingredients, 
  addIngredient, 
  removeIngredient, 
  clearIngredients, 
  findRecipes,
  commonIngredients 
}) => {
  const [activeTab, setActiveTab] = useState('manual');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredIngredients, setFilteredIngredients] = useState([]);

  // Filter common ingredients based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredIngredients([]);
    } else {
      const filtered = commonIngredients.filter(ingredient =>
        ingredient.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredIngredients(filtered.slice(0, 8)); // Limit to 8 results
    }
  }, [searchTerm, commonIngredients]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Add ingredient from search results
  const handleAddFromSearch = (ingredient) => {
    addIngredient(ingredient);
    setSearchTerm('');
    setFilteredIngredients([]);
  };

  return (
    <section className="fridge-scanner">
      <div className="container">
        <div className="scanner-header">
          <h2>What's in your fridge?</h2>
          <div className="ingredient-count">
            <span className="count-badge">{ingredients.length}</span> ingredients
          </div>
        </div>
        
        <div className="input-tabs">
          <button 
            className={`tab ${activeTab === 'manual' ? 'active' : ''}`}
            onClick={() => setActiveTab('manual')}
          >
            <span className="tab-icon">✏️</span> Manual Input
          </button>
          <button 
            className={`tab ${activeTab === 'visual' ? 'active' : ''}`}
            onClick={() => setActiveTab('visual')}
          >
            <span className="tab-icon">👁️</span> Visual Fridge
          </button>
          <button 
            className={`tab ${activeTab === 'camera' ? 'active' : ''}`}
            onClick={() => setActiveTab('camera')}
          >
            <span className="tab-icon">📷</span> Camera Scan
          </button>
        </div>
        
        <div className="search-container">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search ingredients..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="ingredient-search"
            />
            {searchTerm && (
              <button 
                className="clear-search"
                onClick={() => {
                  setSearchTerm('');
                  setFilteredIngredients([]);
                }}
              >
                ✕
              </button>
            )}
          </div>
          
          {filteredIngredients.length > 0 && (
            <div className="search-results">
              {filteredIngredients.map((ingredient, index) => (
                <div 
                  key={index}
                  className="search-result-item"
                  onClick={() => handleAddFromSearch(ingredient)}
                >
                  {ingredient}
                </div>
              ))}
            </div>
          )}
        </div>
        
        {activeTab === 'manual' ? (
          <IngredientInput 
            ingredients={ingredients}
            addIngredient={addIngredient}
            removeIngredient={removeIngredient}
            clearIngredients={clearIngredients}
            findRecipes={findRecipes}
          />
        ) : activeTab === 'visual' ? (
          <FridgeVisual 
            ingredients={ingredients}
            addIngredient={addIngredient}
            removeIngredient={removeIngredient}
            commonIngredients={commonIngredients}
            findRecipes={findRecipes}
          />
        ) : (
          <div className="camera-scan">
            <div className="camera-placeholder">
              <div className="camera-icon">📷</div>
              <h3>Scan Your Fridge</h3>
              <p>Point your camera at ingredients to automatically detect them</p>
              <button className="scan-button">Start Scanning</button>
            </div>
          </div>
        )}
        
        <div className="quick-add-section">
          <h3>Quick Add Common Ingredients</h3>
          <div className="ingredient-pills">
            {commonIngredients.slice(0, 12).map((ingredient, index) => (
              <button
                key={index}
                className={`ingredient-pill ${ingredients.includes(ingredient) ? 'added' : ''}`}
                onClick={() => addIngredient(ingredient)}
                disabled={ingredients.includes(ingredient)}
              >
                {ingredient}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FridgeScanner;