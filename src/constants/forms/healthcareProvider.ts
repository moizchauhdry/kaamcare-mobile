export const healthcareProviderFormDefaultValues = {
  firstName: '',
  lastName: '',
  specialization: '',
  title: '',
  phoneNumber: '',
  isPrimaryCareProvider: false,
};

export const dentistTitles = [
  {
    subLabel: 'Bachelor of Dental Surgery',
    label: 'BDS',
    value: 'BDS',
  },
  {
    subLabel: 'Doctor of Dental Medicine',
    label: 'DMD',
    value: 'DMD',
  },
  {
    subLabel: 'Doctor of Dental Surgery',
    label: 'DDS',
    value: 'DDS',
  },
] as const;

export const optometristTitles = [
  {
    subLabel: 'Doctor of Optometry',
    label: 'OD',
    value: 'OD',
  },
] as const;

export const podiatristTitles = [
  {
    subLabel: 'Doctor of Podiatry',
    label: 'DPM',
    value: 'DPM',
  },
] as const;

export const chiropractorTitles = [
  {
    subLabel: 'Doctor of Chiropractor',
    label: 'DC',
    value: 'DC',
  },
] as const;

export const pharmacistTitles = [
  {
    subLabel: 'Doctor of Pharmacy',
    label: 'PharmD',
    value: 'PharmD',
  },
] as const;

export const otherTitles = [
  {
    subLabel: 'Bachelor of Medicine, Bachelor of Surgery',
    label: 'MBBS',
    value: 'MBBS',
  },
  {
    subLabel: 'Doctor of Medicine',
    label: 'M.D.',
    value: 'M.D.',
  },
  {
    subLabel: 'Doctor of Osteopathic Medicine',
    label: 'D.O.',
    value: 'D.O.',
  },
  {
    subLabel: 'Physician Assistant',
    label: 'PA',
    value: 'PA',
  },
  {
    subLabel: 'Nurse Practitioner',
    label: 'NP',
    value: 'NP',
  },
  {
    subLabel: 'Doctor of Nursing Practice',
    label: 'DNP',
    value: 'DNP',
  },
  {
    label: 'Other',
    value: 'other',
  },
] as const;

export const specializationCommonData = [
  {
    label: 'Cardiologist',
    value: 'cardiologist',
  },
  {
    label: 'Family Medicine',
    value: 'familyMedicine',
  },
  {
    label: 'Gastroenterologist',
    value: 'gastroenterologist',
  },
  {
    label: 'General surgeon',
    value: 'generalSurgeon',
  },
  {
    label: 'Internal medicine',
    value: 'internalMedicine',
  },
  {
    label: 'Nephrologist',
    value: 'nephrologist',
  },
  {
    label: 'Neurologist',
    value: 'neurologist',
  },
  {
    label: 'Obstetrics and gynecology (OB/GYN)',
    value: 'obstetricsAndGynecology',
  },
  {
    label: 'Pediatrics',
    value: 'pediatrics',
  },
  {
    label: 'Psychiatrist',
    value: 'psychiatrist',
  },
];

