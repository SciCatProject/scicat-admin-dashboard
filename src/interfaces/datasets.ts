export interface IDataset {
  id: string;
  owner: string;
  contactEmail: string;
  description: string;
  type: string;
  pid: string;
  creationTime: string;
}

export interface DatasetsCountPerMonth {
  [key: string]: number;
}

export interface DatasetsLineChartProps {
  data: IDataset[];
  count: number;
}
