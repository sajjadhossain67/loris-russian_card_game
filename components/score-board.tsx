"use client";

import { Card } from './ui/card';

interface ScoreBoardProps {
  scores: {
    team1: number;
    team2: number;
  };
}

export function ScoreBoard({ scores }: ScoreBoardProps) {
  return (
    <Card className="p-6 bg-gray-800 border-gray-700">
      <div className="grid grid-cols-2 gap-8">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2 text-blue-400">Team 1</h3>
          <div className="text-3xl font-bold">{scores.team1}</div>
          <div className="text-sm text-gray-400 mt-1">Players 1, 3, 5</div>
        </div>
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2 text-red-400">Team 2</h3>
          <div className="text-3xl font-bold">{scores.team2}</div>
          <div className="text-sm text-gray-400 mt-1">Players 2, 4, 6</div>
        </div>
      </div>
    </Card>
  );
}