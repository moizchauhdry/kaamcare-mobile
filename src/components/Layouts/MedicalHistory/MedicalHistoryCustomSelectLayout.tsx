import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { Optional } from '@tanstack/react-query/build/modern';

import type { AddMedicalDataNavigationParamsList } from '../../Navigation/AddMedicalDataNavigation';
import { ScreenModalLayout } from '../ScreenModalLayout/ScreenModalLayout';
import { CustomSelectView } from '../../UI/Inputs/Custom/components/CustomSelectView';
import type { SearchInputProps } from '../../UI/Inputs/SearchInput/SearchInput';
import type { CustomSelectData } from '../../UI/Inputs/Custom/CustomSelect';

type MedicalHistoryCustomSelectLayoutProps<TData extends { name: string; id: string }> = {
  title: string;
  navigationScreen: any;
  userData: TData[];
  sectionName?: string;
  selectProps: {
    commonData: CustomSelectData[];
    dynamicData: CustomSelectData[];
    searchInputProps?: Optional<SearchInputProps, 'value' | 'onChangeText'>;
    searchKey?: keyof TData;
  };
  navigationParams?: {
    [key: string]: string;
  };
};

export const MedicalHistoryCustomSelectLayout = <TData extends { name: string; id: string }>({
  title,
  sectionName,
  navigationScreen,
  selectProps,
  userData,
  navigationParams,
}: MedicalHistoryCustomSelectLayoutProps<TData>) => {
  const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();

  const handleSelectOption = (value: string, isCustom?: boolean) => {
    const name = selectProps.commonData.find((elem) => elem.value === value)?.label ?? value;
    const existedItem = userData.find((elem) =>
      selectProps.searchKey ? elem[selectProps.searchKey] === value : elem.name === value,
    );
    navigation.navigate(navigationScreen, {
      name,
      sectionName,
      edit: Boolean(existedItem),
      id: existedItem ? existedItem.id : undefined,
      isCommonName: Boolean(!isCustom),
      ...navigationParams,
    });
  };

  return (
    <ScreenModalLayout title={title} childrenWrapper={{ style: { paddingHorizontal: 0 } }}>
      <CustomSelectView
        commonData={selectProps.commonData}
        dynamicData={selectProps.dynamicData}
        onSelectOption={handleSelectOption}
        searchInputProps={{ ...selectProps.searchInputProps }}
      />
    </ScreenModalLayout>
  );
};
