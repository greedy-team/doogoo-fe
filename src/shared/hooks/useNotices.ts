import { useQuery } from '@tanstack/react-query';
import { getAcademicNotices, getDodreamNotices } from '@/shared/api/noticesApi';

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
