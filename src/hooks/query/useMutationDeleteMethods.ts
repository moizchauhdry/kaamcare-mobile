import type { QueryKey, UseMutationOptions } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';

import { useCommonMethods } from './useCommonMethods';
import { useToast } from '../useToast';
import type { MutationReturnType } from './useMutationUpdateMethods';

type MutationDeleteMethodsType<TData, TError, TVariables, TContext, TContentData> = {
  onMutate: (variables: TVariables) => Promise<MutationReturnType<TContentData>>;
  onSuccess?: (data: TData, variables: TVariables, context: TContext, message?: string) => Promise<unknown> | unknown;
  onError?: (error: TError, variables: TVariables, context: TContext | undefined) => Promise<unknown> | unknown;
  onSettled?: (
    data: TData | undefined,
    error: TError | null,
    variables: TVariables,
    context: TContext | undefined,
  ) => Promise<unknown> | unknown;
};

type MutationMethodsType<TData, TError, TVariables, TContext> = {
  id: string;
  keys: {
    list: QueryKey;
    mutation: QueryKey;
    single: QueryKey;
  };
  options?: UseMutationOptions<TData, TError, TVariables, TContext>;
};

export function useMutationDeleteMethods<
  TData,
  TError,
  TVariables,
  TContentData extends { id: string },
  TContext extends MutationReturnType<TContentData>,
>({
  id,
  keys,
  options,
}: MutationMethodsType<TData, TError, TVariables, TContext>): MutationDeleteMethodsType<
  TData,
  TError,
  TVariables,
  TContext,
  TContentData
> {
  const queryClient = useQueryClient();
  const { onErrorCommon } = useCommonMethods();
  const { showToast } = useToast();

  return {
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: keys.mutation });
      const prevData = queryClient.getQueryData<TContentData[]>(keys.list) ?? [];
      const currentItem = queryClient.getQueryData<TContentData>(keys.single);
      const newData = prevData.filter((elem) => elem.id !== id);
      queryClient.setQueryData(keys.list, newData);

      return { previousList: prevData, previousItem: currentItem };
    },
    onSuccess: (data, variables, context, message?: string) => {
      options?.onSuccess?.(data, variables, context);
      showToast({
        text1: message,
      });
    },
    onError: (error, variables, context) => {
      options?.onError?.(error, variables, context);
      queryClient.setQueryData(keys.list, context?.previousList);
      onErrorCommon();
    },
    onSettled: (data, error, variables, context) => {
      queryClient.invalidateQueries({ queryKey: keys.mutation });
      options?.onSettled?.(data, error, variables, context);
    },
  };
}
