# React TicTacToe
Simple, interactive Tic-Tac-Toe game built using React, where players can choose between two modes: **1P Mode** (Players vs CPU) or **2P Mode** (Player vs Player).

## Features
* **1P Mode (Player vs CPU)**: Play against the computer that makes moves
* **2P Mode (Player vs Player)**: Play with a friend on same device
* **Responsive Design**: Optimized for both desktop and mobile play
  
## Prerequisites
Make sure you have **Node.js** and **npm** installed on your machine. If not, download and install from [Node.js Official Website](https://nodejs.org)

## Installation
1. Clone repository
   ```bash
   git clone https://github.com/suyog-adhikari/react-tictactoe.git
   cd react-tictactoe
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Run the development server
   ```bash
   npm start
   ```
4. Open the development server link ([http://localhost:3000](http://localhost:3000)) on your browser to play the game

## Usage
### 1P Mode (Player vs CPU)
* Select 1P mode from the menu
* Select to play as **X** or **O**
* The game will take turns between you and the CPU
* The CPU will make moves based on the simple algorithm
* You can restart the game by clicking the **Play Again** button after win, loss or draw

### 2P Mode (Player vs Player)
* Select **2P Mode** from the menu
* The game alternates turn between players
* You can restart the game by clicking **Play Again** button after win or draw

## Game Rules
* Player takes turns marking a 3*3 Grid
* The first player to mark 3 marks in a row (Vertically, Horizontally, or Diagonally) wins
* If all spaces are filled and no players has won, the game is draw

## CPU Details
The CPU uses basic algorithm to play Tic-Tac-Toe. It follows the following steps:
1. It first tries to win if possible
2. If it can't win, it will block the player's winning move
3. If there are no immediate threats or winning moves, it selects a random available spot
