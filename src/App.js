// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import FridgeScanner from './components/FridgeScanner';
import RecipeList from './components/RecipeList';
import RecipeModal from './components/RecipeModal';

// Global recipe collection with Indian, Pakistani, Chinese, and other cuisines
const globalRecipes = [
  // Indian Recipes
  {
    id: 1,
    title: "Butter Chicken",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400",
    cookingTime: 45,
    difficulty: "Medium",
    cuisine: "Indian",
    ingredients: ["chicken", "tomato", "butter", "cream", "garlic", "ginger", "garam masala", "turmeric"],
    instructions: [
      "Marinate chicken in yogurt and spices for 30 minutes",
      "Grill or pan-fry chicken pieces until cooked through",
      "Prepare tomato-based gravy with onions, garlic, and ginger",
      "Add grilled chicken to the gravy and simmer",
      "Finish with cream, butter, and kasuri methi"
    ],
    nutrition: { calories: 385, protein: "28g", carbs: "12g", fat: "24g" }
  },
  {
    id: 2,
    title: "Chicken Biryani",
    image: "https://images.unsplash.com/photo-1589302168068-9646647a2f2b?w=400",
    cookingTime: 90,
    difficulty: "Hard",
    cuisine: "Indian",
    ingredients: ["basmati rice", "chicken", "yogurt", "onion", "tomato", "ginger", "garlic", "biryani spices"],
    instructions: [
      "Marinate chicken in yogurt and spices for 1 hour",
      "Partially cook basmati rice with whole spices",
      "Fry onions until golden brown",
      "Layer rice and marinated chicken in a heavy pot",
      "Seal pot and cook on low heat (dum) for 30 minutes"
    ],
    nutrition: { calories: 520, protein: "32g", carbs: "68g", fat: "16g" }
  },
  {
    id: 3,
    title: "Palak Paneer",
    image: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400",
    cookingTime: 40,
    difficulty: "Medium",
    cuisine: "Indian",
    ingredients: ["spinach", "paneer", "tomato", "onion", "ginger", "garlic", "green chili", "garam masala"],
    instructions: [
      "Blanch spinach and blend into a puree",
      "Fry paneer cubes until golden and set aside",
      "Prepare tomato-onion gravy with spices",
      "Add spinach puree and simmer",
      "Add paneer and cream, cook for 5 minutes"
    ],
    nutrition: { calories: 280, protein: "18g", carbs: "12g", fat: "18g" }
  },
  
  // Pakistani Recipes
  {
    id: 4,
    title: "Nihari",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400",
    cookingTime: 180,
    difficulty: "Hard",
    cuisine: "Pakistani",
    ingredients: ["beef shank", "flour", "ghee", "onion", "ginger", "garlic", "nihari masala", "lemon"],
    instructions: [
      "Brown beef shank in ghee with onions",
      "Add ginger, garlic, and spices",
      "Simmer on low heat for 3-4 hours until meat is tender",
      "Prepare flour slurry and add to thicken gravy",
      "Garnish with ginger, green chilies, and lemon"
    ],
    nutrition: { calories: 450, protein: "35g", carbs: "15g", fat: "28g" }
  },
  {
    id: 5,
    title: "Haleem",
    image: "https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=400",
    cookingTime: 240,
    difficulty: "Hard",
    cuisine: "Pakistani",
    ingredients: ["wheat", "barley", "lentils", "meat", "onion", "ginger", "garlic", "haleem masala"],
    instructions: [
      "Soak wheat, barley, and lentils overnight",
      "Cook meat with spices until tender",
      "Add grains and lentils to meat and cook until mushy",
      "Blend partially for a thick consistency",
      "Fry onions in ghee and garnish with lemon and cilantro"
    ],
    nutrition: { calories: 380, protein: "28g", carbs: "45g", fat: "12g" }
  },
  {
    id: 6,
    title: "Chicken Karahi",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400",
    cookingTime: 40,
    difficulty: "Medium",
    cuisine: "Pakistani",
    ingredients: ["chicken", "tomato", "ginger", "garlic", "green chili", "coriander", "karahi masala"],
    instructions: [
      "Heat oil in a karahi or wok",
      "Add chicken and cook until browned",
      "Add tomatoes, ginger, garlic, and spices",
      "Cook on high heat until oil separates",
      "Garnish with ginger, green chilies, and coriander"
    ],
    nutrition: { calories: 320, protein: "32g", carbs: "10g", fat: "18g" }
  },
  
  // Chinese Recipes
  {
    id: 7,
    title: "Kung Pao Chicken",
    image: "https://images.unsplash.com/photo-1525756119105-7073a9e0c956?w=400",
    cookingTime: 25,
    difficulty: "Medium",
    cuisine: "Chinese",
    ingredients: ["chicken", "peanuts", "dried chili", "sichuan pepper", "soy sauce", "vinegar", "ginger", "garlic"],
    instructions: [
      "Marinate chicken in soy sauce and cornstarch",
      "Heat oil and stir-fry chicken until cooked",
      "Add dried chilies and Sichuan peppers",
      "Add sauce mixture and vegetables",
      "Finish with peanuts and green onions"
    ],
    nutrition: { calories: 350, protein: "28g", carbs: "15g", fat: "20g" }
  },
  {
    id: 8,
    title: "Mapo Tofu",
    image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400",
    cookingTime: 20,
    difficulty: "Medium",
    cuisine: "Chinese",
    ingredients: ["tofu", "ground pork", "doubanjiang", "fermented black beans", "garlic", "ginger", "green onion"],
    instructions: [
      "Cut tofu into cubes and blanch in salted water",
      "Brown ground pork in a wok",
      "Add doubanjiang and black beans",
      "Add tofu and sauce mixture",
      "Simmer and garnish with green onions and Sichuan pepper"
    ],
    nutrition: { calories: 280, protein: "18g", carbs: "12g", fat: "18g" }
  },
  {
    id: 9,
    title: "Fried Rice",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400",
    cookingTime: 15,
    difficulty: "Easy",
    cuisine: "Chinese",
    ingredients: ["rice", "egg", "soy sauce", "vegetables", "green onion", "sesame oil"],
    instructions: [
      "Heat oil in a wok or large pan",
      "Scramble eggs and set aside",
      "Add vegetables and stir-fry",
      "Add cold rice and break up clumps",
      "Add soy sauce, sesame oil, and eggs"
    ],
    nutrition: { calories: 320, protein: "12g", carbs: "55g", fat: "8g" }
  },
  
  // Middle Eastern Recipes
  {
    id: 10,
    title: "Chicken Shawarma",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400",
    cookingTime: 60,
    difficulty: "Medium",
    cuisine: "Middle Eastern",
    ingredients: ["chicken", "yogurt", "lemon", "garlic", "shawarma spices", "pita", "tahini"],
    instructions: [
      "Marinate chicken in yogurt, lemon, garlic and spices",
      "Grill or roast chicken until cooked through",
      "Slice chicken thinly",
      "Warm pita bread",
      "Assemble with chicken, vegetables, and tahini sauce"
    ],
    nutrition: { calories: 420, protein: "28g", carbs: "38g", fat: "18g" }
  },
  
  // Italian Recipes
  {
    id: 11,
    title: "Spaghetti Carbonara",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400",
    cookingTime: 20,
    difficulty: "Medium",
    cuisine: "Italian",
    ingredients: ["spaghetti", "eggs", "pancetta", "parmesan", "black pepper", "garlic"],
    instructions: [
      "Cook spaghetti al dente",
      "Fry pancetta until crispy",
      "Whisk eggs and grated parmesan",
      "Toss hot pasta with pancetta and fat",
      "Add egg mixture off heat, toss quickly to create creamy sauce"
    ],
    nutrition: { calories: 480, protein: "22g", carbs: "58g", fat: "20g" }
  },
  
  // Mexican Recipes
  {
    id: 12,
    title: "Chicken Tacos",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400",
    cookingTime: 30,
    difficulty: "Easy",
    cuisine: "Mexican",
    ingredients: ["chicken", "taco shells", "avocado", "lime", "cilantro", "onion", "jalapeno", "cumin"],
    instructions: [
      "Season chicken with cumin, paprika, and garlic",
      "Grill or pan-fry chicken until cooked",
      "Warm taco shells",
      "Slice chicken and place in shells",
      "Top with avocado, onion, cilantro, and salsa"
    ],
    nutrition: { calories: 320, protein: "24g", carbs: "28g", fat: "14g" }
  },
  
  // Thai Recipes
  {
    id: 13,
    title: "Pad Thai",
    image: "https://images.unsplash.com/photo-1559181567-c3191ca3f532?w=400",
    cookingTime: 25,
    difficulty: "Medium",
    cuisine: "Thai",
    ingredients: ["rice noodles", "shrimp", "tofu", "bean sprouts", "peanuts", "tamarind", "fish sauce"],
    instructions: [
      "Soak rice noodles until soft",
      "Prepare sauce with tamarind, fish sauce, and palm sugar",
      "Stir-fry shrimp and tofu",
      "Add noodles and sauce, toss together",
      "Add bean sprouts, peanuts, and lime"
    ],
    nutrition: { calories: 380, protein: "18g", carbs: "58g", fat: "12g" }
  },
  
  // Japanese Recipes
  {
    id: 14,
    title: "Chicken Teriyaki",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400",
    cookingTime: 25,
    difficulty: "Easy",
    cuisine: "Japanese",
    ingredients: ["chicken", "soy sauce", "mirin", "sake", "sugar", "ginger", "sesame seeds"],
    instructions: [
      "Mix soy sauce, mirin, sake, and sugar for teriyaki sauce",
      "Brown chicken in a pan",
      "Add sauce and simmer until chicken is cooked",
      "Reduce sauce until thick and glossy",
      "Garnish with sesame seeds and green onions"
    ],
    nutrition: { calories: 320, protein: "28g", carbs: "18g", fat: "14g" }
  },
  
  // Korean Recipes
  {
    id: 15,
    title: "Bibimbap",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400",
    cookingTime: 40,
    difficulty: "Medium",
    cuisine: "Korean",
    ingredients: ["rice", "beef", "spinach", "bean sprouts", "carrot", "zucchini", "egg", "gochujang"],
    instructions: [
      "Cook rice and prepare vegetables",
      "Marinate and cook beef",
      "Fry vegetables separately",
      "Fry egg sunny-side up",
      "Arrange rice, vegetables, beef, and egg in bowl, serve with gochujang"
    ],
    nutrition: { calories: 520, protein: "28g", carbs: "68g", fat: "18g" }
  }
];

