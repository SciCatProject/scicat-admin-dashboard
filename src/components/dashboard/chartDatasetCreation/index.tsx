import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import { NumberField } from '@refinedev/mui';
import { ResponsiveContainer, AreaChart, Tooltip, Legend, XAxis, YAxis, Area } from 'recharts';
import {
  DatasetsCountPerMonth,
  DatasetCreationOverviewProps,
  DatasetWithCreationTime,
} from '../../../providers/datasets/datasetsInterface';
import { ChartTooltip } from '../chartUtils';
import { useCustom } from '@refinedev/core';
import { LoadingSpinner } from '../../common/loading';

export const DatasetCreationOverview = ({ selectedYears }: DatasetCreationOverviewProps) => {
  const filters = {
    fields: ['creationTime'],
    limits: { limit: 50000, skip: 0, order: 'creationTime:asc' },
  };

  const { data, isLoading } = useCustom<DatasetWithCreationTime[]>({
    method: 'get',
    url: 'datasets',
    config: {
      filters: [
        {
          field: 'filters',
          operator: 'eq',
          value: filters,
        },
      ],
    },
  });
  if (!data || isLoading) {
    return <LoadingSpinner card />;
  }

  const getMonthYear = (dateString: string) => {
    const date = new Date(dateString);
    const currentYear = new Date().getFullYear();

    if (isNaN(date.getTime())) {
      return null;
    }
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    if (selectedYears && year < currentYear - selectedYears) return null;
    return `${year}-${month < 10 ? '0' + month : month}`;
  };

  const countsPerMonth = data.data.reduce(
    (acc: DatasetsCountPerMonth, dataset: DatasetWithCreationTime) => {
      const monthYear = getMonthYear(dataset.creationTime);
      if (monthYear) {
        acc[monthYear] = (acc[monthYear] || 0) + 1;
        acc.total = (acc.total || 0) + 1;
      }
      return acc;
    },
    {}
  );

  const chartData = Object.entries(countsPerMonth)
    .filter(([key, _]) => key !== 'total')
    .map(([month, count]) => ({ month, count }));
  return (
    <Box
      sx={{
        height: '16rem',
        px: 2,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right',
        backgroundSize: 'cover',
      }}
    >
      <Stack>
        <Stack direction='row' alignItems='center'>
          <NumberField
            style={{ fontSize: 24 }}
            sx={{ fontWeight: 500 }}
            value={countsPerMonth.total}
          />
        </Stack>
      </Stack>
      <Box sx={{ height: '80%' }}>
        <ResponsiveContainer width='99%'>
          <AreaChart data={chartData}>
            <XAxis dataKey='month' />
            <YAxis />
            <Legend />
            <Area type='monotone' dataKey='count' stroke='#8884d8' fill='#8884d8' />
            <Tooltip content={<ChartTooltip suffix='' />} />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};
