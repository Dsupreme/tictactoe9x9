import "./Board.css";

export interface BoardProps {
  boards: any;
  handleCellClick: any;
}

const Board = ({ boards, handleCellClick }: BoardProps) => {
  return (
    <div className="board">
      {boards.map((b: any, bId: number) => (
        <div key={bId} className="mini-board">
          <div
            className={`
                ${b.isActive ? "active" : "disabled"} 
                ${b.winner == "X" ? "winner-x" : ""} 
                ${b.winner == "O" ? "winner-o" : ""}
            `}
          >
            {b.board.map((cell: any, cId: number) => (
              <div
                key={cId}
                className="cell"
                onClick={() => handleCellClick(bId, cId)}
              >
                {cell}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Board;
