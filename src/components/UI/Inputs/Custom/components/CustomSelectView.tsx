import type { ButtonProps } from 'react-native';
import { FlatList, TouchableWithoutFeedback, View } from 'react-native';
import type { Optional } from '@tanstack/react-query';

import { styles } from '../CustomSelect.styles';
import type { SearchInputProps } from '../../SearchInput/SearchInput';
import { SearchInput } from '../../SearchInput/SearchInput';
import { Typography } from '../../../Typography/Typography';
import { theme } from '../../../../../config/Theme';
import { CustomSelectItem } from './CustomSelectItem';
import { Button } from '../../../Button/Button';
import { useCustomSelect } from '../CustomSelect.hooks';
import type { CustomSelectData } from '../CustomSelect';
import { findMatch } from '../CustomSelect.utils';
import { AdditionButton } from '../../../Button/AdditionButton';

type CustomSelectViewProps = {
  commonData: CustomSelectData[];
  dynamicData: CustomSelectData[];
  concatData?: CustomSelectData[];
  onSelectOption?: (value: string, isCustom?: boolean, name?: string) => void;
  onSave?: (value: string) => void;
  onSaveCustomValue?: (value: string) => void;
  searchInputProps?: Optional<SearchInputProps, 'value' | 'onChangeText'>;
  buttonProps?: Omit<ButtonProps, 'title'>;
  secondaryButtonProps?: {
    display: boolean;
    text: string;
    onPress: () => void;
  };
};

export const CustomSelectView = ({
  commonData,
  dynamicData,
  concatData: optionalConcatData,
  searchInputProps,
  buttonProps,
  secondaryButtonProps,
  onSelectOption,
  onSave,
  onSaveCustomValue,
}: CustomSelectViewProps) => {
  const { filteredData, searchTerm, setSearchTerm, concatData, debounceValue } = useCustomSelect(
    commonData,
    dynamicData,
    optionalConcatData,
  );

  const handleSave = () => {
    const isMatch = findMatch(searchTerm, concatData);
    if (isMatch) {
      onSelectOption?.(isMatch.value);
    } else {
      onSelectOption?.(searchTerm, true);
      onSaveCustomValue?.(searchTerm);
    }
    onSave?.(searchTerm);
  };

  return (
    <TouchableWithoutFeedback accessible={false}>
      <View style={{ flex: 1 }}>
        <View style={styles.searchInputWrapper}>
          <SearchInput
            onChangeText={(text) => setSearchTerm(text)}
            maxLength={40}
            value={searchTerm}
            {...searchInputProps}
          />
        </View>
        {secondaryButtonProps?.display && !debounceValue ? (
          <View style={{ paddingHorizontal: 16 }}>
            <AdditionButton onPress={secondaryButtonProps?.onPress}>{secondaryButtonProps?.text}</AdditionButton>
          </View>
        ) : null}
        {debounceValue && (
          <View style={{ paddingHorizontal: 16 }}>
            <Typography>
              You can search results list or tap the “Continue” button to add custom name as it is.
            </Typography>
          </View>
        )}
        <View style={styles.commonTextWrapper}>
          <Typography size="md" weight="semiBold">
            {debounceValue ? `${filteredData?.length} Results` : `Common`}
          </Typography>
        </View>

        {filteredData ? (
          <FlatList
            style={{ backgroundColor: theme.colors.white, flex: 1 }}
            contentContainerStyle={styles.flatListContainer}
            data={filteredData}
            showsVerticalScrollIndicator={false}
            renderItem={(data) => (
              <CustomSelectItem
                onPress={(selectValue) => onSelectOption?.(selectValue)}
                label={data.item.label}
                value={data.item.value}
                subLabel={data.item.subLabel}
                searchTerm={debounceValue}
              />
            )}
          />
        ) : null}

        <View style={styles.buttonWrapper}>
          {searchTerm && (
            <Button onPress={handleSave} weight="semiBold" disabled={buttonProps?.disabled || searchTerm.length < 3}>
              Continue with:{' '}
              <Typography weight="normal" color="white">
                {searchTerm}
              </Typography>
            </Button>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
