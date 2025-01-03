import type { ImagePickerAsset } from 'expo-image-picker';

import type { NewDentalHistory } from '../../model/api/medicalHistory/DentalHistory';

export const isImage = (fileToCheck: any): fileToCheck is ImagePickerAsset =>
  Boolean(fileToCheck.width) && Boolean(fileToCheck.height);

export const isDentalHistory = (data: any): data is NewDentalHistory => Boolean(data.date);
