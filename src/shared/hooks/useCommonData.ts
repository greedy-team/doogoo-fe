/**
 * 공통 데이터 조회 React Query 훅
 * 학과, 키워드, 학년 목록 조회
 */

import { useQuery } from '@tanstack/react-query';
import { getColleges, getKeywords, getGrades } from '@/shared/api/commonOptionsApi';

/**
 * 학과 목록 조회 (College[] 구조)
 * GET /api/departments
 */
export const useGetColleges = () => {
  return useQuery({
    queryKey: ['colleges'],
    queryFn: getColleges,
    staleTime: 24 * 60 * 60 * 1000, // 24시간 캐시
  });
};

/**
 * 키워드 목록 조회
 * GET /api/keywords
 */
export const useGetKeywords = () => {
  return useQuery({
    queryKey: ['keywords'],
    queryFn: getKeywords,
    staleTime: 24 * 60 * 60 * 1000, // 24시간 캐시
  });
};

/**
 * 학년 목록 조회
 * GET /api/grades
 */
export const useGetGrades = () => {
  return useQuery({
    queryKey: ['grades'],
    queryFn: getGrades,
    staleTime: 24 * 60 * 60 * 1000, // 24시간 캐시
  });
};

/**
 * 모든 필터 옵션 한번에 가져오기
 * 병렬 처리로 성능 최적화
 */
export const useGetAllFilterOptions = () => {
  const colleges = useGetColleges();
  const keywords = useGetKeywords();
  const grades = useGetGrades();

  return {
    colleges: colleges.data ?? [],
    keywords: keywords.data ?? [],
    grades: grades.data ?? [],

    isLoading:
      colleges.isLoading || keywords.isLoading || grades.isLoading,
    isError: colleges.isError || keywords.isError || grades.isError,
    error: colleges.error || keywords.error || grades.error,
    //하나라도 에러,로딩중이면 전부 에러/로딩처리
  };
};
