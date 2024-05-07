import { IResourceComponentsProps, useShow, useParsed } from '@refinedev/core';
import { ErrorComponent, Show } from '@refinedev/mui';
import { IDataset } from '../../providers/datasets/datasetsInterface';
import { LoadingSpinner } from '../../components/common/loading';
import { JsonViewer } from 'view-json-react';

export const DatasetShow: React.FC<IResourceComponentsProps> = () => {
  const { id } = useParsed();
  const { queryResult } = useShow<IDataset>({
    resource: 'datasets',
    id,
  });

  const { data, isLoading, isError } = queryResult;

  if (isError) {
    return <ErrorComponent />;
  }
  if (isLoading) {
    return <LoadingSpinner card />;
  }

  return (
    <Show resource='datasets' recordItemId={data.data.pid}>
      <JsonViewer data={data.data} expandLevel={1}></JsonViewer>
    </Show>
  );
};
