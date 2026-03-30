import { create } from 'zustand';

interface AcademicFilterState {
  selectedGradeIds: string[];
  setSelectedGradeIds: (gradeIds: string[]) => void;
  toggleSelectedGradeId: (gradeId: string) => void;
  resetAcademicFilter: () => void;
}

export const useAcademicStore = create<AcademicFilterState>((set) => ({
  selectedGradeIds: ['1'],

  setSelectedGradeIds: (gradeIds) => set({ selectedGradeIds: gradeIds }),

  toggleSelectedGradeId: (gradeId) =>
    set((state) => {
      const hasGrade = state.selectedGradeIds.includes(gradeId);
      return {
        selectedGradeIds: hasGrade
          ? state.selectedGradeIds.filter((id) => id !== gradeId)
          : [...state.selectedGradeIds, gradeId],
      };
    }),

  resetAcademicFilter: () => set({ selectedGradeIds: ['1'] }),
}));
