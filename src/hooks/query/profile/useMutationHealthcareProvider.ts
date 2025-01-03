import {
  onlineManager,
  useMutation,
  type UseMutationOptions,
  type UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import type { ErrorResponse } from 'model/api/common/Error';

import { QUERY_KEYS } from '../../../constants/query/queryKeys';
import type { HealthcareProvider, HealthcareProviderNew } from '../../../model/api/ProfileInformation';
import { useCommonMethods } from '../useCommonMethods';
import { useToast } from '../../useToast';
import { profileClient } from '../../../services/http/ApiServices';
import type { MoreNavigationParamsList } from '../../../components/Navigation/MoreNavigation';

type HealthcareProviderQueryParams = {
  edit?: boolean;
  id?: string;
};

type HealthcareProviderMutateReturnType = {
  prevData: HealthcareProvider[];
};

export const useMutationHealthcareProvider = (
  { edit, id }: HealthcareProviderQueryParams,
  options?: UseMutationOptions<void, ErrorResponse, HealthcareProvider>,
): UseMutationResult<void, ErrorResponse, HealthcareProvider, HealthcareProviderMutateReturnType> => {
  const navigation = useNavigation<StackNavigationProp<MoreNavigationParamsList>>();
  const { onErrorCommon } = useCommonMethods();
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  const mutationKey = [
    edit ? QUERY_KEYS.PROFILE_HEALTHCARE_PROVIDER_UPDATE : QUERY_KEYS.PROFILE_HEALTHCARE_PROVIDER_ADD,
  ];
  const queryKey = [QUERY_KEYS.PROFILE_HEALTHCARE_PROVIDER_GET, id];
  const listKey = [QUERY_KEYS.PROFILE_HEALTHCARE_PROVIDER_LIST];

  function changePrimaryProvider(
    list: HealthcareProvider[],
    values: HealthcareProvider,
    elemIndex?: number,
  ): HealthcareProvider[] {
    if (values.isPrimaryCareProvider) {
      if (typeof elemIndex === 'number') {
        return list
          .map((elem, index) => {
            if (index === elemIndex) {
              return {
                ...elem,
                ...values,
              };
            }

            return {
              ...elem,
              isPrimaryCareProvider: false,
            };
          })
          .sort((a) => (a?.isPrimaryCareProvider ? -1 : 0));
      }

      const newData = list.map((elem) => ({ ...elem, isPrimaryCareProvider: false }));
      newData.push({ ...values, isPrimaryCareProvider: true });
      return newData.sort((a) => (a?.isPrimaryCareProvider ? -1 : 0));
    }

    if (typeof elemIndex !== 'number') {
      return [...list, { ...values }].sort((a) => (a?.isPrimaryCareProvider ? -1 : 0));
    }

    return list;
  }

  function updateLocalData(values: HealthcareProviderNew): HealthcareProviderMutateReturnType {
    const healthcareProviderList = queryClient.getQueryData<HealthcareProvider[]>(listKey) ?? [];

    if (edit && id) {
      const healthcareProviderListCp = [...healthcareProviderList];
      const existingElemIndex = healthcareProviderList.findIndex((elem) => elem.healthcareProviderId === id);
      const existingElem = { ...(healthcareProviderList[existingElemIndex] as HealthcareProvider) };
      const newElem = { ...existingElem, ...values };
      healthcareProviderListCp[existingElemIndex] = newElem;

      const properNewList = [
        ...changePrimaryProvider(healthcareProviderListCp, values as HealthcareProvider, existingElemIndex),
      ];

      queryClient.setQueryData(queryKey, newElem);
      queryClient.setQueryData(listKey, properNewList);

      return { prevData: healthcareProviderList };
    }

    queryClient.setQueryData(queryKey, { ...values, healthcareProviderId: uuidv4() });
    queryClient.setQueryData(listKey, [
      ...changePrimaryProvider([...healthcareProviderList], { ...values, healthcareProviderId: uuidv4() }),
    ]);

    return { prevData: healthcareProviderList };
  }

  return useMutation<void, ErrorResponse, HealthcareProvider, HealthcareProviderMutateReturnType>({
    ...options,
    mutationKey,
    mutationFn: (values) =>
      edit
        ? profileClient.putHealthcareProvider(values.healthcareProviderId, values)
        : profileClient.postHealthcareProvider(values),
    onMutate: async (values) => {
      await queryClient.cancelQueries({ queryKey: mutationKey });

      options?.onMutate?.(values);

      if (!onlineManager.isOnline()) {
        navigation.navigate('MyProfile');
      }

      return updateLocalData(values);
    },
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context);

      showToast({
        text1: `The Healthcare provider has been successfully ${edit ? 'updated' : 'added'}.`,
      });

      queryClient.invalidateQueries({ queryKey: listKey });
    },
    onError: (data, variables, context) => {
      options?.onError?.(data, variables, context);
      onErrorCommon();
      queryClient.setQueryData(listKey, context?.prevData);

      if (!edit) {
        queryClient.removeQueries({ queryKey: [QUERY_KEYS.PROFILE_HEALTHCARE_PROVIDER_GET, id] });
      }
    },
    onSettled: (data, error, variables, context) => {
      queryClient.invalidateQueries({ queryKey: mutationKey });
      options?.onSettled?.(data, error, variables, context);
    },
  });
};
