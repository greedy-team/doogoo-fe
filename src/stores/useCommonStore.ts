import { create } from 'zustand';
import { getDepartments, getKeywords, getGrades } from '../api/common';
import type { Department, Keyword } from '../api/common';

//아직 타입,세부 api명세 확정 안됨
interface CommonState {
  departments: Department[];
  keywords: Keyword[];
  grades: Keyword[];
  isLoading: boolean;
  error: string | null;

  fetchDepartments: () => Promise<void>;
  fetchKeywords: () => Promise<void>;
  fetchGrades: () => Promise<void>;

  fetchUIFilterOptions: () => Promise<void>;
  //일단 분리해놓긴 했는데 fetchUIFilterOptions면 충분하지 않을까,,?
}

export const useCommonStore = create<CommonState>((set) => ({
  departments: [],
  keywords: [],
  grades: [],
  isLoading: false,
  error: null,

  fetchDepartments: async () => {
    set({ isLoading: true, error: null });

    try {
      const departments = await getDepartments();
      set({ departments, isLoading: false });
    } 
    
    catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch departments',
        isLoading: false
      });
    }
  },

  fetchKeywords: async () => {
    set({ isLoading: true, error: null });

    try {
      const keywords = await getKeywords();
      set({ keywords, isLoading: false });
    }

    catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch keywords',
        isLoading: false
      });
    }
  },

  fetchGrades: async () => {
    set({ isLoading: true, error: null });

    try {
      const grades = await getGrades();
      set({ grades, isLoading: false });
    }

    catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch grades',
        isLoading: false
      });
    }
  },

  fetchUIFilterOptions: async () => {
    set({ isLoading: true, error: null });

    try {
      const [departments, keywords, grades] = await Promise.all([
        getDepartments(),
        getKeywords(),
        getGrades()
      ]);
      set({ departments, keywords, grades, isLoading: false });
    }

    catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch data',
        isLoading: false
      });
    }
  },
}));
