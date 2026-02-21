import {
    Trophy,
    Briefcase,
    Heart,
    MessageCircle,
    Globe,
    Building2,
} from 'lucide-react';

interface dooDreamCategories {
    id: string;
    label: string;
    description: string;
    icon: React.ElementType;
}

export const DOO_DREAM_CATEGORIES: dooDreamCategories[] = [
    {
        id: 'competition',
        label: '대회 및 학술제',
        description: '경진대회, 공모전, 학술행사',
        icon: Trophy,
    },
    {
        id: 'career',
        label: '취창업',
        description: '취업, 창업, 진로 관련 행사',
        icon: Briefcase,
    },
    {
        id: 'volunteer',
        label: '봉사·사회참여',
        description: '봉사활동, 사회공헌 프로그램',
        icon: Heart,
    },
    {
        id: 'counseling',
        label: '상담',
        description: '심리상담, 진로상담, 학업상담',
        icon: MessageCircle,
    },
    {
        id: 'global',
        label: '글로벌',
        description: '교환학생, 해외연수, 국제교류',
        icon: Globe,
    },
    {
        id: 'campus',
        label: '캠퍼스',
        description: '동아리, 축제, 캠퍼스 이벤트',
        icon: Building2,
    },
] as const;

export type DOO_DREAM_CATEGORY_IDS =
    (typeof DOO_DREAM_CATEGORIES)[number]['id'];
