import type { QueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../constants/query/queryKeys';
import { attachmentClient } from '../../services/http/ApiServices';
import type { AttachmentApiSmallModel, AttachmentModel } from '../../model/api/common/Attachment';

type RequestData = {
  name?: string;
  photoType?: string;
  sectionName?: string;
  typeName?: string;
};

export const fetchAttachments = <
  TData extends { id?: string; attachments?: (AttachmentApiSmallModel | AttachmentModel)[] | null },
>(
  queryClient: QueryClient,
  item: TData | undefined,
  reqData: RequestData,
) => {
  if (item && item?.attachments) {
    const properAtt = item.attachments as AttachmentApiSmallModel[];

    properAtt.forEach((elem) => {
      const requestData = {
        id: reqData.sectionName === 'advanced-care-planning' ? '' : item.id,
        ...reqData,
      };
      const key = [QUERY_KEYS.ATTACHMENT_GET, elem.id, elem.fileName, requestData];
      const existing = queryClient.getQueryData<AttachmentModel>([
        QUERY_KEYS.ATTACHMENT_GET,
        elem.id,
        elem.fileName,
        requestData,
      ]);

      if (existing) {
        return;
      }

      queryClient.fetchQuery({
        queryKey: key,
        queryFn: () =>
          attachmentClient.getAttachment({ ...requestData, attachmentId: elem.id, attachmentName: elem.fileName }),
      });
    });
  }
};
