"use client";

import { GameState } from '@/lib/game';
import { PlayingCard } from './playing-card';

interface GameBoardProps {
  gameState: GameState;
}

export function GameBoard({ gameState }: GameBoardProps) {
  const { players, currentTrick, currentPlayer, trumpSuit } = gameState;

  return (
    <div className="relative w-full aspect-square bg-green-800 rounded-3xl shadow-2xl p-8">
      {/* Center trick area */}
      <div className="absolute inset-1/4 flex items-center justify-center">
        <div className="grid grid-cols-3 gap-4">
          {currentTrick.map((card, index) => (
            <PlayingCard
              key={index}
              card={card}
              isPlayable={false}
              className="transform rotate-45"
            />
          ))}
        </div>
      </div>

      {/* Player positions */}
      {players.map((player, index) => {
        const angle = (index * 60) * (Math.PI / 180);
        const radius = 40; // % of container
        const x = 50 + radius * Math.cos(angle);
        const y = 50 + radius * Math.sin(angle);

        return (
          <div
            key={player.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${x}%`,
              top: `${y}%`,
            }}
          >
            <div className="text-white text-center mb-2">
              <span className={`px-2 py-1 rounded ${player.team === 1 ? 'bg-blue-600' : 'bg-red-600'}`}>
                {player.name}
              </span>
            </div>
            {currentPlayer === index && (
              <div className="flex gap-2">
                {player.hand.map((card, cardIndex) => (
                  <PlayingCard
                    key={cardIndex}
                    card={card}
                    isPlayable={true}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}

      {/* Trump indicator */}
      {trumpSuit && (
        <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-lg shadow">
          <span className="font-bold">Trump:</span> {trumpSuit}
        </div>
      )}
    </div>
  );
}