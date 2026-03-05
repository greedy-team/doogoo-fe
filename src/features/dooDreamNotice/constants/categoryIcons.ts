/**
 * 카테고리 ID → Icon 매핑
 *
 * API에서 받은 키워드 ID를 lucide-react 아이콘과 매핑
 */
import {
  Trophy,
  Briefcase,
  Heart,
  MessageCircle,
  Globe,
  Building2,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/**
 * 카테고리 ID별 아이콘 매핑
 */
export const CATEGORY_ICON_MAP: Record<string, LucideIcon> = {
  k_1: Trophy,        // 대회 및 학술제
  k_2: Briefcase,     // 취창업
  k_3: Heart,         // 봉사·사회참여
  k_4: MessageCircle, // 상담
  k_5: Globe,         // 글로벌
  k_6: Building2,     // 캠퍼스
};

/**
 * 카테고리 ID로 아이콘 가져오기
 * 매핑되지 않은 ID는 기본 아이콘(Building2) 반환
 */
export const getCategoryIcon = (categoryId: string): LucideIcon => {
  return CATEGORY_ICON_MAP[categoryId] || Building2;
};
