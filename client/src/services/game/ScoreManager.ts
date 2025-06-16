export interface ScoreConfig {
  basePoints: Record<number, number>;
  comboMultipliers: Record<number, number>;
  dropPoints: {
    soft: number;
    hard: number;
  };
}

export class ScoreManager {
  private config: ScoreConfig;

  constructor(config?: Partial<ScoreConfig>) {
    this.config = {
      basePoints: {
        1: 100, // Single
        2: 300, // Double
        3: 500, // Triple
        4: 800, // Tetris
      },
      comboMultipliers: {
        1: 1,    // No combo
        2: 1.5,  // x1.5
        3: 2,    // x2
        4: 2.5,  // x2.5
        5: 3,    // x3
      },
      dropPoints: {
        soft: 1,
        hard: 2,
      },
      ...config
    };
  }

  calculateLineScore(lines: number, level: number, combo: number): number {
    const basePoints = this.config.basePoints[lines] || 0;
    const comboMultiplier = this.config.comboMultipliers[combo] || 1;
    return Math.floor(basePoints * level * comboMultiplier);
  }

  calculateDropScore(dropDistance: number, isHardDrop: boolean): number {
    const pointsPerCell = isHardDrop 
      ? this.config.dropPoints.hard 
      : this.config.dropPoints.soft;
    return dropDistance * pointsPerCell;
  }

  calculateLevelProgress(totalLines: number): number {
    return Math.floor(totalLines / 10) + 1;
  }
} 