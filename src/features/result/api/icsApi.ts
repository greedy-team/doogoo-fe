import axios from 'axios';
import type {
  AcademicIcsRequest,
  DoDreamIcsRequest,
  IcsResponse,
} from './types';

/**
 * ICS API 전용 클라이언트 ics는 실제 백엔드 API 사용하기위하여 별도설정
 */
const icsApiClient = axios.create({
  baseURL: 'https://www.sejongdoogoo-api.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * 학사공지 ICS 링크 발급
 * POST /api/academic/ics
 */
export const createAcademicIcsLink = async (
  data: AcademicIcsRequest
): Promise<IcsResponse> => {
  const response = await icsApiClient.post<IcsResponse>('/api/academic/ics', data);
  return response.data;
};

/**
 * 두드림 ICS 링크 발급
 * POST /api/dodream/ics
 */
export const createDodreamIcsLink = async (
  data: DoDreamIcsRequest
): Promise<IcsResponse> => {
  const response = await icsApiClient.post<IcsResponse>('/api/dodream/ics', data);
  return response.data;
};
