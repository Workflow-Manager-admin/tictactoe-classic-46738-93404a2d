import React, { useState } from 'react';

// PUBLIC_INTERFACE
export default function MainContainer() {
  /**
   * A minimalist, centered TicTacToe game container.
   * - Two player local mode (X/O)
   * - Win/draw detection
   * - Game restart function
   * Color scheme:
   *   background: #fff, 
   *   text: #000, 
   *   accent: #2196f3
   */

  // Game state
  const emptyBoard = Array(9).fill(null);
  const [board, setBoard] = useState(emptyBoard);
  const [xIsNext, setXIsNext] = useState(true);
  const [status, setStatus] = useState('playing'); // 'playing', 'won', 'draw'
  const [winner, setWinner] = useState(null);

  // Helper: calculate winner or draw
  // PUBLIC_INTERFACE
  function calculateWinner(bd) {
    /**
     * Returns 'X', 'O' or null if no winner
     */
    const lines = [
      [0,1,2], [3,4,5], [6,7,8], // horizontals
      [0,3,6], [1,4,7], [2,5,8], // verticals
      [0,4,8], [2,4,6]           // diagonals
    ];
    for (let line of lines) {
      const [a,b,c] = line;
      if (bd[a] && bd[a] === bd[b] && bd[a] === bd[c]) {
        return bd[a];
      }
    }
    return null;
  }

  // PUBLIC_INTERFACE
  function handleClick(idx) {
    /**
     * Handles clicking on a cell.
     */
    if (board[idx] || status !== 'playing') return;
    const nextBoard = board.slice();
    nextBoard[idx] = xIsNext ? 'X' : 'O';
    const newWinner = calculateWinner(nextBoard);
    let newStatus;
    let newWinnerState = winner;

    if (newWinner) {
      newStatus = 'won';
      newWinnerState = newWinner;
    } else if (nextBoard.every(cell => cell)) {
      newStatus = 'draw';
      newWinnerState = null;
    } else {
      newStatus = 'playing';
      newWinnerState = null;
    }
    setBoard(nextBoard);
    setXIsNext(!xIsNext);
    setStatus(newStatus);
    setWinner(newWinnerState);
  }

  // PUBLIC_INTERFACE
  function handleRestart() {
    /**
     * Resets game to initial state.
     */
    setBoard(emptyBoard);
    setXIsNext(true);
    setStatus('playing');
    setWinner(null);
  }

  // UI construction
  let statusText = '';
  if (status === 'won') {
    statusText = `Player ${winner} wins!`;
  } else if (status === 'draw') {
    statusText = `It's a draw!`;
  } else {
    statusText = `Player ${xIsNext ? 'X' : 'O'}'s turn`;
  }

  // Styling
  // (inline for clarity; could use .css for prod)
  const colors = {
    bg: '#ffffff',
    text: '#000000',
    accent: '#2196f3'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 60px)',
    gridTemplateRows: 'repeat(3, 60px)',
    gap: '12px',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '24px 0'
  };

  const cellStyle = idx => ({
    width: '60px',
    height: '60px',
    fontSize: '2rem',
    fontWeight: 500,
    color: board[idx] === 'X' ? colors.accent : colors.text,
    border: `2px solid ${colors.accent}`,
    background: colors.bg,
    cursor: board[idx] || status !== 'playing' ? 'default' : 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    transition: 'background 0.1s'
  });

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100dvh',
    background: colors.bg
  };

  const statusStyle = {
    fontSize: '1.3rem',
    fontWeight: 600,
    color: colors.accent,
    marginBottom: '12px',
    letterSpacing: '0.03em'
  };

  const buttonStyle = {
    marginTop: '22px',
    padding: '8px 26px',
    fontSize: '1rem',
    fontWeight: 500,
    border: 'none',
    borderRadius: '6px',
    background: colors.accent,
    color: colors.bg,
    cursor: 'pointer',
    transition: 'background 0.15s'
  };

  return (
    <div style={containerStyle}>
      <div style={statusStyle} role="status" aria-live="polite">{statusText}</div>
      <div style={gridStyle} aria-label="TicTacToe board">
        {board.map((cell, idx) => (
          <button
            key={idx}
            style={cellStyle(idx)}
            onClick={() => handleClick(idx)}
            aria-label={`cell ${idx%3+1}, row ${Math.floor(idx/3)+1}`}
            disabled={!!cell || status !== 'playing'}
          >
            {cell}
          </button>
        ))}
      </div>
      <button style={buttonStyle} onClick={handleRestart}>Reset</button>
    </div>
  );
}
