import { create } from 'zustand';

type GradeFilterScope = 'my-year' | 'all';
//백앤드 응답에 따라 달라져야합니다.
interface AcademicFilterState {
    selectedGradeYear: number;
    gradeFilterScope: GradeFilterScope;
    setSelectedGradeYear: (year: number) => void;
    setGradeFilterScope: (scope: GradeFilterScope) => void;
    resetAcademicFilter: () => void;
}

export const useAcademicStore = create<AcademicFilterState>((set) => ({
    selectedGradeYear: 1,
    gradeFilterScope: 'my-year',

    setSelectedGradeYear: (year) => set({ selectedGradeYear: year }),

    setGradeFilterScope: (scope) => set({ gradeFilterScope: scope }),

    resetAcademicFilter: () =>
        set({ selectedGradeYear: 1, gradeFilterScope: 'my-year' }),
}));
