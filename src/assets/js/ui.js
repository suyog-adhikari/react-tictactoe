export const animateWin = (pos) => {
  const allSpan = document.querySelectorAll('.gameBody span');

  const winningPositions = {
    r0: [0, 1, 2],
    r1: [3, 4, 5],
    r2: [6, 7, 8],
    c0: [0, 3, 6],
    c1: [1, 4, 7],
    c2: [2, 5, 8],
    d1: [0, 4, 8],
    d2: [2, 4, 6]
  };
  
  const positions = winningPositions[pos];
  
  if (positions) {
    positions.forEach(index => allSpan[index].classList.add('win'));
  }
  
} 