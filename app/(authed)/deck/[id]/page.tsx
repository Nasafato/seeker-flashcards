import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { PageContainer } from "@/components/page-container";
import { EditCard } from "./edit-card";
import { DeckCard } from "./deck-card";
import { DeckForm } from "./deck-form";

import { updateDeck, addCard, deleteCard } from "./actions";
import { getDeck } from "./queries";

export default async function DeckPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const deck = await getDeck({ id });

  if (!deck) {
    notFound();
  }

  return (
    <>
      <Header pageTitle={deck.name} actions={null} />
      <PageContainer>
        <div className="mb-4">
          <DeckForm deck={deck} onSubmit={updateDeck} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {deck.cards.map((card) => (
            <DeckCard
              key={card.id}
              card={card}
              onDeleteRequested={async () => {
                "use server";
                const formData = new FormData();
                formData.set("cardId", card.id);
                await deleteCard(formData);
              }}
            />
          ))}
          <EditCard deckId={deck.id} onSubmit={addCard} />
        </div>
      </PageContainer>
    </>
  );
}
