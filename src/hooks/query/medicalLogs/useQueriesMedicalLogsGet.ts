import { getDateFilters } from '../../../utils/date/date';
import { useQueryBloodPressureLogsList } from './bloodPressure/useQueryBloodPressureLogsList';
import { useQueryBloodSugarLogsList } from './bloodSugar/useQueryBloodSugarLogsList';
import { useQueryHeightLogsList } from './height/useQueryHeightLogsList';
import { useQueryWeightLogsList } from './weight/useQueryWeightLogsList';
import { useQuerySaturationLogsList } from './saturation/useQuerySaturationLogsList';
import { QUERY_KEYS } from '../../../constants/query/queryKeys';

export const useQueriesMedicalLogsGet = () => {
  const date = new Date();
  const filters = getDateFilters(date, 1);

  const bloodPressure = useQueryBloodPressureLogsList(filters, { queryKey: [QUERY_KEYS.DASHBOARD_BLOOD_PRESSURE] });
  const bloodSugar = useQueryBloodSugarLogsList(filters, { queryKey: [QUERY_KEYS.DASHBOARD_BLOOD_SUGAR] });
  const height = useQueryHeightLogsList(filters, { queryKey: [QUERY_KEYS.DASHBOARD_HEIGHT] });
  const weight = useQueryWeightLogsList(filters, { queryKey: [QUERY_KEYS.DASHBOARD_WEIGHT] });
  const saturation = useQuerySaturationLogsList(filters, { queryKey: [QUERY_KEYS.DASHBOARD_SATURATION] });

  return [bloodPressure, bloodSugar, saturation, weight, height];
};
