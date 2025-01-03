import type { Dispatch } from 'react';
import { createContext, useContext } from 'react';
import type { ImagePickerAsset } from 'expo-image-picker';
import type { DocumentPickerAsset } from 'expo-document-picker';

import { useAttachmentsValidation } from '../../hooks/inputs/attachments/useAttachmentsValidation';
import { useAttachmentModalsData } from '../../hooks/inputs/attachments/useAttachmentsModals';
import { useAttachmentMenu } from '../../hooks/inputs/attachments/useAttachmentMenu';
import { useAttachmentsData } from '../../hooks/inputs/attachments/useAttachmentsData';
import type { AttachmentsInputProps } from '../../components/UI/Inputs/AttachmentsInput/AttachmentsInput';
import type { AttachmentApiSmallModel, AttachmentModel } from '../../model/api/common/Attachment';

export type AttachmentInputProviderProps = AttachmentsInputProps & {
  children: React.ReactNode;
};

type AttachmentInputContextReturnType = {
  input: {
    files: (AttachmentModel | AttachmentApiSmallModel)[];
    handleDelete: (index: number) => void;
    handleAddDocument: (files: DocumentPickerAsset[]) => void;
    handleAddImage: (files: ImagePickerAsset[]) => void;
    replaceApiAttachmentModel: (id: string, model: AttachmentModel) => void;
    photoType?: string;
  } | null;
  modals: {
    name: string | null;
    showCamera: boolean;
    showMenu: boolean;
    showPreview: boolean;
    previewImage: string | null;
    setPreviewImage: Dispatch<React.SetStateAction<string | null>>;
    setShowMenu: Dispatch<React.SetStateAction<boolean>>;
    setShowCamera: Dispatch<React.SetStateAction<boolean>>;
    setShowPreview: Dispatch<React.SetStateAction<boolean>>;
    setName: Dispatch<React.SetStateAction<string | null>>;
  } | null;
  validation: {
    error: string;
    checkFiles: (files: (AttachmentModel | AttachmentApiSmallModel)[]) => void;
  } | null;
  menu: {
    handleChooseFile: () => void;
    // handleTakePhoto: () => void;
    handleChooseImage: () => void;
  } | null;
};

export const AttachmentInputContext = createContext<AttachmentInputContextReturnType>({
  input: null,
  modals: null,
  validation: null,
  menu: null,
});

export const AttachmentInputProvider = ({
  onChoose,
  initialValues,
  errorMessage,
  onErrorOccur,
  children,
  allowMultipleSelection,
  photoType,
}: AttachmentInputProviderProps) => {
  const validation = useAttachmentsValidation({ errorMessage, onErrorOccur });
  const inputData = useAttachmentsData({
    checkFiles: validation.checkFiles,
    initialValues,
    onChoose,
    allowMultipleSelection,
  });
  const modalData = useAttachmentModalsData();
  const menuData = useAttachmentMenu({
    onChooseImage: inputData.handleAddImage,
    onChooseFile: inputData.handleAddDocument,
    onClose: () => modalData.setShowMenu(false),
    allowMultipleSelection,
  });

  return (
    <AttachmentInputContext.Provider
      value={{
        input: { ...inputData, photoType },
        modals: { ...modalData },
        validation: { ...validation },
        menu: { ...menuData },
      }}
    >
      {children}
    </AttachmentInputContext.Provider>
  );
};

export const useAttachmentInputDataContext = () => {
  const context = useContext(AttachmentInputContext);

  if (context === undefined) {
    throw new Error('AttachmentInputContext must be used within a AttachmentInputProvider');
  }

  return context;
};
