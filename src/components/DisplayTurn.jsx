const DisplayTurn = ({turn, gameMode}) => {
  if(gameMode.mode === 1){
    return(
      <p><span>{turn===gameMode.user?"Your":"CPU's"}</span> Turn</p>
    )
  }
  else if(gameMode.mode === 2){
    return(
      <p><span className={`text-${turn}`}>{turn.toUpperCase()}</span>'s Turn</p>
    )
  }
}

export default DisplayTurn;