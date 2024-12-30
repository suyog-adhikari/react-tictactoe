const EMPTY = -1;

export const gameInit = () =>{
	const game = Array.from({length:3}, ()=> Array(3).fill(EMPTY));
	return game;
}

export const toggleTurn = (turn, setTurn) =>{
	setTurn(turn.toLowerCase() === 'x'?'o':'x');
}

export const checkWin = (game)=>{
	const isWinningLine = (a,b,c) => a===b && b===c && a!==-1

	for(let i=0; i<3; i++){
		//Check Row
		if(isWinningLine(game[i][0], game[i][1], game[i][2])){
			return {position: 'r'+i, winner: game[i][0]}	
		}

		//Check Column
		if(isWinningLine(game[0][i], game[1][i], game[2][i])){
			return {position: 'c'+i, winner: game[0][i]}
		}
	}

	//Check Diagonals 
	if(isWinningLine(game[0][0], game[1][1], game[2][2])){
		return {position: 'd1', winner: game[0][0]}	
	}

	if(isWinningLine(game[0][2], game[1][1], game[2][0])){
		return {position: 'd2', winner: game[0][2]}
	}

	return false;
}

export const checkGameOver = (game) =>{
	return !game.flat().includes(EMPTY);
}

export const setMarker = (game, {x, y}, turn) =>{
	if(game[x][y] == -1)
		game[x][y] = turn;
	
	return game;
}