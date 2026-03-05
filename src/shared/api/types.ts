/**
 * 백엔드 College 응답
 */
export type CollegeResponse = {
  id: string;
  name: string;
  Department: {
    id: string;
    name: string;
  }[];
};

export type Keyword = {
  id: string;
  name: string;
  description?: string; // ⚠️ 백엔드 미구현 - 프론트에서 추가
};

export type Grade = {
  id: string;
  name: string;
};

export type CollegesResponse = {
  colleges: CollegeResponse[];
};

export type KeywordsResponse = {
  keywords: Keyword[];
};

export type GradesResponse = {
  grades: Grade[];
};
