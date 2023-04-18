import { join } from "https://deno.land/std@0.183.0/path/mod.ts";
import postgres from "https://deno.land/x/postgresjs@v3.3.4/mod.js";
import { Migration, Options } from "./types.ts";

export async function migrate(
  sql: postgres.Sql<Record<string | number | symbol, never>>,
  options: Options = { path: "./migrations" } as Options,
) {
  try {
    await sql`select 'migrations'::regclass`;
  } catch {
    console.log("Migrations table creating");
    await sql`create table migrations (
      id serial primary key,
      name text,
      created_at timestamp with time zone not null default now()
    )`;
  }

  const migrations: Array<Migration> = [];
  for (const migration of Deno.readDirSync(options.path)) {
    if (migration.isDirectory) {
      continue;
    }

    migrations.push({
      id: Number(migration.name.slice(0, 6)),
      path: join(options.path, migration.name),
      name: migration.name,
    } as Migration);
  }

  const migrated = await sql`
    select name from migrations
  `;

  const migrationsNew = migrations.sort((a, b) => a.id - b.id).filter((
    migration,
  ) => !migrated.some((m) => m.name === migration.name));

  console.log(
    `Migrations detected (total: ${migrations.length}, new: ${migrationsNew.length})`,
  );

  for (const m of migrationsNew) {
    console.log(`Migrations running, ${m.name}`);

    await sql.file(m.path);
    await sql`
      insert into migrations (
        name
      ) values (
        ${m.name}
      )
    `;
  }

  console.log("Migrations done");
  console.log("");
}
