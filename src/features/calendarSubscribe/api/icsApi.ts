import { apiClient } from '@/shared/api/client';
import type {
  AcademicIcsRequest,
  DoDreamIcsRequest,
  IcsResponse,
} from './types';

/**
 * 학사공지 ICS 링크 발급
 * POST /api/academic/ics
 */
export const createAcademicIcsLink = async (
  data: AcademicIcsRequest
): Promise<IcsResponse> => {
  const response = await apiClient.post<IcsResponse>('/api/academic/ics', data);
  return response.data;
};

/**
 * 두드림 ICS 링크 발급
 * POST /api/dodream/ics
 */
export const createDodreamIcsLink = async (
  data: DoDreamIcsRequest
): Promise<IcsResponse> => {
  const response = await apiClient.post<IcsResponse>('/api/dodream/ics', data);
  return response.data;
};
