import { View } from 'react-native';
import { useFormContext } from 'react-hook-form';
import { useEffect } from 'react';

import { Typography } from '../../Typography/Typography';
import { NumberInputControlled } from '../NumberInput/NumberInputControlled';

type SeparatedDateInputControlledProps = {
  label?: string;
};

export const SeparatedDateInputControlled = ({ label }: SeparatedDateInputControlledProps) => {
  const { watch, formState, clearErrors } = useFormContext();
  const day = watch('day');
  const month = watch('month');

  useEffect(() => {
    if (!day) {
      if (formState.errors.month || formState.errors.year) {
        clearErrors(['month', 'year']);
      }
    }
    /* eslint-disable-next-line */
  }, [day]);

  useEffect(() => {
    if (!month) {
      if (formState.errors.year) {
        clearErrors(['year']);
      }
    }
    /* eslint-disable-next-line */
  }, [month]);

  return (
    <View style={{ gap: 8, flexDirection: 'column', paddingRight: 8 }}>
      {label ? <Typography size="md">{label}</Typography> : null}
      <View style={{ gap: 16, flexDirection: 'row', paddingRight: 24 }}>
        <View style={{ width: '33%' }}>
          <NumberInputControlled
            label={label ? undefined : 'Month'}
            name="month"
            inputProps={{ placeholder: 'MM', maxLength: 2, maxValue: 12, minValue: 1 }}
          />
        </View>
        <View style={{ width: '33%' }}>
          <NumberInputControlled
            label={label ? undefined : 'Day'}
            name="day"
            inputProps={{ placeholder: 'DD', maxLength: 2, maxValue: 31, minValue: 1 }}
          />
        </View>
        <View style={{ width: '33%' }}>
          <NumberInputControlled
            label={label ? undefined : 'Year'}
            name="year"
            inputProps={{ placeholder: 'YYYY', maxLength: 4, maxValue: new Date().getFullYear() }}
          />
        </View>
      </View>
    </View>
  );
};
