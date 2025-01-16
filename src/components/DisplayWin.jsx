const DisplayWin = ({gameStat})=>{
  if(gameStat.gameMode == 2){
    return(
      <h3>
        <span className={`text-${gameStat.winner}`}>{(gameStat.winner).toUpperCase()}</span> Wins
      </h3>
    )
  }
  return(
    <>
      {gameStat.winner==gameStat.user?<h3><span>You</span> Win</h3>: <h3><span>CPU</span> Wins</h3>}  
    </>
  )
}

export default DisplayWin;