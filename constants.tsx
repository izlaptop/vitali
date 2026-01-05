
import React from 'react';

export const CustomIcons = {
  Heart: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor" />
    </svg>
  ),
  Bolt: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor" />
    </svg>
  ),
  Droplet: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0L12 2.69z" fill="currentColor" />
    </svg>
  ),
  Moon: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="currentColor" />
    </svg>
  ),
  Plus: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  ),
  Chef: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2c-4 0-7 3-7 7v1h14V9c0-4-3-7-7-7zM5 11h14v2H5v-2zm2 4v6h10v-6H7z" fill="currentColor" />
    </svg>
  ),
  Message: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  ),
  Game: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="2"></rect>
      <path d="M6 12h4M8 10v4M15 13h.01M18 11h.01"></path>
    </svg>
  ),
  Video: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
      <path d="M8 21h8M12 17v4"></path>
    </svg>
  ),
  Settings: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"></circle>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
    </svg>
  )
};

export const INITIAL_RECIPES: any[] = [
  {
    id: '1',
    name: 'Quinoa Power Bowl',
    description: 'A nutrient-dense bowl with avocado, chickpeas, and lemon-tahini dressing.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800',
    calories: 450,
    protein: 15,
    carbs: 55,
    fats: 22,
    ingredients: ['Quinoa', 'Avocado', 'Chickpeas', 'Spinach', 'Tahini'],
    instructions: ['Cook quinoa.', 'Slice avocado.', 'Mix everything in a bowl.']
  },
  {
    id: '2',
    name: 'Steamed Salmon with Asparagus',
    description: 'High protein, low carb meal rich in Omega-3 fatty acids.',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800',
    calories: 380,
    protein: 34,
    carbs: 10,
    fats: 18,
    ingredients: ['Salmon Fillet', 'Asparagus', 'Lemon', 'Garlic', 'Olive Oil'],
    instructions: ['Season salmon.', 'Steam with asparagus for 12 minutes.', 'Garnish with lemon.']
  },
  {
    id: '3',
    name: 'Berry Spinach Smoothie',
    description: 'A refreshing morning boost packed with antioxidants.',
    image: 'https://images.unsplash.com/photo-1553531384-397c80973a0b?auto=format&fit=crop&q=80&w=800',
    calories: 220,
    protein: 8,
    carbs: 35,
    fats: 4,
    ingredients: ['Spinach', 'Blueberries', 'Almond Milk', 'Greek Yogurt'],
    instructions: ['Blend all ingredients until smooth.']
  },
  {
    id: '4',
    name: 'Zucchini Noodles with Pesto',
    description: 'A light, low-carb alternative to traditional pasta.',
    image: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?auto=format&fit=crop&q=80&w=800',
    calories: 210,
    protein: 6,
    carbs: 15,
    fats: 14,
    ingredients: ['Zucchini', 'Basil Pesto', 'Cherry Tomatoes', 'Pine Nuts'],
    instructions: ['Spiralize zucchini.', 'Toss with pesto.', 'Add tomatoes and nuts.']
  },
  {
    id: '5',
    name: 'Mediterranean Stuffed Peppers',
    description: 'Bell peppers filled with a mixture of brown rice, feta, and olives.',
    image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&q=80&w=800',
    calories: 320,
    protein: 12,
    carbs: 45,
    fats: 10,
    ingredients: ['Bell Peppers', 'Brown Rice', 'Feta Cheese', 'Kalamata Olives'],
    instructions: ['Roast peppers.', 'Stuff with cooked rice mix.', 'Bake for 15 mins.']
  },
  {
    id: '6',
    name: 'Lentil & Sweet Potato Stew',
    description: 'Warm, filling, and packed with fiber and plant-based protein.',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=800',
    calories: 290,
    protein: 18,
    carbs: 50,
    fats: 5,
    ingredients: ['Red Lentils', 'Sweet Potato', 'Turmeric', 'Coconut Milk', 'Kale'],
    instructions: ['Sauté sweet potato.', 'Add lentils and spices.', 'Simmer with coconut milk until tender.']
  },
  {
    id: '7',
    name: 'Grilled Tofu Buddha Bowl',
    description: 'Smoky grilled tofu with pickled ginger and edamame.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800',
    calories: 340,
    protein: 22,
    carbs: 30,
    fats: 12,
    ingredients: ['Firm Tofu', 'Edamame', 'Brown Rice', 'Ginger', 'Cucumber'],
    instructions: ['Press and grill tofu.', 'Assemble with cooked rice and fresh veg.', 'Drizzle with soy-sesame dressing.']
  },
  {
    id: '8',
    name: 'Chia Seed Overnight Pudding',
    description: 'Simple prep for a high-omega breakfast or snack.',
    image: 'https://images.unsplash.com/photo-1512484776495-a09d92e87c3b?auto=format&fit=crop&q=80&w=800',
    calories: 180,
    protein: 6,
    carbs: 22,
    fats: 9,
    ingredients: ['Chia Seeds', 'Oat Milk', 'Maple Syrup', 'Walnuts', 'Strawberries'],
    instructions: ['Mix seeds and milk.', 'Let sit overnight.', 'Top with nuts and berries.']
  }
];
