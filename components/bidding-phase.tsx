"use client";

import { useState } from 'react';
import { GameState, Suit } from '@/lib/game';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface BiddingPhaseProps {
  gameState: GameState;
  onBidComplete: (bid: number, trump: Suit) => void;
}

export function BiddingPhase({ gameState, onBidComplete }: BiddingPhaseProps) {
  const [currentBid, setCurrentBid] = useState<number>(4);
  const [selectedTrump, setSelectedTrump] = useState<Suit>('hearts');
  const [passes, setPasses] = useState<number>(0);

  const handleBid = () => {
    if (passes >= 5) {
      onBidComplete(currentBid, selectedTrump);
    } else {
      setCurrentBid(prev => Math.min(prev + 1, 7));
      setPasses(0);
    }
  };

  const handlePass = () => {
    setPasses(prev => prev + 1);
    if (passes + 1 >= 5) {
      onBidComplete(currentBid, selectedTrump);
    }
  };

  return (
    <Card className="p-6 bg-gray-800 border-gray-700">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-center">Bidding Phase</h2>
        
        <div className="flex items-center justify-center gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Current Bid: {currentBid}</label>
            <div className="flex gap-2">
              {[4, 5, 6, 7].map(bid => (
                <Button
                  key={bid}
                  variant={currentBid === bid ? "default" : "outline"}
                  onClick={() => setCurrentBid(bid)}
                  disabled={bid <= currentBid}
                >
                  {bid}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Trump Suit</label>
            <Select value={selectedTrump} onValueChange={(value: Suit) => setSelectedTrump(value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hearts">Hearts ♥</SelectItem>
                <SelectItem value="diamonds">Diamonds ♦</SelectItem>
                <SelectItem value="clubs">Clubs ♣</SelectItem>
                <SelectItem value="spades">Spades ♠</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <Button onClick={handleBid} className="w-24">
            Bid
          </Button>
          <Button variant="outline" onClick={handlePass} className="w-24">
            Pass
          </Button>
        </div>

        <div className="text-center text-sm text-gray-400">
          Passes: {passes}/5
        </div>
      </div>
    </Card>
  );
}