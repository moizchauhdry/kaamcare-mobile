import { View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import plusCircle from 'assets/icons/plus-circle.svg';

import { Typography } from '../../UI/Typography/Typography';
import { Button } from '../../UI/Button/Button';

type MedicalHistoryUnitEmptyProps = {
  icon: string;
  contentTitle: string;
  description: string;
  buttonText: string;
  onButtonPress: () => void;
};

export const MedicalHistoryUnitEmpty = ({
  icon,
  contentTitle,
  description,
  buttonText,
  onButtonPress,
}: MedicalHistoryUnitEmptyProps) => (
  <View style={{ flex: 0.8, alignItems: 'center', justifyContent: 'center', gap: 32 }}>
    <View style={{ alignItems: 'center', gap: 24 }}>
      <View>
        <SvgXml xml={icon} />
      </View>
      <View style={{ gap: 8, alignItems: 'center' }}>
        <Typography size="xl" weight="normal" style={{ textAlign: 'center' }}>
          {contentTitle}
        </Typography>
        <Typography style={{ textAlign: 'center' }}>{description}</Typography>
      </View>
    </View>
    <Button variant="secondary" icon={plusCircle} weight="semiBold" onPress={onButtonPress}>
      {buttonText}
    </Button>
  </View>
);
