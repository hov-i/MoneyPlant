import { ResponsiveCalendar } from '@nivo/calendar';

const CalChart = ({ data }) => {
  const calendarData = [
    {
      value: 244,
      day: '2023-07-23'
    },
    {
      value: 219,
      day: '2023-01-25'
    },
    // Add more data entries here...
  ];

  const currentYear = new Date().getFullYear(); // 현재 연도 가져오기

  const yearStartDate = `${currentYear}-01-01`;
  const currentDate = new Date().toISOString().split('T')[0];

  return (
    <ResponsiveCalendar
      data={calendarData}
      from={yearStartDate}
      to={currentDate}
      emptyColor="#eeeeee"
      colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
      margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
      yearSpacing={40}
      monthBorderColor="#ffffff"
      dayBorderWidth={2}
      dayBorderColor="#ffffff"
      legends={[
        {
          anchor: 'bottom-right',
          direction: 'row',
          translateY: 36,
          itemCount: 4,
          itemWidth: 42,
          itemHeight: 36,
          itemsSpacing: 14,
          itemDirection: 'right-to-left'
        }
      ]}
    />
  );
};

export default CalChart;
