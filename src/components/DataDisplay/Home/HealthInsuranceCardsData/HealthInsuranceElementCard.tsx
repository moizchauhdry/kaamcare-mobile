import { TouchableWithoutFeedback, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import deleteIcon from 'assets/icons/delete.svg';

import { Typography } from '../../../UI/Typography/Typography';
import plusCircle from '../../../../assets/icons/plus-circle.svg';
import type { InsuranceCard } from '../../../../model/api/insurance/Insurance';
import { theme } from '../../../../config/Theme';
import { useMutationInsuranceDelete } from '../../../../hooks/query/insuranceCards/useMutationInsuranceDelete';
import { HealthInsuranceFilledCard } from './HealthInsuranceFilledCard';
import { useAlert } from '../../../../hooks/useAlert';

type HealthInsuranceElementCardProps = {
  label: string;
  onItemPress: (id?: string) => void;

  card?: InsuranceCard;
};

export const HealthInsuranceElementCard = ({ label, onItemPress, card }: HealthInsuranceElementCardProps) => {
  const mutateDelete = useMutationInsuranceDelete(card?.id!);
  const { showDangerAlert } = useAlert();

  const handleDeletePress = () => {
    showDangerAlert({
      title: 'Remove Insurance Card',
      description: `Are you sure that you want to remove ${label} Insurance Card? You will lose your data.`,
      onProceed: () => mutateDelete.mutate(card?.id!),
      proceed: 'Yes, delete',
      cancel: 'Cancel',
    });
  };

  return (
    <View>
      <View style={{ justifyContent: 'space-between', flexDirection: 'row', flex: 1, paddingVertical: 16 }}>
        <Typography>{label}</Typography>
        <TouchableWithoutFeedback
          disabled={mutateDelete.isPending}
          onPress={card ? () => handleDeletePress() : () => onItemPress()}
        >
          <View>
            <SvgXml xml={card ? deleteIcon : plusCircle} color={card ? theme.colors.danger : undefined} />
          </View>
        </TouchableWithoutFeedback>
      </View>
      {card ? <HealthInsuranceFilledCard card={card} /> : null}
    </View>
  );
};
