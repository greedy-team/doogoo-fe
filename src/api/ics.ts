import axios from 'axios';

const BASE_URL = 'https://doogoo-be-ics-test-production.up.railway.app';

//아직 타입,세부 api명세 확정 안됨
export type IcsRequest = {
  departments?: string[];
  keywords?: string[];
};

export type IcsResponse = {
  token: string;  // 서버는 토큰만 반환, URL은 프론트에서 생성
};

/**
 * 학사공지 ICS 링크 발급
 * POST /api/academic/ics
 */
export const createAcademicIcsLink = async (data: IcsRequest): Promise<IcsResponse> => {
  const response = await axios.post<IcsResponse>(`${BASE_URL}/api/academic/ics`, data);
  return response.data;
};

/**
 * 두드림 ICS 링크 발급
 * POST /api/dodream/ics
 */
export const createDodreamIcsLink = async (data: IcsRequest): Promise<IcsResponse> => {
  const response = await axios.post<IcsResponse>(`${BASE_URL}/api/dodream/ics`, data);
  return response.data;
};

/**
 * ICS 구독 URL 생성 (캘린더 앱 자동 업데이트)
 * GET /cal/{token}.ics
 */
export const getIcsUrl = (token: string): string => {
  return `${BASE_URL}/cal/${token}.ics`;
};
