import type { QueryKey, UseMutationOptions } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';

import { useCommonMethods } from './useCommonMethods';
import { useToast } from '../useToast';

type QueryOfflineModeMethods<TData, TError, TVariables, TContext extends MutationReturnType<TVariables>> = Pick<
  UseMutationOptions<TData, TError, TVariables, TContext>,
  'onError' | 'onSettled'
> & {
  onSuccess: (data: TData, variables: TVariables, context: TContext, message?: string) => void;
  onMutate: (values: TVariables) => Promise<MutationReturnType<TVariables>>;
};

export type MutationReturnType<T> = {
  previousItem?: T;
  previousList: T[];
};

type MutationMethodsType<TData, TError, TVariables, TContext extends MutationReturnType<TVariables>> = {
  keys: {
    list: QueryKey;
    mutation: QueryKey;
    single: QueryKey;
  };
  options?: UseMutationOptions<TData, TError, TVariables, TContext>;
};

export function useMutationUpdateMethods<
  TData,
  TError,
  TVariables extends { id: string },
  TContext extends MutationReturnType<TVariables>,
>({
  keys,
  options,
}: MutationMethodsType<TData, TError, TVariables, TContext>): QueryOfflineModeMethods<
  TData,
  TError,
  TVariables,
  TContext
> {
  const queryClient = useQueryClient();
  const { onErrorCommon } = useCommonMethods();
  const { showToast } = useToast();

  return {
    onMutate: async (values) => {
      await queryClient.cancelQueries({ queryKey: keys.single });
      await queryClient.cancelQueries({ queryKey: keys.list });

      const previousItem = queryClient.getQueryData<TVariables>(keys.single);
      const previousList = queryClient.getQueryData<TVariables[]>(keys.list) ?? [];
      const newList = [...previousList];
      const itemIndex = previousList.findIndex((elem) => elem.id === previousItem?.id);
      newList[itemIndex] = { ...previousItem, ...values };

      queryClient.setQueryData<TVariables>(keys.single, values);
      queryClient.setQueryData(keys.list, newList);

      return { previousItem, previousList };
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

      options?.onSettled?.(data, error, variables, context);
    },
  };
}
