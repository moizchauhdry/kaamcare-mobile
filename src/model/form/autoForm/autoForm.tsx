import type { INPUT_COMPONENTS } from '../../../constants/forms/config';
import type { CustomSelectData } from '../../../components/UI/Inputs/Custom/CustomSelect';

export type FieldConfigItem = {
  name: string;
  label?: string;
  type?: keyof typeof INPUT_COMPONENTS;
  data?: { id?: string; value: string; label: string }[] | CustomSelectData[];
  alert?: {
    title?: string;
    description?: string;
    proceed?: string;
    cancel?: string;
    alertType?: string;
    isSourceInfo?: boolean;
  };
  toggleData?: {
    name: string;
    label?: string;
    alert?: {
      title?: string;
      description?: string;
      proceed?: string;
      cancel?: string;
      alertType?: string;
    };
  };
};
