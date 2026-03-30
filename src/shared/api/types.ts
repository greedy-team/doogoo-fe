export type CollegeResponse = {
  id: string;
  name: string;
  departments: {
    id: string;
    name: string;
  }[];
};

export type Keyword = {
  id: string;
  name: string;
  description?: string;
  icon: string;
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

export type AcademicNotice = {
  noticeId: string;
  title: string;
  gradeId: string;
  startAt: string;
  endAt: string | null;
};

export type AcademicNoticesResponse = {
  notices: AcademicNotice[];
};

export type DoDreamNotice = {
  noticeId: string;
  title: string;
  departmentId: string;
  departmentName: string | null;
  applicationStartAt: string;
  applicationEndAt: string | null;
  operatingStartAt: string;
  operatingEndAt: string | null;
  location: string | null;
  description: string;
  descriptionSummary?: string;
  keywordIds: string[];
  detailUrl?: string;
};

export type DoDreamNoticesResponse = {
  notices: DoDreamNotice[];
};
