import type { QueryKey, UseMutationOptions, QueryClient } from '@tanstack/react-query';
import { onlineManager, useQueryClient } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import { getDateFilters, getDateFromSeparatedModel } from '../../../utils/date/date';
import type { SeparatedDateModel } from '../../../model/api/common/Date';
import type { AddMedicalDataNavigationParamsList } from '../../../components/Navigation/AddMedicalDataNavigation';
import { useCommonMethods } from '../useCommonMethods';
import { useToast } from '../../useToast';
import type { MutationReturnType } from '../useMutationUpdateMethods';
import { QUERY_KEYS } from '../../../constants/query/queryKeys';

type QueryOfflineModeMethods<TData, TError, TVariables, TContext extends MutationReturnType<TVariables>> = Pick<
  UseMutationOptions<TData, TError, TVariables, TContext>,
  'onError' | 'onSettled'
> & {
  onSuccess: (data: TData, variables: TVariables, context: TContext, message?: string) => void;
  onMutate: (values: TVariables) => Promise<MutationReturnType<TVariables>>;
};

type MutationMethodsType<TData, TError, TVariables, TContext extends MutationReturnType<TVariables>> = {
  id: string;
  keys: {
    listAll: QueryKey;
    list: QueryKey;
    single: QueryKey;
    dashboard: QueryKey;
  };
  redirectScreen: keyof AddMedicalDataNavigationParamsList;
  type?: 'height' | 'weight' | 'common';
  isNewest?: boolean;
  parser?: (data: any) => any;
  options?: UseMutationOptions<TData, TError, TVariables, TContext>;
  days?: number;
};

type Keys = {
  listAll: QueryKey;
  list: QueryKey;
  single: QueryKey;
  dashboard: QueryKey;
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
  isNewest?: boolean;
  type: string;
  navigation: StackNavigationProp<AddMedicalDataNavigationParamsList>;
  redirectScreen: keyof AddMedicalDataNavigationParamsList;
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

    queryClient.invalidateQueries({ queryKey: keys.dashboard });

    if ((type === 'height' || type === 'weight') && isNewest) {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PROFILE_INFORMATION_GET] });
    }
  }

  if (!isOnline) {
    if ((type === 'weightPersonal' || type === 'heightPersonal') && isNewest) {
      navigation.goBack();
      return;
    }
  }

  navigation.reset({ routes: [{ name: redirectScreen!, params: { days } }] });
};

export function useLogsMutationUpdateMethods<
  TData,
  TError,
  TVariables extends { date: SeparatedDateModel; id: string },
  TContext extends MutationReturnType<TVariables>,
>({
  id,
  keys,
  redirectScreen,
  options,
  parser,
  type = 'common',
  isNewest,
  days,
}: MutationMethodsType<TData, TError, TVariables, TContext>): QueryOfflineModeMethods<
  TData,
  TError,
  TVariables,
  TContext
> {
  const isOnline = onlineManager.isOnline();
  const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();
  const queryClient = useQueryClient();
  const { onErrorCommon } = useCommonMethods();
  const { showToast } = useToast();
  const today = new Date();
  const filters = getDateFilters(today, 0);
  const listKey: QueryKey = [...keys.list, filters.startDate, filters.endDate];

  return {
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: listKey });

      const prevData = queryClient.getQueryData<TVariables[]>(keys.list) ?? [];
      const prevItem = prevData.find((elem) => elem.id === id);
      const dashboard = queryClient.getQueryData<TVariables[]>(keys.dashboard) ?? [];
      const itemInDashboard = dashboard.find((elem) => elem.id === id);

      if (itemInDashboard) {
        const currentDate = new Date();
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(currentDate.getDate() - 6);
        const itemDate = getDateFromSeparatedModel(variables.date);

        if (itemDate >= sevenDaysAgo && itemDate <= currentDate) {
          const newDashboard = [...dashboard];
          const index = dashboard.findIndex((elem) => elem.id === itemInDashboard.id);
          const item = { ...itemInDashboard, ...variables };
          newDashboard[index] = parser ? parser(item) : item;

          queryClient.setQueryData(keys.dashboard, newDashboard);
        } else {
          queryClient.setQueryData(
            keys.dashboard,
            dashboard.filter((elem) => elem.id !== id),
          );
        }
      }

      if (prevItem) {
        const newList = [...prevData];
        const itemIndex = prevData.findIndex((elem) => elem.id === prevItem.id);
        const item = { ...prevItem, ...variables };
        newList[itemIndex] = parser ? parser(item) : item;

        queryClient.setQueryData(listKey, newList);
      }

      const dataAll = queryClient.getQueryData<TVariables[]>(keys.listAll) ?? [];
      const item = dataAll.find((elem) => elem.id === id);

      if (item) {
        const newList = [...dataAll];
        const itemIndex = dataAll.findIndex((elem) => elem.id === item.id);
        const newItem = { ...item, ...variables };
        newList[itemIndex] = parser ? parser(newItem) : newItem;

        queryClient.setQueryData(keys.listAll, newList);
      }

      if (!isOnline) {
        handleSettled({ queryClient, type, keys, redirectScreen, isNewest, navigation, days });
      }

      return { previousItem: prevItem, previousList: prevData };
    },
    onError: (error, variables, context) => {
      if (context?.previousItem) {
        queryClient.setQueryData(keys.single, context.previousItem);
      }
      queryClient.setQueryData(listKey, context);
      onErrorCommon();
      options?.onError?.(error, variables, context);
    },
    onSuccess: (data, variables, context, message?: string) => {
      showToast({
        text1: message,
      });
      options?.onSuccess?.(data, variables, context);
    },
    onSettled: () => {
      handleSettled({ queryClient, type, keys, redirectScreen, isNewest, navigation, days });
    },
  };
}
