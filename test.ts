import postgres from "https://deno.land/x/postgresjs@v3.3.4/mod.js";
import { migrate } from "./migrate.ts";

Deno.test("migrate with custom path", async () => {
  const sql = postgres("postgres://postgres:secret@localhost:5432/migrations");
  await migrate(sql, {
    path: "./test",
  });
  await sql.end({ timeout: 5 });
});
