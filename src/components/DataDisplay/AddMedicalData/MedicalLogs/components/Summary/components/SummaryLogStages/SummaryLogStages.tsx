import { TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import type { ReactNode } from 'react';

import info from 'assets/icons/info.svg';

import { Typography } from '../../../../../../../UI/Typography/Typography';
import type { GraphStage } from '../../../../../../../../model/medicalLogs/MedicalLogsCommon';

type SummaryLogStagesProps = {
  stages: GraphStage[];
  active?: string;
  isModal?: boolean;
  onInfoPress?: () => void;
  infoContentComponent?: ReactNode;
};

export const SummaryLogStages = ({
  stages,
  active,
  onInfoPress,
  infoContentComponent,
  isModal,
}: SummaryLogStagesProps) => {
  const renderStageContent = (label: string) => {
    if (infoContentComponent && label === active) {
      return infoContentComponent;
    }

    return active === label ? (
      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity onPress={onInfoPress}>
          <View style={{ flexDirection: 'row', gap: 2, alignItems: 'center' }}>
            <View>
              <Typography numberOfLines={1} size="xs" weight="semiBold" style={{ width: '100%' }}>
                {label}
              </Typography>
            </View>
            {isModal ? <SvgXml xml={info} height={32} /> : null}
          </View>
        </TouchableOpacity>
      </View>
    ) : null;
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, flexDirection: 'column', gap: 2, position: 'relative' }}>
        {renderStageContent(active ?? '')}
        <View style={{ flexDirection: 'row', gap: 4 }}>
          {stages.map((elem) => (
            <View
              key={elem.label}
              style={{ flex: 1, justifyContent: 'flex-end', zIndex: active === elem.label ? 100 : 1 }}
            >
              <View
                key={elem.label}
                style={{
                  backgroundColor: elem.color,
                  height: elem.label === active ? 16 : 8,
                  maxHeight: elem.label === active ? 16 : 8,
                  borderRadius: 2,
                  flex: 1 / stages.length,
                }}
              />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};
