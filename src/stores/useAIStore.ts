import { create } from 'zustand';
import type { StreamStatus } from '@/types';

type AIStore = {
  status: StreamStatus;
  output: string;
  activeTab: 'suggest' | 'rewrite' | 'coach';
  setStatus: (status: StreamStatus) => void;
  setOutput: (output: string) => void;
  appendOutput: (text: string) => void;
  setActiveTab: (tab: 'suggest' | 'rewrite' | 'coach') => void;
  reset: () => void;
};

export const useAIStore = create<AIStore>((set) => ({
  status: 'idle',
  output: '',
  activeTab: 'suggest',
  setStatus: (status) => set({ status }),
  setOutput: (output) => set({ output }),
  appendOutput: (text) => set((state) => ({ output: state.output + text })),
  setActiveTab: (activeTab) => set({ activeTab }),
  reset: () => set({ status: 'idle', output: '' }),
}));