// Expanded common ingredients for global cuisines
const commonIngredients = [
  // Indian/Pakistani
  "garam masala", "turmeric", "cumin", "coriander", "cardamom", "cinnamon", "cloves",
  "paneer", "lentils", "chickpeas", "basmati rice", "ghee", "mustard oil",
  
  // Chinese
  "soy sauce", "rice vinegar", "sesame oil", "oyster sauce", "hoisin sauce", "tofu",
  "rice noodles", "dried chili", "sichuan pepper", "five spice powder",
  
  // Middle Eastern
  "tahini", "hummus", "pita", "falafel", "za'atar", "sumac", "pomegranate molasses",
  
  // European
  "parmesan", "mozzarella", "olive oil", "balsamic vinegar", "basil", "rosemary",
  "thyme", "pancetta", "prosciutto",
  
  // Mexican
  "avocado", "jalapeno", "cilantro", "lime", "tortilla", "black beans", "corn",
  "chipotle", "cumin", "paprika",
  
  // Japanese
  "miso", "wasabi", "nori", "mirin", "sake", "rice vinegar", "sesame seeds",
  "bonito flakes", "daikon",
  
  // Korean
  "gochujang", "kimchi", "doenjang", "soybean paste", "gochugaru", "rice cakes",
  
  // Thai
  "fish sauce", "tamarind", "palm sugar", "galangal", "lemongrass", "kaffir lime",
  "coconut milk", "thai basil",
  
  // Common ingredients
  "tomato", "onion", "garlic", "ginger", "chicken", "beef", "pork", "shrimp",
  "egg", "potato", "carrot", "bell pepper", "mushroom", "spinach", "lettuce",
  "cucumber", "zucchini", "eggplant", "cauliflower", "broccoli", "cabbage",
  "flour", "sugar", "salt", "pepper", "butter", "olive oil", "vegetable oil",
  "lemon", "lime", "yogurt", "cream", "cheese", "milk", "honey"
];

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cuisineFilter, setCuisineFilter] = useState('All');
  const [sortBy, setSortBy] = useState('match');

  // Initialize with saved recipes from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('savedRecipes');
    if (saved) {
      setSavedRecipes(JSON.parse(saved));
    }
  }, []);

  // Save recipes to localStorage when updated
  useEffect(() => {
    localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
  }, [savedRecipes]);

  // Filter recipes based on available ingredients and cuisine
  const findRecipes = () => {
    if (ingredients.length === 0) {
      setRecipes([]);
      return;
    }

    let matchedRecipes = globalRecipes.map(recipe => {
      const recipeIngredients = recipe.ingredients.map(ing => ing.toLowerCase());
      const availableIngredients = ingredients.map(ing => ing.toLowerCase());
      
      // Calculate match percentage
      const matchingIngredients = recipeIngredients.filter(ing => 
        availableIngredients.some(available => 
          available.includes(ing) || ing.includes(available)
        )
      );
      
      const matchPercentage = Math.round((matchingIngredients.length / recipeIngredients.length) * 100);
      
      // Identify missing ingredients
      const missingIngredients = recipeIngredients.filter(ing => 
        !availableIngredients.some(available => 
          available.includes(ing) || ing.includes(available)
        )
      );
      
      return {
        ...recipe,
        matchPercentage,
        missingIngredients
      };
    }).filter(recipe => recipe.matchPercentage > 0);
    
    // Apply cuisine filter
    if (cuisineFilter !== 'All') {
      matchedRecipes = matchedRecipes.filter(recipe => recipe.cuisine === cuisineFilter);
    }
    
    // Apply sorting
    matchedRecipes.sort((a, b) => {
      if (sortBy === 'match') {
        return b.matchPercentage - a.matchPercentage;
      } else if (sortBy === 'time') {
        return a.cookingTime - b.cookingTime;
      } else if (sortBy === 'difficulty') {
        const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
        return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
      }
      return 0;
    });
    
    setRecipes(matchedRecipes);
  };

  // Add ingredient
  const addIngredient = (ingredient) => {
    if (ingredient.trim() && !ingredients.includes(ingredient.trim().toLowerCase())) {
      setIngredients([...ingredients, ingredient.trim().toLowerCase()]);
    }
  };

  // Remove ingredient
  const removeIngredient = (ingredientToRemove) => {
    setIngredients(ingredients.filter(ing => ing !== ingredientToRemove));
  };

  // Clear all ingredients
  const clearIngredients = () => {
    setIngredients([]);
    setRecipes([]);
  };

  // Save/unsave recipe
  const toggleSaveRecipe = (recipe) => {
    if (savedRecipes.some(r => r.id === recipe.id)) {
      setSavedRecipes(savedRecipes.filter(r => r.id !== recipe.id));
    } else {
      setSavedRecipes([...savedRecipes, recipe]);
    }
  };

  // Get random recipe
  const getRandomRecipe = () => {
    const randomIndex = Math.floor(Math.random() * globalRecipes.length);
    setSelectedRecipe(globalRecipes[randomIndex]);
  };

  // Get all unique cuisines
  const cuisines = ['All', ...new Set(globalRecipes.map(recipe => recipe.cuisine))];

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <Header 
        darkMode={darkMode} 
        setDarkMode={setDarkMode}
        savedRecipesCount={savedRecipes.length}
      />
      
      <main className="main-content">
        <div className="app-controls">
          <div className="filter-controls">
            <div className="cuisine-filter">
              <label htmlFor="cuisine-select">Cuisine:</label>
              <select 
                id="cuisine-select" 
                value={cuisineFilter} 
                onChange={(e) => setCuisineFilter(e.target.value)}
              >
                {cuisines.map(cuisine => (
                  <option key={cuisine} value={cuisine}>{cuisine}</option>
                ))}
              </select>
            </div>
            
            <div className="sort-controls">
              <label htmlFor="sort-select">Sort by:</label>
              <select 
                id="sort-select" 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="match">Best Match</option>
                <option value="time">Cooking Time</option>
                <option value="difficulty">Difficulty</option>
              </select>
            </div>
          </div>
        </div>
        
        <FridgeScanner 
          ingredients={ingredients}
          addIngredient={addIngredient}
          removeIngredient={removeIngredient}
          clearIngredients={clearIngredients}
          findRecipes={findRecipes}
          commonIngredients={commonIngredients}
        />
        
        <RecipeList 
          recipes={recipes}
          setSelectedRecipe={setSelectedRecipe}
          savedRecipes={savedRecipes}
          toggleSaveRecipe={toggleSaveRecipe}
          getRandomRecipe={getRandomRecipe}
        />
      </main>
      
      {selectedRecipe && (
        <RecipeModal 
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
          isSaved={savedRecipes.some(r => r.id === selectedRecipe.id)}
          onToggleSave={() => toggleSaveRecipe(selectedRecipe)}
        />
      )}
    </div>
  );
}

export default App;