import { useQueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../../constants/query/queryKeys';
import type { InsuranceCards } from '../../../model/api/insurance/Insurance';

export const useQueryInsuranceCardGet = (category?: string) => {
  const queryClient = useQueryClient();

  if (!category) {
    return;
  }

  const data = queryClient.getQueryData<InsuranceCards>([QUERY_KEYS.INSURANCE_CARDS_GET]) ?? [];

  return data.find((elem) => elem.cardCategory === category);
};
