import { IResourceComponentsProps } from '@refinedev/core';
import { ShowButton, List, useDataGrid } from '@refinedev/mui';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef<IUsers>[] = [
  { field: 'username', type: 'string' },
  { field: 'authStrategy' },
  { field: 'email', flex: 1 },
  { field: 'realm' },
  { field: 'emailVerified', type: 'boolean' },
  {
    field: 'actions',
    type: 'actions',
    renderCell: function render({ row }) {
      return (
        <>
          <ShowButton hideText recordItemId={row.id} />
          {/* <EditButton hideText recordItemId={row.id} /> */}
        </>
      );
    },
  },
];

export const UsersList: React.FC<IResourceComponentsProps> = () => {
  const { dataGridProps } = useDataGrid<IUsers>();

  return (
    <List>
      <DataGrid
        {...dataGridProps}
        columns={columns}
        initialState={{
          columns: {
            columnVisibilityModel: {
              status: false,
              traderName: false,
            },
          },
        }}
        autoHeight
      />
    </List>
  );
};

interface IUsers {
  id: string;
  username: string;
  authStrategy: string;
  email: number;
  realm: string;
  emailVerified: boolean;
}
