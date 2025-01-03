import type { QueryKey } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import type { UseMutationOptions } from '@tanstack/react-query/build/modern';

import { useCommonMethods } from './useCommonMethods';

type QueryOfflineModeMethods<TData, TError, TVariables, TContext> = Pick<
  UseMutationOptions<TData, TError, TVariables, TContext>,
  'onMutate' | 'onError' | 'onSettled' | 'onSuccess'
>;

export function useOfflineQuery<TData, TError, TVariables, TContext>(
  mutationKey: QueryKey,
  queryKey: QueryKey,
  options?: UseMutationOptions<TData, TError, TVariables, TContext>,
): QueryOfflineModeMethods<TData, TError, TVariables, TContext> {
  const queryClient = useQueryClient();
  const { onErrorCommon } = useCommonMethods();

  function updateLocalData(data: TVariables) {
    queryClient.setQueryData(queryKey, { ...data });
  }

  return {
    onMutate: async (values: TVariables): Promise<TContext | undefined> => {
      await queryClient.cancelQueries({ queryKey: mutationKey });
      const prevData = queryClient.getQueryData<TContext>(queryKey);
      updateLocalData({ ...prevData, ...values });
      options?.onMutate?.(values);

      return prevData;
    },
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context);
    },
    onError: (data, variables, context) => {
      options?.onError?.(data, variables, context);
      // back to previous values
      queryClient.setQueryData(queryKey, { ...context });
      onErrorCommon();
    },
    onSettled: (data, error, variables, context) => {
      queryClient.invalidateQueries({ queryKey });
      options?.onSettled?.(data, error, variables, context);
    },
  };
}
