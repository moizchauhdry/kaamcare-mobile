import type { DefaultSectionT, SectionListData } from 'react-native';
import { View, SectionList as RNSectionList } from 'react-native';
import type { JSXElementConstructor, ReactElement } from 'react';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import { SectionListSeparator } from './SectionListSeparator/SectionListSeparator';
import { theme } from '../../../../config/Theme';
import { Typography } from '../../../UI/Typography/Typography';
import type { AddMedicalDataNavigationParamsList } from '../../../Navigation/AddMedicalDataNavigation';

type SectionListProps = {
  sections: readonly SectionListData<any, DefaultSectionT>[];
};

export const SectionList = ({ sections }: SectionListProps) => {
  const [expandedSections, setExpandedSections] = useState(new Set());
  const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();

  const handleExpandedPress = (title: string) => {
    setExpandedSections((prevState) => {
      const newSet = new Set(prevState);

      if (newSet.has(title)) {
        newSet.delete(title);
      } else {
        newSet.add(title);
      }

      return newSet;
    });
  };

  const renderContent = (title: string, component: ReactElement<any, string | JSXElementConstructor<any>>) => {
    if (expandedSections.has(title)) {
      return null;
    }

    return component;
  };

  return (
    <View style={{ flex: 1, paddingVertical: 16 }}>
      <RNSectionList
        showsVerticalScrollIndicator={false}
        extraData={expandedSections}
        sections={sections}
        contentContainerStyle={{ gap: 8 }}
        renderItem={({ section, item }) => {
          const Component = section.component;

          return renderContent(section.title, <Component key={item.id} {...item} {...section.additionalProps} />);
        }}
        renderSectionFooter={({ section }) => (section.data.length === 0 ? <Typography>None</Typography> : null)}
        SectionSeparatorComponent={(data) =>
          !data.trailingItem && !expandedSections.has(data.section.title) ? (
            <View
              style={{ width: '100%', height: 1, backgroundColor: theme.colors.backgroundDark, marginVertical: 8 }}
            />
          ) : null
        }
        keyExtractor={(item) => item.id}
        renderSectionHeader={({ section }) => (
          <SectionListSeparator
            title={section.title}
            count={section.data.length}
            additionalCountText={
              section.additionalCountText
                ? section.data.length > 1
                  ? section.additionalCountText[1]
                  : section.additionalCountText[0]
                : undefined
            }
            isExpanded={expandedSections.has(section.title)}
            onExpandablePress={handleExpandedPress}
            onAdditionPress={() => navigation.navigate(section.screen, { edit: false, ...section.params })}
          />
        )}
      />
    </View>
  );
};
