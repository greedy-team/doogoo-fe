/**
 * ICS 링크 생성 React Query Mutation 훅
 */

import { useMutation } from '@tanstack/react-query';
import {
  createAcademicIcsLink,
  createDodreamIcsLink,
} from '@/features/result/api/icsApi';
import { API_BASE_URL } from '@/shared/api/client';
import type { AcademicIcsRequest, DoDreamIcsRequest } from '../api/types';

/**
 * Webcal 프로토콜 URL 생성
 * 캘린더 앱에서 바로 구독할 수 있는 URL
 */
export const getWebcalUrl = (token: string): string => {
  const baseUrl = API_BASE_URL.replace(/^https?:\/\//, '');
  return `webcal://${baseUrl}/cal/${token}.ics`;
};
//이렇게 하면 바로 클릭 시,os기본 캘린더 구독으로 연결됨

/**
 * 학사공지 ICS 링크 생성
 * POST /api/academic/ics
 *
 * @returns mutation 객체 - 서버 응답(icsUrl, downloadUrl, token)은 mutation.data로 접근
 * post요청에서는 이렇게 해야한다고 함
 */
export const useCreateAcademicIcs = () => {
  return useMutation({
    mutationFn: (data: AcademicIcsRequest) => createAcademicIcsLink(data),
    onError: (error: Error) => {
      console.error('학사공지 ICS 생성 실패:', error);
    },
  });
};

/**
 * 두드림 ICS 링크 생성
 * POST /api/dodream/ics
 *
 * @returns mutation 객체 - 서버 응답(icsUrl, downloadUrl, token)은 mutation.data로 접근
 */
export const useCreateDodreamIcs = () => {
  return useMutation({
    mutationFn: (data: DoDreamIcsRequest) => createDodreamIcsLink(data),
    onError: (error: Error) => {
      console.error('두드림 ICS 생성 실패:', error);
    },
  });
};
