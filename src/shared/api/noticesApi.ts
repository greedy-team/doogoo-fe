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

export const getFilteredAcademicNotices = async (
  selectedGradeIds: string[],
): Promise<AcademicNotice[]> => {
  const response = await apiClient.post<AcademicNoticesResponse>(
    '/api/academic/notices/filter',
    { selectedGradeIds },
  );
  return response.data.notices;
};

export const getFilteredDodreamNotices = async (body: {
  selectedDepartmentId: string;
  selectedKeywordId: string[];
}): Promise<DoDreamNotice[]> => {
  const response = await apiClient.post<DoDreamNoticesResponse>(
    '/api/dodream/notices/filter',
    body,
  );
  return response.data.notices;
};
