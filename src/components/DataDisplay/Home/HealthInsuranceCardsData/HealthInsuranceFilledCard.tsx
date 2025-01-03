import { Dimensions, Image, View } from 'react-native';
// import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
// import { useNavigation } from '@react-navigation/native';
// import type { StackNavigationProp } from '@react-navigation/stack';

import { Card } from '../../../UI/Card/Card';
import type { InsuranceCard } from '../../../../model/api/insurance/Insurance';
import { useQueryAttachmentsGet } from '../../../../hooks/query/attachments/useQueryAttachmentsGet';
import { Skeleton } from '../../../UI/Skeleton/Skeleton';
import { isAttachmentApiModel, isAttachmentModel } from '../../../../utils/file/file';
import type { AttachmentApiSmallModel, AttachmentModel } from '../../../../model/api/common/Attachment';
// import type { InsuranceNavigatorParamsList } from '../../../Navigation/LoggednNavigation';

type HealthInsuranceFilledCardProps = {
  card: InsuranceCard;
};

export const HealthInsuranceFilledCard = ({ card }: HealthInsuranceFilledCardProps) => {
  // const navigation = useNavigation<StackNavigationProp<InsuranceNavigatorParamsList>>();
  const front = card.frontPhotos[0] as AttachmentModel | AttachmentApiSmallModel;
  const back = card.backPhotos[0] as AttachmentModel | AttachmentApiSmallModel;
  const isFrontApiModel = isAttachmentApiModel(front);
  const isBackApiModel = isAttachmentApiModel(back);
  const { data: frontPhoto, isLoading: isFrontLoading } = useQueryAttachmentsGet({
    attachmentName: isFrontApiModel ? front?.fileName! : '',
    attachmentId: front.id ? front?.id : undefined,
    requestData: {
      id: card.id,
      photoType: 'front',
      name: 'insurance-card',
    },
    options: {
      enabled: isFrontApiModel,
    },
  });
  const { data: backPhoto, isLoading: isBackLoading } = useQueryAttachmentsGet({
    attachmentName: isBackApiModel ? back?.fileName! : '',
    attachmentId: back.id ? back?.id : undefined,
    requestData: {
      id: card.id,
      photoType: 'back',
      name: 'insurance-card',
    },
    options: {
      enabled: isBackApiModel,
    },
  });
  const width = Dimensions.get('window').width - 64;
  const height = width / 1.6;

  return (
    // <TouchableWithoutFeedback
    //   onPress={() =>
    //     navigation.navigate('InsuranceForm', {
    //       name: card.cardCategory,
    //       id: card.id,
    //     })
    //   }
    // >
    <View>
      <Card>
        <View style={{ flex: 1, gap: 4 }}>
          {isFrontLoading ? (
            <Skeleton style={{ height: 50, borderRadius: 8 }} />
          ) : (
            <Image
              source={{ uri: isFrontApiModel ? frontPhoto?.uri : isAttachmentModel(front) ? front.uri : undefined }}
              style={{ width, height }}
            />
          )}
          {isBackLoading ? (
            <Skeleton style={{ height: 50, borderRadius: 8 }} />
          ) : (
            <Image
              source={{ uri: isBackApiModel ? backPhoto?.uri : isAttachmentModel(back) ? back?.uri : undefined }}
              style={{ width, height }}
            />
          )}
        </View>
      </Card>
    </View>
    // </TouchableWithoutFeedback>
  );
};
