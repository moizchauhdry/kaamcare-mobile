import AbstractHttpService from '../AbstractHttpService';
import type { AttachmentApiModel } from '../../../model/api/common/Attachment';

type AttachmentParameters = {
  sectionName?: string;
  id?: string;
  attachmentId?: string;
  attachmentName?: string;
  typeName?: string;
  name?: string;
  photoType?: string;
};

export class AttachmentClient extends AbstractHttpService {
  getAttachment({
    sectionName,
    typeName,
    id,
    attachmentId,
    attachmentName,
    photoType,
    name = 'medical-history',
  }: AttachmentParameters): Promise<AttachmentApiModel> {
    const properPhotoType = name === 'insurance-card' ? `${photoType}-photo` : 'attachment';
    return this.http
      .get(
        `${name}${sectionName ? `/${sectionName}` : ''}${typeName ? `/${typeName}` : ''}/${id}/${properPhotoType}/${attachmentId}`,
      )
      .then((response) => response)
      .then(async (res) => {
        const reader = new FileReader();
        const blob = await res.blob();

        return new Promise<AttachmentApiModel>((resolve, reject) => {
          // eslint-disable-next-line
          const data = JSON.parse(JSON.stringify(blob))._data;

          reader.onloadend = () => {
            resolve({
              uri: reader.result,
              id: attachmentId,
              size: data.size,
              name: data.name ?? attachmentName,
              type: (data.name ?? attachmentName).includes('.pdf') ? 'file' : 'image',
            } as AttachmentApiModel);
          };
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      })
      .catch(this.reject);
  }

  deleteAttachment({
    sectionName,
    typeName,
    id,
    attachmentId,
    name = 'medical-history',
    photoType = 'attachment',
  }: AttachmentParameters): Promise<void> {
    const properPhotoType = name === 'insurance-card' ? `${photoType}-photo` : 'attachment';
    return this.http
      .delete(
        `${name}${sectionName ? `/${sectionName}` : ''}${typeName ? `/${typeName}` : ''}/${id}/${properPhotoType}/${attachmentId}`,
      )
      .then(() => undefined)
      .catch(this.reject);
  }
}
