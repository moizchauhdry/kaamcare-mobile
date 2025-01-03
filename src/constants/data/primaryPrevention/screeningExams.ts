import type { NewScreeningExam } from '../../../model/api/primaryPrevention/ScreeningExam';

export const dymamicScreeningExamsData = [
  { value: 'Pap Smear (Cytology) & high risk HPV', label: 'Pap Smear (Cytology) & high risk HPV' },
  { value: 'High risk HPV', label: 'High risk HPV' },
  { value: 'Cholesterol', label: 'Cholesterol' },
  { value: 'Hepatitis B', label: 'Hepatitis B' },
  { value: 'Hepatitis C', label: 'Hepatitis C' },
  { value: 'Aspirin to prevent Pre-eclampsia', label: 'Aspirin to prevent Pre-eclampsia' },
  { value: 'Anxiety', label: 'Anxiety' },
  { value: 'BRCA1/2 gene mutation', label: 'BRCA1/2 gene mutation' },
  { value: 'Chlamydia and Gonorrhea', label: 'Chlamydia and Gonorrhea' },
  { value: 'Depression and Suicide Risk', label: 'Depression and Suicide Risk' },
  { value: 'Fall prevention', label: 'Fall prevention' },
  {
    value: 'Folic Acid for prevention of Neural Tube Defects',
    label: 'Folic Acid for prevention of Neural Tube Defects',
  },
  { value: 'Gestational Diabetes', label: 'Gestational Diabetes' },
  { value: 'Rh(D) incompatibility screening', label: 'Rh(D) incompatibility screening' },
  { value: 'Syphilis', label: 'Syphilis' },
];

export const commonScreeningExamsData = [
  { value: 'Mammogram', label: 'Mammogram' },
  { value: 'Pap Smear (Cytology)', label: 'Pap Smear (Cytology)' },
  { value: 'DEXA Scan', label: 'DEXA Scan' },
  { value: 'Prostate cancer (PSA)', label: 'Prostate cancer (PSA)' },
  { value: 'Abdominal Aortic Aneurysm (AAA) Ultrasound', label: 'Abdominal Aortic Aneurysm (AAA) Ultrasound' },
  { value: 'Colonoscopy', label: 'Colonoscopy' },
  { value: 'Diabetes Mellitus', label: 'Diabetes Mellitus' },
  { value: 'HIV', label: 'HIV' },
  { value: 'Lung Cancer screening low dose CT scan', label: 'Lung Cancer screening low dose CT scan' },
  { value: 'Vision screening', label: 'Vision screening' },
];

export const screeningExamFacilityData = [
  { value: 'HealthCareProfessional', label: 'Health Care Professional' },
  { value: 'ClinicalSite', label: 'Clinical Site' },
];

export const screeningExamsItemApiKeys: { [key in keyof NewScreeningExam]: string } = {
  date: 'Date',
  attachments: 'Attachments',
  explanation: 'Explanation',
  name: 'Name',
  isCommonName: 'IsCommonName',
};
