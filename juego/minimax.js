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
    