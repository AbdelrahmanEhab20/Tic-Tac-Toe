export default function ScoreBoard({ playerName, playerScore, computerScore, draws }) {
    return (
        <div className="score-board">
            <h3 className="score-title">Score Board</h3>
            <div className="score-item">
                <span>{playerName}:</span>
                <span>{playerScore}</span>
            </div>
            <div className="score-item">
                <span>Computer:</span>
                <span>{computerScore}</span>
            </div>
            <div className="score-item">
                <span>Draws:</span>
                <span>{draws}</span>
            </div>
        </div>
    );
} 