import { create } from 'zustand';

interface DodreamFilterState {
    selectedDepartmentId: string;
    selectedInterestKeywordIds: Set<string>;

    setSelectedDepartmentId: (departmentId: string) => void;
    toggleInterestKeyword: (keywordId: string) => void;
    resetDodreamFilter: () => void;

    isDepartmentSelected: () => boolean;
}

export const useDodreamStore = create<DodreamFilterState>((set, get) => ({
    selectedDepartmentId: '',
    selectedInterestKeywordIds: new Set<string>(),

    setSelectedDepartmentId: (departmentId) =>
        set({ selectedDepartmentId: departmentId }),

    toggleInterestKeyword: (keywordId) =>
        set((state) => {
            const updatedKeywords = new Set(state.selectedInterestKeywordIds);
            if (updatedKeywords.has(keywordId)) {
                updatedKeywords.delete(keywordId);
            } else {
                updatedKeywords.add(keywordId);
            }//토글 구현
            return { selectedInterestKeywordIds: updatedKeywords };
        }),

    resetDodreamFilter: () =>
        set({
            selectedDepartmentId: '',
            selectedInterestKeywordIds: new Set<string>(),
        }),

    isDepartmentSelected: () => get().selectedDepartmentId !== '',
}));
