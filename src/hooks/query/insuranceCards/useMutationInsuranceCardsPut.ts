import {
  onlineManager,
  useMutation,
  type UseMutationOptions,
  type UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import type { ErrorResponse } from 'model/api/common/Error';

import { QUERY_KEYS } from '../../../constants/query/queryKeys';
import type { InsuranceCard, InsuranceCards } from '../../../model/api/insurance/Insurance';
import { attachmentClient, insuranceClient } from '../../../services/http/ApiServices';
import { useCommonMethods } from '../useCommonMethods';
import { useToast } from '../../useToast';
import type { InsuranceNavigatorParamsList } from '../../../components/Navigation/LoggednNavigation';
import type { AttachmentApiSmallModel } from '../../../model/api/common/Attachment';

type MutateReturnType = {
  previousList: InsuranceCards | undefined;
};

export function useMutationInsuranceCardsPut(
  options?: UseMutationOptions<string, ErrorResponse, InsuranceCard, MutateReturnType>,
): UseMutationResult<string, ErrorResponse, InsuranceCard, MutateReturnType> {
  const queryClient = useQueryClient();
  const navigation = useNavigation<StackNavigationProp<InsuranceNavigatorParamsList>>();
  const { onErrorCommon } = useCommonMethods();
  const { showToast } = useToast();

  return useMutation<string, ErrorResponse, InsuranceCard, MutateReturnType>({
    ...options,
    mutationKey: [QUERY_KEYS.INSURANCE_CARDS_POST],
    mutationFn: (variables) => insuranceClient.putInsuranceCard(variables.id, variables),
    onMutate: async (variables): Promise<MutateReturnType> => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.INSURANCE_CARDS_GET] });

      const previousList = queryClient.getQueryData<InsuranceCards>([QUERY_KEYS.INSURANCE_CARDS_GET]) ?? [];
      const newList = previousList.map((elem) => {
        if (elem.id === variables.id) {
          return { ...elem, ...variables };
        }

        return elem;
      });

      queryClient.setQueryData([QUERY_KEYS.INSURANCE_CARDS_GET], [...newList]);

      if (!onlineManager.isOnline()) {
        navigation.reset({ routes: [{ name: 'SelectInsurance' }] });
      }

      return { previousList };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData([QUERY_KEYS.INSURANCE_CARDS_GET], context?.previousList);
      onErrorCommon();
      options?.onError?.(error, variables, context);
    },
    onSuccess: (_, variables) => {
      showToast({
        text1: `${variables.cardCategory} Cards has been added to your Insurance Cards`,
      });
    },
    onSettled: async (data) => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.INSURANCE_CARDS_GET] });

      const previousList = queryClient.getQueryData<InsuranceCards>([QUERY_KEYS.INSURANCE_CARDS_GET]) ?? [];
      const newElem = previousList.find((elem) => elem.id === data);
      const reqData = {
        id: data,
        name: 'insurance-card',
        sectionName: undefined,
        typeName: undefined,
      };
      const front = newElem?.frontPhotos[0] as AttachmentApiSmallModel;
      const back = newElem?.backPhotos[0] as AttachmentApiSmallModel;

      if (front && front?.id && front?.fileName) {
        queryClient.fetchQuery({
          queryKey: [QUERY_KEYS.ATTACHMENT_GET, front?.id, front?.fileName, { ...reqData, photoType: 'front-photo' }],
          queryFn: () =>
            attachmentClient.getAttachment({
              ...reqData,
              photoType: 'front',
              attachmentId: front?.id,
              attachmentName: front?.fileName,
            }),
        });
      }

      if (back && back?.id && back?.fileName) {
        queryClient.fetchQuery({
          queryKey: [QUERY_KEYS.ATTACHMENT_GET, back?.id, back?.fileName, { ...reqData, photoType: 'back-photo' }],
          queryFn: () =>
            attachmentClient.getAttachment({
              ...reqData,
              photoType: 'back',
              attachmentId: back?.id,
              attachmentName: back?.fileName,
            }),
        });
      }

      navigation.reset({ routes: [{ name: 'SelectInsurance' }] });
    },
  });
}
