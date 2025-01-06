const DisplayTurn = ({turn, gameMode}) => {
  const isUserTurn = turn === gameMode.user;

  if(gameMode.mode === 1){
    return(
      <p><span>{isUserTurn?"Your":"CPU's"}</span> Turn</p>
    )
  }
  else if(gameMode.mode === 2){
    return(
      <p><span className={`text-${turn}`}>{turn.toUpperCase()}</span>'s Turn</p>
    )
  }

  return null;
}

export default DisplayTurn;