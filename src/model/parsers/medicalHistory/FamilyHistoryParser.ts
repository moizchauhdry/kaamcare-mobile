import type { FamilyMemberFormData } from '../../../schemas/forms/medicalHistory/familyHistory';
import type {
  FamilyMemberModel,
  NewFamilyMember,
  NewFamilyMemberDiagnosis,
  FamilyMemberDiagnosisModel,
  FamilyMemberDiagnosisModelValues,
} from '../../api/medicalHistory/FamilyHistory';
import { isDentalHistory } from '../../../utils/object/history';
import { lowerCase } from '../../../utils/string/string';

export const parseFamilyMemberToApiData = (data: FamilyMemberFormData): NewFamilyMember => ({
  name: data.name,
  relationshipKindName: data.relationshipKind,
});

export const parseFamilyMemberToFormData = (data: FamilyMemberModel): FamilyMemberFormData => ({
  name: data.familyMemberName,
  relationshipKind: data.relationshipName,
});

export const parseFamilyMemberDiagnosisValues = (values: any) => {
  const valuesArr = Array.isArray(values) ? values : [];
  return valuesArr.length > 0
    ? valuesArr.reduce((acc, curr) => {
        acc[lowerCase(curr.key)] = curr.value;

        return acc;
      }, {})
    : (values as FamilyMemberDiagnosisModelValues);
};

export const parseFamilyMemberDiagnosisToFormData = (data: FamilyMemberDiagnosisModel): any => {
  const values = parseFamilyMemberDiagnosisValues(data.values);
  const location = values.locations ?? values.location;

  return {
    explanation: values.explanation ?? '',
    day: data.diagnosisDate?.day?.toString() ?? '',
    month: data.diagnosisDate?.month?.toString() ?? '',
    year: data.diagnosisDate?.year?.toString() ?? '',
    attachment: data.attachments ?? [],
    location: (Array.isArray(location) ? location?.[0] : location) ?? '',
    supportingToggle: values.extraInformation === 'true',
    area: values.area ?? [],
    toggle: values.extraInformation === 'true',
    dueTo: values.dueTo ?? [],
    type: values.type ?? '',
  };
};

export const parseFamilyMemberDiagnosisFormToApiData = (data: any, name: string): NewFamilyMemberDiagnosis => {
  const newData: NewFamilyMemberDiagnosis = {
    values: {
      explanation: data.explanation ?? undefined,
      location: data.location,
      area: data.area,
      extraInformation: data.supportingToggle || data.toggle,
      dueTo: data.dueTo,
      type: data.type,
      name,
    },
    attachments: data.attachments ?? undefined,
  };

  if (isDentalHistory(data)) {
    newData.diagnosisDate = {
      day: data.date?.day || null,
      month: data.date?.month || null,
      year: data.date?.year || null,
    };
  } else {
    newData.diagnosisDate = {
      day: data.diagnosisDate?.day || null,
      month: data.diagnosisDate?.month || null,
      year: data.diagnosisDate?.year || null,
    };
  }

  return newData;
};
