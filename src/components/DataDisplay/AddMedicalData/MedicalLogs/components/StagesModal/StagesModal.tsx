import { ScrollView, View } from 'react-native';
import type { ReactNode } from 'react';

import type { ModalProps } from '../../../../../UI/Modal/Modal';
import { Modal } from '../../../../../UI/Modal/Modal';
import { theme } from '../../../../../../config/Theme';
import { Typography } from '../../../../../UI/Typography/Typography';
import { Accordion } from '../../../../../UI/Accordion/Accordion';
import { SummaryLogStages } from '../Summary/components/SummaryLogStages/SummaryLogStages';
import { graphStages } from '../../../../../../constants/data/medicalLogs/bloodPressure';
import type { MoreDataGraphStage } from '../../../../../../model/medicalLogs/MedicalLogsCommon';

type StagesModalProps = ModalProps & {
  data: MoreDataGraphStage;
  name: string;
  infoContentComponent?: ReactNode;
};

export const StagesModal = ({ data, name, infoContentComponent, ...rest }: StagesModalProps) => {
  const properData = data[name];

  return (
    <Modal {...rest}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={{ padding: 16, gap: 24 }}>
          <View
            style={{
              padding: 16,
              backgroundColor: theme.colors.white,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: theme.colors.lightBlue,
            }}
          >
            <SummaryLogStages stages={graphStages} active={name} infoContentComponent={infoContentComponent} />
          </View>
          <View>
            <Typography weight="semiBold">{properData?.title}</Typography>
          </View>
          <View>
            <Accordion data={properData?.data.map((elem) => ({ title: elem.name, content: elem.text })) ?? []} />
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};
