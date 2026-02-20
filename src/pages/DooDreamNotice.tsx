import { Card } from './ui/card';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import {
  Sparkles,
  Trophy,
  Briefcase,
  Heart,
  MessageCircle,
  Globe,
  Building2,
  ChevronRight,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface Interest {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
}

interface DoodreamSelectorProps {
  selectedMajor: string;
  selectedMinor: string;
  selectedInterests: Set<string>;
  onMajorChange: (major: string) => void;
  onMinorChange: (minor: string) => void;
  onInterestToggle: (id: string) => void;
  onCategoryClick: (categoryId: string) => void;
}

const interests: Interest[] = [
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
];

export { interests };

const majorsByCollege = [
  {
    college: '인문과학대학',
    majors: [
      { value: 'korean', label: '국어국문학과' },
      {
        value: 'intl-english',
        label: '영어데이터융합전공',
      },
      { value: 'intl-japan', label: '국제학부 국제일본학전공' },
      { value: 'intl-china', label: '국제학부 중국통상학전공' },
      { value: 'history', label: '역사학과' },
      { value: 'education', label: '교육학과' },
      {
        value: 'global-korean',
        label: '한국언어문화전공',
      },
      {
        value: 'global-trade',
        label: '국제통상전공',
      },
      {
        value: 'global-cooperation',
        label: '국제협력전공',
      },
    ],
  },
  {
    college: '사회과학대학',
    majors: [
      { value: 'public-admin', label: '행정학과' },
      { value: 'media', label: '미디어커뮤니케이션학과' },
      { value: 'law', label: '법학과' },
    ],
  },
  {
    college: '경영경제대학',
    majors: [
      { value: 'business', label: '경영학부' },
      { value: 'economics', label: '경제학과' },
    ],
  },
  {
    college: '호텔관광대학',
    majors: [
      {
        value: 'hotel-tourism',
        label: '호텔관광경영학전공',
      },
      {
        value: 'food-service',
        label: '외식경영학전공',
      },
      {
        value: 'franchise',
        label: '호텔외식관광프랜차이즈경영학과',
      },
      { value: 'culinary', label: '조리서비스경영학과' },
    ],
  },
  {
    college: '자연과학대학',
    majors: [
      { value: 'mathematics', label: '수학통계학과' },
      { value: 'physics', label: '물리천문학과' },
      { value: 'chemistry', label: '화학과' },
    ],
  },
  {
    college: '생명과학대학',
    majors: [
      {
        value: 'bio-food',
        label: '식품생명공학전공',
      },
      {
        value: 'bio-convergence',
        label: '바이오융합공학전공',
      },
      {
        value: 'bio-resource',
        label: '바이오산업자원공학전공',
      },
      { value: 'smart-bio', label: '스마트생명산업융합학과' },
    ],
  },
  {
    college: '인공지능융합대학',
    majors: [
      { value: 'ai-electronics', label: 'AI융합전자공학과' },
      { value: 'semiconductor', label: '반도체시스템공학과' },
      { value: 'computer', label: '컴퓨터공학과' },
      { value: 'info-security', label: '정보보호학과' },
      { value: 'quantum-info', label: '양자지능정보학과' },
      {
        value: 'creative-design',
        label: '디자인이노베이션전공',
      },
      {
        value: 'creative-animation',
        label: ' 만화애니메이션텍전공',
      },
      { value: 'cyber-defense', label: '사이버국방학과' },
      {
        value: 'defense-ai-robot',
        label: '국방AI로봇융합공학과',
      },
      {
        value: 'ai-data-science',
        label: '인공지능데이터사이언스학과',
      },
      { value: 'ai-robot', label: 'AI로봇학과' },
      { value: 'intelligent-info', label: '지능정보융합학과' },
      {
        value: 'content-software',
        label: '콘텐츠소프트웨어학과',
      },
    ],
  },
  {
    college: '공과대학',
    majors: [
      { value: 'architecture-eng', label: '건축공학과' },
      { value: 'architecture', label: '건축학과' },
      { value: 'civil-env', label: '건설환경공학과' },
      { value: 'env-convergence', label: '환경융합공학과' },
      { value: 'energy-resources', label: '에너지자원공학과' },
      { value: 'mechanical', label: '기계공학과' },
      {
        value: 'aerospace-eng',
        label: '우주항공공학전공',
      },
      {
        value: 'aerospace-system',
        label: '항공시스템공학전공',
      },
      {
        value: 'aerospace-drone',
        label: '지능형드론융합전공',
      },
      { value: 'nano-materials', label: '나노신소재공학과' },
      { value: 'quantum-nuclear', label: '양자원자력공학과' },
      {
        value: 'defense-ai-system',
        label: '국방AI융합시스템공학과',
      },
    ],
  },
  {
    college: '예체능대학',
    majors: [
      { value: 'painting', label: '회화과' },
      { value: 'fashion', label: '패션디자인학과' },
      { value: 'music', label: '음악과' },
      { value: 'physical-ed', label: '체육학과' },
      { value: 'dance', label: '무용과' },
      { value: 'film', label: '영화예술학과' },
    ],
  },
  {
    college: '대양휴머니티칼리지',
    majors: [{ value: 'liberal-arts', label: '자유전공학부' }],
  },
];

export function DoodreamSelector({
  selectedMajor,
  selectedMinor,
  selectedInterests,
  onMajorChange,
  onMinorChange,
  onInterestToggle,
  onCategoryClick,
}: DoodreamSelectorProps) {
  return (
    <Card className="shadow-sm">
      {/* Mobile & Desktop: Always visible header */}
      <div className="p-6 pb-4">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-purple-100 p-2">
            <Sparkles className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <h2 className="text-foreground mb-0.5 text-xl font-semibold">
              두드림 관심사
            </h2>
            <p className="text-muted-foreground text-sm">
              교내 활동 및 프로그램
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-5 px-6 pb-6">
        {/* Major Selection */}
        <div className="space-y-3">
          <Label className="text-foreground text-sm font-medium">
            전공 선택
          </Label>
          <Select value={selectedMajor} onValueChange={onMajorChange}>
            <SelectTrigger className="h-12 w-full">
              <SelectValue placeholder="전공을 선택하세요" />
            </SelectTrigger>
            <SelectContent>
              {majorsByCollege.map((college, index) => (
                <div key={college.college}>
                  {index > 0 && <SelectSeparator />}
                  <SelectGroup>
                    <SelectLabel className="text-foreground bg-accent/30 -mx-1 mt-1 mb-1 px-3 py-2 text-sm font-bold">
                      {college.college}
                    </SelectLabel>
                    {college.majors.map((major) => (
                      <SelectItem key={major.value} value={major.value}>
                        {major.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </div>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Minor Selection */}
        {/* <div className="space-y-3">
          <Label className="text-sm font-medium text-foreground">부전공 선택</Label>
          <Select value={selectedMinor} onValueChange={onMinorChange}>
            <SelectTrigger className="w-full h-12">
              <SelectValue placeholder="부전공을 선택하세요" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none" className="font-medium">부전공 없음</SelectItem>
              <SelectSeparator />
              {majorsByCollege.map((college, index) => (
                <div key={college.college}>
                  {index > 0 && <SelectSeparator />}
                  <SelectGroup>
                    <SelectLabel className="text-xs font-bold text-foreground bg-accent/30 py-2 px-3 -mx-1 mb-1 mt-1 sticky top-0 z-10">
                      {college.college}
                    </SelectLabel>
                    {college.majors.map((major) => (
                      <SelectItem key={major.value} value={major.value} className="pl-6">
                        {major.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </div>
              ))}
            </SelectContent>
          </Select>
        </div> */}

        {/* Interest Categories */}
        <div className="space-y-3">
          <Label className="text-foreground text-sm font-medium">
            관심 카테고리 선택
          </Label>
          <div className="space-y-2">
            {interests.map((interest) => {
              const Icon = interest.icon;
              const isSelected = selectedInterests.has(interest.id);

              return (
                <Card
                  key={interest.id}
                  className={`cursor-pointer p-4 transition-all duration-200 ${isSelected ? 'border-purple-300 bg-purple-50' : 'hover:bg-accent/50'}\n `}
                  onClick={() => onCategoryClick(interest.id)}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex flex-1 items-center gap-3">
                      <div
                        className={`mt-0.5 rounded-xl p-2 ${isSelected ? 'bg-purple-600 text-white' : 'bg-accent text-foreground'} `}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <Label
                          htmlFor={`switch-${interest.id}`}
                          className="mb-0.5 block cursor-pointer text-base font-medium"
                        >
                          {interest.label}
                        </Label>
                        <p className="text-muted-foreground line-clamp-1 text-sm">
                          {interest.description}
                        </p>
                      </div>
                      {/* <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" /> */}
                    </div>
                    <Switch
                      id={`switch-${interest.id}`}
                      checked={isSelected}
                      onCheckedChange={() => onInterestToggle(interest.id)}
                      className="shrink-0"
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        minWidth: '44px',
                        minHeight: '24px',
                      }}
                    />
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
}
