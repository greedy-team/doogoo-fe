/**
 * 공지사항 조회 React Query 훅
 */

import { useQuery } from '@tanstack/react-query';
import {
  getAcademicNotices,
  getDodreamNotices,
} from '@/features/academicSelect/api/noticesApi';

/**
 * 학사 공지 목록 조회
 * GET /api/academic/notices
 */
export const useGetAcademicNotices = () => {
  return useQuery({
    queryKey: ['academic-notices'],
    queryFn: getAcademicNotices,
    staleTime: 24 * 60 * 60 * 1000, // 24시간 캐시, 어차피 거의 변하지 않는 데이터라 하루단위로 설정
  });
};

/**
 * 두드림 공지 목록 조회
 * GET /api/dodream/notices
 */
export const useGetDodreamNotices = () => {
  return useQuery({
    queryKey: ['dodream-notices'],
    queryFn: getDodreamNotices,
    staleTime: 24 * 60 * 60 * 1000, // 24시간 캐시
  });
};
