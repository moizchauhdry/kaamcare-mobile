export type GraphStage = {
  label: string;
  color: string;
  conditionType: 'OR' | 'AND';
  scopes: {
    min: number;
    max: number;
    key: string;
  }[];
};

export type MoreDataGraphStage = {
  [key: string]: {
    title: string;
    data: {
      name: string;
      text: string;
    }[];
  };
};
