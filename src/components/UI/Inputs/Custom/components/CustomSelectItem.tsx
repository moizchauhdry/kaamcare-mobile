import { SelectWithChevron } from 'components/UI/SelectWithChevron/SelectWithChevron';

import { HighlightedTypography } from '../../../Typography/HighlightedTypography/HighlightedTypography';

type CustomSelectIinitialTextProps = {
  label: string;
  value: string;
  subLabel?: string;
  onPress?: (value: string) => void;
  searchTerm: string;
};

export const CustomSelectItem = ({ label, subLabel, value, onPress, searchTerm }: CustomSelectIinitialTextProps) => (
  <SelectWithChevron
    onPress={() => onPress?.(value)}
    label={<HighlightedTypography value={label} highlightedValue={searchTerm} />}
    subLabel={subLabel ? <HighlightedTypography value={subLabel} highlightedValue={searchTerm} size="xs" /> : null}
  />
);
