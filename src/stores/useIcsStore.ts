import { create } from 'zustand';
import {
  createAcademicIcsLink,
  createDodreamIcsLink,
  getIcsUrl
} from '../api/ics';
import type { IcsRequest, IcsResponse } from '../api/ics';

//아직 타입,세부 api명세 확정 안됨
interface IcsState {
  // Academic ICS
  academicToken: string | null;
  academicIcsUrl: string | null;

  // Dodream ICS
  dodreamToken: string | null;
  dodreamIcsUrl: string | null;

  isLoading: boolean;
  error: string | null;

  // Actions
  createAcademicLink: (data: IcsRequest) => Promise<void>;
  createDodreamLink: (data: IcsRequest) => Promise<void>;
  clearLinks: () => void;
}

export const useIcsStore = create<IcsState>((set) => ({
  academicToken: null,
  academicIcsUrl: null,
  dodreamToken: null,
  dodreamIcsUrl: null,
  isLoading: false,
  error: null,

  createAcademicLink: async (data: IcsRequest) => {
    set({ isLoading: true, error: null });
    try {
      const response: IcsResponse = await createAcademicIcsLink(data);
      set({
        academicToken: response.token,
        academicIcsUrl: getIcsUrl(response.token),
        isLoading: false
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to create academic ICS link',
        isLoading: false
      });
    }
  },

  createDodreamLink: async (data: IcsRequest) => {
    set({ isLoading: true, error: null });
    try {
      const response: IcsResponse = await createDodreamIcsLink(data);
      set({
        dodreamToken: response.token,
        dodreamIcsUrl: getIcsUrl(response.token),
        //나중에 필요시 persist로 로컬스토리지 저장해놓으면 좋을까?
        isLoading: false
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to create dodream ICS link',
        isLoading: false
      });
    }
  },

  clearLinks: () => {
    set({
      academicToken: null,
      academicIcsUrl: null,
      dodreamToken: null,
      dodreamIcsUrl: null,
      error: null
    });
  },
}));
