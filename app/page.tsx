import Link from "next/link";
import { PlayIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Header } from "@/components/header";
import { PageContainer } from "@/components/page-container";
import { ImportButton } from "./import-button";

import { getDecks } from "./queries";

export default async function Page() {
  const decks = await getDecks();

  return (
    <>
      <Header pageTitle="Decks" actions={<ImportButton />} />
      <PageContainer>
        <div className="p-2 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {decks.length === 0 && (
            <div className="col-span-full">
              <p className="text-center text-muted-foreground">
                No decks found. Try importing a deck from a JSON file by
                clicking the Import JSON button above.
              </p>
            </div>
          )}
          {decks.map((deck) => (
            <Card key={deck.id}>
              <CardHeader>
                <CardTitle>
                  <Link className="underline" href={`/deck/${deck.id}`}>
                    {deck.name}
                  </Link>
                </CardTitle>
                {deck.description && (
                  <CardDescription className="line-clamp-3">
                    {deck.description}
                  </CardDescription>
                )}
              </CardHeader>
              <CardFooter className="flex gap-2 justify-end">
                <Button asChild>
                  <Link href={`/deck/${deck.id}/play`}>
                    <PlayIcon />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </PageContainer>
    </>
  );
}
