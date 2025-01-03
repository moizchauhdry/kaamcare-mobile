import { v4 as uuidv4 } from 'uuid';
import {
  type QueryClient,
  onlineManager,
  useQueryClient,
  type QueryKey,
  type UseMutationOptions,
} from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import { getDateFilters, getDateFromSeparatedModel } from '../../../utils/date/date';
import type { SeparatedDateModel } from '../../../model/api/common/Date';
import type { AddMedicalDataNavigationParamsList } from '../../../components/Navigation/AddMedicalDataNavigation';
import { useCommonMethods } from '../useCommonMethods';
import { useToast } from '../../useToast';
import { QUERY_KEYS } from '../../../constants/query/queryKeys';
import { sortByDate } from '../../../utils/array/array';
import type { ProfileInformation } from '../../../model/api/ProfileInformation';

type QueryOfflineModeMethods<TData, TError, TVariables, TContext> = Pick<
  UseMutationOptions<TData, TError, TVariables, TContext>,
  'onMutate' | 'onError' | 'onSettled'
> & {
  onSuccess: (data: TData, variables: TVariables, context: TContext, message?: string) => void;
};

type Keys = {
  listAll: QueryKey;
  list: QueryKey;
  dashboard: QueryKey;
};

type MutationMethodsType<TData, TError, TVariables, TContext> = {
  keys: Keys;
  redirectScreen: keyof AddMedicalDataNavigationParamsList;
  parser?: (data: any) => void;
  type?: 'weightPersonal' | 'heightPersonal' | 'weight' | 'height' | 'common';
  options?: UseMutationOptions<TData, TError, TVariables, TContext>;
  days?: number;
};

const handleSettled = ({
  queryClient,
  type,
  keys,
  navigation,
  redirectScreen,
  days,
  valueWeight,
  valueHeight,
}: {
  queryClient: QueryClient;
  keys: Keys;
  type: string;
  navigation: StackNavigationProp<AddMedicalDataNavigationParamsList>;
  redirectScreen: keyof AddMedicalDataNavigationParamsList;
  days?: number;
  valueWeight?: number | string;
  valueHeight?: number | string;
}) => {
  const isOnline = onlineManager.isOnline();

  if (isOnline) {
    queryClient.removeQueries({
      queryKey: keys.list,
      exact: false,
    });
    queryClient.invalidateQueries({ queryKey: keys.dashboard });

    if (type === 'weightPersonal' || type === 'weight' || type === 'height' || type === 'heightPersonal') {
      const personalData = queryClient.getQueryData<ProfileInformation>([QUERY_KEYS.PROFILE_INFORMATION_GET]);
      const newData = {
        ...personalData,
        currentWeight: valueWeight ?? personalData?.currentWeight,
        currentHeight: valueHeight ?? personalData?.currentHeight,
      };
      queryClient.setQueryData([QUERY_KEYS.PROFILE_INFORMATION_GET], newData);
    }

    if (type === 'weightPersonal' || type === 'heightPersonal') {
      navigation.goBack();
      return;
    }
  }

  if (!isOnline) {
    if (type === 'weightPersonal' || type === 'heightPersonal') {
      navigation.goBack();
      return;
    }
  }

  navigation.reset({ routes: [{ name: redirectScreen!, params: { days } }] });
};

export function useLogsMutationAddMethods<
  TData,
  TError,
  TVariables extends {
    date: SeparatedDateModel;
    currentCentimeters?: number | string;
    currentKilograms?: number | string;
  },
  TContext extends { id: string },
>({
  keys,
  redirectScreen,
  parser,
  type = 'common',
  options,
  days,
}: MutationMethodsType<
  TData,
  TError,
  TVariables,
  { prevData: TContext[]; newData: TContext }
>): QueryOfflineModeMethods<TData, TError, TVariables, { prevData: TContext[]; newData: TContext }> {
  const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();
  const queryClient = useQueryClient();
  const { onErrorCommon } = useCommonMethods();
  const { showToast } = useToast();
  const today = new Date();
  const filters = getDateFilters(today, 0);
  const listKey: QueryKey = [...keys.list, filters.startDate, filters.endDate];
  const isOnline = onlineManager.isOnline();

  return {
    onMutate: (variables) => {
      const id = uuidv4();
      const prevData = queryClient.getQueryData<TContext[]>(listKey) ?? [];
      const prevDashboard = queryClient.getQueryData<TContext[]>(keys.dashboard) ?? [];
      const item = { ...variables, id };
      const properData = parser ? parser(item) : item;
      const currentDate = new Date();
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(currentDate.getDate() - 6);
      const itemDate = getDateFromSeparatedModel(variables.date);

      if (today.getDate() === variables.date.day) {
        queryClient.setQueryData(keys.list, sortByDate([...prevData, properData], 'date'));
      }

      if (itemDate >= sevenDaysAgo && itemDate <= currentDate) {
        queryClient.setQueryData(keys.dashboard, sortByDate([...prevDashboard, properData], 'date'));
      }

      const all = queryClient.getQueryData<TContext[]>(keys.listAll) ?? [];
      queryClient.setQueryData(keys.listAll, sortByDate([...all, properData], 'date'));

      if (!isOnline) {
        handleSettled({
          queryClient,
          type,
          keys,
          redirectScreen,
          navigation,
          days,
          valueWeight: variables.currentKilograms,
          valueHeight: variables.currentCentimeters,
        });
        options?.onSettled?.(undefined, null, variables, undefined);
      }

      return { prevData, newData: properData as unknown as TContext };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(listKey, context?.prevData);
      onErrorCommon();
      options?.onError?.(error, variables, context);
    },
    onSuccess: (data, variables, context, message?: string) => {
      showToast({
        text1: message,
      });

      queryClient.setQueryData<TContext[]>(keys.listAll, (oldItems = []) =>
        oldItems.map((item) => (item.id === context.newData.id ? { ...item, id: data } : item)),
      );
      options?.onSuccess?.(data, variables, context);
    },
    onSettled: (data, error, variables, context) => {
      handleSettled({
        queryClient,
        type,
        keys,
        redirectScreen,
        navigation,
        days,
        valueWeight: variables.currentKilograms,
        valueHeight: variables.currentCentimeters,
      });
      options?.onSettled?.(data, error, variables, context);
    },
  };
}
