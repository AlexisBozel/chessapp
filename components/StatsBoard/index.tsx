"use client";
import { Card } from "react-bootstrap";
import React from "react";

interface StatsboardProps {
  attempts: number | 0;
  correctPick: number | 0;
  incorrectPick: number | 0;
}

const Statsboard = ({ attempts, correctPick, incorrectPick }: StatsboardProps) => {
  return (
    <div className="flex justify-center items-center">
      <Card className="p-4 justify-center shadow">
        <Card.Body>
          <Card.Text>
            <strong>Total attempts :</strong> {attempts}
          </Card.Text>
          <Card.Text className="text-success">
            ✅ <strong>Correct :</strong> {correctPick}
          </Card.Text>
          <Card.Text className="text-danger">
            ❌ <strong>Failure :</strong> {incorrectPick}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Statsboard;
