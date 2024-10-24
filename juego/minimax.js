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
