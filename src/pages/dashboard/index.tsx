import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import { useDataGrid } from '@refinedev/mui';
import { DatasetsLineChart } from '../../components/dashboard/datasetsChart';
import { IDataset } from '../../interfaces/datasets';
export const DashboardPage = () => {
  const filters = `filter=${encodeURIComponent(
    JSON.stringify({
      fields: ['creationTime'],
      limits: { limit: 50000, skip: 0, order: 'asc' },
    })
  )}`;

  const { tableQueryResult } = useDataGrid<IDataset>({
    resource: 'dashboard',
    filters: {
      initial: [
        {
          field: 'filters',
          operator: 'eq',
          value: filters,
        },
      ],
    },
  });

  const data = tableQueryResult.data?.data ?? [];
  const count = tableQueryResult.data?.total ?? 0;

  return (
    <Grid container columns={24} spacing={2}>
      <Grid item xs={24} sm={24} md={24} lg={24} xl={24}>
        <Card>
          <CardHeader title='Monthly Dataset Creation Overview' />
          <DatasetsLineChart data={data} count={count} />
        </Card>
      </Grid>
    </Grid>
  );
};
