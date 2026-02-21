import { apiClient } from './client';

export type Department = {
    id: string;
    name: string;
};

export type Keyword = {
    id: string;
    name: string;
};

type DepartmentsResponse = {
    departments: Department[];
};

type KeywordsResponse = {
    keywords: Keyword[];
};

type GradesResponse = {
    grades: Keyword[];
};

/**
 * 학년 목록 조회
 * GET /api/grades
 */
export const getGrades = async (): Promise<Keyword[]> => {
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
