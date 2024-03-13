import { IResourceComponentsProps, useGo } from '@refinedev/core';
import { EditButton, ShowButton, List, useDataGrid } from '@refinedev/mui';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { IDataset } from '../../interfaces/datasets';
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
  const { dataGridProps } = useDataGrid<IDataset>();

  return (
    <List>
      <DataGrid {...dataGridProps} columns={columns} autoHeight />
    </List>
  );
};
