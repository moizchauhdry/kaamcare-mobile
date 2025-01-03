import type { NativeStackScreenProps } from 'react-native-screens/native-stack';

import { ScreenModalLayout } from 'components/Layouts/ScreenModalLayout/ScreenModalLayout';
import type { AddMedicalDataNavigationParamsList } from 'components/Navigation/AddMedicalDataNavigation';

import type { VaccineCardFormData } from '../../../../../schemas/forms/primaryPrevention/immunization';
import {
  parseVaccineCardApiToFormData,
  parseVaccineCardFormToApiData,
} from '../../../../../model/parsers/primaryPrevention/ImmunizationParser';
import { useQueryVaccineCard } from '../../../../../hooks/query/primaryPrevention/immunizations/useQueryVaccineCard';
import { useMutationVaccineCardAdd } from '../../../../../hooks/query/primaryPrevention/immunizations/useMutationVaccineCardAdd';
import { useMutationVaccineCardUpdate } from '../../../../../hooks/query/primaryPrevention/immunizations/useMutationVaccineCardUpdate';
import { useMutationVaccineCardDelete } from '../../../../../hooks/query/primaryPrevention/immunizations/useMutationVaccineCardDelete';
import { VaccineCardForm } from '../../../../../components/Forms/PrimaryPrevention/Immunization/VaccineCardForm';
import { QUERY_KEYS } from '../../../../../constants/query/queryKeys';
import { ElementWithAttachmentDataProvider } from '../../../../../context/ElementWithAttachmentDataContext';

type VaccineCardFormScreenProps = NativeStackScreenProps<AddMedicalDataNavigationParamsList, 'VaccineCardForm'>;

export const VaccineCardFormScreen = ({ route }: VaccineCardFormScreenProps) => {
  const id = route.params?.id;
  const edit = route.params?.edit;

  const { data = null } = useQueryVaccineCard(id!, { enabled: Boolean(id) && edit });
  const mutationAdd = useMutationVaccineCardAdd();
  const mutationUpdate = useMutationVaccineCardUpdate(id!);
  const mutationDelete = useMutationVaccineCardDelete(id!, data?.title);

  const isPending = mutationAdd.isPending || mutationUpdate.isPending || mutationDelete.isPending;

  const handleSubmit = (newData: VaccineCardFormData) => {
    const properValue = parseVaccineCardFormToApiData(newData);

    if (data && edit) {
      mutationUpdate.mutate({ ...data, ...properValue, id: id! });
      return;
    }

    mutationAdd.mutate({ ...properValue });
  };

  return (
    <ScreenModalLayout title="Vaccine card" isScrollable>
      <ElementWithAttachmentDataProvider
        sectionName="vaccine-card"
        name="primary-prevention"
        elementId={id!}
        keyList={[QUERY_KEYS.PRIMARY_PREVENTION_VACCINES_LIST_GET]}
      >
        <VaccineCardForm
          initialValues={data ? parseVaccineCardApiToFormData(data) : undefined}
          onSubmit={handleSubmit}
          deletionData={{
            onDelete: () => mutationDelete.mutate(id!),
            listName: 'Vaccine Cards',
            title: 'Vaccine Card',
          }}
          edit={edit}
          isPending={isPending}
        />
      </ElementWithAttachmentDataProvider>
    </ScreenModalLayout>
  );
};
