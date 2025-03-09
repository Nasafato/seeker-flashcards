import { notFound } from "next/navigation";

import { getDeck } from "../queries";
import { PlayCards } from "./play-cards";
import { Header } from "@/components/header";
import { PageContainer } from "@/components/page-container";

export default async function PlayPage({
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
        <div className="max-w-lg mx-auto">
          <PlayCards cards={deck.cards} />
        </div>
      </PageContainer>
    </>
  );
}
