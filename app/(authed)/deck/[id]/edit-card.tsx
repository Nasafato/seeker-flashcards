import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export function EditCard({
  deckId,
  onSubmit,
  initialData,
}: {
  deckId: string;
  onSubmit: (formData: FormData) => Promise<void>;
  initialData?: { front: string; back: string };
}) {
  return (
    <form action={onSubmit}>
      <input type="hidden" name="deckId" value={deckId} />
      <Card>
        <CardHeader>
          <CardTitle>{initialData ? "Edit Card" : "New Card"}</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <Input name="front" placeholder="Front" defaultValue={initialData?.front} />
          <Separator />
          <Input name="back" placeholder="Back" defaultValue={initialData?.back} />
        </CardContent>
        <CardFooter>
          <Button type="submit">{initialData ? "Update Card" : "Add Card"}</Button>
        </CardFooter>
      </Card>
    </form>
  );
}
