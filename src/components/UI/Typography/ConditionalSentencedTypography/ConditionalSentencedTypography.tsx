import type { TypographyExportProps } from '../Typography';
import { Typography } from '../Typography';

type ConditionalSentencedTypographyProps<T> = TypographyExportProps & {
  data: T;
  sorted?: string[];
  type?: string;
};

export const ConditionalSentencedTypography = <T extends { [key: string]: string | null }>({
  data,
  sorted,
  type,
  ...props
}: ConditionalSentencedTypographyProps<T>) => {
  const renderContent = () => {
    const objectKeys =
      sorted && sorted.length > 0
        ? Object.keys(data).sort((a, b) => sorted.indexOf(a) - sorted.indexOf(b))
        : Object.keys(data);
    const dataToRender = [];

    for (const key of objectKeys) {
      if (data[key] && key !== 'group') {
        if (type === 'alcohol' && key === 'quantity') {
          dataToRender.push(`${data[key]} oz`);
        } else {
          dataToRender.push(data[key]);
        }
      }
    }

    if (dataToRender.length === 0) {
      return null;
    }

    return (
      <Typography {...props}>
        {dataToRender.map((elem, index) => (
          /* eslint-disable-next-line */
          <Typography key={`${elem}-${index}`}>
            {elem}
            {index !== dataToRender.length - 1 ? ', ' : null}
          </Typography>
        ))}
      </Typography>
    );
  };

  return renderContent();
};
