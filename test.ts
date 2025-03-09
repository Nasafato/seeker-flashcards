import { createClient } from "gel";
import e from "@/dbschema/edgeql-js";

const client = createClient();

async function main() {
  console.log(await client.query("select 'Hello from Gel!';"));

  await e.insert(e.Deck, { name: "I am one" }).run(client);

  await e.insert(e.Deck, { name: "I am two" }).run(client);

  const decks = await e
    .select(e.Deck, () => ({
      id: true,
      name: true,
	  cards: {
		id: true,
		front: true,
		back: true,
	  }
    }))
    .run(client);

  console.table(decks);

  await e.delete(e.Deck).run(client);
}

main().then(
  () => process.exit(0),
  (err) => {
    console.error(err);
    process.exit(1);
  }
);