export type ProfileInformation = {
  firstName?: string | null;
  lastName?: string | null;
  email: string;
  dateOfBirth?: string | null;
  phoneNumber?: string | null;
  currentWeight?: number | null;
  weightExplanation?: string | null;
  currentHeight?: number | null;
  heightExplanation?: string | null;
  bloodType?: string | null;
  gender?: string | null;
};

export type EmergencyContact = {
  isCreated?: boolean;
  firstName: string | null;
  lastName: string | null;
  address?: string | null;
  phoneNumber: string | null;
  relationshipKind?: string | null;
};

export type AddressInformation = {
  isCreated?: boolean;
  addressType: string | null;
  address: string | null;
  otherResidentialFacilityType: string | null;
  otherFacilityName: string | null;
  otherFacilityPhoneNumber: string | null;
  otherFacilityAddress: string | null;
  otherFacilitySet: boolean | null;
  homelessShelterFacilityName: string | null;
  homelessShelterFacilityPhoneNumber: string | null;
};

export type Pharmacy = {
  isCreated?: boolean;
  pharmacyName: string | null;
  address: string | null;
  pharmacyPhoneNumber: string | null;
};

export type HealthcareProviderNew = {
  firstName: string;
  lastName: string;
  phoneNumber?: string | null;
  specialization?: string | null;
  title?: string | null;
  isPrimaryCareProvider?: boolean | null;
};

export interface HealthcareProvider extends HealthcareProviderNew {
  healthcareProviderId: string;
}

export type Caregiver = {
  isCreated?: boolean;
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
  isCaregiverSet: boolean | string;

  physicalTherapyServiceName: string | null;
  physicalTherapyPhoneNumber: string | null;
  isPhysicalTherapySet: boolean | string;

  nursingServiceName: string | null;
  nursingPhoneNumber: string | null;
  isNursingSet: boolean | string;
};

export type CustomRelationship = {
  customRelationshipName: string;
};

export type CustomSpecialization = {
  customSpecializationName: string;
};

export type SpecializationKinds = { name: string }[];
