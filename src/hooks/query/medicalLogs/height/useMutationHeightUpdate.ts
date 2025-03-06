import { useMutation, type UseMutationOptions, type UseMutationResult } from '@tanstack/react-query';

import type { ErrorResponse } from 'model/api/common/Error';

import type { MutationReturnType } from '../../useMutationUpdateMethods';
import type { AddMedicalDataNavigationParamsList } from '../../../../components/Navigation/AddMedicalDataNavigation';
import type { HeightLog } from '../../../../model/api/medicalLogs/Height';
import { heightClient } from '../../../../services/http/ApiServices';
import { useLogsMutationUpdateMethods } from '../useLogsMutationUpdateMethods';
import { QUERY_KEYS } from '../../../../constants/query/queryKeys';

export function useMutationHeightUpdate(
  id: string,
  isNewest?: boolean,
  days?: number,
  redirectScreen?: keyof AddMedicalDataNavigationParamsList,
  options?: UseMutationOptions<void, ErrorResponse, HeightLog>,
): UseMutationResult<void, ErrorResponse, HeightLog> {
  const mutationMethods = useLogsMutationUpdateMethods<void, ErrorResponse, HeightLog, MutationReturnType<HeightLog>>({
    id,
    keys: {
      listAll: [QUERY_KEYS.MEDICAL_LOGS_HEIGHT_LIST_ALL_GET],
      list: [QUERY_KEYS.MEDICAL_LOGS_HEIGHT_LIST_GET],
      single: [QUERY_KEYS.MEDICAL_LOGS_HEIGHT_GET, id],
      dashboard: [QUERY_KEYS.DASHBOARD_HEIGHT],
    },
    redirectScreen: redirectScreen ?? 'Height',
    type: 'height',
    isNewest,
    days,
  });

  return useMutation<void, ErrorResponse, HeightLog, MutationReturnType<HeightLog>>({
    ...options,
    mutationKey: [QUERY_KEYS.MEDICAL_LOGS_HEIGHT_UPDATE],
    mutationFn: (variables) => {
      console.log('🔵 [Height Update] Mutation executing with variables:', variables);
      return heightClient.putHeight(variables);
    },
    ...mutationMethods,
    onMutate: async (variables) => {
      console.log('🔵 [Height Update] onMutate triggered with:', variables);
      return mutationMethods?.onMutate?.(variables);
    },
    onError: (error, variables, context) => {
      console.log('❌ [Height Update] Error:', { error, variables });
      mutationMethods?.onError?.(error, variables, context);
    },
    onSuccess: (data, variables, context) => {
      console.log('✅ [Height Update] Success:', { data, variables });
      mutationMethods?.onSuccess?.(data, variables, context, `This log has been successfully updated.`);
    },
  });
}
