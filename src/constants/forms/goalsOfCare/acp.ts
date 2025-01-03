import type { RadioButtonProps } from '../../../components/UI/RadioButton/RadioButton';

export const acpDefaultValues = {
  livingWill: {
    attachments: [],
    value: '',
    isActive: false,
  },
  codeStatus: {
    explanation: '',
    value: '',
    isActive: false,
  },
  medical: {
    isActive: false,
    value: '',
    name: '',
    phoneNumber: '',
  },
  religious: {
    isActive: false,
    explanation: '',
  },
  organ: {
    isActive: false,
    value: '',
  },
};

export const toggleACPSectionAlert = (name: string) => ({
  title: `Disable ${name}`,
  description: `Are you sure that you want to disable ${name}? You will lose your data.`,
  proceed: 'Yes, disable',
  cancel: 'Cancel',
});

export const codeStatusOptions: RadioButtonProps[] = [
  {
    id: '1',
    label: 'Full Code/Treatment',
    subLabel: '(Include use of intubation, Advance airway intervention, Mechanical ventilation, and Cardioversion)',
    value: 'Full Code/Treatment',
  },
  {
    id: '2',
    label: 'Selective Treatment',
    subLabel:
      'Goal of treating medica condiition without burdensome measure, Allows use of IV fluids, non-invasive airway support',
    value: 'Selective Treatment',
  },
  {
    id: '3',
    label: 'Do Not Resuscitate (DNR)',
    subLabel: 'Details',
    value: 'Do Not Resuscitate (DNR)',
  },
  {
    id: '4',
    label: 'Comfort Focused Treatment',
    value: 'Comfort Focused Treatment',
    subLabel:
      'Primary goal to maintain comfort, Relieve pain with medication, Oxygen, oral suction, & manual treatment of airway obstruction',
  },
];
