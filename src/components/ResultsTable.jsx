export default function ResultsTable({ gameResults }) {
    return (
        <table className="results-table">
            <thead>
                <tr>
                    <th>Game</th>
                    <th>Winner</th>
                    <th>Result</th>
                </tr>
            </thead>
            <tbody>
                {gameResults.map((result, index) => (
                    <tr key={index}>
                        <td>Game {index + 1}</td>
                        <td>{result.winner}</td>
                        <td className={result.result === 'win' ? 'winner' : result.result === 'lose' ? 'loser' : 'draw'}>
                            {result.result.toUpperCase()}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
} 