export interface MonthData {
  name: string;
  number: number;
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

export const generateMonthsData = (): MonthData[] => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const months: MonthData[] = [];

  for (let i = 0; i < 3; i++) {
    const monthIndex = (currentMonth + i) % 12;
    const year = currentYear + Math.floor((currentMonth + i) / 12);

    // Calculate days in month (account for leap years)
    let days = monthDays[monthIndex];
    if (monthIndex === 1) {
      // February
      days = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28;
    }

    // Calculate what day of the week the month starts on
    const firstDay = new Date(year, monthIndex, 1);
    const startDay = firstDay.getDay();

    months.push({
      name: monthNames[monthIndex],
      number: monthIndex + 1,
      days: days,
      startDay: startDay,
    });
  }

  return months;
};

export default generateMonthsData;
