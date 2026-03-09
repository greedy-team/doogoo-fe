import { apiClient } from './client';
import type {
  AcademicNotice,
  AcademicNoticesResponse,
  DoDreamNotice,
  DoDreamNoticesResponse,
} from './types';

export const getAcademicNotices = async (): Promise<AcademicNotice[]> => {
  const response = await apiClient.get<AcademicNoticesResponse>('/api/academic/notices');
  return response.data.notices;
};

export const getDodreamNotices = async (): Promise<DoDreamNotice[]> => {
  const response = await apiClient.get<DoDreamNoticesResponse>('/api/dodream/notices');
  return response.data.notices;
};
