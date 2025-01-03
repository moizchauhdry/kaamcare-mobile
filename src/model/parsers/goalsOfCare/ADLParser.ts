import type { ADLFormData } from '../../../schemas/forms/goalsOfCare/adlSchema';
import { adlDefaultValues } from '../../../constants/forms/goalsOfCare/adl';
import type { ADLKeys, ADLSections } from '../../api/goalsOfCare/ADLModel';

const adlItemApiKeys: { [key: string]: ADLKeys } = {
  feeding: 'Feeding',
  bathing: 'Bathing',
  grooming: 'Grooming',
  dressing: 'Dressing',
  bowelControl: 'BowelControl',
  bladderControl: 'BladderControl',
  toiletUse: 'ToiletUse',
  transfers: 'Transfers',
  mobility: 'MobilityOnLevelSurfaces',
  stairs: 'Stairs',
};

const adlFormKeys: { [key: string]: keyof ADLFormData } = {
  Feeding: 'feeding',
  Bathing: 'bathing',
  Grooming: 'grooming',
  Dressing: 'dressing',
  BowelControl: 'bowelControl',
  BladderControl: 'bladderControl',
  ToiletUse: 'toiletUse',
  Transfers: 'transfers',
  MobilityOnLevelSurfaces: 'mobility',
  Stairs: 'stairs',
};

export const parseADLApiToFormData = (data: ADLSections): ADLFormData => {
  const adlForm: ADLFormData = adlDefaultValues;

  data.forEach((elem) => {
    const key = adlFormKeys[elem.key];
    const multiselectData = (elem.values?.length ?? 0) > 1 ? elem.values?.slice(1, elem.values?.length ?? 1) : [];
    const properMultiselect = multiselectData?.filter((value) => value !== null) ?? [];
    adlForm[key as keyof ADLFormData] = {
      value: elem.values?.[0] ?? '',
      isActive: elem.isActive,
      multiselect: (properMultiselect as string[]).length === 0 ? undefined : properMultiselect,
      explanation: elem.explanation,
    };
  });

  return adlForm;
};

export const parseADLFormToApiData = (data: ADLFormData): ADLSections =>
  Object.keys(data).map((key) => {
    const item = data[key as keyof ADLFormData];

    return {
      key: adlItemApiKeys[key]!,
      values:
        item.value && item.multiselect
          ? [item.value ?? '', ...(item.multiselect ?? [])]
          : item.value
            ? [item.value]
            : null,
      explanation: item.explanation,
      isActive: item.isActive,
    };
  });
