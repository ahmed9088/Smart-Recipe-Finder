// components/RecipeCard.js
import React from 'react';

const RecipeCard = ({ recipe, onClick, isSaved, onToggleSave }) => {
  const getMatchColor = (percentage) => {
    if (percentage >= 90) return '#4CAF50';
    if (percentage >= 70) return '#FF9800';
    return '#F44336';
  };

  return (
    <div className="recipe-card" onClick={onClick}>
      <div className="recipe-image">
        <img src={recipe.image} alt={recipe.title} />
        <div 
          className="match-badge"
          style={{ backgroundColor: getMatchColor(recipe.matchPercentage) }}
        >
          {recipe.matchPercentage}% Match
        </div>
        <button 
          className={`save-btn ${isSaved ? 'saved' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave();
          }}
        >
          {isSaved ? '❤️' : '🤍'}
        </button>
      </div>
      
      <div className="recipe-info">
        <h3>{recipe.title}</h3>
        
        <div className="recipe-meta">
          <span className="cooking-time">⏱️ {recipe.cookingTime} min</span>
          <span className="difficulty">📊 {recipe.difficulty}</span>
        </div>
        
        <div className="ingredient-match">
          <div className="match-bar">
            <div 
              className="match-fill" 
              style={{ 
                width: `${recipe.matchPercentage}%`,
                backgroundColor: getMatchColor(recipe.matchPercentage)
              }}
            ></div>
          </div>
          
          {recipe.missingIngredients.length > 0 && (
            <div className="missing-ingredients">
              <p>Missing: {recipe.missingIngredients.slice(0, 2).join(', ')}
                {recipe.missingIngredients.length > 2 && ` +${recipe.missingIngredients.length - 2} more`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;