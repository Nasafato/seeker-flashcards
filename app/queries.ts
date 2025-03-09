import e from "@/dbschema/edgeql-js";
import { client } from "@/lib/gel";

export async function getDecks() {
  return await e.select(e.Deck, (d) => ({
    id: true,
    name: true,
    description: true,
    cards: e.select(d.cards, c => ({
      id: true,
      front: true,
      back: true,
      order_by: c.order
    })),
    order_by: {
      expression: d.created_at,
      direction: e.DESC,
    },
  })).run(client);
}
