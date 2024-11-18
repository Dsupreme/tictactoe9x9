import { useState } from "react";

import "./App.css";
import Board, { BoardProps } from "./components/Board";

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2],
];

const createBoards = () => {
  return new Array(9).fill(0).map(() => ({
    board: new Array(9).fill(undefined),
    winner: undefined,
    isActive: true,
  }));
};

function App() {
  const [boards, setBoards] = useState(createBoards());
  const [nextMove, setNextMove] = useState(true);
  const [gameState, setGameState] = useState({
    xWins: 0,
    oWins: 0,
    inProgress: true,
  });

  // console.log(boards);

  const updateMiniBoardWinner = (boardsArr: BoardProps, boardIdx: number) => {
    const board = boardsArr[boardIdx];
    if (!!board.winner) {
      return boardsArr;
    }
    let b = board.board;
    let winner = winConditions.find((c) => {
      if (
        b[c[0]] == b[c[1]] &&
        b[c[0]] == b[c[2]] &&
        (b[c[0]] == "X" || b[c[0]] == "O")
      ) {
        return true;
      }
      return false;
    });
    if (!!winner) {
      board.winner = b[winner[0]];
    }
    return boardsArr;
  };

  const checkGameWinner = (b) => {
    let winner = winConditions.find((c) => {
      if (
        b[c[0]].winner == b[c[1]].winner &&
        b[c[0]].winner == b[c[2]].winner &&
        (b[c[0]].winner == "X" || b[c[0]].winner == "O")
      ) {
        return true;
      }
      return false;
    });
    console.log(winner);
    return winner ? { winner: b[winner[0]] } : null;
  };

  const onCellClick = (miniBoard: number, cell: number) => {
    let newBoards = JSON.parse(JSON.stringify(boards));
    newBoards[miniBoard].board[cell] = nextMove ? "X" : "O";
    newBoards.forEach((b, i) => {
      if (i == cell) {
        newBoards[i].isActive = true;
      } else {
        newBoards[i].isActive = false;
      }
    });
    console.log;
    newBoards = updateMiniBoardWinner(newBoards, miniBoard);
    const winner = checkGameWinner(newBoards);
    if (winner) console.log(winner);
    setBoards(newBoards);
    setNextMove(!nextMove);
  };

  const reset = () => {
    setBoards(createBoards());
    setNextMove(true);
    setGameState({
      ...gameState,
      inProgress: true,
    });
  };

  return (
    <>
      <h1 className="mb-4">Tic Tac Toe Advanced</h1>
      <div className="w-full bg-blue-500 text-lg text-white">
        {nextMove ? "X" : "O"}'s turn to play next
      </div>
      <Board boards={boards} handleCellClick={onCellClick} />
    </>
  );
}

export default App;
