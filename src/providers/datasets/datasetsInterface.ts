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

export interface DatasetWithCreationTime {
  creationTime: string;
  id: string;
  [key: string]: string;
}
export interface DatasetsLineChartProps {
  data: DatasetWithCreationTime[] | never[];
  count: number;
}
