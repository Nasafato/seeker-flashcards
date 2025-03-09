"use client";

import { useTransition } from "react";
import { MoreVertical } from "lucide-react";
import * as C from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/lib/models";
import { cn } from "@/lib/utils"; 

export function DeckCard({
  card,
  onDeleteRequested,
}: {
  card: Card;
  onDeleteRequested: () => Promise<void>;
}) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      await onDeleteRequested();
    });
  };

  return (
    <C.Card key={card.id} className={cn({ "opacity-50": isPending })}>
      <C.CardContent className="p-6 space-y-4">
        <div className="flex justify-between items-start">
          <p>{card.front}</p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open options</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleDelete}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Separator />
        <p className="text-sm text-muted-foreground">{card.back}</p>
      </C.CardContent>
    </C.Card>
  );
  return <div>{card.front}</div>;
}
