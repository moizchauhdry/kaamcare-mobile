// import { useFormContext } from 'react-hook-form';
// import type { SwitchSelectorOption, SwitchSelectorProps } from 'react-native-switch-selector';

// import { FormFieldControlled } from '../FormField/FormFieldControlled';
// import { SwitchSelectorComponent as SwitchSelector } from './SwitchSelector';
// import { theme } from 'config/Theme';

// type SwitchSelectorControlledProps = {
//   name: string;
//   label?: string;
//   options: SwitchSelectorOption[];
//   inputProps?: Omit<SwitchSelectorProps, 'onPress' | 'options'>;
// };

// export const SwitchSelectorControlled2o = ({ options, name, label, inputProps }: SwitchSelectorControlledProps) => {
//   const { control, formState, getFieldState } = useFormContext();
//   const fieldState = getFieldState(name, formState);
//   return (
//     <FormFieldControlled
//       label={label}
//       containerStyle={{
//         borderWidth: 1,
//         backgroundColor: theme.colors.white,
//         padding: 16,
//         borderRadius: 8,
//         borderColor: theme.colors.backgroundDark,
//         shadowColor: theme.colors.shadowPrimary,
//         shadowOffset: { width: 0, height: 3 },
//         shadowRadius: 4,
//         shadowOpacity: 0.9,
//         elevation: 5,
//       }}
//       error={fieldState.error?.message}
//       control={control}
//       name={name}
//       disabled={inputProps?.disabled}
//       render={({ field }) => (
//         <SwitchSelector
//           value={field.value}
//           onPress={(value) => field.onChange(inputProps?.returnObject ? (value as SwitchSelectorOption)?.value : value)}
//           options={options}
//           {...inputProps}
//         />
//       )}
//     />
//   );
// };

import React from 'react';
import { useFormContext } from 'react-hook-form';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { Card } from 'components/UI/Card/Card';
import { Typography } from 'components/UI/Typography/Typography';
import { theme } from 'config/Theme';
import { FormFieldControlled } from '../FormField/FormFieldControlled';

type SwitchSelectorControlledProps = {
  name: string;
  label?: string;
  options: { value: string; label: string; icon?: string }[]; // Icon is optional for flexibility
};

export const SwitchSelectorControlled2o = ({ options, name, label }: SwitchSelectorControlledProps) => {
  const { control, setValue } = useFormContext();
  const defaultValue = options[0]?.value;
  React.useEffect(() => {
    if (defaultValue) {
      setValue(name, defaultValue); // Set the form value to the first option
    }
  }, [defaultValue, name, setValue]);
  return (
    <FormFieldControlled
      name={name}
      control={control}
      label={''}
      defaultValue={defaultValue}
      render={({ field }) => (
        <Card>
          <View style={styles.container}>
            <View style={styles.textContainer}>
              <Typography style={styles.titleText}>{label}</Typography>
              <Typography style={styles.subText}>
                {field.value && options.find((opt) => opt.value === field.value)?.label}
              </Typography>
            </View>
            <View style={styles.iconContainer}>
              {options.map((option) => (
                <TouchableOpacity key={option.value} onPress={() => field.onChange(option.value)}>
                  {option.icon ? (
                    <SvgXml
                      xml={option.icon}
                      color={field.value === option.value ? theme.colors.primary : theme.colors.black}
                    />
                  ) : (
                    <Typography
                      style={{
                        color: field.value === option.value ? theme.colors.primary : theme.colors.black,
                        fontWeight: '600',
                      }}
                    >
                      {option.label}
                    </Typography>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Card>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flexDirection: 'column',
  },
  titleText: {
    fontSize: 16,
    fontWeight: '600',
    // lineHeight: 32,
    color: theme.colors.textPrimary,
  },
  subText: {
    fontSize: 13,
    color: theme.colors.textGray,
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 16, // Space between icons or labels
  },
});
