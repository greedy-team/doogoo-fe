/**
 * 카테고리 ID → Icon 매핑
 *
 * API에서 받은 키워드 ID를 lucide-react 아이콘과 매핑
 */
import {
  GraduationCap,
  Trophy,
  Briefcase,
  Heart,
  MessageCircle,
  Globe,
  Building2,
  MoreHorizontal,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/**
 * 백엔드 icon 문자열 → Lucide 아이콘 매핑
 */
export const CATEGORY_ICON_MAP: Record<string, LucideIcon> = {
  department: GraduationCap, // 학과
  competition: Trophy, // 학술/연구
  career: Briefcase, // 취창업
  volunteer: Heart, // 봉사·사회참여
  counseling: MessageCircle, // 상담
  global: Globe, // 글로벌
  campus: Building2, // 캠퍼스
  etc: MoreHorizontal, // 기타
};

export const getCategoryIcon = (iconName: string): LucideIcon => {
  return CATEGORY_ICON_MAP[iconName] || MoreHorizontal;
};
