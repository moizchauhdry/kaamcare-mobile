import { useWatch } from 'react-hook-form';

import { SwitchInputWithAlertControlled } from '../../../UI/Inputs/SwitchInput/SwitchInputWithAlertControlled';
import { SwitchInputControlled } from '../../../UI/Inputs/SwitchInput/SwitchInputControlled';

type HealthcareProviderFormPrimarySectionProps = {
  isPrimaryInList?: boolean;
};

export const HealthcareProviderFormPrimarySection = ({
  isPrimaryInList,
}: HealthcareProviderFormPrimarySectionProps) => {
  const firstName = useWatch({ name: 'firstName' });
  const lastName = useWatch({ name: 'firstName' });
  const properName = firstName && lastName ? `${firstName} ${lastName}` : 'this provider';

  return isPrimaryInList ? (
    <SwitchInputWithAlertControlled
      label="Primary Care Provider"
      name="isPrimaryCareProvider"
      inputProps={{
        isHorizontal: true,
        switchInputToggleOnAlertData: {
          title: 'Confirm Primary Care Provider',
          description: `Are you sure you want to set ${properName} as your Primary Care Provider?`,
          proceed: 'Confirm Selection',
          cancel: 'Cancel',
        },
      }}
    />
  ) : (
    <SwitchInputControlled
      label="Primary Care Provider"
      name="isPrimaryCareProvider"
      inputProps={{
        isHorizontal: true,
      }}
    />
  );
};
