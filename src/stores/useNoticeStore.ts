import { create } from 'zustand';
import { getAcademicNotices, getDodreamNotices } from '../api/notices';
import type { Notice, NoticeParams } from '../api/notices';

//아직 타입,세부 api명세 확정 안됨
interface NoticeState {
  // Academic Notices
  academicNotices: Notice[];
  academicFilters: NoticeParams;

  // Dodream Notices
  dodreamNotices: Notice[];
  dodreamFilters: NoticeParams;

  isLoading: boolean;
  error: string | null;

  // Actions
  fetchAcademicNotices: () => Promise<void>;
  fetchDodreamNotices: () => Promise<void>;
  clearNotices: () => void;
}

export const useNoticeStore = create<NoticeState>((set) => ({
  academicNotices: [],
  academicFilters: {},
  dodreamNotices: [],
  dodreamFilters: {},
  isLoading: false,
  error: null,

  fetchAcademicNotices: async () => {
    set({ isLoading: true, error: null });
    try {
      const notices = await getAcademicNotices();
      set({
        academicNotices: notices,
        isLoading: false
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch academic notices',
        isLoading: false
      });
    }
  },

  fetchDodreamNotices: async () => {
    set({ isLoading: true, error: null });
    try {
      const notices = await getDodreamNotices();
      set({
        dodreamNotices: notices,
        isLoading: false
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch dodream notices',
        isLoading: false
      });
    }
  },

  clearNotices: () => {
    set({
      academicNotices: [],
      academicFilters: {},
      dodreamNotices: [],
      dodreamFilters: {},
      error: null
    });
  },
}));
