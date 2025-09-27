// components/IngredientInput.js
import React, { useState } from 'react';

const IngredientInput = ({ 
  ingredients, 
  addIngredient, 
  removeIngredient, 
  clearIngredients, 
  findRecipes 
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      addIngredient(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="ingredient-input">
      <form onSubmit={handleSubmit} className="ingredient-form">
        <div className="input-group">
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter an ingredient (e.g., chicken, tomato, pasta...)"
            className="ingredient-field"
          />
          <button type="submit" className="add-btn">Add</button>
        </div>
      </form>
      
      {ingredients.length > 0 && (
        <div className="ingredients-list">
          <div className="ingredients-header">
            <h3>Your Ingredients ({ingredients.length})</h3>
            <button onClick={clearIngredients} className="clear-btn">Clear All</button>
          </div>
          
          <div className="ingredients-tags">
            {ingredients.map((ingredient, index) => (
              <span key={index} className="ingredient-tag">
                {ingredient}
                <button 
                  onClick={() => removeIngredient(ingredient)}
                  className="remove-tag"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          
          <button onClick={findRecipes} className="find-recipes-btn">
            Find Recipes
          </button>
        </div>
      )}
    </div>
  );
};

export default IngredientInput;