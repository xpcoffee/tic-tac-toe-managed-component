import React from 'react';
import { createRoot } from 'react-dom/client';

function TicTacToe() {
  return <h1>Hello from React!</h1>;
}

const domNode = document.getElementById('tic-tac-toe');
if(domNode) {
    const root = createRoot(domNode);
    root.render(<TicTacToe />);
}