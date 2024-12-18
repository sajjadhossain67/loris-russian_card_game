"use client";

import { GameState, Card as GameCard, isValidPlay } from '@/lib/game';
import { PlayingCard } from './playing-card';
import { useState } from 'react';
import { Button } from './ui/button';

interface PlayingPhaseProps {
  gameState: GameState;
  onTrickComplete: (winner: number) => void;
}

export function PlayingPhase({ gameState, onTrickComplete }: PlayingPhaseProps) {
  const [selectedCard, setSelectedCard] = useState<GameCard | null>(null);
  const currentPlayer = gameState.players[gameState.currentPlayer];
  const isFirstTrick = gameState.currentTrick.length === 0;
  const isLastTrick = currentPlayer.hand.length === 1;

  const handleCardSelect = (card: GameCard) => {
    if (isValidPlay(card, currentPlayer.hand, gameState.currentTrick, isFirstTrick, isLastTrick, gameState.trumpSuit)) {
      setSelectedCard(card);
    }
  };

  const handlePlayCard = () => {
    if (!selectedCard) return;

    // Play card logic here
    // Update game state
    // Check if trick is complete
    // Determine winner if needed
    onTrickComplete(0); // Replace with actual winner
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">
          {currentPlayer.name}'s Turn
        </h3>
        {gameState.trumpSuit && (
          <p className="text-gray-400">
            Trump: {gameState.trumpSuit}
          </p>
        )}
      </div>

      <div className="flex justify-center gap-2">
        {currentPlayer.hand.map((card, index) => (
          <PlayingCard
            key={index}
            card={card}
            onClick={() => handleCardSelect(card)}
            isPlayable={isValidPlay(
              card,
              currentPlayer.hand,
              gameState.currentTrick,
              isFirstTrick,
              isLastTrick,
              gameState.trumpSuit
            )}
            className={selectedCard === card ? 'ring-2 ring-primary' : ''}
          />
        ))}
      </div>

      <div className="flex justify-center">
        <Button
          onClick={handlePlayCard}
          disabled={!selectedCard}
          className="w-32"
        >
          Play Card
        </Button>
      </div>
    </div>
  );
}