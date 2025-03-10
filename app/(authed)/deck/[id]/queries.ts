import { client } from "@/lib/gel";
import e from "@/dbschema/edgeql-js";

export async function getDeck({ id }: { id: string }) {
  return await e
    .select(e.Deck, (deck) => ({
      filter_single: e.op(deck.id, "=", e.uuid(id)),
      id: true,
      name: true,
      description: true,
      cards: e.select(deck.cards, (card) => ({
        id: true,
        front: true,
        back: true,
        order_by: card.order,
      })),
    }))
    .run(client);
}