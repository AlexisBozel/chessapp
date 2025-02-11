"use client";
import { Card, Button } from "react-bootstrap";
import React from "react";

interface ControlProps {
  randomPick: string | null;
  selectedSquare: string | null;
  selectedSquareColor: string | null;
  startTimer: () => void;
  isTimerRunning: boolean;
  countdown: number | null;
  isCountingDown: boolean;
}

const ControlPane = ({ randomPick, selectedSquare, startTimer, isTimerRunning, countdown, isCountingDown }: ControlProps) => {
  return (
    <div className="flex justify-center items-center">
      <Card className="p-4 justify-center shadow">
        <Card.Body>
          <Card.Text>
            <strong>Démarrage dans :</strong> {isCountingDown ? countdown : ""}
          </Card.Text>
          <Card.Text>
            <strong>Temps restant :</strong> {isTimerRunning ? countdown : "30"}
          </Card.Text>

          <Button
            onClick={startTimer}
            className={`w-full mt-2 py-2 ${isTimerRunning ? "bg-red-600" : "bg-green-600"} text-white rounded-lg`}
          >
            {isTimerRunning ? "Stop" : "Start"}
          </Button>

          <Card.Text className="text-success">
            ✅ <strong>Case à sélectionner :</strong> {randomPick || null}
          </Card.Text>
          <Card.Text>
            ❌ <strong>Case choisie :</strong> {selectedSquare || null}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ControlPane;