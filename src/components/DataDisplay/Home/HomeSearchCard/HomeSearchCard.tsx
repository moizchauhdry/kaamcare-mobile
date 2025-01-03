import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Card } from '../../../UI/Card/Card';
import { HighlightedTypography } from '../../../UI/Typography/HighlightedTypography/HighlightedTypography';

type HomeSearchCardProps = {
  name: string;
  screenName: string;
  searchValue?: string;
  mainScreenName?: string;
};

export const HomeSearchCard = ({ name, screenName, mainScreenName, searchValue = '' }: HomeSearchCardProps) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate({
          name: mainScreenName || 'MedicalDataNavigation',
          params: {
            screen: screenName || undefined,
          },
        } as never)
      }
    >
      <Card>
        <HighlightedTypography
          color="secondary"
          value={name}
          highlightedValue={searchValue?.length >= 3 ? searchValue : ''}
          style={{ fontSize: 20, lineHeight: 25 }}
        />
      </Card>
    </TouchableOpacity>
  );
};
