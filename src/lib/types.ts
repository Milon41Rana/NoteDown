export type Folder = {
  id: string;
  name: string;
};

export type Note = {
  id: string;
  folderId: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};
