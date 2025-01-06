import { useEffect, useState, useReducer } from "react";
import { HowToPlayModal, DisplayTurn, WinLine } from "components";
import { gameInit, setMarker, toggleTurn, checkGameOver, checkWin, makeDecision  } from "assets/js/controller";

const EMPTY = -1;

const actionTypes = {
  SET_GAME: 'SET_GAME',
  SET_TURN: 'SET_TURN',
  SET_WIN: 'SET_WIN',
  SET_GAME_OVER: 'SET_GAME_OVER',
  SET_GAME_MODE: 'SET_GAME_MODE',
  SET_USER: 'SET_USER',
}

const initalState = {
  game: [],
  turn: 'x',
  win: false,
  gameOver: false,
  gameMode: null,
  user: null,
}

const reducer = (state, action) =>{
  switch(action.type){
    case actionTypes.SET_GAME:
      return {...state, game: action.payload};
    case actionTypes.SET_TURN:
      return {...state, turn: action.payload};
    case actionTypes.SET_WIN:
      return {...state, win: action.payload};
    case actionTypes.SET_GAME_OVER:
      return {...state, gameOver: action.payload};
    case actionTypes.SET_GAME_MODE:
      return {...state, gameMode: action.payload};
    case actionTypes.SET_USER:
      return {...state, user: action.payload};
    default:
      return state;
  }
}

const Game = () =>{
  const [howToPlay, setHowToPlay] = useState(false);
  const [animateWin, setAnimateWin] = useState(null);
  const [init, setInit] = useState(false);

  const [gameStat, dispatch] = useReducer(reducer, initalState);

  /*Helper Functions*/
  
  //Reset the state for reinialization of game
  const reInit = (changeMode = false) =>{
    dispatch({type: actionTypes.SET_GAME, payload: gameInit()});
    dispatch({type: actionTypes.SET_WIN, payload: false});
    dispatch({type: actionTypes.SET_GAME_OVER, payload: false});
    
    if(changeMode){
      dispatch({type: actionTypes.SET_GAME_MODE, payload: null});
      dispatch({type: actionTypes.SET_USER, payload: null});
    }

    setInit(false);
    setHowToPlay(false);
    setAnimateWin(null);
  }

  //Handle User Click on the game board
  const handleClick = (x, y) =>{
    if(gameStat.gameMode === 1 && (gameStat.turn !== gameStat.user)) return;
    const newGame = setMarker(gameStat.game, {x,y}, gameStat.turn);
    if(newGame){
      dispatch({type: actionTypes.SET_GAME, payload: [...newGame]});
    }
  }

  const handleCPUMove = () =>{
    setTimeout(()=>{
      const cpuMove = makeDecision(gameStat.game, gameStat.turn, { mode: gameStat.gameMode, user: gameStat.user });
      if (cpuMove) {
        const newGame = setMarker(gameStat.game, cpuMove, gameStat.turn);
        dispatch({ type: actionTypes.SET_GAME, payload: [...newGame] });
      }
    }, 500);
  }

  //Helper function to render the game board
  const renderRow = (row, rowIndex) =>{
    return(
      <div className="row" key={rowIndex}>
        {row.map((cell, colIndex)=>{
          return <span key={colIndex} className={cell!==EMPTY ? cell : ''} onClick={()=>handleClick(rowIndex, colIndex)} ></span>
        })}
      </div>
    );
  }

  //Checks if the game board should be displayed
  const checkBoardDisplay = ()=>{
    if(gameStat.win || gameStat.gameOver || !gameStat.gameMode || (gameStat.gameMode === 1 && !gameStat.user))
      return false;

    return true;
  }

  //Initialize the Game 
  useEffect(()=>{
    dispatch({type: actionTypes.SET_GAME, payload: gameInit()});
    setInit(true);
  }, []);

  //Check for GameOver, Win & toggleTurn on game change
  useEffect(()=>{
    const currentGameOver =  checkGameOver(gameStat.game);
    const currentWin = checkWin(gameStat.game);

    if(currentWin) setAnimateWin(currentWin.position);
    
    setTimeout(()=>{
      dispatch({type: actionTypes.SET_WIN, payload: currentWin});
    }, 1200);

    setTimeout(()=>{
      dispatch({type: actionTypes.SET_GAME_OVER, payload: currentGameOver});
    }, 600);

    if(currentWin || gameStat.gameOver || gameStat.win) return;

    dispatch({type: actionTypes.SET_TURN, payload: toggleTurn(gameStat.turn)});
  }, [gameStat.game]);

  //Make CPU move if necessary when turn changes
  useEffect(()=>{
    if (!gameStat.gameMode || !gameStat.user || gameStat.gameMode === 2 || gameStat.user === gameStat.turn) return;

    handleCPUMove();
  }, [gameStat.turn]);
  
  //Make CPU move when first move is CPU's move
  useEffect(()=>{
    if (!init || !gameStat.gameMode || !gameStat.user || gameStat.gameMode === 2) return;
    
    setInit(false);
    handleCPUMove();
  }, [gameStat.gameMode, gameStat.user]);

  return(
    <>
      <div className="gameCont">
        <div className="game">
          <div className="gameHeader">
            <h1>TicTacToe</h1>
            <p onClick={()=>setHowToPlay(true)}>How to Play?</p>
            {checkBoardDisplay() && <DisplayTurn turn={gameStat.turn} gameMode={{mode: gameStat.gameMode, user: gameStat.user}} />}               
          </div>

          <div className="gameBody">
            {checkBoardDisplay() && (
              <div className="gameInnerBody">
                {(gameStat.game).map((row,index)=>renderRow(row, index))}
              </div>
            )}

            {(gameStat.win || gameStat.gameOver) && (
              <div className="over animateFadeIn">
                {gameStat.win ? 
                  <>
                    <h3>
                      <span className={`text-${gameStat.win.winner}`}>{(gameStat.win.winner).toUpperCase()}</span> Wins
                    </h3>
                  </>:<h3>It's a tie</h3>
                }

                <div className="line">
                  <button onClick={()=>reInit()}>Play Again</button>
                  <button onClick={()=>reInit(true)}>Change Mode</button>
                </div>
              </div>
            )}

            {!gameStat.gameMode && (
              <div className="over">
                <h3>Select Player Mode</h3>
                <div className="line">
                  <button onClick={()=>dispatch({type: actionTypes.SET_GAME_MODE, payload: 1})}>1P Mode</button>
                  <button onClick={()=>dispatch({type: actionTypes.SET_GAME_MODE, payload: 2})}>2P Mode</button>
                </div>
              </div>
            )}
            {(gameStat.gameMode === 1 && !gameStat.user) && (
              <div className="over">
                <h3>Play As</h3>
                <div className="line">
                  <button onClick={()=>dispatch({type: actionTypes.SET_USER, payload: 'x'})} className="text-x" style={{fontSize:20, fontWeight:'bold'}}>X</button>
                  <button onClick={()=>dispatch({type: actionTypes.SET_USER, payload: 'o'})} className="text-o" style={{fontSize:20, fontWeight:'bold'}}>O</button>
                </div>
              </div>
            )}  
          </div>
        </div>
      </div>

      {checkBoardDisplay() && <WinLine pos={animateWin} />}
      {howToPlay && <HowToPlayModal closeModal={()=>setHowToPlay(false)} />}
    </>
  )
}

export default Game;