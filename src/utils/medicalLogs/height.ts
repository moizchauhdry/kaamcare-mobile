export const convertInchesToFeetAndInches = (totalHeightInches: number | string): string => {
  const properHeight = typeof totalHeightInches === 'string' ? parseInt(totalHeightInches, 10) : totalHeightInches;
  const feet = Math.floor(properHeight / 12);
  const inches = properHeight % 12;

  return `${feet}'${inches}''`;
};
