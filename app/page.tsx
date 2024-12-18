"use client";

import { useState, useEffect } from 'react';
import { Card as GameCard, GameState, initializeDeck, dealCards } from '@/lib/game';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PlayingCard } from '@/components/playing-card';
import { GameBoard } from '@/components/game-board';
import { BiddingPhase } from '@/components/bidding-phase';
import { PlayingPhase } from '@/components/playing-phase';
import { ScoreBoard } from '@/components/score-board';

export default function Home() {
  const [gameState, setGameState] = useState<GameState | null>(null);

  const startNewGame = () => {
    const deck = initializeDeck();
    const players = dealCards(deck);
    
    setGameState({
      deck,
      players,
      currentTrick: [],
      trumpSuit: null,
      currentPlayer: 0,
      currentBid: 0,
      scores: { team1: 0, team2: 0 },
      gamePhase: 'bidding'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Loris Card Game</h1>
          <p className="text-xl text-gray-300 mb-8">6-Player Russian Call Bridge with Jokers</p>
          
          {!gameState && (
            <Button 
              size="lg"
              onClick={startNewGame}
              className="bg-primary hover:bg-primary/90"
            >
              Start New Game
            </Button>
          )}
        </div>

        {gameState && (
          <div className="space-y-8">
            <ScoreBoard scores={gameState.scores} />
            
            {gameState.gamePhase === 'bidding' && (
              <BiddingPhase 
                gameState={gameState}
                onBidComplete={(bid, trump) => {
                  setGameState(prev => prev ? {
                    ...prev,
                    currentBid: bid,
                    trumpSuit: trump,
                    gamePhase: 'playing'
                  } : null);
                }}
              />
            )}
            
            {gameState.gamePhase === 'playing' && (
              <PlayingPhase
                gameState={gameState}
                onTrickComplete={(winner) => {
                  // Handle trick completion logic
                }}
              />
            )}
            
            <GameBoard gameState={gameState} />
          </div>
        )}
      </div>
    </div>
  );
}