// Base speed at level 1 (in milliseconds)
const BASE_SPEED = 800;

// Calculate gravity speed based on level
// Formula: speed = BASE_SPEED * (0.8 ^ (level - 1))
// This creates a nice exponential decrease in drop time:
// Level 1: 800ms
// Level 2: 640ms
// Level 3: 512ms
// Level 4: 410ms
// Level 5: 328ms
// Level 10: 107ms
// Level 15: 35ms
// Level 20: 11ms
export const calculateGravitySpeed = (level: number): number => {
  return Math.max(Math.floor(BASE_SPEED * Math.pow(0.8, level - 1)), 10);
}; 