import { GameState, Achievement, Element } from '@/types';

// Define all possible achievements
const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_guess',
    title: 'First Guess',
    description: 'Make your first lickability guess!',
    emoji: '🎯',
    condition: (gameState: GameState) => gameState.totalGuesses >= 1
  },
  {
    id: 'hot_streak',
    title: 'Hot Streak',
    description: 'Get 5 consecutive correct guesses',
    emoji: '🔥',
    condition: (gameState: GameState) => gameState.streak >= 5
  },
  {
    id: 'lightning_round',
    title: 'Lightning Round',
    description: 'Get 10 consecutive correct guesses',
    emoji: '⚡',
    condition: (gameState: GameState) => gameState.streak >= 10
  },
  {
    id: 'chemistry_master',
    title: 'Chemistry Master',
    description: 'Get 25 consecutive correct guesses',
    emoji: '🧪',
    condition: (gameState: GameState) => gameState.streak >= 25
  },
  {
    id: 'nuclear_physicist',
    title: 'Nuclear Physicist',
    description: 'Correctly guess all actinide elements',
    emoji: '☢️',
    condition: (gameState: GameState, element?: Element) => {
      if (!element) return false;
      const category = typeof element.metadata.category === 'object'
        ? element.metadata.category.value
        : element.metadata.category;
      return category === 'Actinide' && gameState.streak > 0;
    }
  },
  {
    id: 'precious_metals_expert',
    title: 'Precious Metals Expert',
    description: 'Correctly guess 10 transition metals',
    emoji: '💎',
    condition: (gameState: GameState, element?: Element) => {
      if (!element) return false;
      const category = typeof element.metadata.category === 'object'
        ? element.metadata.category.value
        : element.metadata.category;
      return category === 'Transition metal' && gameState.correctGuesses >= 10;
    }
  },
  {
    id: 'safety_first',
    title: 'Safety First',
    description: 'Correctly identify 5 dangerous elements',
    emoji: '🛡️',
    condition: (gameState: GameState, element?: Element) => {
      if (!element) return false;
      const lickability = typeof element.metadata.can_i_lick_it === 'object'
        ? element.metadata.can_i_lick_it?.value
        : element.metadata.can_i_lick_it;
      return lickability === 'Please reconsider' && gameState.correctGuesses >= 5;
    }
  },
  {
    id: 'noble_gas_expert',
    title: 'Noble Gas Expert',
    description: 'Perfect streak on noble gases',
    emoji: '👑',
    condition: (gameState: GameState, element?: Element) => {
      if (!element) return false;
      const category = typeof element.metadata.category === 'object'
        ? element.metadata.category.value
        : element.metadata.category;
      return category === 'Noble gas' && gameState.streak >= 3;
    }
  },
  {
    id: 'perfectionist',
    title: 'Perfectionist',
    description: 'Achieve 100% accuracy with 20+ guesses',
    emoji: '💯',
    condition: (gameState: GameState) => {
      return gameState.totalGuesses >= 20 && 
             gameState.correctGuesses === gameState.totalGuesses;
    }
  },
  {
    id: 'centurion',
    title: 'Centurion',
    description: 'Make 100 total guesses',
    emoji: '💯',
    condition: (gameState: GameState) => gameState.totalGuesses >= 100
  }
];

export function checkAchievements(gameState: GameState, element?: Element): Achievement | null {
  // Check if any achievement condition is met that hasn't been unlocked yet
  const unlockedAchievementIds = new Set(gameState.achievements.map(a => a.id));
  
  for (const achievement of ACHIEVEMENTS) {
    if (!unlockedAchievementIds.has(achievement.id) && achievement.condition(gameState, element)) {
      return {
        ...achievement,
        unlockedAt: new Date()
      };
    }
  }
  
  return null;
}

export function getAllAchievements(): Achievement[] {
  return ACHIEVEMENTS;
}

export function calculateScoreMultiplier(streak: number): number {
  if (streak >= 25) return 3.0;
  if (streak >= 15) return 2.5;
  if (streak >= 10) return 2.0;
  if (streak >= 5) return 1.5;
  return 1.0;
}

export function getStreakMessage(streak: number): string {
  if (streak >= 25) return "🧪 CHEMISTRY MASTER! You're on fire!";
  if (streak >= 15) return "⚡ LIGHTNING STREAK! Incredible!";
  if (streak >= 10) return "🔥 HOT STREAK! You're unstoppable!";
  if (streak >= 5) return "🎯 Nice streak! Keep it up!";
  if (streak >= 3) return "📈 Getting warmer!";
  return "🎮 Let's build that streak!";
}

export function getLickabilityExplanation(element: Element): string {
  const lickability = typeof element.metadata.can_i_lick_it === 'object'
    ? element.metadata.can_i_lick_it?.value
    : element.metadata.can_i_lick_it;
    
  const elementName = element.metadata.element_name;
  const category = typeof element.metadata.category === 'object'
    ? element.metadata.category.value
    : element.metadata.category;

  switch (lickability) {
    case 'Sure, it\'s probably fine':
      if (category === 'Noble gas') {
        return `${elementName} is a noble gas - it's chemically inert and won't react with your tongue. Though you'd probably just taste nothing since it's a gas!`;
      }
      if (elementName === 'Carbon') {
        return `Carbon in the form of graphite (pencil lead) is relatively safe. You've probably licked a pencil before without realizing it!`;
      }
      return `${elementName} is generally considered safe in small amounts. Still probably don't make it a habit though!`;
      
    case 'Maybe not a good idea':
      return `${elementName} isn't immediately toxic, but it's not something you'd want to make a regular snack. Best to admire from a distance!`;
      
    case 'You really shouldn\'t':
      if (category === 'Alkali metal' || category === 'Alkaline earth metal') {
        return `${elementName} is a reactive metal that would react violently with the moisture in your mouth. Think explosive chemical burns!`;
      }
      if (category === 'Halogen') {
        return `${elementName} is a highly reactive halogen that would cause severe chemical burns. Your taste buds would NOT thank you.`;
      }
      return `${elementName} would cause serious chemical burns or poisoning. Your mouth is not a chemistry lab!`;
      
    case 'Please reconsider':
      if (category === 'Actinide') {
        return `${elementName} is radioactive and would give you radiation poisoning before you even finished licking. Also, it probably tastes terrible.`;
      }
      if (elementName.includes('Mercury')) {
        return `Mercury is extremely toxic and would cause severe mercury poisoning. Even a small amount could be fatal!`;
      }
      return `${elementName} is extremely toxic or radioactive. This would be a very bad life choice. Please don't.`;
      
    default:
      return `The lickability of ${elementName} is currently unknown. When in doubt, don't lick mysterious elements!`;
  }
}

export function getRandomUnguessedElement(elements: Element[], guessedIds: Set<string>): Element | null {
  const unguessedElements = elements.filter(element => 
    !guessedIds.has(element.id) && 
    element.metadata.can_i_lick_it && 
    (typeof element.metadata.can_i_lick_it === 'object' 
      ? element.metadata.can_i_lick_it.value 
      : element.metadata.can_i_lick_it) !== ''
  );
  
  if (unguessedElements.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * unguessedElements.length);
  return unguessedElements[randomIndex];
}