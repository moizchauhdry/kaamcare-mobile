import { View } from 'react-native';
import { useFormContext } from 'react-hook-form';

import { SwitchInputWithAlertControlled } from '../../../UI/Inputs/SwitchInput/SwitchInputWithAlertControlled';
import { CardInputWrapper } from '../../../UI/CardInputWrapper/CardInputWrapper';
import { RadioGroupWithAlertControlled } from '../../../UI/Inputs/RadioGroup/RadioGroupWithAlertControlled';
import { theme } from '../../../../config/Theme';
import { AttachmentInputControlled } from '../../../UI/Inputs/AttachmentsInput/AttachmentInputControlled';
import { toggleACPSectionAlert } from '../../../../constants/forms/goalsOfCare/acp';

export const ACPLivingWillSection = () => {
  const { setValue, watch } = useFormContext();
  const value = watch('livingWill.value');
  const attachments = watch('livingWill.attachments');
  const isActive = watch('livingWill.isActive');

  return (
    <View style={{ gap: 8 }}>
      <SwitchInputWithAlertControlled
        name="livingWill.isActive"
        label="Living Will"
        inputProps={{
          isHorizontal: true,
          switchInputToggleOffAlertData: {
            ...toggleACPSectionAlert('Living Will'),
            onProceed: () => {
              setValue(`livingWill.value`, '');
              setValue(`livingWill.attachment`, []);
            },
          },
          enableAlert: attachments?.length > 0 || value,
        }}
        labelProps={{ weight: 'semiBold' }}
      />
      <CardInputWrapper>
        <RadioGroupWithAlertControlled
          displayAsCard={false}
          name="livingWill.value"
          items={[
            {
              id: '1',
              value: 'Yes',
              label: 'Yes',
            },
            {
              id: '2',
              value: 'No',
              label: 'No',
            },
          ]}
          inputProps={{
            disabled: !isActive,
            onPress: (newValue) => setValue(`livingWill.value`, newValue),
          }}
        />
        {isActive ? (
          <View
            style={{
              height: 1,
              backgroundColor: isActive ? theme.colors.lightBlue : theme.colors.gray100,
            }}
          />
        ) : null}
        {isActive ? <AttachmentInputControlled name="livingWill.attachments" /> : null}
      </CardInputWrapper>
    </View>
  );
};
