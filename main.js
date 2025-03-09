import { createClient } from "gel";

const client = createClient();

console.log(
  await client.query("select 42;")
);

console.log(
  await client.query("insert Deck { name := 'Test Deck' };")
)

console.log(
  await client.query("select Deck;")
);
