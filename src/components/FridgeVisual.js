// components/FridgeVisual.js
import React, { useState } from 'react';

const FridgeVisual = ({ 
  ingredients, 
  addIngredient, 
  removeIngredient, 
  commonIngredients,
  findRecipes 
}) => {
  const [dragItem, setDragItem] = useState(null);

  const handleDragStart = (e, ingredient) => {
    setDragItem(ingredient);
    e.dataTransfer.setData('text/plain', ingredient);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (dragItem && !ingredients.includes(dragItem)) {
      addIngredient(dragItem);
    }
    setDragItem(null);
  };

  return (
    <div className="fridge-visual">
      <div className="fridge-container">
        <div 
          className="fridge"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="fridge-door">
            <div className="fridge-handle"></div>
          </div>
          
          <div className="fridge-content">
            <h3>Your Fridge</h3>
            
            {ingredients.length === 0 ? (
              <p className="empty-fridge">Drag ingredients here or click items below</p>
            ) : (
              <div className="fridge-ingredients">
                {ingredients.map((ingredient, index) => (
                  <div 
                    key={index} 
                    className="fridge-item"
                    draggable
                    onDragStart={(e) => handleDragStart(e, ingredient)}
                    onClick={() => removeIngredient(ingredient)}
                  >
                    {ingredient}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="ingredient-palette">
          <h3>Available Ingredients</h3>
          <div className="palette-items">
            {commonIngredients.map((ingredient, index) => (
              <div 
                key={index}
                className={`palette-item ${ingredients.includes(ingredient) ? 'added' : ''}`}
                draggable
                onDragStart={(e) => handleDragStart(e, ingredient)}
                onClick={() => {
                  if (ingredients.includes(ingredient)) {
                    removeIngredient(ingredient);
                  } else {
                    addIngredient(ingredient);
                  }
                }}
              >
                {ingredient}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {ingredients.length > 0 && (
        <button onClick={findRecipes} className="find-recipes-btn visual-btn">
          Find Recipes Based on Fridge Contents
        </button>
      )}
    </div>
  );
};

export default FridgeVisual;