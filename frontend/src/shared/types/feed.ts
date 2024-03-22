export interface Feed {
  id: number;
  title: string;
  content: string;
  date: string;
  writer: number;
}

export interface Feeds {
  feeds: Feed[];
}
