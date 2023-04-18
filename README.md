# PostgreSQL migrations

Super simple PostgreSQL migrations for postgres in Deno

## Migrate

```ts
import { migrate } from "https://deno.land/x/postgres_migrations@1.0.0/mod.ts";
```

## Usage

``` ts
import { migrate } from "https://deno.land/x/postgres_migrations@1.0.0/mod.ts";

await migrate("postgres://johndoe:secret@localhost:5432/example", {
  path: "./db/migrations"
});
```
