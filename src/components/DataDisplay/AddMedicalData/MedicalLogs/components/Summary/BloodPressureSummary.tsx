/* eslint-disable import/order */
import { Typography } from 'components/UI/Typography/Typography';
import { theme } from 'config/Theme';
import { View, StyleSheet } from 'react-native';

type SummaryDataItemProps = {
  label: string;
  min?: number;
  max?: number;
  average?: number;
};

const SummaryDataItem = ({ label, min, max, average }: SummaryDataItemProps) => {
  if (min === undefined || max === undefined || average === undefined) return null;

  return (
    <View style={styles.itemContainer}>
      <Typography size="xs" weight="semiBold" color="gray" style={styles.label}>
        {label === 'Pulse' ? 'Heart Rate' : label}
      </Typography>
      <View style={styles.valuesContainer}>
        <Typography
          size="sm"
          // color={theme.colors.orange}
          weight="semiBold"
          style={[styles.value, { color: theme.colors.orange }]}
        >
          {min}
        </Typography>
        <Typography
          size="sm"
          // color={theme.colors.red}
          weight="semiBold"
          style={[styles.value, { color: theme.colors.red }]}
        >
          {max}
        </Typography>
        <Typography size="sm" weight="semiBold" style={[styles.value, { color: theme.colors.green }]}>
          {average}
        </Typography>
      </View>
    </View>
  );
};

export const BloodPressureSummary = ({ data }: { data: Record<string, any[]> }) => {
  if (!data) return null;

  // Access primary and secondary data
  const primaryData = data.primary || [];
  const secondaryData = data.secondary || [];

  return (
    <View style={styles.container}>
      {/* Row Header */}
      <View style={styles.headerRow}>
        <Typography size="xs" weight="semiBold" color="gray" style={styles.headerText}>
          Min
        </Typography>
        <Typography size="xs" weight="semiBold" color="gray" style={styles.headerText}>
          Max
        </Typography>
        <Typography size="xs" weight="semiBold" color="gray" style={styles.headerText}>
          Average
        </Typography>
      </View>

      {/* Data Rows for Primary and Secondary */}
      {primaryData.map((item, index) => (
        <SummaryDataItem
          key={`primary-${index}`}
          label={item.label.split(' ')[0]} // Extract first word
          min={item.min}
          max={item.max}
          average={item.average}
        />
      ))}
      {secondaryData.map((item, index) => (
        <SummaryDataItem
          key={`secondary-${index}`}
          label={item.label.split(' ')[0]} // Extract first word
          min={item.min}
          max={item.max}
          average={item.average}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    // shadowColor: '#000',
    // shadowOpacity: 0.1,
    // shadowRadius: 5,
    // elevation: 3,
    // borderTopWidth: 1,
    // borderTopColor: theme.colors.primary100,
  },
  title: {
    textAlign: 'left',
    marginBottom: 10,
    color: '#333',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 6,
    marginBottom: 8,
    marginLeft: 120,
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    color: theme.colors.textPrimary,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  label: {
    flex: 1.5,
    fontSize: 16,
  },
  valuesContainer: {
    flexDirection: 'row',
    flex: 2,
    justifyContent: 'space-between',
  },
  value: {
    flex: 1,
    textAlign: 'center',
  },
});
