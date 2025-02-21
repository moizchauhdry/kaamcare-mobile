export type GraphStage = {
  label: string | undefined;
  color: string | undefined;
  conditionType: 'OR' | 'AND';
  exclusiveAdvices:
    | {
        title: string;
        description: string;
        titleColor: string;
      }[]
    | undefined;
  scopes:
    | {
        min: number | undefined;
        max: number | undefined;
        key: string | undefined;
      }[]
    | undefined
    | any;
  index: number | undefined;
  advice: string | undefined;
};

export type MoreDataGraphStage = {
  [key: string]: {
    title: string | undefined;
    data: {
      name: string | undefined;
      text: string | undefined;
    }[];
  };
};
