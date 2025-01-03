import type { TypographyExportProps } from '../Typography';
import { Typography } from '../Typography';

interface HighlightedTypographyProps extends TypographyExportProps {
  value: string;
  highlightedValue?: string;
}

export const HighlightedTypography = ({ value, highlightedValue = '', ...props }: HighlightedTypographyProps) => {
  const getHighlightedText = (text: string, highlight: string) => {
    if (highlight.length < 3) {
      return text;
    }

    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) => {
      const key = `${index}-${part}`;
      if (part.toLowerCase() === highlight.toLowerCase()) {
        return (
          <Typography {...props} key={key} style={[props.style, { fontWeight: '700' }]}>
            {part}
          </Typography>
        );
      }
      return part;
    });
  };

  return <Typography {...props}>{getHighlightedText(value, highlightedValue)}</Typography>;
};
