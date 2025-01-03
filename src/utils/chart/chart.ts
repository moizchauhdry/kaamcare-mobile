import type { lineDataItem } from 'react-native-gifted-charts';

import { formatDateForChart, getHourFromDate } from '../date/date';
import { findLastValueIndex } from '../array/array';

export const getLineSegmentsData = (data: lineDataItem[]) => {
  const dataIndexesToAvoid: number[] = [];

  data.forEach((elem, index) => {
    if (elem.value === 0 || (elem.value !== 0 && data[index + 1]?.value === 0)) {
      dataIndexesToAvoid.push(index);
    }
  });

  return dataIndexesToAvoid.map((elem, index) => ({
    startIndex: elem,
    endIndex: index - elem === 1 ? index : elem + 1,
    color: 'transparent',
  }));
};

export const interpolateLinear = (points?: lineDataItem[]): lineDataItem[] => {
  if (!points) {
    return [];
  }

  const pointsCp = [...points];
  const n = pointsCp.length;

  let startIdx: number | null = null;

  for (let i = 0; i < n; i++) {
    if (pointsCp[i]!.value === null) {
      pointsCp[i]!.hideDataPoint = true;
      if (startIdx === null) {
        startIdx = i;
      }
    } else if (startIdx !== null) {
      const endIdx = i;
      const startValue = pointsCp[startIdx - 1]?.value ?? 0;
      const endValue = pointsCp[endIdx]!.value;

      if (endValue !== null) {
        const step = (endValue - startValue) / (endIdx - startIdx + 1);
        for (let j = startIdx; j < endIdx; j++) {
          pointsCp[j]!.value = startValue + step * (j - startIdx + 1);
        }
      }

      startIdx = null;
    }
  }

  return pointsCp;
};

export const getLabel = (labelData: Date, subDays: number, index?: number, maxIndex?: number) => {
  if (subDays === 1) {
    return getHourFromDate(labelData);
  }
  return subDays === 7
    ? formatDateForChart(labelData)
    : index === 0 || index === maxIndex
      ? formatDateForChart(labelData)
      : index === parseInt((maxIndex! / 2).toFixed(2), 10)
        ? formatDateForChart(labelData)
        : '';
};

export const isLongChart = (days: number) => days === 2 || days === 3;

export const getFilteredDailyChartXAxis = (data: { value: number | null }[], axisArray: string[]) => {
  if (!data) {
    return { data: [], startIndex: undefined };
  }

  const initialStartIndex = axisArray.findIndex((elem) => elem === '6 AM');
  const initialEndIndex = axisArray.findIndex((elem) => elem === '10 PM');
  const lastIndex = findLastValueIndex(data);
  const startIndex = data.findIndex((elem) => Boolean(elem.value));
  const properStartIndex = startIndex < initialStartIndex ? startIndex : initialStartIndex;
  const properEndIndex = lastIndex > initialEndIndex ? lastIndex : initialEndIndex;
  const newData = data.slice(properStartIndex, properEndIndex + 1);
  const scrollToIndex = newData.findIndex((elem) => Boolean(elem.value));

  return { data: newData, startIndex: properStartIndex, scrollToIndex };
};
