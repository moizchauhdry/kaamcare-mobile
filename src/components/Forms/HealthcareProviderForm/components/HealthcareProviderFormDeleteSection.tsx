import { useWatch } from 'react-hook-form';

import { DeletionButton } from '../../../UI/Button/DeletionButton';

type HealthcareProviderFormDeleteSectionProps = {
  isEdit?: boolean;
  onDelete?: () => void;
};

export const HealthcareProviderFormDeleteSection = ({ isEdit, onDelete }: HealthcareProviderFormDeleteSectionProps) => {
  const firstName = useWatch({ name: 'firstName' });
  const lastName = useWatch({ name: 'lastName' });
  const properName = firstName || lastName ? `${firstName} ${lastName}` : 'this provider';

  if (!isEdit) {
    return null;
  }

  return (
    <DeletionButton
      title="Delete Healthcare Provider"
      name={properName}
      listName="Healthcare Providers"
      onProceed={() => onDelete?.()}
    >
      Delete healthcare provider
    </DeletionButton>
  );
};
