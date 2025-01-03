import { useState } from 'react';

import { calculateMultipleFileSize } from '../../../utils/file/file';
import type { AttachmentApiSmallModel, AttachmentModel } from '../../../model/api/common/Attachment';

export const maxFileSizes = 4194304;

const errors = {
  size: 'The file must be smaller than 4 MB.',
  count: 'You can only select up to 5 files at the same time.',
};

type UseAttachmentsValidationType = {
  errorMessage?: string;
  onErrorOccur?: (message: string) => void;
};

export const useAttachmentsValidation = ({ errorMessage, onErrorOccur }: UseAttachmentsValidationType) => {
  const [error, setError] = useState('');
  const properError = errorMessage ?? error;

  const handleErrorOccur = (message: string) => {
    setError(message);
    onErrorOccur?.(message);
  };

  const checkFiles = (newFiles: (AttachmentModel | AttachmentApiSmallModel)[]) => {
    if (newFiles.length >= 5) {
      handleErrorOccur(errors.count);

      return;
    }

    if (calculateMultipleFileSize(newFiles) > maxFileSizes) {
      handleErrorOccur(errors.size);

      return;
    }

    handleErrorOccur('');
  };

  return {
    error: properError,
    checkFiles,
  };
};
