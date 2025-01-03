import { SvgXml } from 'react-native-svg';

import attachmentIcon from 'assets/icons/paperclip.svg';

type AttachmentTypographyProps = {
  attachments?: any[] | null;
};

export const AttachmentTypography = ({ attachments }: AttachmentTypographyProps) => {
  if (!attachments || attachments.length === 0) {
    return '';
  }

  return <SvgXml xml={attachmentIcon} />;
};
