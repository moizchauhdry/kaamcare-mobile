import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { Image, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import pdf from 'assets/icons/pdf-icon.svg';

import type { AddMedicalDataNavigationParamsList } from '../../../../Navigation/AddMedicalDataNavigation';
import { Card } from '../../../../UI/Card/Card';
import { Typography } from '../../../../UI/Typography/Typography';
import { SeparatedDateTypography } from '../../../../UI/Typography/SeparatedDateTypography/SeparatedDateTypography';
import type { ScreeningExam } from '../../../../../model/api/primaryPrevention/ScreeningExam';
import { useQueryAttachmentsGet } from '../../../../../hooks/query/attachments/useQueryAttachmentsGet';
import { isAttachmentApiModel, isAttachmentModel } from '../../../../../utils/file/file';

type ScreeningExamCardProps = ScreeningExam;

export const ScreeningExamCard = (props: ScreeningExamCardProps) => {
  const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();
  const { id, name, date, explanation, attachments } = props;
  const attachment = attachments && attachments.length > 0 ? attachments[0] : undefined;
  const { data } = useQueryAttachmentsGet({
    requestData: {
      name: 'primary-prevention',
      sectionName: 'screening-exams',
      id,
    },
    attachmentId: attachment ? (isAttachmentApiModel(attachment) ? attachment.id : undefined) : undefined,
    attachmentName: attachment?.fileName!,
  });
  const image = data?.uri ? data.uri : attachment && isAttachmentModel(attachment) ? attachment.uri : undefined;

  return (
    <TouchableOpacity onPress={() => navigation.navigate('ScreeningExamForm', { id, edit: true, name })}>
      <Card>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          {image ? (
            <View style={{ justifyContent: 'center' }}>
              {(isAttachmentModel(attachment) && attachment.type === 'image') || data?.type === 'image' ? (
                <Image source={{ uri: image }} style={{ width: 48, height: 48 }} />
              ) : (
                <SvgXml xml={pdf} width={48} height={48} />
              )}
            </View>
          ) : null}
          <View style={{ gap: 4, flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography style={{ fontSize: 20 }} numberOfLines={2} color="secondary">
                {name}
              </Typography>
            </View>
            <SeparatedDateTypography size="sm" date={date} />
            <Typography size="xs">{explanation}</Typography>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};
