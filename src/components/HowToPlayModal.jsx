const HowToPlayModal = ({closeModal}) =>{
	return(
		<>
			<div className="dim" onClick={closeModal}></div>
			<div className="modal">
				<span className="cross" onClick={closeModal}>&times;</span>
				<h1>How To Play</h1>
				<ul>
					<li>Players take turns placing their mark (<span>X</span> or <span>O</span>) in one of the empty cells of the grid.</li>
					<li>The first player to place three of their marks in a row, column, or diagonal wins the game.</li>
					<li>If all the cells are filled and no player has three marks in a row, the game is a draw.</li>
				</ul>
			</div>
		</>
    )
}

export default HowToPlayModal;