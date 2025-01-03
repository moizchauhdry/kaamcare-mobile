export type AttachmentApiSmallModel = {
  id: string;
  fileName: string;
  size?: number;
};

export type AttachmentApiModel = {
  id: string;
  uri: string;
  name?: string | null;
  size?: number;
};

export type AttachmentModel = {
  uri: string;
  id?: string | null;
  name?: string | null;
  size?: number;
  type?: 'image' | 'file' | 'api';
};
