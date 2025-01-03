const WinLine = ({pos}) =>{
  if(!pos)
    return null;

  const allSpan = document.querySelectorAll('.gameBody span');
  const winningPositions = {
    r0: [0, 2],
    r1: [3, 5],
    r2: [6, 8],
    c0: [0, 6],
    c1: [1, 7],
    c2: [2, 8],
    d1: [0, 8],
    d2: [6, 2]
  };
  
  const position = winningPositions[pos]; 
  const [start, end] = [allSpan[position[0]], allSpan[position[1]]];
  if(!start || !end)
    return null;

  const [startPos, endPos] = [allSpan[position[0]].getBoundingClientRect() || 0, allSpan[position[1]].getBoundingClientRect() || 0];
  const coord = {
    x1: startPos.x + startPos.width/2,
    y1: startPos.y + startPos.height/2,
    x2: endPos.x + endPos.width/2,
    y2: endPos.y + endPos.height/2
  }
  return(
    <div className="winLine">
      <svg style={{width: '100%', height: '100%'}}>
        <line className="winAnimation"
          x1={coord.x1} 
          y1={coord.y1} 
          x2={coord.x2} 
          y2={coord.y2} 
          stroke="#Ffd700" 
          strokeWidth="5" 
        />
      </svg>
    </div>
  )
}

export default WinLine;