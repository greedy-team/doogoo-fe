import axios from 'axios';

const BASE_URL = 'https://doogoo-be-ics-test-production.up.railway.app';

//아직 타입,세부 api명세 확정 안됨
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
  const response = await axios.get<GradesResponse>(`${BASE_URL}/api/grades`);
  return response.data.grades;
};


/**
 * 학과 목록 조회
 * GET /api/departments
 */
export const getDepartments = async (): Promise<Department[]> => {
  const response = await axios.get<DepartmentsResponse>(`${BASE_URL}/api/departments`);
  return response.data.departments;
};

/**
 * 키워드 목록 조회
 * GET /api/keywords
 */
export const getKeywords = async (): Promise<Keyword[]> => {
  const response = await axios.get<KeywordsResponse>(`${BASE_URL}/api/keywords`);
  return response.data.keywords;
};
