import { onlineManager } from '@tanstack/react-query';

import { useAlert } from '../useAlert';

export const useCommonMethods = () => {
  const { showErrorAlert } = useAlert();

  const onErrorCommon = () => {
    if (onlineManager.isOnline()) {
      showErrorAlert({
        description:
          'Currently, we are unable to process your request.\n\nPlease try again later. To ensure a smooth experience, make sure your app is updated or contact support for further assistance.',
      });
    }
  };

  return {
    onErrorCommon,
  };
};
