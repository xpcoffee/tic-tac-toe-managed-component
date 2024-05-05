import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import "./styles.css"

/**
 * Core tic-tac-toe UX
 * 
 * This component does:
 *  - hold game state
 *  - display game state
 *  - register player moves
 *  - request opponent moves from a backend
 * 
 * This component does NOT:
 *  - hold any game logic/rules. That is handled by the backend.
 *  - decide the opponent's moves. That is handled by the backend.
 */
export const TicTacToe: React.FC = () => {
    const [currentPlayer, setCurrentPlayer] = useState<PlayerType>(X)
    const [loadingOpponentMove, setLoadingOpponentMove] = useState(false)
    const [boardState, setBoardState] = useState<BoardState>(Array(9).fill(null))
    const [gameStatus, setGameStatus] = useState<string>("active")

    const isBoardEmpty = !boardState.find(value => value != null)

    const getNewBoardState = (moveIndex: number): BoardState => {
        const newState = [...boardState]
        newState[moveIndex] = currentPlayer
        return newState
    }

    /**
     * Register the player's move, then get the opponent's move.
     */
    const playMove = (moveIndex: number) => {
        setLoadingOpponentMove(true)
        const nextState = getNewBoardState(moveIndex)
        const nextPlayer = getNextPlayer(currentPlayer)
        setBoardState(nextState)
        setCurrentPlayer(nextPlayer)

        getOpponentMove({ board: { state: nextState }, playerToMove: nextPlayer })
            .then(({ board }) => {
                setBoardState(board.state)
                setCurrentPlayer(getNextPlayer(nextPlayer))
                setGameStatus(board.status)
                setLoadingOpponentMove(false)
            })
    }

    return <div className="container">
        <div>Current player: {valueToLabel(currentPlayer)}</div>

        <div className="board">
            {
                boardState.map((value, index) => {
                    return <button
                        key={index}
                        className="gridTile"
                        disabled={loadingOpponentMove || value !== null || gameStatus !== "active"}
                        onClick={() => playMove(index)}>
                        {valueToLabel(value)}
                    </button>
                })
            }
        </div>

        <div>Game state: {gameStatus}</div>

        {
            isBoardEmpty && <div>
                Choose your symbol:
                <button onClick={() => setCurrentPlayer(X)}>X</button>
                <button onClick={() => setCurrentPlayer(O)}>O</button>
            </div>
        }
    </div>
}

/**
 * Utilities
 */

const getNextPlayer = (currentPlayer: PlayerType): PlayerType => {
    return currentPlayer === X ? O : X
}

const getOpponentMove = async (request: { board: { state: BoardState }, playerToMove: PlayerType }) => {
    console.log({ request: JSON.stringify(request) })
    const response = await fetch("/webcm/tic-tac-toe/opponentMove", {
        method: "POST",
        body: JSON.stringify(request),
        headers: { ["content-type"]: "application/json" }
    })
    const payload = await response.json()
    return {
        board: payload
    }
}

const valueToLabel = (value: PlayerType | null): string => {
    switch (value) {
        case null:
            return ""
        case X:
            return "X"
        case O:
            return "O"
    }
}

/**
 * Types
 */

type BoardState = (PlayerType | null)[]
type PlayerType = typeof X | typeof O
const X = 1
const O = 0

/**
 * Initializing app
 */

const domNode = document.getElementById('tic-tac-toe');
if (domNode) {
    const root = createRoot(domNode);
    root.render(<TicTacToe />);
}
