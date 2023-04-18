interface Options {
  path: string;
}

interface Migration {
  path: string;
  name: string;
}

export type { Migration, Options };
