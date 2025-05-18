import Square from './Square';
import Loader from './Loader';
import { calculateWinner } from '../utils/gameUtils';

export default function Board({ xIsNext, squares, onPlay, isComputerTurn }) {
    function handleClick(i) {
        if (calculateWinner(squares) || squares[i] || isComputerTurn) {
            return;
        }
        const nextSquares = squares.slice();
        nextSquares[i] = xIsNext ? 'X' : 'O';
        onPlay(nextSquares);
    }

    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = 'Winner: ' + winner;
    } else if (squares.every(square => square)) {
        status = 'Draw!';
    } else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

    return (
        <div className="board">
            <div className="status">
                {isComputerTurn ? (
                    <div className="computer-thinking">
                        Computer is thinking...
                        <Loader />
                    </div>
                ) : (
                    status
                )}
            </div>
            <div className="board-row">
                <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
                <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
                <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
            </div>
            <div className="board-row">
                <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
                <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
                <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
            </div>
            <div className="board-row">
                <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
                <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
                <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
            </div>
        </div>
    );
} 