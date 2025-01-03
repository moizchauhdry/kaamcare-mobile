import { SwitchInputControlled } from '../../components/UI/Inputs/SwitchInput/SwitchInputControlled';
import { MultiselectCheckboxControlled } from '../../components/UI/Inputs/MultiselectCheckbox/MultiselectCheckboxControlled';
import { ToggleRadioButtonGroupControlled } from '../../components/UI/Inputs/ToggleRadioButtonGroup/ToggleRadioButtonGroupControlled';

export const INPUT_COMPONENTS: { [key: string]: React.ComponentType<any> } = {
  multiselect: MultiselectCheckboxControlled,
  toggle: SwitchInputControlled,
  'radiobutton-toggle': ToggleRadioButtonGroupControlled,
};
