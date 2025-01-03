import type { SeparatedDateModel } from '../common/Date';
import type { AttachmentApiSmallModel } from '../common/Attachment';

export type FamilyMemberResponseModel = {
  familyMembers: FamilyMembersModel;
};

export type FamilyHistoryResponseModel = {
  familyHistory: FamilyMemberDiagnosisModel[];
};

export type FamilyMembersModel = FamilyMemberModel[];
export type FamilyMemberModel = {
  id: string;
  relationshipName: string;
  familyMemberName?: string;
};

export type NewFamilyMember = {
  name?: string;
  relationshipKindName: string;
};

export interface FamilyMember extends NewFamilyMember {
  id: string;
  diagnosis?: FamilyMemberDiagnosis[];
}

export interface FamilyMemberDiagnosis extends NewFamilyMemberDiagnosis {
  id: string;
  type: FamilyHistoryDiagnosisType;
}

export type NewFamilyMemberDiagnosis = {
  values: FamilyMemberDiagnosisModelValues;
  attachments: AttachmentApiSmallModel[];
  diagnosisDate?: SeparatedDateModel;
  familyMemberId?: string;
  formType?: FamilyHistoryApiDiagnosisType;
  isCommonName?: boolean;
};

export type FamilyMemberDiagnosisModelValues = {
  explanation?: string;
  area?: string[];
  dueTo?: string[];
  extraInformation?: string;
  name?: string;
  location: string[] | string;
  type?: string;
};

export type FamilyMemberDiagnosisModel = {
  id: string;
  familyMemberId: string;
  formType: FamilyHistoryApiDiagnosisType;
  values: FamilyMemberDiagnosisModelValues | { key: string; value: string | string[] };
  attachments: AttachmentApiSmallModel[];
  diagnosisDate?: SeparatedDateModel;
  isCommonName?: boolean;
};

export type FamilyHistoryApiDiagnosisType =
  | 'StandardDiagnosis'
  | 'DentalDiagnosis'
  | 'HearingDiagnosis'
  | 'VisionDiagnosis';

export type FamilyHistoryDiagnosisType = 'hearing' | 'dental' | 'vision' | 'default';
