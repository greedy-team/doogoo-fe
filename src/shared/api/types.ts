

export type IdName = {
  id: string;
  name: string;
};

export type Department = IdName;
export type Keyword = IdName;
export type Grade = IdName;

export type DepartmentsResponse = {
  departments: Department[];
};

export type KeywordsResponse = {
  keywords: Keyword[];
};

export type GradesResponse = {
  grades: Grade[];
};
