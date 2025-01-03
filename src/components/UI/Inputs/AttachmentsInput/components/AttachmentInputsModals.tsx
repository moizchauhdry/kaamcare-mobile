import { AttachmentsInputMenu } from './AttachmentsInputMenu';
import { ModalImagePreview } from '../../../ImagePreview/ModalImagePreview';
import { isPickedFile } from '../../../../../utils/file/file';
import { useAttachmentInputDataContext } from '../../../../../context/Attachment/AttachmentInputContext';
import type { AttachmentModel } from '../../../../../model/api/common/Attachment';

export const AttachmentInputModals = () => {
  const { modals, input } = useAttachmentInputDataContext();
  const properImagesData =
    input?.files
      .map((elem) =>
        !isPickedFile(elem)
          ? {
              id: elem.id!,
              uri: (elem as AttachmentModel).uri,
            }
          : null,
      )
      .filter((elem) => elem !== null) ?? [];

  return (
    <>
      <AttachmentsInputMenu />
      <ModalImagePreview
        isOpen={modals?.showPreview ?? false}
        onClose={() => modals?.setShowPreview(false)}
        imagePreviewProps={{
          initialImage: modals?.previewImage,
          data: properImagesData,
        }}
      />
    </>
  );
};
