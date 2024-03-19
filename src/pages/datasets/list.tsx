import { IResourceComponentsProps, useGo } from '@refinedev/core';
import { EditButton, ShowButton, List, useDataGrid } from '@refinedev/mui';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { IDataset } from '../../interfaces/datasets';
import { useCount } from '../../hooks/useHook';
import { useEffect, useState } from 'react';
const ActionCell = ({ row }: any) => {
  const go = useGo();

  const handleOnClick = () => {
    go({
      to: {
        resource: 'datasets',
        action: 'show',
        id: encodeURIComponent(row.id),
      },
      type: 'push',
    });
  };

  return (
    <>
      <ShowButton hideText onClick={handleOnClick} />
      <EditButton hideText recordItemId={row.id} />
    </>
  );
};
const columns: GridColDef<IDataset>[] = [
  { field: 'pid', minWidth: 200, flex: 1 },
  { field: 'type', flex: 0.2 },
  { field: 'contactEmail', flex: 0.5 },
  { field: 'description', flex: 1 },
  {
    field: 'actions',
    headerName: 'Actions',
    renderCell: (params) => <ActionCell row={params.row} />,
  },
];

export const DatasetList: React.FC<IResourceComponentsProps> = () => {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });

  const [filters, setFilters] = useState({
    fields: {},
    limits: {
      size: paginationModel.pageSize,
      limit: paginationModel.page,
      order: 'creationTime: desc',
    },
  });

  useEffect(() => {
    setFilters({
      ...filters,
      limits: {
        size: paginationModel.page * paginationModel.pageSize,
        limit: paginationModel.pageSize,
        order: 'asc',
      },
    });
  }, [paginationModel]);

  const { dataGridProps } = useDataGrid<IDataset>({
    resource: 'datasets',
    filters: {
      initial: [
        {
          field: 'limits',
          operator: 'eq',
          value: `fields=${encodeURIComponent(
            JSON.stringify(filters.fields)
          )}&limits=${encodeURIComponent(JSON.stringify(filters.limits))}`,
        },
      ],
    },
    pagination: {
      mode: 'server',
    },
  });

  const { paginationMode, onPaginationModelChange, ...restDataGridProps } = dataGridProps;

  return (
    <List>
      <DataGrid
        {...restDataGridProps}
        columns={columns}
        autoHeight
        paginationMode='server'
        pageSizeOptions={[5, 10, 25, 100]}
        onPaginationModelChange={setPaginationModel}
        paginationModel={paginationModel}
      />
    </List>
  );
};
