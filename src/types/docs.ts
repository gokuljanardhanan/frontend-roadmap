export interface Author {
  id: string;
  name: string;
  avatar?: string;
}

export interface Doc {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  author: Author;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  published: boolean;
  folder: string;
}
