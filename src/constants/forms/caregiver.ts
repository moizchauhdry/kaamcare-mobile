export const formDefaultValues = {
  isCaregiver: false,
  caregiverFirstName: '',
  caregiverLastName: '',
  caregiverPhoneNumber: '',

  isHomeTherapy: false,
  homeTherapyServiceName: '',
  homeTherapyPhoneNumber: '',

  isHomeNursing: false,
  homeNursingServiceName: '',
  homeNursingPhoneNumber: '',
};

export const toggleCaregiverAlert = {
  title: 'Disable Caregiver',
  description: `Are you sure that you want to disable Caregiver? You will lose your data.`,
  proceed: 'Yes, disable',
  cancel: 'Cancel',
};

export const toggleHomeTherapylert = {
  title: 'Disable Home Health\nPhysical Therapy',
  description: `Are you sure that you want to disable Home Health Physical Therapy? You will lose your data.`,
  proceed: 'Yes, disable',
  cancel: 'Cancel',
};

export const toggleHomeNursingAlert = {
  title: 'Disable Home Health Nursing',
  description: `Are you sure that you want to disable Home Health Nursing? You will lose your data.`,
  proceed: 'Yes, disable',
  cancel: 'Cancel',
};
