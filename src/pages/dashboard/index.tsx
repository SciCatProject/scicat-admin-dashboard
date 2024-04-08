import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import { DatasetsLineChart } from '../../components/dashboard/datasetsChart';
import { DatasetWithCreationTime } from '../../providers/datasets/datasetsInterface';
import { useCustom } from '@refinedev/core';
import { LoadingSpinner } from '../../components/common/loading';

export const DashboardPage = () => {
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

  const datasets = data?.data || [];
  const count = data?.data.length || 0;

  return (
    <Grid container columns={24} spacing={2}>
      <Grid item xs={24} sm={24} md={24} lg={24} xl={24}>
        <Card>
          <CardHeader title='Monthly Dataset Creation Overview' />
          {isLoading ? <LoadingSpinner /> : <DatasetsLineChart data={datasets} count={count} />}
        </Card>
      </Grid>
    </Grid>
  );
};
