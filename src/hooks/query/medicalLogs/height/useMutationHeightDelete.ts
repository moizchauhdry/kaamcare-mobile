import { useMutation, type UseMutationOptions, type UseMutationResult } from '@tanstack/react-query';

import type { ErrorResponse } from 'model/api/common/Error';
import type { MutationReturnType } from 'hooks/query/useMutationUpdateMethods';

import type { AddMedicalDataNavigationParamsList } from '../../../../components/Navigation/AddMedicalDataNavigation';
import type { HeightLog } from '../../../../model/api/medicalLogs/Height';
import { heightClient } from '../../../../services/http/ApiServices';
import { useLogsMutationDeleteMethods } from '../useLogsMutationDeleteMethods';
import { QUERY_KEYS } from '../../../../constants/query/queryKeys';

export function useMutationHeightDelete(
  id: string,
  isNewest?: boolean,
  days?: number,
  redirectScreen?: keyof AddMedicalDataNavigationParamsList,
  options?: UseMutationOptions<void, ErrorResponse, string>,
): UseMutationResult<void, ErrorResponse, string> {
  const mutationMethods = useLogsMutationDeleteMethods<
    void,
    ErrorResponse,
    string,
    HeightLog,
    MutationReturnType<HeightLog>
  >({
    keys: {
      listAll: [QUERY_KEYS.MEDICAL_LOGS_HEIGHT_LIST_ALL_GET],
      list: [QUERY_KEYS.MEDICAL_LOGS_HEIGHT_LIST_GET],
      single: [QUERY_KEYS.MEDICAL_LOGS_HEIGHT_GET, id],
      delete: [QUERY_KEYS.MEDICAL_LOGS_HEIGHT_DELETE],
      dashboard: [QUERY_KEYS.DASHBOARD_HEIGHT],
    },
    id,
    redirectScreen: redirectScreen ?? 'Height',
    isNewest,
    type: 'height',
    days,
  });

  return useMutation<void, ErrorResponse, string, MutationReturnType<HeightLog>>({
    ...options,
    mutationKey: [QUERY_KEYS.MEDICAL_LOGS_HEIGHT_DELETE],
    mutationFn: (deletionId) => heightClient.deleteHeight(deletionId),
    ...mutationMethods,
    onSuccess: (data, variables, context) => {
      mutationMethods?.onSuccess?.(data, variables, context, `Item has been successfully deleted from your list.`);
    },
  });
}
