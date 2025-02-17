"use client";
import React, { useState } from "react";
import { Card } from "react-bootstrap";

interface ChessboardProps {
  onSquareClick: (square: string) => void;
  selectedSquare: string | null;
  selectedSquareColor: string | null;
}

const Chessboard: React.FC<ChessboardProps> = ({ onSquareClick, selectedSquare, selectedSquareColor }) => {
  const [isReversed, setIsReversed] = useState(false);

  const boardSize = 8;
  const columns = isReversed ? ["h", "g", "f", "e", "d", "c", "b", "a"] : ["a", "b", "c", "d", "e", "f", "g", "h"];
  const rows = isReversed ? [1, 2, 3, 4, 5, 6, 7, 8] : [8, 7, 6, 5, 4, 3, 2, 1];

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="grid grid-cols-8 w-96 h-96">
        {[...Array(boardSize * boardSize)].map((_, index) => {
          const row = Math.floor(index / boardSize);
          const col = index % boardSize;
          const isGreen = (row + col) % 2 === 1;
          const squareName = `${columns[col]}${rows[row]}`;

          let squareColor = isGreen ? "bg-green-600" : "bg-white";
          if (selectedSquare === squareName) {
            squareColor = selectedSquareColor === "blue" ? "bg-blue-500" : "bg-red-500";
          }

          return (
            <div
              key={index}
              className={`w-12 h-12 border border-black flex justify-center items-center cursor-pointer ${squareColor}`}
              onClick={() => onSquareClick(squareName)}
            />
          );
        })}
      </div>

      <div className="flex justify-center mt-10">
        <Card className="p-4 justify-center shadow">
          <Card.Body>
            <Card.Text>
              <strong> {isReversed ? "White view" : "Black view"}</strong>
            </Card.Text>
            <button
              className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-600"
              onClick={() => setIsReversed(!isReversed)}
              >
              Change view
          </button>
          </Card.Body>
        </Card>
      </div>


    </div>
  );
};

export default Chessboard;
