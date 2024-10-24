function minimax(newBoard, player) {
    const availableSpots = newBoard.reduce((acc, curr, index) => {
        if (curr === '') acc.push(index);
        return acc;
    }, []);
    