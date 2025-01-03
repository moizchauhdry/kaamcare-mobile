import { View } from 'react-native';

import { INPUT_COMPONENTS } from '../../../constants/forms/config';
import type { FieldConfigItem } from '../../../model/form/autoForm/autoForm';
import type { CustomSelectData } from '../../UI/Inputs/Custom/CustomSelect';

type AutoFormProps = {
  fields: FieldConfigItem[];
};

export const AutoForm = ({ fields }: AutoFormProps) => {
  const renderField = (elem: FieldConfigItem) => {
    const Component = elem.type ? INPUT_COMPONENTS[elem.type] : null;

    if (!Component) {
      return null;
    }

    if (elem.type === 'radiobutton-toggle') {
      return (
        <Component
          key={`${elem.name}-${elem.type}`}
          switchProps={{
            name: elem.toggleData?.name!,
            label: elem.toggleData?.label,
            inputProps: {
              switchInputToggleOffAlertData: { ...elem.toggleData?.alert },
              alertType: elem.toggleData?.alert?.alertType,
            },
          }}
          radioButtonGroup={{
            name: elem.name,
            items: elem.data as any,
            inputProps: {
              radioButtonChangeAlertData: { ...elem.alert },
              alertType: elem.alert?.alertType,
            },
          }}
        />
      );
    }

    const data = elem.data as CustomSelectData[];
    return (
      <Component
        inputProps={{ isHorizontal: true }}
        key={`${elem.name}-${elem.type}`}
        data={data}
        label={elem.label}
        name={elem.name}
      />
    );
  };

  return <View style={{ flex: 1 }}>{fields.map((elem) => renderField(elem))}</View>;
};
