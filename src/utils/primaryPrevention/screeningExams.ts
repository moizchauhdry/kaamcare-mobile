import type { ScreeningExam, GroupedScreeningExamData } from 'model/api/primaryPrevention/ScreeningExam';

export const groupByScreeningExamName = (records: ScreeningExam[]): GroupedScreeningExamData[] => {
  const nameMap: Map<string, ScreeningExam[]> = new Map();

  records.forEach((record) => {
    const { name } = record;
    const groupKey = name || 'Unknown';

    if (nameMap.has(groupKey)) {
      nameMap.get(groupKey)!.push(record);
    } else {
      nameMap.set(groupKey, [record]);
    }
  });

  return Array.from(nameMap, ([name, data]) => ({
    name,
    data,
  }));
};
