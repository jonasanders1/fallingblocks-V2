export function rotateMatrix(matrix: number[][], rotation: number): number[][] {
  let rotated = [...matrix];
  for (let i = 0; i < rotation; i++) {
    rotated = rotated[0].map((_, index) =>
      rotated.map((row) => row[index]).reverse()
    );
  }
  return rotated;
}
