import { apiClient } from '@/shared/api/client';

export type Notice = {
    noticeId: string;
    title: string;
    department: string;
    applicationDate: string;
    operatingDate: string;
};

export type NoticeParams = {
    department?: string;
    keyword?: string;
};

type NoticesResponse = {
    notices: Notice[];
};

/**
 * 학사 공지 목록 조회
 * GET /api/academic/notices
 */
export const getAcademicNotices = async (): Promise<Notice[]> => {
    const response = await apiClient.get<NoticesResponse>('/api/academic/notices');
    return response.data.notices;
};

/**
 * 두드림 공지 목록 조회
 * GET /api/dodream/notices
 */
export const getDodreamNotices = async (): Promise<Notice[]> => {
    const response = await apiClient.get<NoticesResponse>('/api/dodream/notices');
    return response.data.notices;
};
