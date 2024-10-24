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