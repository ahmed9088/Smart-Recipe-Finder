// components/RecipeModal.js
import React from 'react';

const RecipeModal = ({ recipe, onClose, isSaved, onToggleSave }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal" onClick={onClose}>×</button>
        
        <div className="modal-header">
          <div className="modal-image">
            <img src={recipe.image} alt={recipe.title} />
          </div>
          
          <div className="modal-title">
            <h2>{recipe.title}</h2>
            <div className="modal-meta">
              <span>⏱️ {recipe.cookingTime} min</span>
              <span>📊 {recipe.difficulty}</span>
              <button 
                className={`save-modal-btn ${isSaved ? 'saved' : ''}`}
                onClick={onToggleSave}
              >
                {isSaved ? '❤️ Saved' : '🤍 Save Recipe'}
              </button>
            </div>
          </div>
        </div>
        
        <div className="modal-body">
          <div className="ingredients-section">
            <h3>Ingredients</h3>
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
          
          <div className="instructions-section">
            <h3>Instructions</h3>
            <ol>
              {recipe.instructions.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
          
          <div className="nutrition-section">
            <h3>Nutrition (per serving)</h3>
            <div className="nutrition-facts">
              <div className="nutrition-item">
                <span className="label">Calories</span>
                <span className="value">{recipe.nutrition.calories}</span>
              </div>
              <div className="nutrition-item">
                <span className="label">Protein</span>
                <span className="value">{recipe.nutrition.protein}</span>
              </div>
              <div className="nutrition-item">
                <span className="label">Carbs</span>
                <span className="value">{recipe.nutrition.carbs}</span>
              </div>
              <div className="nutrition-item">
                <span className="label">Fat</span>
                <span className="value">{recipe.nutrition.fat}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="print-btn">Print Recipe</button>
          <button className="share-btn">Share Recipe</button>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;