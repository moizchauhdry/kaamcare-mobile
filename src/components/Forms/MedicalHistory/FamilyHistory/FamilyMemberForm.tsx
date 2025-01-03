import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { View } from 'react-native';
import { useEffect } from 'react';

import { TextInputControlled } from '../../../UI/Inputs/TextInput/TextInputControlled';
import { DeletionButton } from '../../../UI/Button/DeletionButton';
import { FormButtonControlled } from '../../common/FormButtonControlled/FormButtonControlled';
import { EmergencyContactFormRelationshipSection } from '../../EmergencyContactForm/components/EmergencyContactFormRelationshipSection';
import type { FamilyMemberFormData } from '../../../../schemas/forms/medicalHistory/familyHistory';
import { familyMemberSchema } from '../../../../schemas/forms/medicalHistory/familyHistory';
import type { NewFamilyMember } from '../../../../model/api/medicalHistory/FamilyHistory';
import { parseFamilyMemberToApiData } from '../../../../model/parsers/medicalHistory/FamilyHistoryParser';

type FamilyMemberFormProps = {
  initialValues?: FamilyMemberFormData;
  edit?: boolean;
  onSubmit?: (values: NewFamilyMember) => void;
  onDelete?: () => void;
  isLoading?: boolean;
};

export const FamilyMemberForm = ({ onSubmit, onDelete, initialValues, edit, isLoading }: FamilyMemberFormProps) => {
  const form = useForm<FamilyMemberFormData>({
    defaultValues: initialValues ?? { name: '', relationshipKind: '' },
    resolver: zodResolver(familyMemberSchema),
  });

  useEffect(() => {
    if (initialValues) {
      form.reset(initialValues);
    }
  }, [form, initialValues]);

  const handleSubmitForm = (values: FamilyMemberFormData) => {
    onSubmit?.(parseFamilyMemberToApiData({ ...values }));
  };

  return (
    <View style={{ flex: 1 }}>
      <FormProvider {...form}>
        <View style={{ gap: 16 }}>
          <EmergencyContactFormRelationshipSection saveCustom={false} />
          <TextInputControlled label="Family member name" name="name" />
          {edit ? (
            <DeletionButton
              title="Confirm deletion of Family Member"
              description={`Are you sure you want to delete the family member ${initialValues?.name} from your records? This action is irreversible and all information associated with ${initialValues?.name} will be permanently removed. To proceed with the deletion, select 'Yes, delete'. If you want to keep the family member's information, select 'Cancel'.`}
              name={initialValues?.name}
              onProceed={() => onDelete?.()}
            >
              Delete family member
            </DeletionButton>
          ) : null}
          <FormButtonControlled disabled={isLoading} edit={edit} onPress={form.handleSubmit(handleSubmitForm)} />
        </View>
      </FormProvider>
    </View>
  );
};
