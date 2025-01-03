import type { TypographyExportProps } from '../Typography';
import { Typography } from '../Typography';

type ListItemTypographyProps = TypographyExportProps;

export const ListItemTypography = ({ children, ...rest }: ListItemTypographyProps) => (
  <Typography {...rest}>{`\u2022 ${children}`}</Typography>
);
