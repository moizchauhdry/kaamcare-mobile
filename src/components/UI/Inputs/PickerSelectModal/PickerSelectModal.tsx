import { useState } from 'react';
import { SvgXml } from 'react-native-svg';

import select from 'assets/icons/select.svg';

import type { TextInputProps } from '../TextInput/TextInput';
import { TextInput } from '../TextInput/TextInput';
import { Modal } from '../../Modal/Modal';
import { PickerSelectModalContent } from './components/PickerSelectModalContent';
import { theme } from '../../../../config/Theme';

export type PickerSelectModalItemData = {
  value: string;
  label: string;
  subLabel?: string;
};

type PickerSelectModalProps = {
  data: PickerSelectModalItemData[] | readonly PickerSelectModalItemData[];
  title?: string;
  dataTitle?: string;
  inputProps?: TextInputProps;
  value?: string;
  onSelect?: (value: string) => void;
};

export const PickerSelectModal = ({ inputProps, dataTitle, value, title, onSelect, data }: PickerSelectModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value ?? '');

  return (
    <>
      <TextInput
        {...inputProps}
        placeholder="Select"
        onPressIn={!inputProps?.disabled ? () => setIsOpen(true) : undefined}
        rightElement={({ disabled }) => (
          <SvgXml xml={select} color={disabled ? theme.colors.gray100 : theme.colors.blue} />
        )}
      />
      <Modal
        isVisible={isOpen}
        title={title}
        onCancel={() => setIsOpen(false)}
        onSave={() => onSelect?.(selectedValue)}
      >
        <PickerSelectModalContent
          dataTitle={dataTitle}
          data={data}
          selectedValue={selectedValue}
          onItemSelect={(itemValue) => setSelectedValue(itemValue)}
        />
      </Modal>
    </>
  );
};
