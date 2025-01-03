import type { GroupedIllnessData, Vaccine } from '../../model/api/primaryPrevention/Immunization';

export const groupByIllness = (records: Vaccine[]): GroupedIllnessData[] => {
  const illnessMap: Map<string, Vaccine[]> = new Map();

  records.forEach((record) => {
    const { illness } = record;

    if (illnessMap.has(illness)) {
      illnessMap.get(illness)!.push(record);
    } else {
      illnessMap.set(illness, [record]);
    }
  });

  return Array.from(illnessMap, ([illness, data]) => ({
    illness,
    data,
  }));
};
