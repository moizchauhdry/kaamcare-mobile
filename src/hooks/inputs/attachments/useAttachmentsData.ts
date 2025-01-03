import { useEffect, useState } from 'react';
import type { ImagePickerAsset } from 'expo-image-picker';
import type { DocumentPickerAsset } from 'expo-document-picker';

import type { AttachmentApiSmallModel, AttachmentModel } from '../../../model/api/common/Attachment';
import { isAttachmentApiModel } from '../../../utils/file/file';

type UseAttachmentsDataType = {
  checkFiles: (files: (AttachmentModel | AttachmentApiSmallModel)[]) => void;
  initialValues?: (AttachmentModel | AttachmentApiSmallModel)[];
  onChoose?: (files: (AttachmentModel | AttachmentApiSmallModel)[]) => void;
  allowMultipleSelection?: boolean;
};

export const useAttachmentsData = ({
  initialValues,
  checkFiles,
  onChoose,
  allowMultipleSelection = true,
}: UseAttachmentsDataType) => {
  const [files, setFiles] = useState<(AttachmentModel | AttachmentApiSmallModel)[]>([]);

  useEffect(() => {
    if (initialValues && files.length === 0) {
      setFiles(initialValues);
    }

    // eslint-disable-next-line
  }, [initialValues]);

  const handleDelete = (index: number) => {
    const filesCp = [...files];
    filesCp.splice(index, 1);

    setFiles(filesCp);
    onChoose?.(filesCp);

    checkFiles(filesCp);
  };

  const handleAddImage = (image: ImagePickerAsset[]) => {
    const newFiles: AttachmentModel[] = image.map((elem) => ({
      id: elem.assetId ?? elem.fileName,
      uri: elem.uri,
      name: elem.fileName,
      size: elem.fileSize,
      type: 'image',
      mimeType: elem.mimeType,
    }));

    if (allowMultipleSelection === false) {
      setFiles(newFiles);
      checkFiles(newFiles);
      onChoose?.(newFiles);
      return;
    }

    handleSaveFile(newFiles);
  };

  const handleAddDocument = (document: DocumentPickerAsset[]) => {
    const newFiles: AttachmentModel[] = document.map((elem) => ({
      uri: elem.uri,
      name: elem.name,
      size: elem.size,
      type: 'file',
      mimeType: elem.mimeType,
    }));
    handleSaveFile(newFiles);
  };

  const handleSaveFile = (newFiles: AttachmentModel[]) => {
    setFiles((prev) => {
      const currentState = [...prev];
      const currentStateSet = new Set(
        currentState.map((elem) => (isAttachmentApiModel(elem) ? elem.fileName : elem.name)),
      );

      newFiles.forEach((elem) => {
        if (!currentStateSet.has(elem.name)) {
          currentState.push(elem);
          currentStateSet.add(elem.uri);
        }
      });

      checkFiles(currentState);

      onChoose?.(currentState);

      return currentState;
    });
  };

  const replaceApiAttachmentModel = (id: string, model: AttachmentModel) => {
    setFiles((prev) =>
      prev.map((elem) => {
        if (isAttachmentApiModel(elem)) {
          return elem.id === id
            ? { ...elem, size: model.size, uri: model.uri, type: model.type, name: elem.fileName }
            : elem;
        }

        return elem;
      }),
    );
  };

  return {
    files,
    handleDelete,
    handleAddDocument,
    handleAddImage,
    replaceApiAttachmentModel,
  };
};
