import { isAttachmentApiModel } from '../../../utils/file/file';
import { capitalize } from '../../../utils/string/string';

export const parseToMultipartFormData = <TData extends Record<string, any>>(
  data: TData,
  apiKeys: { [key: string]: string },
  apiSecondaryKeys?: { [key: string]: string },
): FormData => {
  const form = new FormData();

  Object.keys(data).forEach((elem) => {
    const key = elem;
    const apiKey = apiKeys[key]!;
    const item = data[key];

    if (elem === 'id' || apiKey === undefined) {
      return;
    }

    if (item) {
      if (elem === 'values' && apiSecondaryKeys) {
        Object.keys(item).forEach((innerElem) => {
          const innerKey = apiSecondaryKeys?.[innerElem] as keyof typeof item;

          if (item[innerElem]) {
            form.append(
              innerKey.toString(),
              typeof item[innerElem] === 'object' ? JSON.stringify(item[innerElem]) : item[innerElem],
            );
          }
        });

        return;
      }

      if (typeof item === 'object' && !Array.isArray(item)) {
        Object.keys(item).forEach((innerElem) => {
          const innerKey = innerElem as keyof typeof item;

          if (item[innerKey]) {
            form.append(`${apiKey}.${capitalize(innerElem)}`, item[innerKey]);
          }
        });

        return;
      }

      if (
        (elem === 'attachments' || elem.toLowerCase().includes('attachments')) &&
        Array.isArray(item) &&
        item.length > 0
      ) {
        item.forEach((attachment) => {
          if (!isAttachmentApiModel(attachment))
            form.append(apiKey, {
              uri: attachment.uri,
              name: attachment.name,
              type: attachment.mimeType,
            });
        });

        return;
      }

      form.append(apiKey, typeof item === 'object' ? JSON.stringify(item) : item);
    }
  });

  return form;
};

export const parseInsuranceCardToMultipart = <T extends Record<string, any>>(data: T): FormData => {
  const form = new FormData();

  Object.keys(data).forEach((elem) => {
    switch (elem) {
      case 'explanation':
        form.append('Explanation', data[elem] || null);
        break;
      case 'cardCategory':
        form.append('Category', data[elem]);
        break;
      case 'backPhotos': {
        const photo = data[elem][0];

        if (!isAttachmentApiModel(photo)) {
          form.append('BackPhoto', {
            uri: photo.uri,
            name: photo.name,
            type: photo.mimeType,
          });
        }

        break;
      }
      case 'frontPhotos': {
        const front = data[elem][0];

        if (!isAttachmentApiModel(front)) {
          form.append('FrontPhoto', {
            uri: front.uri,
            name: front.name,
            type: front.mimeType,
          });
        }
        break;
      }
      default:
        break;
    }
  });

  return form;
};
