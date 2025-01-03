type ADLSectionModel = {
  key: ADLKeys;
  isActive: boolean;
  explanation?: string;
  values?: string[] | null;
};

export type ADLSections = ADLSectionModel[];

export type ADLKeys =
  | 'Feeding'
  | 'Bathing'
  | 'Grooming'
  | 'Dressing'
  | 'BladderControl'
  | 'BowelControl'
  | 'ToiletUse'
  | 'Transfers'
  | 'MobilityOnLevelSurfaces'
  | 'Stairs'
  | 'OrganDonation';
