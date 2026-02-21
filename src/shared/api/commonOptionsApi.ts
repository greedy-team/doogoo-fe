import { apiClient } from './client';
import type {
  Department,
  Keyword,
  Grade,
  DepartmentsResponse,
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
 * 학과 목록 조회
 * GET /api/departments
 */
export const getDepartments = async (): Promise<Department[]> => {
    const response = await apiClient.get<DepartmentsResponse>('/api/departments');
    return response.data.departments;
};

/**
 * 키워드 목록 조회
 * GET /api/keywords
 */
export const getKeywords = async (): Promise<Keyword[]> => {
    const response = await apiClient.get<KeywordsResponse>('/api/keywords');
    return response.data.keywords;
};
