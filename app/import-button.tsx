"use client";
import { Import } from "lucide-react";
import { Button } from "@/components/ui/button";

import { importDeck } from "./actions";

export function ImportButton() {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.form?.requestSubmit();
  };

  return (
    <form className="flex items-center gap-2" action={importDeck}>
      <Button asChild>
        <label htmlFor="file">
          <Import />
          <span>Import JSON</span>
        </label>
      </Button>
      <input
        className="hidden"
        type="file"
        id="file"
        name="file"
        onChange={handleFileChange}
        required
      />
    </form>
  );
}
