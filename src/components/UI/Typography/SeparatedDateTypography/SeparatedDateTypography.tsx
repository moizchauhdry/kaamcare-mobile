import type { TypographyExportProps } from '../Typography';
import { Typography } from '../Typography';
import type { SeparatedDateModel } from '../../../../model/api/common/Date';
import { displayDateSegment } from '../../../../utils/date/date';

type SeparatedDateTypographyProps = TypographyExportProps & {
  date?: SeparatedDateModel | null;
};

export const SeparatedDateTypography = ({ date, ...rest }: SeparatedDateTypographyProps) => {
  if (!date) {
    return null;
  }

  if (!date.day && !date.year && !date.month) {
    return null;
  }

  return (
    <Typography size="sm" color="gray" {...rest}>
      {displayDateSegment(date.day, date.month, date.year)}
    </Typography>
  );
};
