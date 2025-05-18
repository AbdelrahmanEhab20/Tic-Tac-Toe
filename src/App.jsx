import { useState, useEffect } from 'react';
import Board from './components/Board';
import ScoreBoard from './components/ScoreBoard';
import ResultsTable from './components/ResultsTable';
import { calculateWinner } from './utils/gameUtils';
import './App.css';

export default function Game() {
  const [playerName, setPlayerName] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [draws, setDraws] = useState(0);
  const [gameResults, setGameResults] = useState([]);
  const [currentGame, setCurrentGame] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const isComputerTurn = !xIsNext && gameStarted;

  useEffect(() => {
    if (isComputerTurn && gameStarted) {
      const timer = setTimeout(() => {
        makeComputerMove();
      }, 1000); // Increased delay for better UX
      return () => clearTimeout(timer);
    }
  }, [isComputerTurn, gameStarted]);

  function makeComputerMove() {
    if (calculateWinner(currentSquares)) return;

    const emptySquares = currentSquares
      .map((square, index) => (square === null ? index : null))
      .filter(square => square !== null);

    if (emptySquares.length > 0) {
      const randomIndex = emptySquares[Math.floor(Math.random() * emptySquares.length)];
      const nextSquares = currentSquares.slice();
      nextSquares[randomIndex] = 'O';
      handlePlay(nextSquares);
    }
  }

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);

    const winner = calculateWinner(nextSquares);
    if (winner || nextSquares.every(square => square)) {
      handleGameEnd(winner);
    }
  }

  function handleGameEnd(winner) {
    if (winner === 'X') {
      setPlayerScore(prev => prev + 1);
      setGameResults(prev => [...prev, { winner: playerName, result: 'win' }]);
    } else if (winner === 'O') {
      setComputerScore(prev => prev + 1);
      setGameResults(prev => [...prev, { winner: 'Computer', result: 'lose' }]);
    } else {
      setDraws(prev => prev + 1);
      setGameResults(prev => [...prev, { winner: 'Draw', result: 'draw' }]);
    }

    if (currentGame < 3) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentGame(prev => prev + 1);
        setHistory([Array(9).fill(null)]);
        setCurrentMove(0);
        setIsTransitioning(false);
      }, 2000); // Increased delay for better transition
    } else {
      setTimeout(() => {
        setGameStarted(false);
      }, 2000);
    }
  }

  function startNewGame() {
    if (!playerName.trim()) {
      alert('Please enter your name to start the game!');
      return;
    }
    setGameStarted(true);
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setPlayerScore(0);
    setComputerScore(0);
    setDraws(0);
    setGameResults([]);
    setCurrentGame(1);
  }

  return (
    <div className="game-container">
      <div className="game-header">
        <h1 className="game-title">Tic Tac Toe</h1>
        {!gameStarted ? (
          <div className="player-info">
            <input
              type="text"
              className="player-input"
              placeholder="Enter your name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
            />
            <button className="start-button" onClick={startNewGame}>
              Start New Game
            </button>
          </div>
        ) : (
          <div className="game-board">
            <div className={`board-container ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
              <Board
                xIsNext={xIsNext}
                squares={currentSquares}
                onPlay={handlePlay}
                isComputerTurn={isComputerTurn}
              />
            </div>
            <ScoreBoard
              playerName={playerName}
              playerScore={playerScore}
              computerScore={computerScore}
              draws={draws}
            />
          </div>
        )}
      </div>
      {gameResults.length > 0 && (
        <div className="game-info">
          <h2>Game Results</h2>
          <ResultsTable gameResults={gameResults} />
        </div>
      )}
    </div>
  );
}
