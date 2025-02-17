"use client";
import React, { useState, useEffect } from "react";
import Chessboard from "@/components/Chessboard";
import Statsboard from "@/components/StatsBoard";
import ControlPane from "@/components/Controlboard";

const getRandomSquare = (): string => {
  const columns = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const row = Math.floor(Math.random() * 8) + 1;
  const col = columns[Math.floor(Math.random() * 8)];
  return `${col}${row}`;
};

const PickTheSquarePage = () => {
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
  const [randomPick, setRandomPick] = useState<string>(getRandomSquare());
  const [selectedSquareColor, setSelectedSquareColor] = useState<string | null>(null);
  const [attempts, setAttempts] = useState<number>(0);
  const [correctPick, setCorrectPick] = useState<number>(0);
  const [incorrectPick, setIncorrectPick] = useState<number>(0);
  const [countdown, setCountdown] = useState<number | null>(30);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [isCountingDown, setIsCountingDown] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isTimerRunning && countdown !== null) {
      if (countdown > 0) {
        timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      } else {
        setIsTimerRunning(false); // Arrête le timer quand il atteint 0
      }
    }

    return () => clearTimeout(timer);
  }, [countdown, isTimerRunning]);

  useEffect(() => {
    if (selectedSquare && isTimerRunning) {
      setAttempts((prev) => prev + 1); // Incrémenter le nombre de tentatives

      if (selectedSquare === randomPick) {
        setCorrectPick((prev) => prev + 1); // Incrémenter les réussites
        setSelectedSquareColor("blue");

        setTimeout(() => {
          setRandomPick(getRandomSquare()); // Nouvelle case cible
          setSelectedSquare(null);
          setSelectedSquareColor(null);
        }, 1000);
      } else {
        setIncorrectPick((prev) => prev + 1); // Incrémenter les échecs
        setSelectedSquareColor("red");
      }
    }
  }, [selectedSquare, randomPick, isTimerRunning]);

  const startGame = () => {
    setIsCountingDown(true);
    setCountdown(3); // Décompte avant le départ

    const countdownTimer = setInterval(() => {
      setCountdown((prev) => {
        if (prev !== null && prev > 1) {
          return prev - 1;
        } else {
          clearInterval(countdownTimer);
          setIsCountingDown(false);
          setCountdown(30); // Temps du jeu
          setIsTimerRunning(true);
          return 30;
        }
      });
    }, 2000);
  };


  const stopGame = () => {
    setIsTimerRunning(false);
    setCountdown(30);
    resetGame();
  };

  const resetGame = () => {
    setRandomPick(getRandomSquare());
    setSelectedSquare(null);
    setSelectedSquareColor(null);
    setAttempts(0);
    setCorrectPick(0);
    setIncorrectPick(0);
    setCountdown(30);
    setIsTimerRunning(false);
    setIsCountingDown(false);
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-center mt-40 mb-16">Select the right square</h1>

      <section className="flex items-center justify-center mb-10">
        <div className="flex w-full max-w-6xl justify-between px-4">
          {/* Contrôles */}
          <div className="flex w-1/4 flex-col items-center">
            <ControlPane
              randomPick={randomPick}
              selectedSquare={selectedSquare}
              selectedSquareColor={selectedSquareColor}
              startTimer={isTimerRunning ? stopGame : startGame}
              isTimerRunning={isTimerRunning}
              countdown={countdown}
              isCountingDown={isCountingDown}
            />
          </div>

          {/* Échiquier */}
          <div className="flex w-1/2 justify-center mb-10">
            <Chessboard
              onSquareClick={isTimerRunning ? setSelectedSquare : () => {}}
              selectedSquare={selectedSquare}
              selectedSquareColor={selectedSquareColor}
            />
          </div>

          {/* Statistiques */}
          <div className="flex w-1/4 flex-col items-center">
            <Statsboard attempts={attempts} correctPick={correctPick} incorrectPick={incorrectPick} />
          </div>
        </div>
      </section>
    </>
  );
};

export default PickTheSquarePage;
