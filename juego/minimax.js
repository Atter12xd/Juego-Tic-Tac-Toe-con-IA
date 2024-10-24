function minimax(newBoard, player) {
    const availableSpots = newBoard.reduce((acc, curr, index) => {
        if (curr === '') acc.push(index);
        return acc;
    }, []);

    if (checkWin(newBoard, 'O')) {
        return { score: -10 };
    } else if (checkWin(newBoard, 'X')) {
        return { score: 10 };
    } else if (availableSpots.length === 0) {
        return { score: 0 };
    }

    const moves = [];
    for (let i = 0; i < availableSpots.length; i++) {
        const move = {};
        move.index = availableSpots[i];
        newBoard[move.index] = player;

        const result = minimax(newBoard, player === 'X' ? 'O' : 'X');
        move.score = result.score;

        newBoard[move.index] = ''; // Reset the spot
        moves.push(move);
    }

    let bestMove;
    if (player === 'X') {
        let bestScore = -1000;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        let bestScore = 1000;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }

    return moves[bestMove] || { index: availableSpots[0], score: 0 }; // Fallback for edge cases
}

function checkWin(board, player) {
    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    
    return winningConditions.some(condition => {
        return condition.every(index => board[index] === player);
    });
}
    
