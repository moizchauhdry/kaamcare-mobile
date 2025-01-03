export type AllergiesApiReturnModel = {
  commonAllergies: CommonAllergyApi[];
  dynamicAllergies: CommonAllergyApi[];
  customAllergies: CustomAllergyApi[];
};

export type AllergiesSelectModels = {
  common: CommonAllergy[];
  dynamic: CommonAllergy[];
  custom: CommonAllergy[];
};

export type CommonAllergyApi = {
  allergyKindName: string;
  allergyId: string;
  isCommon: boolean;
};

export type CustomAllergyApi = CommonAllergyApi & {
  userId: string;
};

export type Allergy = NewAllergy & {
  userAllergyId: string;
};

export type NewAllergy = {
  allergyName: string;
  explanation?: string;
  isCommonName?: boolean;
};

export type CommonAllergy = {
  value: string;
  label: string;
};

export type CustomAllergies = CommonAllergy[];

export type CommonAllergies = CommonAllergy[];

export type Allergies = Allergy[];
