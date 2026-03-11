import { apiClient } from './client';
import type {
  CollegeResponse,
  Keyword,
  Grade,
  CollegesResponse,
  KeywordsResponse,
  GradesResponse,
} from './types';

/**
 * 학년 목록 조회
 * GET /api/grades
 */
export const getGrades = async (): Promise<Grade[]> => {
  const response = await apiClient.get<GradesResponse>('/api/grades');
  return response.data.grades;
};

/**
 * 학과 목록 조회 (College[] 구조 그대로)
 * GET /api/departments
 */
export const getColleges = async (): Promise<CollegeResponse[]> => {
  const response = await apiClient.get<CollegesResponse>('/api/departments');
  return response.data.colleges;
};

/**
 * 키워드 목록 조회
 * GET /api/keywords
 */
export const getKeywords = async (): Promise<Keyword[]> => {
  const response = await apiClient.get<KeywordsResponse>('/api/keywords');
  return response.data.keywords;
};
