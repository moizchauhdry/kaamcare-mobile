import type { AttachmentApiSmallModel, AttachmentModel } from '../common/Attachment';

export type InsuranceCardsApiResponse = {
  insuranceCards: InsuranceCards;
};

export type InsuranceCards = InsuranceCard[];

export type InsuranceCard = {
  id: string;
  explanation: string;
  frontPhotos: (AttachmentModel | AttachmentApiSmallModel)[];
  backPhotos: (AttachmentModel | AttachmentApiSmallModel)[];
  cardCategory: 'Dental' | 'Vision' | 'Medical';
};

export type NewInsuranceCard = {
  explanation: string;
  frontPhotos: (AttachmentModel | AttachmentApiSmallModel)[];
  backPhotos: (AttachmentModel | AttachmentApiSmallModel)[];
  cardCategory: 'Dental' | 'Vision' | 'Medical';
};
