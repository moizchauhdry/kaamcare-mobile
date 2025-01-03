import { theme } from '../../../config/Theme';
import type { GraphStage } from '../../../model/medicalLogs/MedicalLogsCommon';

export const saturationGraphStages: GraphStage[] = [
  {
    label: 'Low',
    color: theme.colors.red,
    conditionType: 'OR',
    scopes: [
      {
        min: 0,
        max: 88,
        key: 'spo2',
      },
    ],
  },
  {
    label: 'Intermediate',
    color: theme.colors.orange,
    conditionType: 'AND',
    scopes: [
      {
        min: 89,
        max: 93,
        key: 'spo2',
      },
    ],
  },
  {
    label: 'Normal',
    color: theme.colors.green,
    conditionType: 'AND',
    scopes: [
      {
        min: 94,
        max: Infinity,
        key: 'spo2',
      },
    ],
  },
];
