export interface MonthData {
  name: string;
  number: number;
  year: number;
  days: number;
  startDay: number;
}

const monthNames = [
  '1월',
  '2월',
  '3월',
  '4월',
  '5월',
  '6월',
  '7월',
  '8월',
  '9월',
  '10월',
  '11월',
  '12월',
];
const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export const getMonthData = (year: number, month: number): MonthData => {
  const monthIndex = month - 1;

  let days = monthDays[monthIndex];
  if (monthIndex === 1) {
    days =
      (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28;
  }

  const firstDay = new Date(year, monthIndex, 1);
  const startDay = firstDay.getDay();

  return {
    name: monthNames[monthIndex],
    number: month,
    year,
    days,
    startDay,
  };
};

export const generateMonthsData = (): MonthData[] => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 12 }, (_, i) =>
    getMonthData(currentYear, i + 1),
  );
};

export default generateMonthsData;
