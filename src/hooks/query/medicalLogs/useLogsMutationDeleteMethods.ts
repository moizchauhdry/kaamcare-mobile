import type { QueryKey, UseMutationOptions, QueryClient } from '@tanstack/react-query';
import { onlineManager, useQueryClient } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import type { SeparatedDateModel } from '../../../model/api/common/Date';
import { getDateFilters } from '../../../utils/date/date';
import type { AddMedicalDataNavigationParamsList } from '../../../components/Navigation/AddMedicalDataNavigation';
import type { MutationReturnType } from '../useMutationUpdateMethods';
import { useCommonMethods } from '../useCommonMethods';
import { useToast } from '../../useToast';
import { QUERY_KEYS } from '../../../constants/query/queryKeys';

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
    listAll: QueryKey;
    list: QueryKey;
    delete: QueryKey;
    single: QueryKey;
    dashboard: QueryKey;
  };
  type?: 'height' | 'weight' | 'common';
  isNewest?: boolean;
  redirectScreen: keyof AddMedicalDataNavigationParamsList;
  options?: UseMutationOptions<TData, TError, TVariables, TContext>;
  days?: number;
};

type Keys = {
  listAll: QueryKey;
  list: QueryKey;
  dashboard: QueryKey;
  single: QueryKey;
};

const handleSettled = ({
  queryClient,
  type,
  keys,
  navigation,
  redirectScreen,
  isNewest,
  days,
}: {
  queryClient: QueryClient;
  keys: Keys;
  type: string;
  navigation: StackNavigationProp<AddMedicalDataNavigationParamsList>;
  redirectScreen: keyof AddMedicalDataNavigationParamsList;
  isNewest?: boolean;
  days?: number;
}) => {
  const isOnline = onlineManager.isOnline();

  if (isOnline) {
    queryClient.removeQueries({
      queryKey: keys.list,
      exact: false,
    });

    queryClient.removeQueries({
      queryKey: keys.single,
      exact: true,
    });

    queryClient.invalidateQueries({
      queryKey: keys.dashboard,
    });

    if ((type === 'height' || type === 'weight') && isNewest) {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PROFILE_INFORMATION_GET] });
    }
  }

  navigation.reset({ routes: [{ name: redirectScreen, params: { days } }] });
};

export function useLogsMutationDeleteMethods<
  TData,
  TError,
  TVariables,
  TContentData extends { id: string; date: SeparatedDateModel },
  TContext extends MutationReturnType<TContentData>,
>({
  id,
  keys,
  redirectScreen,
  options,
  type = 'common',
  isNewest,
  days,
}: MutationMethodsType<TData, TError, TVariables, TContext>): MutationDeleteMethodsType<
  TData,
  TError,
  TVariables,
  TContext,
  TContentData
> {
  const queryClient = useQueryClient();
  const isOnline = onlineManager.isOnline();
  const { onErrorCommon } = useCommonMethods();
  const { showToast } = useToast();
  const today = new Date();
  const filters = getDateFilters(today, 0);
  const properKeys = {
    listAll: keys.listAll,
    list: [...keys.list, filters.startDate, filters.endDate],
    single: keys.single,
    delete: keys.delete,
  };
  const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();

  return {
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: properKeys.list });
      const prevData = queryClient.getQueryData<TContentData[]>(properKeys.list) ?? [];
      const singleElem = prevData.find((elem) => elem.id === id);
      const dashboard = queryClient.getQueryData<TContentData[]>(keys.dashboard) ?? [];
      const elemInDashboard = dashboard.find((elem) => elem.id === id);

      if (elemInDashboard) {
        queryClient.setQueryData(
          keys.dashboard,
          prevData.filter((elem) => elem.id !== id),
        );
      }

      if (singleElem) {
        queryClient.setQueryData(
          properKeys.list,
          prevData.filter((elem) => elem.id !== id),
        );
      }

      const dataAll = queryClient.getQueryData<TContentData[]>(keys.listAll) ?? [];
      queryClient.setQueryData(
        properKeys.listAll,
        dataAll.filter((elem) => elem.id !== id),
      );

      if (!isOnline) {
        handleSettled({ queryClient, type, keys, navigation, redirectScreen, isNewest, days });
      }

      return { previousList: prevData };
    },
    onSuccess: (data, variables, context, message?: string) => {
      options?.onSuccess?.(data, variables, context);
      showToast({
        text1: message,
      });
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(properKeys.list, context);
      onErrorCommon();
      options?.onError?.(error, variables, context);
    },
    onSettled: () => {
      handleSettled({ queryClient, type, keys, navigation, redirectScreen, isNewest, days });
    },
  };
}
