import { IResourceComponentsProps, useShow, useParsed } from '@refinedev/core';
import { ErrorComponent, Show } from '@refinedev/mui';
import { IDataset } from '../../providers/datasets/datasetsInterface';
import { LoadingSpinner } from '../../components/common/loading';
import ReactJson from '@vahagn13/react-json-view';
import { ColorModeContext } from '../../contexts/color-mode';
import { useContext } from 'react';

export const DatasetShow: React.FC<IResourceComponentsProps> = () => {
  const { mode } = useContext(ColorModeContext);
  const theme = mode === 'dark' ? 'google' : 'rjv-default';

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
      <ReactJson src={data.data} collapsed={1} theme={theme}></ReactJson>
    </Show>
  );
};
