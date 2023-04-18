interface Options {
  path: string;
}

interface Migration {
  id: number;
  path: string;
  name: string;
}

export type { Migration, Options };
