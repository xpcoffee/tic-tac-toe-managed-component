import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

export const TicTacToe: React.FC = () => {
    const [boardState, setBoardState] = useState<(typeof O | typeof X |undefined)[]>(Array(9).fill(undefined))

    return <div className="container">
    <div className="board">
    {
        boardState.map((value, index) => {
            return <button key={index} className="gridTile" disabled={value !== undefined}>{valueToLabel(value)}</button>
        })
    }
    </div>
    </div>
}

const valueToLabel = (value?: typeof X | typeof O): string => {
    switch(value) {
        case undefined:
            return ""
        case X:
            return "X"
        case O:
            return "O"
    }
}

const X = 1
const O = 0

const domNode = document.getElementById('tic-tac-toe');
if(domNode) {
    const root = createRoot(domNode);
    root.render(<TicTacToe />);
}
