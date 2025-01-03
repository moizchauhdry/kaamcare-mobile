import type { ReactNode } from 'react';
import { useState } from 'react';
import { LayoutAnimation, Platform, TouchableOpacity, UIManager, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import chevronRight from 'assets/icons/chevron-right.svg';
import chevronUp from 'assets/icons/chevron-up.svg';

import { styles } from './Summary.styles';
import { Typography } from '../../../../../UI/Typography/Typography';
import type { SummaryDataItemColorType } from './components/SummaryDataItem/SummaryDataItem';
import { SummaryDataItem } from './components/SummaryDataItem/SummaryDataItem';
import { SummaryLogStages } from './components/SummaryLogStages/SummaryLogStages';
import { StagesModal } from '../StagesModal/StagesModal';
import type { GraphStage, MoreDataGraphStage } from '../../../../../../model/medicalLogs/MedicalLogsCommon';

export type SummaryDataItemModel = {
  label: string;
  color: SummaryDataItemColorType;
  average?: number;
  min?: number;
  max?: number;
  total?: number;
};

export type SummaryData = {
  primary: SummaryDataItemModel[];
  secondary?: SummaryDataItemModel[];
};

type SummaryProps = {
  data: SummaryData;
  dataLength?: number;
  graphData?: {
    data: GraphStage[];
    label: string;
    color: string;
    moreData?: MoreDataGraphStage;
    infoContentComponent?: ReactNode;
    information?: string;
  };
};

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export const Summary = ({ data, dataLength, graphData }: SummaryProps) => {
  const isOne = dataLength === 1;
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handlePressSummary = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded((prev) => !prev);
  };

  const renderContent = () =>
    Object.keys(data).map((elem, index) => {
      const key = elem as keyof SummaryData;

      return (
        <View key={elem} style={{ gap: 12 }}>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            {data[key]?.map((item, innerIndex) => {
              if ((data[key]?.length ?? 0) > 1) {
                return (
                  // eslint-disable-next-line
                  <View style={{ flex: 1 / data[key]!.length, gap: 8 }} key={`${elem}-${innerIndex}`}>
                    <Typography size="xs" weight="semiBold" style={{ textAlign: 'center' }}>
                      {item.label}
                    </Typography>
                    {typeof item.min === 'number' && typeof item.max === 'number' ? (
                      <SummaryDataItem
                        type={isOne ? 'single' : 'min-max'}
                        data={isOne ? item.min : [item.min, item.max]}
                        color={item.color}
                      />
                    ) : null}
                    {item.total !== undefined ? (
                      <SummaryDataItem type={isOne ? 'single' : 'total'} data={item.total} color={item.color} />
                    ) : null}
                    {!isOne && item.average !== undefined ? (
                      <SummaryDataItem type="average" data={item.average} color={item.color} />
                    ) : null}
                  </View>
                );
              }

              return (
                // eslint-disable-next-line
                <View style={{ flex: 1 }} key={`${elem}-${index}`}>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1, gap: 8 }}>
                      <Typography size="xs" weight="semiBold" style={{ textAlign: 'center' }}>
                        {item.label}
                      </Typography>
                      <View style={{ flex: 1, flexDirection: 'row', gap: 12 }}>
                        <View style={!isOne ? { flex: 0.5 } : { flex: 1 }}>
                          {item.min && item.max ? (
                            <SummaryDataItem
                              type={isOne ? 'single' : 'min-max'}
                              data={isOne ? item.min : [item.min, item.max]}
                              color={item.color}
                            />
                          ) : null}
                        </View>
                        {!isOne && item.average ? (
                          <View style={{ flex: 0.5 }}>
                            <SummaryDataItem type="average" data={item.average} color={item.color} />
                          </View>
                        ) : null}
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
          {/* {index === 0 ? <View style={[styles.horizontalLine, { flex: 1 }]} /> : null} */}
        </View>
      );
    });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePressSummary}>
        <View style={styles.collapsedWrapper}>
          <View style={{ flexDirection: 'row', gap: 4 }}>
            <SvgXml xml={isExpanded ? chevronUp : chevronRight} />
            <Typography weight="semiBold">Summary</Typography>
          </View>
          <Typography color="gray" size="sm">
            ({dataLength} {isOne ? 'reading' : 'readings'})
          </Typography>
        </View>
      </TouchableOpacity>
      <View style={{ gap: 12, height: isExpanded ? 'auto' : 0, display: isExpanded ? 'flex' : 'none' }}>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <View style={[styles.horizontalLine, { flex: 0.5 }]} />
          <View style={[styles.horizontalLine, { flex: 0.5 }]} />
        </View>
        {renderContent()}
        <View style={[styles.horizontalLine, { flex: 1 }]} />
        <View style={{ gap: 12 }}>
          {graphData?.data ? (
            <>
              <SummaryLogStages
                stages={graphData?.data}
                active={graphData?.label}
                isModal={Boolean(graphData.moreData)}
                onInfoPress={() => setIsModalVisible(true)}
              />
              {graphData.moreData ? (
                <StagesModal
                  name={graphData?.label ?? ''}
                  title={graphData?.label}
                  isVisible={isModalVisible}
                  onCancel={() => setIsModalVisible(false)}
                  data={graphData?.moreData}
                  infoContentComponent={graphData.infoContentComponent}
                />
              ) : null}
            </>
          ) : null}
          <Typography weight="semiBold" size="xs" color="gray">
            {graphData?.information}
          </Typography>
        </View>
      </View>
    </View>
  );
};
