import { useState } from 'react';

export const useAttachmentModalsData = () => {
  const [name, setName] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  return {
    name,
    showCamera,
    showMenu,
    showPreview,
    previewImage,
    setPreviewImage,
    setShowMenu,
    setShowCamera,
    setShowPreview,
    setName,
  };
};
