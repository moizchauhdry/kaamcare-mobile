import type { TypographyExportProps } from '../Typography';
import { Typography } from '../Typography';

type ConditionalTypographyProps = {
  value?: string | null;
  typographyProps?: TypographyExportProps;
};

export const ConditionalTypography = ({ value, typographyProps }: ConditionalTypographyProps) =>
  value ? <Typography {...typographyProps}>{value}</Typography> : null;
