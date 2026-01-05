
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
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  ),
  Chef: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 13.847c1.607-1.33 5.113-2.476 5.514-4.638C12.145 5.753 9.421 3.01 6.02 3c-3.411-.01-6.135 2.744-5.514 6.209.4 2.162 3.907 3.307 5.494 4.638"/>
      <path d="M18 13.847c-1.607-1.33-5.113-2.476-5.514-4.638C11.855 5.753 14.579 3.01 17.98 3c3.411-.01 6.135 2.744 5.514 6.209-.4 2.162 3.907 3.307-5.494 4.638"/>
      <path d="M12 12v10M8 22h8"/>
    </svg>
  ),
  Message: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"></path>
    </svg>
  ),
  Game: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="6" width="20" height="12" rx="2"></rect>
      <path d="M6 12h4M8 10v4M15 13h.01M18 11h.01"></path>
    </svg>
  ),
  Video: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M23 7l-7 5 7 5V7z"></path>
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
    </svg>
  ),
  Settings: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3"></circle>
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"></path>
    </svg>
  ),
  // New Signal icon for professional communication UI
  Signal: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 20h.01" />
      <path d="M7 20v-4" />
      <path d="M12 20v-8" />
      <path d="M17 20V8" />
      <path d="M22 20V4" />
    </svg>
  ),
  // Fixed: Included color in destructuring to resolve reference errors
  BioOrganism: ({ className, color }: { className?: string, color?: string }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none">
      <path d="M50 20 C60 20, 70 30, 70 50 C70 70, 60 80, 50 80 C40 80, 30 70, 30 50 C30 30, 40 20, 50 20" stroke={color || "#10b981"} strokeWidth="4" />
      <circle cx="50" cy="50" r="10" fill={color || "#10b981"} />
      <path d="M40 40 L30 30 M60 40 L70 30 M40 60 L30 70 M60 60 L70 70" stroke={color || "#10b981"} strokeWidth="2" />
    </svg>
  ),
  SyntheticHazard: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none">
      <rect x="30" y="30" width="40" height="40" stroke="#f43f5e" strokeWidth="4" />
      <path d="M30 30 L70 70 M70 30 L30 70" stroke="#f43f5e" strokeWidth="4" />
      <circle cx="50" cy="50" r="5" fill="#f43f5e" />
    </svg>
  )
};

export const INITIAL_RECIPES: any[] = [
  {
    id: '1',
    name: 'Quinoa Power Bowl',
    description: 'Nutrient-dense molecular assembly with high-density protein and healthy lipids.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800',
    calories: 450,
    protein: 15,
    carbs: 55,
    fats: 22,
    ingredients: ['Refined Quinoa', 'Pressed Avocado', 'Cultured Chickpeas', 'Organic Spinach', 'Tahini Emulsion'],
    instructions: ['Prepare base quinoa unit.', 'Integrate lipid-rich avocado.', 'Emulsify with tahini dressing.']
  },
  {
    id: '2',
    name: 'Atlantic Salmon Reconstruction',
    description: 'Wild-caught protein source optimized for cognitive and cardiac performance.',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800',
    calories: 380,
    protein: 34,
    carbs: 10,
    fats: 18,
    ingredients: ['Prime Salmon', 'Hydro-Asparagus', 'Citric Essence', 'Garlic Infusion', 'Lipid Oil'],
    instructions: ['Apply thermal treatment to salmon.', 'Steam hydration for asparagus.', 'Infuse with garlic and lemon.']
  },
  {
    id: '3',
    name: 'Antioxidant Neural Boost',
    description: 'High-speed absorption blend for cellular recovery and oxidative stress management.',
    image: 'https://images.unsplash.com/photo-1553531384-397c80973a0b?auto=format&fit=crop&q=80&w=800',
    calories: 220,
    protein: 8,
    carbs: 35,
    fats: 4,
    ingredients: ['Flash-Frozen Spinach', 'Anthocyanin Berries', 'Almond Hydration', 'Probiotic Yogurt'],
    instructions: ['High-velocity blending until molecular uniformity is achieved.']
  }
];
