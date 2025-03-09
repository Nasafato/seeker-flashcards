"use server";

import { client } from "@/lib/gel";
import e from "@/dbschema/edgeql-js";
import { revalidatePath } from "next/cache";
import { RawJSONDeck } from "@/lib/models";

export async function importDeck(formData: FormData) {
  const file = formData.get("file") as File;
  const rawDeck = JSON.parse(await file.text()) as RawJSONDeck;
  const deck = {
    ...rawDeck,
    cards: rawDeck.cards.map((card, index) => ({
      ...card,
      order: index,
    })),
  };
  await e
    .params(
      {
        name: e.str,
        description: e.optional(e.str),
        cards: e.array(e.tuple({ front: e.str, back: e.str, order: e.int64 })),
      },
      (params) =>
        e.insert(e.Deck, {
          name: params.name,
          description: params.description,
          cards: e.for(e.array_unpack(params.cards), (card) =>
            e.insert(e.Card, {
              front: card.front,
              back: card.back,
              order: card.order,
            })
          ),
        })
    )
    .run(client, deck);

  revalidatePath("/");
}