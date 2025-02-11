"use client";
import React from "react";

interface ChessboardProps {
  onSquareClick: (square: string) => void;
  selectedSquare: string | null;
  selectedSquareColor: string | null;
}

const Chessboard: React.FC<ChessboardProps> = ({ onSquareClick, selectedSquare, selectedSquareColor }) => {
  const boardSize = 8;
  const columns = ["a", "b", "c", "d", "e", "f", "g", "h"];

  return (
    <div className="flex justify-center items-center">
      <div className="grid grid-cols-8 w-96 h-96">
        {[...Array(boardSize * boardSize)].map((_, index) => {
          const row = Math.floor(index / boardSize);
          const col = index % boardSize;
          const isGreen = (row + col) % 2 === 1;
          const squareName = `${columns[col]}${8 - row}`;

          // Appliquer la couleur si la case est sélectionnée
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
    </div>
  );
};

export default Chessboard;
