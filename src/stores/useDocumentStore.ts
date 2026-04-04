import { create } from 'zustand';

type DocumentStore = {
  title: string;
  content: string;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
};

export const useDocumentStore = create<DocumentStore>((set) => ({
  title: '',
  content: '',
  setTitle: (title) => set({ title }),
  setContent: (content) => set({ content }),
}));
