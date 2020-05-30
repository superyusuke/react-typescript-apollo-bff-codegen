type Token = string;

type Item = {
  name: string,
  id: number}

type DB = {
  items: Item[]
  currentId: number
}

export type Context = {
  token: Token;
  db: DB
};
