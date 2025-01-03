import { useMutation, type UseMutationOptions, type UseMutationResult, useQueryClient } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query/build/modern';

import type { ErrorResponse } from 'model/api/common/Error';

import { QUERY_KEYS } from '../../../constants/query/queryKeys';
import { attachmentClient } from '../../../services/http/ApiServices';

type DeleteAttachmentRequestData = {
  id?: string;
  sectionName?: string;
  name?: string;
  keyList: QueryKey;
  keySingle?: QueryKey;
  typeName?: string;
  photoType?: string;
};

export function useMutationAttachmentDelete(
  { id, sectionName, typeName, keyList, name, photoType }: DeleteAttachmentRequestData,
  options?: UseMutationOptions<void, ErrorResponse, string>,
): UseMutationResult<void, ErrorResponse, string> {
  const queryClient = useQueryClient();

  return useMutation<void, ErrorResponse, string>({
    ...options,
    mutationKey: [QUERY_KEYS.ATTACHMENT_DELETE, typeName, id],
    mutationFn: (variables) =>
      attachmentClient.deleteAttachment({ name, sectionName, typeName, id, attachmentId: variables, photoType }),
    onMutate: () => {},
    onSuccess: (data, variables, context) => {
      queryClient.removeQueries({ queryKey: [QUERY_KEYS.ATTACHMENT_GET, { sectionName, typeName, id }] });
      queryClient.invalidateQueries({ queryKey: keyList });
      options?.onSuccess?.(data, variables, context);
    },
  });
}
