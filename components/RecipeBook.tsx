
import React, { useState } from 'react';
import { Recipe } from '../types';
import { INITIAL_RECIPES, CustomIcons } from '../constants';

interface RecipeBookProps {
  preferences: string[];
}

const RecipeBook: React.FC<RecipeBookProps> = ({ preferences }) => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-white">Culinary Bio-Fuel</h1>
        <p className="text-slate-400">Personalized recipes optimized for your performance goals.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {INITIAL_RECIPES.map((recipe) => (
          <div 
            key={recipe.id}
            onClick={() => setSelectedRecipe(recipe)}
            className="glass rounded-2xl overflow-hidden cursor-pointer group hover:scale-[1.02] transition-all duration-300"
          >
            <div className="h-48 overflow-hidden relative">
              <img src={recipe.image} alt={recipe.name} className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500" />
              <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-xs font-bold text-emerald-400">
                {recipe.calories} kcal
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{recipe.name}</h3>
              <p className="text-slate-400 text-sm line-clamp-2">{recipe.description}</p>
              
              <div className="flex gap-4 mt-4 text-xs font-medium uppercase tracking-wider text-slate-500">
                <span>P: {recipe.protein}g</span>
                <span>C: {recipe.carbs}g</span>
                <span>F: {recipe.fats}g</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recipe Detail Modal */}
      {selectedRecipe && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="glass w-full max-w-2xl rounded-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="h-64 relative">
              <img src={selectedRecipe.image} className="w-full h-full object-cover" />
              <button 
                onClick={() => setSelectedRecipe(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white"
              >
                ✕
              </button>
            </div>
            <div className="p-8 space-y-6">
              <div>
                <h2 className="text-3xl font-bold">{selectedRecipe.name}</h2>
                <div className="flex gap-6 mt-4">
                   <div className="text-center">
                     <p className="text-2xl font-bold text-emerald-400">{selectedRecipe.calories}</p>
                     <p className="text-xs text-slate-500 uppercase">Calories</p>
                   </div>
                   <div className="text-center">
                     <p className="text-2xl font-bold text-emerald-400">{selectedRecipe.protein}g</p>
                     <p className="text-xs text-slate-500 uppercase">Protein</p>
                   </div>
                   <div className="text-center">
                     <p className="text-2xl font-bold text-emerald-400">{selectedRecipe.carbs}g</p>
                     <p className="text-xs text-slate-500 uppercase">Carbs</p>
                   </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-bold mb-3 flex items-center gap-2">
                  <span className="w-4 h-0.5 bg-emerald-500"></span>
                  Ingredients
                </h4>
                <ul className="grid grid-cols-2 gap-2 text-slate-300">
                  {selectedRecipe.ingredients.map((ing, i) => (
                    <li key={i} className="flex items-center gap-2">
                       <span className="w-1.5 h-1.5 bg-slate-700 rounded-full"></span>
                       {ing}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-bold mb-3 flex items-center gap-2">
                  <span className="w-4 h-0.5 bg-emerald-500"></span>
                  Preparation
                </h4>
                <ol className="space-y-3 text-slate-300">
                  {selectedRecipe.instructions.map((step, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="text-emerald-500 font-bold">{i + 1}.</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeBook;
