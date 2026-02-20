import { create } from 'zustand';

interface SelectionState {
  selectedDepartments: string[];
  selectedKeywords: string[];
  selectedGrades: string[];

  setGrades: (grades: string[]) => void;  
  setDepartments: (departments: string[]) => void;
  setKeywords: (keywords: string[]) => void;

  addGrades: (grades: string[]) => void;
  addDepartments: (departments: string[]) => void;
  addKeywords: (keywords: string[]) => void;

  toggleGrade: (grade: string) => void;
  toggleDepartment: (department: string) => void;
  toggleKeyword: (keyword: string) => void;

  clearSelections: () => void;
}

export const useSelectionStore = create<SelectionState>((set) => ({
  selectedDepartments: [],
  selectedKeywords: [],
  selectedGrades: [],


  setGrades: (grades: string[]) =>
    set({ selectedGrades: grades }),

  setDepartments: (departments: string[]) =>
    set({ selectedDepartments: departments }),

  setKeywords: (keywords: string[]) =>
    set({ selectedKeywords: keywords }),



  addGrades: (grades: string[]) =>
    set((state) => ({
      selectedGrades: [...state.selectedGrades, ...grades],
    })),

  addDepartments: (departments: string[]) =>
    set((state) => ({
      selectedDepartments: [...state.selectedDepartments, ...departments],
    })),

  addKeywords: (keywords: string[]) =>
    set((state) => ({
      selectedKeywords: [...state.selectedKeywords, ...keywords],
    })),


    
  toggleGrade: (grade: string) =>
    set((state) => ({
      selectedGrades: state.selectedGrades.includes(grade)
        ? state.selectedGrades.filter((g) => g !== grade)
        : [...state.selectedGrades, grade],
    })),

  toggleDepartment: (department: string) =>
    set((state) => ({
      selectedDepartments: state.selectedDepartments.includes(department)
        ? state.selectedDepartments.filter((d) => d !== department)
        : [...state.selectedDepartments, department],
    })),

  toggleKeyword: (keyword: string) =>
    set((state) => ({
      selectedKeywords: state.selectedKeywords.includes(keyword)
        ? state.selectedKeywords.filter((k) => k !== keyword)
        : [...state.selectedKeywords, keyword],
    })),


  clearSelections: () =>
    set({
      selectedDepartments: [],
      selectedKeywords: [],
      selectedGrades: [],
    }),
}));
