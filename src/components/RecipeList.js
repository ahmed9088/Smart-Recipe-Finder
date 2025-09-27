// components/RecipeList.js
import React from 'react';
import RecipeCard from './RecipeCard';

const RecipeList = ({ recipes, setSelectedRecipe, savedRecipes, toggleSaveRecipe, getRandomRecipe }) => {
  return (
    <section className="recipe-list">
      <div className="container">
        <div className="recipe-list-header">
          <h2>Recipe Suggestions</h2>
          
          <div className="recipe-actions">
            <button onClick={getRandomRecipe} className="surprise-btn">
              <span className="icon">🎲</span> Surprise Me!
            </button>
          </div>
        </div>
        
        {recipes.length === 0 ? (
          <div className="no-recipes">
            <p>Add some ingredients to find recipes you can make!</p>
            <div className="suggestion">
              <p>Try adding common ingredients like:</p>
              <ul>
                <li>Chicken, pasta, tomato</li>
                <li>Eggs, cheese, milk</li>
                <li>Rice, vegetables, soy sauce</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="recipes-grid">
            {recipes.map(recipe => (
              <RecipeCard 
                key={recipe.id}
                recipe={recipe}
                onClick={() => setSelectedRecipe(recipe)}
                isSaved={savedRecipes.some(r => r.id === recipe.id)}
                onToggleSave={() => toggleSaveRecipe(recipe)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default RecipeList;