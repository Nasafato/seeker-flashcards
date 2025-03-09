"use server";
import { revalidatePath } from "next/cache";
import { client } from "@/lib/gel";
import e from "@/dbschema/edgeql-js";
import { Deck } from "@/lib/models";
import { z } from "zod";

const updateDeckSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  description: z.string().optional(),
});

export async function updateDeck(formData: FormData) {
  const id = formData.get("id");
  const name = formData.get("name");
  const description = formData.get("description");

  const parsed = updateDeckSchema.safeParse({ id, name, description });
  if (!parsed.success) {
    throw new Error("Invalid form data");
  }

  const nameSet = parsed.data.name ? { name: parsed.data.name } : {};
  const descriptionSet = parsed.data.description
    ? { description: parsed.data.description }
    : {};

  await e
    .update(e.Deck, (d) => ({
      filter_single: e.op(d.id, "=", e.uuid(parsed.data.id)),
      set: {
        ...nameSet,
        ...descriptionSet,
      },
    })).run(client);
  revalidatePath(`/deck/${id}`);
}

const addCardSchema = z.object({
  deckId: z.string(),
  front: z.string(),
  back: z.string(),
});

export async function addCard(formData: FormData) {
  const deckId = formData.get("deckId");
  const front = formData.get("front");
  const back = formData.get("back");

  const parsed = addCardSchema.safeParse({ deckId, front, back });
  if (!parsed.success) {
    throw new Error("Invalid form data");
  }



  await e.params({
    front: e.str,
    back: e.str,
    deckId: e.uuid,
  }, (params) => {
    const deck = e.assert_exists(e.select(e.Deck, d => ({
      filter_single: e.op(d.id, "=", params.deckId),
    })));
    const order = e.cast(e.int64, e.max(deck.cards.order));
    const card = e.insert(e.Card, {
      front: params.front,
      back: params.back,
      order: e.op(order, "+", 1),
    });
    return e.update(deck, d => ({ set: { cards: { "+=": card } } }));
  }).run(client, parsed.data);

  revalidatePath(`/deck/${deckId}`);
}

const deleteCardSchema = z.object({
  cardId: z.string(),
});

export async function deleteCard(formData: FormData) {
  const cardId = formData.get("cardId");
  const parsed = deleteCardSchema.safeParse({ cardId });
  if (!parsed.success) {
    throw new Error("Invalid form data");
  }

  await e.params({ id: e.uuid }, (params) => {
    return e.delete(e.Card, c => ({
      filter_single: e.op(c.id, "=", params.id),
    }))
  }).run(client, { id: parsed.data.cardId });

  revalidatePath(`/`);
}