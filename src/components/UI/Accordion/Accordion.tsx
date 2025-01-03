import type { PropsWithChildren } from 'react';
import { useState } from 'react';
import { LayoutAnimation, Platform, UIManager } from 'react-native';

import { AccordionItem } from './components/AccordionItem';

type AccordionData = {
  title: string;
  content: React.ReactNode;
  expanded?: boolean;
};

type AccordionProps = PropsWithChildren<{
  data: AccordionData[];
}>;

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export const Accordion = ({ data }: AccordionProps) => {
  const [expandedIndex, setExpandedIndex] = useState<null | number>(null);

  const handleHeaderPress = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <>
      {data.map((elem, index) => (
        <AccordionItem
          key={elem.title}
          title={elem.title}
          onHeaderPress={() => handleHeaderPress(index)}
          expanded={expandedIndex === index}
        >
          {elem.content}
        </AccordionItem>
      ))}
    </>
  );
};
