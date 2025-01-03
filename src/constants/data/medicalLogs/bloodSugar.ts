import { theme } from '../../../config/Theme';
import type { GraphStage } from '../../../model/medicalLogs/MedicalLogsCommon';

export const bloodSugarGraphStages: GraphStage[] = [
  {
    label: 'Low',
    color: theme.colors.mint,
    conditionType: 'OR',
    scopes: [
      {
        min: 0,
        max: 3.899,
        key: 'bloodSugarmmolL',
      },
      {
        min: 0,
        max: 69,
        key: 'bloodSugarmgdL',
      },
    ],
  },
  {
    label: 'Target Range',
    color: theme.colors.green,
    conditionType: 'AND',
    scopes: [
      {
        min: 3.9,
        max: 5.6,
        key: 'bloodSugarmmolL',
      },
      {
        min: 70,
        max: 100,
        key: 'bloodSugarmgdL',
      },
    ],
  },
  {
    label: 'Moderately High',
    color: theme.colors.orange,
    conditionType: 'AND',
    scopes: [
      {
        min: 5.6,
        max: 6.9,
        key: 'bloodSugarmmolL',
      },
      {
        min: 100,
        max: 125,
        key: 'bloodSugarmgdL',
      },
    ],
  },
  {
    label: 'High',
    color: theme.colors.red,
    conditionType: 'OR',
    scopes: [
      {
        min: 7.0,
        max: Infinity,
        key: 'bloodSugarmmolL',
      },
      {
        min: 126,
        max: Infinity,
        key: 'bloodSugarmgdL',
      },
    ],
  },
];

export const insulinColors: { [key: string]: string } = {
  rapidacting: theme.colors.summaryPurple,
  intermediateacting: theme.colors.summaryGreen,
  longacting: theme.colors.summaryPink,
};

export const insulinLabel: { [key: string]: string } = {
  RapidActing: 'Rapid',
  IntermediateActing: 'Intermediate',
  LongActing: 'Long',
};

export const mealTimeLabel: { [key: string]: string } = {
  Fasting: 'Fasting',
  Before: 'Before',
  After1h: 'After (1h)',
  After2h: 'After (2h)',
  After3h: 'After (3h)',
};

export const bloodSugarXAxisLabels = [
  '8 AM',
  '9 AM',
  '10 AM',
  '11 AM',
  '12 PM',
  '1 PM',
  '2 PM',
  '3 PM',
  '4 PM',
  '5 PM',
  '6 PM',
  '7 PM',
  '8 PM',
  '9 PM',
  '10 PM',
  '11 PM',
  '12 AM',
  '1 AM',
  '2 AM',
  '3 AM',
  '4 AM',
  '5 AM',
  '6 AM',
  '7 AM',
];
