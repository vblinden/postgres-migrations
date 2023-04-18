# PostgreSQL migrations

Super simple PostgreSQL migrations for postgres in Deno

## Import
```ts
import { migrate } from "https://deno.land/x/postgres_migrations@v1.1.0/mod.ts";
```

## Migrate

The `migrate` function will look (if not specified otherwise via options) in the migrations folder for `.sql` files. It's up to you how you sort your `.sql` files. An example is:

```
migrations\
  1_create_users_table.sql
  2_create_posts_table.sql
  3_alter_users_table_with_role.sql
```

## Usage

``` ts
import postgres from "https://deno.land/x/postgresjs@v3.3.4/mod.js";
import { migrate } from "https://deno.land/x/postgres_migrations@v1.1.0/mod.ts";

const sql = postgres("postgres://johndoe:secret@localhost:5432/example");

await migrate(sql, {
  path: "./db/migrations"
});
```
