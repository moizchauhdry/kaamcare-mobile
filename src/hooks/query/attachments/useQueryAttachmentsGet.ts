import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../../constants/query/queryKeys';
import { attachmentClient } from '../../../services/http/ApiServices';
import type { AttachmentModel } from '../../../model/api/common/Attachment';
import { CACHE_WEEK } from '../../../constants/query/cachesTime';

type UseQueryAttachmentsGetType = {
  attachmentId: string | undefined;
  attachmentName: string;
  requestData: {
    id?: string;
    name?: string;
    sectionName?: string;
    typeName?: string;
    photoType?: string;
  };
  options?: Omit<UseQueryOptions<AttachmentModel>, 'queryKey'>;
};

export const useQueryAttachmentsGet = ({
  attachmentId,
  attachmentName,
  requestData,
  options,
}: UseQueryAttachmentsGetType): UseQueryResult<AttachmentModel> =>
  useQuery({
    queryKey: [QUERY_KEYS.ATTACHMENT_GET, attachmentId, attachmentName, requestData],
    queryFn: () => attachmentClient.getAttachment({ ...requestData, attachmentId, attachmentName }),
    enabled: Boolean(attachmentId),
    retry: 2,
    staleTime: CACHE_WEEK,
    gcTime: CACHE_WEEK,
    ...options,
  });
