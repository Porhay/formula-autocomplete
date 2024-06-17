import { create } from 'zustand';

type FormulaTag = {
  value?: any;
  name: string;
};

interface FormulaState {
  formula: FormulaTag[];
  setFormula: (newFormula: FormulaTag[]) => void;
  addTag: (tag: FormulaTag) => void;
  removeTag: (index: number) => void;
}

export const useStore = create<FormulaState>((set) => ({
  formula: [],
  setFormula: (newFormula) => set({ formula: newFormula }),
  addTag: (tag) => set((state) => ({ formula: [...state.formula, tag] })),
  removeTag: (index) =>
    set((state) => {
      const newFormula = [...state.formula];
      newFormula.splice(index, 1);
      return { formula: newFormula };
    }),
}));
