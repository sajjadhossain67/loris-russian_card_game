"use client";

import { Card as GameCard } from '@/lib/game';
import { cn } from '@/lib/utils';

interface PlayingCardProps {
  card: GameCard;
  onClick?: () => void;
  isPlayable?: boolean;
  className?: string;
}

export function PlayingCard({ card, onClick, isPlayable = true, className }: PlayingCardProps) {
  const getSuitColor = (suit: string) => {
    return suit === 'hearts' || suit === 'diamonds' ? 'text-red-500' : 'text-gray-900';
  };

  const getSuitSymbol = (suit: string) => {
    switch (suit) {
      case 'hearts': return '♥';
      case 'diamonds': return '♦';
      case 'clubs': return '♣';
      case 'spades': return '♠';
      default: return '';
    }
  };

  return (
    <div
      onClick={isPlayable ? onClick : undefined}
      className={cn(
        'relative w-24 h-36 bg-white rounded-lg shadow-lg cursor-pointer transform transition-transform hover:scale-105',
        !isPlayable && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      <div className="absolute inset-2 flex flex-col">
        <div className={cn('text-lg font-bold', getSuitColor(card.suit))}>
          {card.isJoker ? 'JOKER' : card.value}
        </div>
        <div className={cn('text-2xl', getSuitColor(card.suit))}>
          {card.isJoker ? '🃏' : getSuitSymbol(card.suit)}
        </div>
      </div>
    </div>
  );
}