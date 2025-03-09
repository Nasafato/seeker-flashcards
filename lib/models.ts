export interface RawJSONCard {
  front: string;
  back: string;
}

export interface RawJSONDeck {
  name: string;
  description: string | null;
  cards: RawJSONCard[];
}

export interface Card extends RawJSONCard {
  id: string;
}

export interface Deck extends RawJSONDeck {
  id: string;
  cards: Card[];
}

