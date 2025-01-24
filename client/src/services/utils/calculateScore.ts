export const calculateScore = (lines: number): number => {
  const basePoints = 100;
  const multipliers = [1, 2.5, 7.5, 15]; // Multipliers for 1, 2, 3, or 4 lines
  return Math.floor(basePoints * (multipliers[lines - 1] || 0));
};
