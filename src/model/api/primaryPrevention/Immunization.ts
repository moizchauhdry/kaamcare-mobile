import type { SeparatedDateModel } from '../common/Date';

export type VaccinesApiModel = {
  vaccines: Vaccine[];
};

export type VaccinesCardApiModel = {
  vaccineCards: VaccineCard[];
};

export type NewVaccine = {
  illness: string;
  date: SeparatedDateModel;
  vaccineName: string;
  explanation: string | null;
  vaccineFacility: string | null;
  attachments: any | null;
  brandName: string | null;
  lotNumber: string | null;
  dose: number | null;
  isCommonName: boolean;
};

export interface Vaccine extends NewVaccine {
  diagnosisDate: SeparatedDateModel;
  id: string;
}

export interface VaccineCard extends NewVaccineCard {
  id: string;
}

export type NewVaccineCard = {
  title: string;
  explanation: string | null;
  attachments: any;
};

export type GroupedIllnessData = {
  illness: string;
  data: Vaccine[];
};
