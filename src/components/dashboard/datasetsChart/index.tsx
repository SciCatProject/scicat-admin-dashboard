import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import { NumberField } from '@refinedev/mui';
import { ResponsiveContainer, LineChart, Line, Tooltip, Legend, XAxis, YAxis } from 'recharts';
import {
  DatasetsCountPerMonth,
  DatasetsLineChartProps,
  IDataset,
} from '../../../interfaces/datasets';
import { ChartTooltip } from '../chartTooltip';

export const DatasetsLineChart = ({ data, count }: DatasetsLineChartProps) => {
  const getMonthYear = (dateString: string) => {
    const date = new Date(dateString);

    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${month < 10 ? '0' + month : month}`;
  };

  const countsPerMonth = data.reduce((acc: DatasetsCountPerMonth, dataset: IDataset) => {
    const monthYear = getMonthYear(dataset.creationTime);
    acc[monthYear] = (acc[monthYear] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(countsPerMonth).map(([month, count]) => ({ month, count }));
  return (
    <Box
      sx={{
        height: '400px',
        p: 2,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right',
        backgroundSize: 'cover',
      }}
    >
      <Stack>
        <Stack direction='row' alignItems='center'>
          <NumberField
            style={{ fontSize: 36 }}
            sx={{ fontWeight: 700, color: '#fff' }}
            value={count}
          />
        </Stack>
      </Stack>
      <Box sx={{ height: '80%' }}>
        <ResponsiveContainer width='99%'>
          <LineChart data={chartData}>
            <XAxis dataKey='month' />
            <YAxis />
            <Legend />
            <Line type='monotone' dataKey='count' stroke='#8884d8' />
            <Tooltip content={<ChartTooltip suffix='' />} />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};
