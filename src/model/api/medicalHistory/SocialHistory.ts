export type SocialHistoryAllApiModel = {
  smoking: SocialHistory[];
  alcohol: SocialHistory[];
  recreationalDrugUse: SocialHistory[];
  occupation: SocialHistory[];
};

export type SocialHistoryName = keyof SocialHistoryAllApiModel;
export type SocialHistoryGroupType = 'Smoking' | 'Alcohol' | 'Occupation' | 'RecreationalDrugUse';

export type NewSocialHistory = {
  type: string;
  quantity?: string | null;
  frequency?: string | null;
  dateLength?: string | null;
  route?: string | null;
  status?: string | null;
  explanation?: string | null;
  group?: SocialHistoryGroupType;
  isCommonName?: boolean;
};

export interface SocialHistory extends NewSocialHistory {
  id: string;
}
