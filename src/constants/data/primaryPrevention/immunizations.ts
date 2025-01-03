import type { NewVaccine } from '../../../model/api/primaryPrevention/Immunization';

export const dymamicVaccinesData = [
  { value: 'AVA', label: 'AVA', subLabel: 'Anthrax' },
  { value: 'Cholera', label: 'Cholera', subLabel: 'Cholera' },
  { value: 'DTaP', label: 'DTaP', subLabel: 'Diphtheria, Pertussis, Tetanus' },
  { value: 'DT', label: 'DT', subLabel: 'Diphtheria, Tetanus' },
  {
    value: 'DTaP-IPV-Hib-HepB',
    label: 'DTaP-IPV-Hib-HepB',
    subLabel: 'Diptheria, Haemophilus influenzae type b (Hib), Hepatitis B, Pertussis, Polio, Tetanus',
  },
  {
    value: 'DTaP-IPV/Hib',
    label: 'DTaP-IPV/Hib',
    subLabel: 'Diptheria, Haemophilus influenzae type b (Hib), Pertussis, Polio, Tetanus',
  },
  { value: 'DTaP-HepB-IPV', label: 'DTaP-HepB-IPV', subLabel: 'Diptheria, Hepatitis B, Pertussis, Polio, Tetanus' },
  { value: 'DTaP-IPV', label: 'DTaP-IPV', subLabel: 'Diptheria, Pertussis, Polio, Tetanus' },
  { value: 'Hib', label: 'Hib', subLabel: 'Haemophilus influenzae type b (Hib)' },
  { value: 'HepA', label: 'HepA', subLabel: 'Hepatitis A' },
  { value: 'HepA-HepB', label: 'HepA-HepB', subLabel: 'Hepatitis A, Hepatisis B' },
  { value: 'JE', label: 'JE', subLabel: 'Japanese Encephalitis' },
  { value: 'MMRV', label: 'MMRV', subLabel: 'Measles, Mumps, Rubella, Varicella (Chickenpox)' },
  { value: 'MenACWY', label: 'MenACWY', subLabel: 'Meningococcal' },
  { value: 'MenB', label: 'MenB', subLabel: 'Meningococcal' },
  { value: 'PCV13', label: 'PCV13', subLabel: 'Pneumococcal' },
  { value: 'PCV15', label: 'PCV15', subLabel: 'Pneumococcal' },
  { value: 'PCV20', label: 'PCV20', subLabel: 'Pneumococcal' },
  { value: 'PPSV23', label: 'PPSV23', subLabel: 'Pneumococcal' },
  { value: 'Polio', label: 'Polio', subLabel: 'Polio' },
  { value: 'Rabies', label: 'Rabies', subLabel: 'Rabies' },
  { value: 'RV1', label: 'RV1', subLabel: 'Rotavirus' },
  { value: 'RV5', label: 'RV5', subLabel: 'Rotavirus' },
  { value: 'ccIIV4', label: 'ccIIV4', subLabel: 'Seasonal Influenza (Flu)' },
  { value: 'IIV3', label: 'IIV3', subLabel: 'Seasonal Influenza (Flu)' },
  { value: 'LAIV', label: 'LAIV', subLabel: 'Seasonal Influenza (Flu)' },
  { value: 'RIV3', label: 'RIV3', subLabel: 'Seasonal Influenza (Flu)' },
  { value: 'RIV4', label: 'RIV4', subLabel: 'Seasonal Influenza (Flu)' },
  { value: 'RZV', label: 'RZV', subLabel: 'Shingles' },
  { value: 'Vaccinia', label: 'Vaccinia', subLabel: 'Smallpox' },
  { value: 'Typhoid Oral', label: 'Typhoid Oral', subLabel: 'Typhoid Fever' },
  { value: 'Typhoid Polysaccharide', label: 'Typhoid Polysaccharide', subLabel: 'Typhoid Fever' },
  { value: 'YF', label: 'YF', subLabel: 'Yellow Fever' },
];

export const commonVaccinesData = [
  { value: 'VAR', label: 'VAR', subLabel: 'Varicella (Chickenpox)' },
  { value: 'COVID-19', label: 'COVID-19', subLabel: 'COVID-19' },
  { value: 'IIV4', label: 'IIV4', subLabel: 'Seasonal Influenza (Flu)' },
  { value: 'HepB', label: 'HepB', subLabel: 'Hepatitis B' },
  { value: 'HPV9', label: 'HPV9', subLabel: 'Human Papillomavirus (HPV)' },
  { value: 'MMR', label: 'MMR', subLabel: 'Measles, Mumps, Rubella' },
  { value: 'Tdap', label: 'Tdap', subLabel: 'Diphtheria, Pertussis, Tetanus' },
  { value: 'Td', label: 'Td', subLabel: 'Diphtheria, Tetanus' },
];

export const vaccineFacilityData = [
  { value: 'HealthCareProfessional', label: 'Health Care Professional' },
  { value: 'ClinicalSite', label: 'Clinical Site' },
];

export const vaccinesItemApiKeys: { [key in keyof NewVaccine]: string } = {
  date: 'Date',
  illness: 'Illness',
  attachments: 'Attachments',
  explanation: 'Explanation',
  vaccineName: 'VaccineName',
  vaccineFacility: 'VaccineFacility',
  lotNumber: 'LotNumber',
  dose: 'Dose',
  brandName: 'BrandName',
  isCommonName: 'IsCommonName',
};

export const vaccinesCardItemApiKeys = {
  title: 'Title',
  attachments: 'Attachments',
  explanation: 'Explanation',
};
