import type { NativeStackScreenProps } from 'react-native-screens/native-stack';

import { ScreenModalLayout } from '../../components/Layouts/ScreenModalLayout/ScreenModalLayout';
import type { InsuranceNavigatorParamsList } from '../../components/Navigation/LoggednNavigation';
import { InsuranceForm } from '../../components/Forms/InsuranceForm/InsuranceForm';
import { useQueryInsuranceCardGet } from '../../hooks/query/insuranceCards/useQueryInsuranceCardGet';
import { useMutationInsuranceCardsPost } from '../../hooks/query/insuranceCards/useMutationInsuranceCardsPost';
import { parseInsuranceApiToForm, parseInsuranceFormToApi } from '../../model/parsers/insurance/InsuranceParser';
import type { InsuranceFormData } from '../../schemas/forms/insurance';
import { ElementWithAttachmentDataProvider } from '../../context/ElementWithAttachmentDataContext';
import { QUERY_KEYS } from '../../constants/query/queryKeys';
import { useMutationInsuranceDelete } from '../../hooks/query/insuranceCards/useMutationInsuranceDelete';
import { useMutationInsuranceCardsPut } from '../../hooks/query/insuranceCards/useMutationInsuranceCardsPut';

type InsuranceFormScreenProps = NativeStackScreenProps<InsuranceNavigatorParamsList, 'InsuranceForm'>;

export const InsuranceFormScreen = ({ route }: InsuranceFormScreenProps) => {
  const name = route.params?.name;
  const id = route.params?.id;

  const initialValues = useQueryInsuranceCardGet(name);
  const mutateAdd = useMutationInsuranceCardsPost();
  const mutateDelete = useMutationInsuranceDelete(id!);
  const mutateUpdate = useMutationInsuranceCardsPut();

  const edit = Boolean(id) && Boolean(initialValues);

  const handleSubmit = (data: InsuranceFormData) => {
    const properData = parseInsuranceFormToApi(data, name);

    console.log('qweqweqwe', data);

    if (edit && id) {
      mutateUpdate.mutate({ ...initialValues, ...properData, id });
    }
    mutateAdd.mutate({ ...properData });
  };

  return (
    <ScreenModalLayout title={`${edit ? 'Update' : 'Add'} ${name} Card`} isScrollable>
      <ElementWithAttachmentDataProvider
        name="insurance-card"
        elementId={id!}
        keyList={[QUERY_KEYS.INSURANCE_CARDS_GET]}
      >
        <InsuranceForm
          onSubmit={handleSubmit}
          initialValues={initialValues ? parseInsuranceApiToForm(initialValues) : undefined}
          isPending={mutateAdd.isPending}
          onDelete={() => mutateDelete.mutate(id!)}
          edit={edit}
        />
      </ElementWithAttachmentDataProvider>
    </ScreenModalLayout>
  );
};
