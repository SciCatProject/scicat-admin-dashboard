import { Card, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useCustom } from '@refinedev/core';
import { NumberField } from '@refinedev/mui';
import { DatasetWithCreationTime } from '../../../providers/datasets/datasetsInterface';
import { LoadingSpinner } from '../../common/loading';

export const DatasetStatusOverview = () => {
  const filters = {
    fields: ['creationTime', 'isPublished'],
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

  const publishedData = data.data.filter((dataset: any) => dataset.isPublished).length;
  const privateData = data.data.filter((dataset: any) => !dataset.isPublished).length;
  return (
    <Box
      sx={{
        height: '12rem',
        p: 2,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right',
        backgroundSize: 'cover',
      }}
    >
      <Box>
        <Typography>Published Data:</Typography>
        <NumberField style={{ fontSize: 36 }} sx={{ fontWeight: 700 }} value={publishedData} />
      </Box>
      <Box my={1}>
        <Typography>Private Data:</Typography>
        <NumberField style={{ fontSize: 36 }} sx={{ fontWeight: 700 }} value={privateData} />
      </Box>
      <Box sx={{ height: '80%' }}></Box>
    </Box>
  );
};
