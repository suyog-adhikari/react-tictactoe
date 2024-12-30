const GameOverModal = ({closeModal}) =>{
	return(
		<>
			<div className="dim" onClick={closeModal}></div>
			<div className="modal">
				<span className="cross" onClick={closeModal}>&times;</span>
				<h1>GameOver</h1>
				<p>Its a draw</p>
			</div>
		</>
    )
}

export default GameOverModal;