export const specializationDynamicData = [
  { label: 'Addiction Medicine', value: 'addictionMedicine' },
  { label: 'Adolescent medicine', value: 'adolescentMedicine' },
  { label: 'Aerospace medicine', value: 'aerospaceMedicine' },
  { label: 'Allergy and immunology', value: 'allergyAndImmunology' },
  { label: 'Anesthesiologist', value: 'anesthesiologist' },
  { label: 'Bariatrics', value: 'bariatrics' },
  { label: 'Cardiac Electrophysiology', value: 'cardiacElectrophysiology' },
  { label: 'Cardiologist', value: 'cardiologist' },
  { label: 'Cardiothoracic surgeon', value: 'cardiothoracicSurgeon' },
  { label: 'Child and adolescent psychiatrist', value: 'childAndAdolescentPsychiatrist' },
  { label: 'Chiropractor', value: 'chiropractor' },
  { label: 'Clinical neurophysiologist', value: 'clinicalNeurophysiologist' },
  { label: 'Colorectal surgeon', value: 'colorectalSurgeon' },
  { label: 'Dentist', value: 'dentist' },
  { label: 'Dermatologist', value: 'dermatologist' },
  { label: 'Dermatopathologist', value: 'dermatopathologist' },
  { label: 'Developmental Pediatrics', value: 'developmentalPediatrics' },
  { label: 'Emergency Medicine', value: 'emergencyMedicine' },
  { label: 'Endocrinologist', value: 'endocrinologist' },
  { label: 'Family Medicine', value: 'familyMedicine' },
  { label: 'Forensic pathologist', value: 'forensicPathologist' },
  { label: 'Forensic psychiatrist', value: 'forensicPsychiatrist' },
  { label: 'Gastroenterologist', value: 'gastroenterologist' },
  { label: 'General surgeon', value: 'generalSurgeon' },
  { label: 'General surgical oncologist', value: 'generalSurgicalOncologist' },
  { label: 'Geriatric psychiatry', value: 'geriatricPsychiatry' },
  { label: 'Geriatrics', value: 'geriatrics' },
  { label: 'Gynecologic oncology', value: 'gynecologicOncology' },
  { label: 'Hematologic pathologist', value: 'hematologicPathologist' },
  { label: 'Hematologist', value: 'hematologist' },
  { label: 'Hematology and Oncology', value: 'hematologyAndOncology' },
  { label: 'Hospice and palliative care', value: 'hospiceAndPalliativeCare' },
  { label: 'Infectious disease', value: 'infectiousDisease' },
  { label: 'Intensive care/Critical Care medicine', value: 'intensiveCareCriticalCareMedicine' },
  { label: 'Internal medicine', value: 'internalMedicine' },
  { label: 'Interventional radiologist', value: 'interventionalRadiologist' },
  { label: 'Maternal-fetal medicine', value: 'maternalFetalMedicine' },
  { label: 'Medical Biochemistry', value: 'medicalBiochemistry' },
  { label: 'Medical Geneticist', value: 'medicalGeneticist' },
  { label: 'Neonatologist', value: 'neonatologist' },
  { label: 'Nephrologist', value: 'nephrologist' },
  { label: 'Neurologist', value: 'neurologist' },
  { label: 'Neuropathologist', value: 'neuropathologist' },
  { label: 'Neuroradiology', value: 'neuroradiology' },
  { label: 'Neurosurgeon', value: 'neurosurgeon' },
  { label: 'Nuclear medicine (Nucleology)', value: 'nuclearMedicineNucleology' },
  { label: 'Obstetrics and gynecology (OB/GYN)', value: 'obstetricsAndGynecologyObgyn' },
  { label: 'Occupational medicine', value: 'occupationalMedicine' },
  { label: 'Oncologist', value: 'oncologist' },
  { label: 'Ophthalmologist', value: 'ophthalmologist' },
  { label: 'Optometrist', value: 'optometrist' },
  { label: 'Oral and maxillofacial surgeon', value: 'oralAndMaxillofacialSurgeon' },
  { label: 'Orthopedic surgeon', value: 'orthopedicSurgeon' },
  { label: 'Otolaryngology (Ear/Nose/Throat - ENT)', value: 'otolaryngologyEarNoseThroatEnt' },
  { label: 'Pain medicine', value: 'painMedicine' },
  { label: 'Palliative care', value: 'palliativeCare' },
  { label: 'Pathology', value: 'pathology' },
  { label: 'Pediatric Allergy and Immunologist', value: 'pediatricAllergyAndImmunologist' },
  { label: 'Pediatric Anesthesiologist', value: 'pediatricAnesthesiologist' },
  { label: 'Pediatric Cardiologist', value: 'pediatricCardiologist' },
  { label: 'Pediatric Dermatologist', value: 'pediatricDermatologist' },
  { label: 'Pediatric Respiratory Medicine', value: 'pediatricRespiratoryMedicine' },
  { label: 'Pediatric Emergency Medicine', value: 'pediatricEmergencyMedicine' },
  { label: 'Pediatric Endocrinologist', value: 'pediatricEndocrinologist' },
  { label: 'Pediatric Gastroenterologist', value: 'pediatricGastroenterologist' },
  { label: 'Pediatric Hematology and Oncologist', value: 'pediatricHematologyAndOncologist' },
  { label: 'Pediatric Infectious Disease', value: 'pediatricInfectiousDisease' },
  { label: 'Pediatric Nephrology', value: 'pediatricNephrology' },
  { label: 'Pediatric Rheumatology', value: 'pediatricRheumatology' },
  { label: 'Pediatric Surgeon', value: 'pediatricSurgeon' },
  { label: 'Pediatrics', value: 'pediatrics' },
  { label: 'Pharmacist', value: 'pharmacist' },
  { label: 'Physical Medicine and Rehabilitation', value: 'physicalMedicineAndRehabilitation' },
  { label: 'Plastic, reconstructive and aesthetic surgeon', value: 'plasticReconstructiveAndAestheticSurgeon' },
  { label: 'Podiatrist', value: 'podiatrist' },
  { label: 'Psychiatrist', value: 'psychiatrist' },
  { label: 'Public health', value: 'publicHealth' },
  { label: 'Pulmonologist', value: 'pulmonologist' },
  { label: 'Pulmonology or Respiratory medicine', value: 'pulmonologyOrRespiratoryMedicine' },
  { label: 'Radiation oncologist', value: 'radiationOncologist' },
  { label: 'Radiologist', value: 'radiologist' },
  { label: 'Reproductive endocrinology and infertility', value: 'reproductiveEndocrinologyAndInfertility' },
  { label: 'Reproductive Medicine', value: 'reproductiveMedicine' },
  { label: 'Rheumatologist', value: 'rheumatologist' },
  { label: 'Sleep medicine', value: 'sleepMedicine' },
  { label: 'Sports medicine', value: 'sportsMedicine' },
  { label: 'Thoracic surgeon', value: 'thoracicSurgeon' },
  { label: 'Toxicology', value: 'toxicology' },
  { label: 'Transfusion Medicine', value: 'transfusionMedicine' },
  { label: 'Transplant Medicine', value: 'transplantMedicine' },
  { label: 'Undersea and hyperbaric medicine', value: 'underseaAndHyperbaricMedicine' },
  { label: 'Urologist', value: 'urologist' },
  { label: 'Vascular surgeon', value: 'vascularSurgeon' },
];

export const allTitles: { [key: string]: readonly { value: string; label: string }[] } = {
  dentist: dentistTitles,
  optometrist: optometristTitles,
  podiatrist: podiatristTitles,
  chiropractor: chiropractorTitles,
  pharmacist: pharmacistTitles,
  other: otherTitles,
} as const;
