import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import { useTable } from '@refinedev/core';
import { DatasetsLineChart } from '../../components/dashboard/datasetsChart';
import { IDataset } from '../../interfaces/datasets';
export const DashboardPage = () => {
  const queryFilter = JSON.stringify({
    limits: { limit: 20000, skip: 0, order: 'asc' },
    fields: ['creationTime'],
  });

  const { tableQueryResult, setFilters, setCurrent, filters, pageCount } = useTable<IDataset>({
    resource: 'datasets',
    initialPageSize: 10,
    filters: {
      initial: [
        {
          field: 'filter',
          operator: 'eq',
          value: queryFilter,
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
