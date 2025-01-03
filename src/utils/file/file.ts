import type { ImagePickerAsset } from 'expo-image-picker';
import type { DocumentPickerAsset } from 'expo-document-picker';

import type { AttachmentApiSmallModel, AttachmentModel } from '../../model/api/common/Attachment';

export const calculateMultipleFileSize = (files: { size?: number; fileSize?: number }[]) =>
  files.reduce((acc, curr) => {
    const properField = curr.fileSize ?? curr.size ?? 0;

    return acc + properField;
  }, 0);

export const calculateFileSizeToDisplay = (size?: number | string) => {
  if (!size) {
    return;
  }

  const properSize = typeof size === 'string' ? parseInt(size, 10) : size;

  const calculatedSize = properSize / 1024;

  if (calculatedSize > 1000) {
    return `${(calculatedSize / 1024).toFixed(2)} MB`;
  }

  return `${calculatedSize.toFixed(2)} KB`;
};

export const isImage = (fileToCheck: any): fileToCheck is ImagePickerAsset =>
  Boolean(fileToCheck.width) && Boolean(fileToCheck.height);

export const isPickedFile = (fileToCheck: any): fileToCheck is DocumentPickerAsset => fileToCheck.type === 'file';
export const isAttachmentModel = (fileToCheck: any): fileToCheck is AttachmentModel =>
  fileToCheck.type === 'image' || fileToCheck.type === 'file';

export const isAttachmentApiModel = (fileToCheck: any): fileToCheck is AttachmentApiSmallModel =>
  Boolean(fileToCheck.id) &&
  Boolean(fileToCheck.fileName) &&
  (fileToCheck.type !== 'image' || fileToCheck.type !== 'file');
