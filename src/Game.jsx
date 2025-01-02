import { useEffect, useState } from "react";
import { HowToPlayModal, DisplayTurn } from "components";
import { gameInit, setMarker, toggleTurn, checkGameOver, checkWin, makeDecision  } from "assets/controller";

const Game = () =>{
  const [howToPlay, setHowToPlay] = useState(false);
  const [game, setGame] = useState([]);
  const [turn, setTurn] = useState('x');
  const [win, setWin] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameMode, setGameMode] = useState(null);

  const reInit = (changeMode = false) =>{
    setHowToPlay(false);
    setWin(false);
    setGameOver(false);

    if(changeMode)
      setGameMode(null);

    setGame(gameInit());
  }

  const handleClick = (x, y) =>{
    const newGame = setMarker(game, {x,y}, turn);
    setGame([...newGame]);
  }

  useEffect(()=>{
    const currentGameOver =  checkGameOver(game);
    const currentWin = checkWin(game);

    setGameOver(currentGameOver);
    setWin(currentWin);

    if(gameOver || win )
      return;

    setTurn(prevTurn=>toggleTurn(prevTurn));
  }, [game]);

  useEffect(()=>{
    if(!gameMode || !gameMode.mode)
      return;

    if(gameMode.mode === 2)
      return;

    const cpuMove = makeDecision(game, turn, gameMode);
    if(cpuMove){
      const newGame = setMarker(game, cpuMove, turn);
      setTimeout(()=>{
        setGame([...newGame]);
      }, 500);
    }
  }, [turn]);

  const renderRow = (row, rowIndex) =>{
    return(
    <div className="row" key={rowIndex}>
      {row.map((cell, colIndex)=>{
        return <span key={colIndex} className={cell!==-1 ? cell : ''} onClick={()=>handleClick(rowIndex, colIndex)} ></span>
      })}
    </div>
    );
  }

  const checkBoardDisplay = ()=>{
    if(win)
      return false;
    else if(gameOver)
      return false;

    if(!gameMode)
      return false;

    if(gameMode?.mode === 1 && !gameMode.user)
      return false;

    return true;
  }

  useEffect(()=>{
    setGame(gameInit());
  }, []);

  return(
    <>
      <div className="gameCont">
        <div className="game">
          <div className="gameHeader">
            <h1>TicTacToe</h1>
            <p onClick={()=>setHowToPlay(true)}>How to Play?</p>
            {checkBoardDisplay() && <DisplayTurn turn={turn} gameMode={gameMode} />}               
          </div>

          <div className="gameBody">
            {checkBoardDisplay() && (
              <div className="gameInnerBody">
                {game.map((row,index)=>renderRow(row, index))}
              </div>
            )}

            {(win || gameOver) && (
              <div className="over animateFadeIn">
                {win ? 
                  <>
                    <h3>
                      <span className={`text-${win.winner}`}>{(win.winner).toUpperCase()}</span> Wins
                    </h3>
                  </>:
                  <h3>Gameover</h3>
                }

                <div className="line">
                  <button onClick={()=>reInit()}>Play Again</button>
                  <button onClick={()=>reInit(true)}>Change Mode</button>
                </div>
              </div>
            )}

            {!gameMode && (
              <div className="over">
                <h3>Select Player Mode</h3>
                <div className="line">
                  <button onClick={()=>setGameMode({mode: 1})}>1P Mode</button>
                  <button onClick={()=>setGameMode({mode: 2})}>2P Mode</button>
                </div>
              </div>
            )}
            {(gameMode?.mode === 1 && !gameMode.user) && (
                <div className="over">
                  <h3>Play As</h3>
                  <div className="line">
                    <button onClick={()=>setGameMode({mode: 1, user: 'x'})} className="text-x" style={{fontSize:20, fontWeight:'bold'}}>X</button>
                    <button onClick={()=>setGameMode({mode: 1, user: 'o'})} className="text-o" style={{fontSize:20, fontWeight:'bold'}}>O</button>
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </div>

      {howToPlay && <HowToPlayModal closeModal={()=>setHowToPlay(false)} />}
    </>
  )
}

export default Game;