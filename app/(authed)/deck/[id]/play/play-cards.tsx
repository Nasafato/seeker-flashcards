"use client";

import { useReducer, useCallback } from "react";
import { Card } from "@/lib/models";
import * as C from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ChevronLeft, ChevronRight, RotateCw } from "lucide-react";

interface CardHistoryState {
  cards: Card[];
  currentCardIndex: number;
  face: "front" | "back";
}

interface GoToCardHistoryAction {
  type: "goTo";
  index: number;
}

interface BackCardHistoryAction {
  type: "back";
}

interface ForwardCardHistoryAction {
  type: "forward";
}

interface FlipCardHistoryAction {
  type: "flip";
}

type CardHistoryAction =
  | FlipCardHistoryAction
  | BackCardHistoryAction
  | ForwardCardHistoryAction
  | GoToCardHistoryAction;

function cardHistoryReducer(
  state: CardHistoryState,
  action: CardHistoryAction
): CardHistoryState {
  switch (action.type) {
    case "flip":
      return {
        ...state,
        face: state.face === "front" ? "back" : "front",
      };
    case "back":
      return {
        ...state,
        currentCardIndex: Math.max(state.currentCardIndex - 1, 0),
        face: "front",
      };
    case "forward":
      return {
        ...state,
        currentCardIndex: Math.min(
          state.currentCardIndex + 1,
          state.cards.length - 1
        ),
        face: "front",
      };
    case "goTo":
      return {
        ...state,
        currentCardIndex: Math.max(
          0,
          Math.min(action.index, state.cards.length - 1)
        ),
        face: "front",
      };
    default:
      return state;
  }
}

function useCardHistory(cards: Card[]): {
  currentCard: Card;
  face: "front" | "back";
  back: () => void;
  forward: () => void;
  goTo: (index: number) => void;
  flip: () => void;
  currentIndex: number;
  length: number;
} {
  const [history, dispatch] = useReducer(cardHistoryReducer, {
    cards,
    currentCardIndex: 0,
    face: "front",
  });

  return {
    currentCard: history.cards[history.currentCardIndex],
    currentIndex: history.currentCardIndex,
    length: history.cards.length,
    face: history.face,
    back: useCallback(() => dispatch({ type: "back" }), [dispatch]),
    forward: useCallback(() => dispatch({ type: "forward" }), [dispatch]),
    flip: useCallback(() => dispatch({ type: "flip" }), [dispatch]),
    goTo: useCallback(
      (index: number) => dispatch({ type: "goTo", index }),
      [dispatch]
    ),
  };
}

export function PlayCards({ cards }: { cards: Card[] }) {
  const { currentCard, back, forward, flip, face, goTo, currentIndex, length } =
    useCardHistory(cards);

  return (
    <>
      <div className="flex items-center gap-2 mb-4">
        <Button onClick={back}>
          <ChevronLeft />
        </Button>
        <Slider
          className="grow"
          min={0}
          max={length - 1}
          step={1}
          value={[currentIndex]}
          onValueChange={(value) => goTo(value[0])}
        />
        <span className="shrink-0">
          {currentIndex + 1} / {length}
        </span>
        <Button onClick={flip}>
          <RotateCw />
        </Button>
        <Button onClick={forward}>
          <ChevronRight />
        </Button>
      </div>
      <C.Card>
        <C.CardHeader>
          <C.CardTitle>{face === "front" ? "Front" : "Back"}</C.CardTitle>
        </C.CardHeader>
        <C.CardContent>
          {face === "front" ? currentCard.front : currentCard.back}
        </C.CardContent>
      </C.Card>
    </>
  );
}
