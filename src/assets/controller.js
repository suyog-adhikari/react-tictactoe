const EMPTY = -1;

export const gameInit = () =>{
	const game = Array.from({length:3}, ()=> Array(3).fill(EMPTY));
	return game;
}

export const toggleTurn = (turn) =>{
	return (turn.toLowerCase() === 'x'?'o':'x');
}

export const checkWin = (game)=>{
	const isWinningLine = (a,b,c) => a===b && b===c && a!==-1

	if (!game || game.length !== 3 || !game.every(row => row.length === 3)) {
    return false;
  }

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
	if(game[x][y] === -1)
		game[x][y] = turn;
	
	return game;
}

export const makeDecision = (game, turn, gameMode) =>{
	if(gameMode.mode === 2)
		return false

	if(turn === gameMode.user)
		return false;

	let potDes = [];

	for(let i=0; i<3; i++){
		for(let j=0; j<3; j++){
			if(game[i][j] == game[i][(j+1)%3] && game[i][j] != -1){
				if(game[i][(j+2)%3] == -1){
					potDes.push([game[i][j],i,(j+2)%3]);
				}
			}
		}
	}

	for(let i=0; i<3; i++){
		for(let j=0; j<3; j++){
			if(game[j][i] == game[(j+1)%3][i] && game[j][i] != -1){
				if(game[(j+2)%3][i] == -1){
					potDes.push([game[j][i],(j+2)%3,i]);
				}
			}
		}
	}

	for(let i=0; i<3; i++){
		if(game[i][i] == game[(i+1)%3][(i+1)%3] && game[i][i] != -1){
			if(game[(i+2)%3][(i+2)%3] == -1){
				potDes.push([game[i][i],(i+2)%3,(i+2)%3]);
			}
		}
	}

	if(game[0][2] == game [1][1] && game[0][2] != -1){
		if(game[2][0] == -1){
			potDes.push([game[0][2],2,0]);
		}
	}
	if(game[1][1] == game [2][0] && game[1][1] != -1){
		if(game[0][2] == -1){
			potDes.push([game[1][1],0,2]);
		}
	}
	if(game[0][2] == game [2][0] && game[0][2] != -1){
		if(game[1][1] == -1){
			potDes.push([game[0][2],2,0]);
		}
	}

	for(let i=0; i<potDes.length; i++){
		if(potDes[i][0] != gameMode.user){
			return {x: potDes[i][1], y: potDes[i][2]}; 
		}
	}

	if(potDes.length){
		let randDes = potDes[Math.floor(Math.random() * 10) % potDes.length];
		return {x: randDes[1], y: randDes[2]}; 
	}

	let des = Array();
	for(let i=0; i<3; i++){
		for(let j=0 ; j<3; j++){
			if(game[i][j] == -1){
				des.push([i,j]);
			}
		}
	}

	if(des.length){
		let randDes = des[Math.floor(Math.random() * 10) % des.length];
		return {x: randDes[0], y: randDes[1]}; 
	}

	return false; 
}