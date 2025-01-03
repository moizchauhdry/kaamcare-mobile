import { View } from 'react-native';

import { Typography } from '../../../../UI/Typography/Typography';
import { ConditionalTypography } from '../../../../UI/Typography/ConditionalTypography/ConditionalTypography';
import type { Medication } from '../../../../../model/api/medicalHistory/Medications';

export const MedicationData = ({ medicationName, units, dose, frequency }: Medication) => (
  <View style={{ paddingLeft: 8, flexDirection: 'row', gap: 8 }}>
    <Typography>{`\u2022`}</Typography>
    <Typography>
      {`${medicationName}`}
      {units || dose ? (
        <Typography>
          {' '}
          {dose && units ? (
            <>
              <ConditionalTypography value={dose} /> <ConditionalTypography value={units} />{' '}
            </>
          ) : null}
          <ConditionalTypography value={frequency} />
        </Typography>
      ) : null}
    </Typography>
  </View>
);
