import { useEffect, useState } from "react";
import { HowToPlayModal } from "components";
import { gameInit, setMarker, toggleTurn, checkGameOver, checkWin  } from "assets/controller";

const Game = () =>{
  const [howToPlay, setHowToPlay] = useState(false);
  const [game, setGame] = useState([]);
  const [turn, setTurn] = useState('x');
  const [win, setWin] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(()=>{
    setGame(gameInit());
  }, []);

  const reInit = () =>{
    setHowToPlay(false);
    setWin(false);
    setGameOver(false);
    setGame(gameInit());
  }

  const handleClick = (x, y) =>{
    const newGame = setMarker(game, {x,y}, turn);
    toggleTurn(turn, setTurn);
    setGameOver(checkGameOver(game));
    setWin(checkWin(game));
  }

  const renderRow = (row, rowIndex) =>{
    return(
    <div className="row" key={rowIndex}>
      {row.map((cell, colIndex)=>{
        return <span key={colIndex} className={cell!==-1 ? cell : ''} onClick={()=>handleClick(rowIndex, colIndex)} ></span>
      })}
    </div>
    );
  }

  return(
    <>
      <div className="gameCont">
        <div className="game">
          <div className="gameHeader">
            <h1>TicTacToe</h1>
            <p onClick={()=>setHowToPlay(true)}>How to Play?</p>                 
          </div>

          <div className="gameBody">
            {!gameOver && !win && (
              <div className="gameInnerBody">
                {game.map((row,index)=>renderRow(row, index))}
              </div>
            )}
            {win && (
              <div className="over">
                <h3>{turn} Wins</h3>
                <button onClick={reInit}>Play Again</button>
              </div>
            )}
            {gameOver && (
              <div className="over">
                <h3>Gameover</h3>
                <button onClick={reInit}>Play Again</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {howToPlay && <HowToPlayModal closeModal={()=>setHowToPlay(false)} />}
    </>
    )
}

export default Game;