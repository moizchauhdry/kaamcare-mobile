import { v4 as uuidv4 } from 'uuid';
import type { QueryKey, UseMutationOptions } from '@tanstack/react-query';
import { onlineManager, useQueryClient } from '@tanstack/react-query';
import 'react-native-get-random-values';

import { useCommonMethods } from './useCommonMethods';
import { useToast } from '../useToast';

type QueryOfflineModeMethods<TData, TError, TVariables, TContext> = Pick<
  UseMutationOptions<TData, TError, TVariables, TContext>,
  'onMutate' | 'onError' | 'onSettled'
> & {
  onSuccess: (data: TData, variables: TVariables, context: TContext, message?: string) => void;
};

type MutationMethodsType<TData, TError, TVariables, TContext> = {
  keys: {
    list: QueryKey;
    mutation: QueryKey;
    single: QueryKey;
  };
  options?: UseMutationOptions<TData, TError, TVariables, TContext>;
  idKey?: string;
};

export function useMutationAddMethods<TData, TError, TVariables, TContext>({
  keys,
  options,
  idKey,
}: MutationMethodsType<TData, TError, TVariables, TContext[]>): QueryOfflineModeMethods<
  TData,
  TError,
  TVariables,
  TContext[]
> {
  const queryClient = useQueryClient();
  const { onErrorCommon } = useCommonMethods();
  const { showToast } = useToast();

  return {
    onMutate: async (values): Promise<TContext[] | undefined> => {
      await queryClient.cancelQueries({ queryKey: keys.list });

      const previousList = queryClient.getQueryData<TContext[]>(keys.list) ?? [];
      const newItem = { [`${idKey}`]: uuidv4(), ...values };
      queryClient.setQueryData(keys.list, (old: TContext[] = []) => [...old, newItem]);

      if (!onlineManager.isOnline()) {
        options?.onSettled?.(undefined, null, values, undefined);
      }

      return previousList;
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(keys.list, context);
      onErrorCommon();
      options?.onError?.(error, variables, context);
    },
    onSuccess: (data, variables, context, message?: string) => {
      showToast({
        text1: message,
      });
      options?.onSuccess?.(data, variables, context);
    },
    onSettled: (data, error, variables, context) => {
      queryClient.invalidateQueries({ queryKey: keys.mutation });
      // queryClient.invalidateQueries({ queryKey: keys.list, refetchType: 'active' });

      options?.onSettled?.(data, error, variables, context);
    },
  };
}
