// Game constants and types
export type Suit = 'hearts' | 'diamonds' | 'spades' | 'clubs';
export type CardValue = '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';
export type Card = {
  suit: Suit;
  value: CardValue;
  isJoker?: boolean;
};

export type Player = {
  id: number;
  name: string;
  hand: Card[];
  team: 1 | 2;
};

export type GameState = {
  deck: Card[];
  players: Player[];
  currentTrick: Card[];
  trumpSuit: Suit | null;
  currentPlayer: number;
  currentBid: number;
  scores: { team1: number; team2: number };
  gamePhase: 'bidding' | 'playing' | 'scoring';
};

// Initialize deck
export function initializeDeck(): Card[] {
  const suits: Suit[] = ['hearts', 'diamonds', 'spades', 'clubs'];
  const values: CardValue[] = ['4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  const deck: Card[] = [];

  suits.forEach(suit => {
    values.forEach(value => {
      deck.push({ suit, value });
    });
  });

  // Add Joker
  deck.push({ suit: 'clubs', value: '3', isJoker: true });

  return shuffleDeck(deck);
}

// Shuffle deck using Fisher-Yates algorithm
export function shuffleDeck(deck: Card[]): Card[] {
  const newDeck = [...deck];
  for (let i = newDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
  }
  return newDeck;
}

// Deal cards to players
export function dealCards(deck: Card[]): Player[] {
  const players: Player[] = [];
  const cardsPerPlayer = 8;

  for (let i = 0; i < 6; i++) {
    players.push({
      id: i + 1,
      name: `Player ${i + 1}`,
      hand: deck.slice(i * cardsPerPlayer, (i + 1) * cardsPerPlayer),
      team: i % 2 === 0 ? 1 : 2,
    });
  }

  return players;
}

// Check if a card play is valid
export function isValidPlay(
  card: Card,
  hand: Card[],
  currentTrick: Card[],
  isFirstTrick: boolean,
  isLastTrick: boolean,
  trumpSuit: Suit | null
): boolean {
  if (card.isJoker) {
    if (isFirstTrick && currentTrick.length === 0) return false;
    if (isLastTrick && currentTrick.length === 0) return false;
  }

  if (currentTrick.length === 0) return true;

  const leadSuit = currentTrick[0].suit;
  const hasLeadSuit = hand.some(c => c.suit === leadSuit);

  if (hasLeadSuit) {
    return card.suit === leadSuit;
  }

  return true;
}