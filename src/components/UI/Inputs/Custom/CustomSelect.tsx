import { SvgXml } from 'react-native-svg';
import { useMemo, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

import reset from 'assets/icons/delete.svg';

import { theme } from '../../../../config/Theme';
import { Modal } from '../../Modal/Modal';
import type { TextInputProps } from '../TextInput/TextInput';
import { TextInput } from '../TextInput/TextInput';
import { getValueLabel } from './CustomSelect.utils';
import select from '../../../../assets/icons/select.svg';
import { CustomSelectView } from './components/CustomSelectView';

export type CustomSelectData = {
  id?: string;
  label: string;
  value: string;
  subLabel?: string;
};

type CustomSelectProps = {
  value: string;
  onSelect: (value: string) => void;
  onSaveCustomValue?: (value: string) => void;
  commonData: CustomSelectData[];
  dynamicData: CustomSelectData[];
  title?: string;
  placeholder?: string;
  error?: boolean;
  inputProps?: TextInputProps;
  onReset?: () => void;
};

export const CustomSelect = ({
  onSelect,
  onSaveCustomValue,
  onReset,
  title,
  placeholder,
  commonData,
  dynamicData,
  error,
  inputProps,
  value,
}: CustomSelectProps) => {
  const [isVisible, setVisible] = useState<boolean>(false);
  const concatData = useMemo(() => [...commonData, ...dynamicData], [commonData, dynamicData]);
  const valueLabel = getValueLabel(concatData, value);

  const handleCloseModal = () => setVisible(false);

  const handleSelectOption = (item: string) => {
    onSelect(item);
    handleCloseModal();
  };

  return (
    <>
      <TextInput
        error={error}
        value={valueLabel}
        {...inputProps}
        onPressIn={inputProps?.disabled ? undefined : () => setVisible(true)}
        rightElement={({ disabled }) => (
          <View style={{ flexDirection: 'row', gap: 4 }}>
            {valueLabel && onReset ? (
              <TouchableOpacity disabled={disabled} onPress={onReset}>
                <SvgXml xml={reset} color={disabled ? theme.colors.gray100 : theme.colors.blue} />
              </TouchableOpacity>
            ) : null}
            <SvgXml xml={select} color={disabled ? theme.colors.gray100 : theme.colors.blue} />
          </View>
        )}
      />
      <Modal isVisible={isVisible} title={title} onCancel={handleCloseModal}>
        <CustomSelectView
          concatData={concatData}
          commonData={commonData}
          dynamicData={dynamicData}
          searchInputProps={{ placeholder }}
          onSave={handleCloseModal}
          onSelectOption={handleSelectOption}
          onSaveCustomValue={onSaveCustomValue}
        />
      </Modal>
    </>
  );
};
