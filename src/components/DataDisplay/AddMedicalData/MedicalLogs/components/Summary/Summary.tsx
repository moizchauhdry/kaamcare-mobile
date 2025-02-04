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
import { BloodPressureSummary } from './BloodPressureSummary';
import PieChartComponent from './components/PieChartBloodPressure';

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

export const Summary = ({ data, dataLength = 0, graphData }: SummaryProps) => {
  const isOne = dataLength === 1;
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handlePressSummary = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded((prev) => !prev);
  };

  const renderContent = (data: SummaryData) => {
    if (!data || (!data.primary?.length && !data.secondary?.length)) {
      console.log('No data available for Summary.');
      return null;
    }

    return (
      <View style={{ gap: 12 }}>
        {Object.keys(data).map((key) => {
          const dataKey = key as keyof SummaryData;
          const items = data[dataKey];

          if (!items?.length) return null;

          return (
            <View key={key} style={{ flexDirection: 'row', gap: 12 }}>
              {items.map((item, index) => (
                <View key={`${key}-${index}`} style={{ flex: 1 / items.length, gap: 8 }}>
                  <Typography size="xs" weight="semiBold" style={{ textAlign: 'center' }}>
                    {item.label}
                  </Typography>
                  {typeof item.min === 'number' && typeof item.max === 'number' && (
                    <SummaryDataItem
                      type={isOne ? 'single' : 'min-max'}
                      data={isOne ? item.min : [item.min, item.max]}
                      color={item.color}
                    />
                  )}
                  {item.total !== undefined && (
                    <SummaryDataItem type={isOne ? 'single' : 'total'} data={item.total} color={item.color} />
                  )}
                  {!isOne && item.average !== undefined && (
                    <SummaryDataItem type="average" data={item.average} color={item.color} />
                  )}
                </View>
              ))}
            </View>
          );
        })}
      </View>
    );
  };

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

      {isExpanded && (
        <View style={{ gap: 12 }}>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <View style={[styles.horizontalLine, { flex: 0.5 }]} />
            <View style={[styles.horizontalLine, { flex: 0.5 }]} />
          </View>

          {/* {renderContent(data)} */}

          <PieChartComponent />

          <BloodPressureSummary data={data} />

          {/* <View style={[styles.horizontalLine, { flex: 1 }]} /> */}

          {graphData?.data && (
            <View style={{ gap: 12 }}>
              {/* <SummaryLogStages
                stages={graphData?.data}
                active={graphData?.label}
                isModal={Boolean(graphData.moreData)}
                onInfoPress={() => setIsModalVisible(true)}
              /> */}
              {graphData.moreData && (
                <StagesModal
                  name={graphData?.label ?? ''}
                  title={graphData?.label}
                  isVisible={isModalVisible}
                  onCancel={() => setIsModalVisible(false)}
                  data={graphData?.moreData}
                  infoContentComponent={graphData.infoContentComponent}
                />
              )}
              <Typography weight="semiBold" size="xs" color="gray">
                {graphData?.information}
              </Typography>
            </View>
          )}
        </View>
      )}
    </View>
  );
};
