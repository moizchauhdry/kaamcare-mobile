import { View } from 'react-native';

import { Typography } from 'components/UI/Typography/Typography';

interface HeaderCounterProps {
  pageCounter: string;
}

export const HeaderCounter: React.FC<HeaderCounterProps> = ({ pageCounter }) => (
  <View style={{ marginTop: 20, marginBottom: 20 }}>
    <Typography weight="normal" align="center" style={{ fontSize: 22, fontWeight: '400' }}>
      {pageCounter}/3
    </Typography>
    <Typography weight="bolder" size="xl" align="center">
      Create your account
    </Typography>
  </View>
);
