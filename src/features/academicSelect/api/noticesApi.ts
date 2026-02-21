import { apiClient } from '@/shared/api/client';
import type {
  AcademicNotice,
  DoDreamNotice,
  AcademicNoticesResponse,
  DoDreamNoticesResponse,
} from './types';

/**
 * 학사 공지 목록 조회
 * GET /api/academic/notices
 */
export const getAcademicNotices = async (): Promise<AcademicNotice[]> => {
  const response = await apiClient.get<AcademicNoticesResponse>(
    '/api/academic/notices'
  );
  return response.data.academicNotices;
};

/**
 * 두드림 공지 목록 조회
 * GET /api/dodream/notices
 */
export const getDodreamNotices = async (): Promise<DoDreamNotice[]> => {
  const response = await apiClient.get<DoDreamNoticesResponse>(
    '/api/dodream/notices'
  );
  return response.data.doDreamNotices;
};
