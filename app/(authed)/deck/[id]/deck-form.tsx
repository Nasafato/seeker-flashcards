"use client";

import { startTransition } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function DeckForm({
  deck,
  onSubmit,
}: {
  deck: { id: string; name: string; description: string | null };
  onSubmit: (formData: FormData) => Promise<void>;
}) {
  const onBlur =
    (property: string) =>
    (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const formData = new FormData();
      formData.set("id", deck.id);
      formData.set(property, event.target.value);
      startTransition(async () => {
        await onSubmit(formData);
      });
    };
  return (
      <div className="space-y-2">
        <Input
          type="text"
          name="name"
          defaultValue={deck.name}
          className="text-3xl font-bold focus-visible:ring-0"
          onBlur={onBlur("name")}
        />
        <Textarea
          name="description"
          defaultValue={deck.description ?? ""}
          rows={3}
          placeholder="Add a description..."
          className="resize-none bg-muted/40"
          onBlur={onBlur("description")}
        />
      </div>
  );
}
