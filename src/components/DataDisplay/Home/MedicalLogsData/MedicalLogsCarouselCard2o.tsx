import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { Dimensions, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { Card } from '../../../UI/Card/Card';
import type { MedicalLogsCarouselData } from './MedicalLogsCarousel';
import { SaturationChart } from '../../AddMedicalData/MedicalLogs/Saturation/SaturationChart';
import type { SaturationApiLog } from '../../../../model/api/medicalLogs/Saturation';
import { BloodSugarChart } from '../../AddMedicalData/MedicalLogs/BloodSugar/BloodSugarChart';
import type { BloodSugarLogs } from '../../../../model/api/medicalLogs/BloodSugar';
import { BloodPressureChart } from '../../AddMedicalData/MedicalLogs/BloodPressure/BloodPressureChart';
import type { BloodPressureLogs } from '../../../../model/api/medicalLogs/BloodPressure';
import { WeightChart } from '../../AddMedicalData/MedicalLogs/Weight/WeightChart';
import type { WeightLogs } from '../../../../model/api/medicalLogs/Weight';
import { HeightChart } from '../../AddMedicalData/MedicalLogs/Height/HeightChart';
import type { HeightLogs } from '../../../../model/api/medicalLogs/Height';
import { Typography } from '../../../UI/Typography/Typography';
import type { TabNavigatorParamsList } from '../../../Navigation/LoggednNavigation';

const { width } = Dimensions.get('window');

type MedicalLogsCarouselCardProps = {
  item: MedicalLogsCarouselData;
};

const getItem = (item: MedicalLogsCarouselData) => {
  const date = new Date();
  const chartProps = {
    adjustToWidth: true,
    width: width - 112,
    endSpacing: 8,
    spacing: (width - 112) / 7,
  };

  switch (item.type) {
    case 'Saturation':
      return (
        <SaturationChart
          data={item.logs as unknown as SaturationApiLog[]}
          days={1}
          startDate={date}
          chartProps={chartProps}
          isDashboard
        />
      );
    case 'BloodSugar':
      return (
        <BloodSugarChart
          data={item.logs as unknown as BloodSugarLogs}
          type={item.chart!}
          startDate={date}
          days={1}
          chartProps={{
            adjustToWidth: true,
            width: width - 128,
          }}
          isDashboard
        />
      );
    case 'BloodPressure':
      return (
        <BloodPressureChart
          data={item.logs as unknown as BloodPressureLogs}
          type={item.chart!}
          startDate={date}
          days={1}
          chartProps={chartProps}
          isDashboard
        />
      );
    case 'Weight':
      return (
        <WeightChart data={item.logs as unknown as WeightLogs} days={1} startDate={date} chartProps={chartProps} />
      );
    case 'Height':
      return (
        <HeightChart data={item.logs as unknown as HeightLogs} days={1} startDate={date} chartProps={chartProps} />
      );
    default:
      return null;
  }
};

export const MedicalLogsCarouselCard2o = ({ item }: MedicalLogsCarouselCardProps) => {
  const navigation = useNavigation<StackNavigationProp<TabNavigatorParamsList>>();

  return (
    <View style={{ width: width - 32, paddingBottom: 16 }}>
      <TouchableWithoutFeedback
        onPress={() =>
          navigation.navigate('MedicalDataNavigation', {
            screen: item.screen,
            params: { type: item.chart, days: 1 },
          } as any)
        }
      >
        <View>
          <Card>
            <Typography style={{ fontSize: 20, textAlign: 'center' }} color="secondary">
              {item.title}
            </Typography>
            {/* {getItem(item)} */}
          </Card>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};
