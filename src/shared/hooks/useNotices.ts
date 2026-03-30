import { useQuery } from '@tanstack/react-query';
import {
  getAcademicNotices,
  getDodreamNotices,
  getFilteredAcademicNotices,
  getFilteredDodreamNotices,
} from '@/shared/api/noticesApi';

export const useGetAcademicNotices = () => {
  return useQuery({
    queryKey: ['academic-notices'],
    queryFn: getAcademicNotices,
    staleTime: 24 * 60 * 60 * 1000,
  });
};

export const useGetDodreamNotices = () => {
  return useQuery({
    queryKey: ['dodream-notices'],
    queryFn: getDodreamNotices,
    staleTime: 24 * 60 * 60 * 1000,
  });
};

export const useGetFilteredAcademicNotices = (
  selectedGradeIds: string[],
  enabled: boolean,
) => {
  return useQuery({
    queryKey: ['academic-notices-filtered', selectedGradeIds],
    queryFn: () => getFilteredAcademicNotices(selectedGradeIds),
    enabled,
  });
};

export const useGetFilteredDodreamNotices = (
  body: { selectedDepartmentId: string; selectedKeywordId: string[] },
  enabled: boolean,
) => {
  return useQuery({
    queryKey: ['dodream-notices-filtered', body],
    queryFn: () => getFilteredDodreamNotices(body),
    enabled,
  });
};
