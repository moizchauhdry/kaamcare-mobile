import type { NativeStackScreenProps } from 'react-native-screens/native-stack';

import { ScreenModalLayout } from 'components/Layouts/ScreenModalLayout/ScreenModalLayout';
import type { AddMedicalDataNavigationParamsList } from 'components/Navigation/AddMedicalDataNavigation';

import { VaccineForm } from '../../../../../components/Forms/PrimaryPrevention/Immunization/VaccineForm';
import type { VaccineFormData } from '../../../../../schemas/forms/primaryPrevention/immunization';
import {
  parseVaccineApiToFormData,
  parseVaccineFormToApiData,
} from '../../../../../model/parsers/primaryPrevention/ImmunizationParser';
import { useQueryVaccine } from '../../../../../hooks/query/primaryPrevention/immunizations/useQueryVaccine';
import { useMutationVaccineAdd } from '../../../../../hooks/query/primaryPrevention/immunizations/useMutationVaccineAdd';
import { useMutationVaccineUpdate } from '../../../../../hooks/query/primaryPrevention/immunizations/useMutationVaccineUpdate';
import { useMutationVaccineDelete } from '../../../../../hooks/query/primaryPrevention/immunizations/useMutationVaccineDelete';
import { QUERY_KEYS } from '../../../../../constants/query/queryKeys';
import { ElementWithAttachmentDataProvider } from '../../../../../context/ElementWithAttachmentDataContext';

type VaccineFormScreenProps = NativeStackScreenProps<AddMedicalDataNavigationParamsList, 'VaccineForm'>;

export const VaccineFormScreen = ({ route }: VaccineFormScreenProps) => {
  const { id } = route.params;
  const name = route.params?.name;
  const edit = route.params?.edit;
  const subName = route.params?.subName;
  const isCommonName = route.params?.isCommonName;

  const { data = null } = useQueryVaccine(id!);
  const mutationAdd = useMutationVaccineAdd();
  const mutationUpdate = useMutationVaccineUpdate(id!, data);
  const mutationDelete = useMutationVaccineDelete(id!, name);

  const isPending = mutationAdd.isPending || mutationUpdate.isPending || mutationDelete.isPending;

  const handleSubmit = (newData: VaccineFormData) => {
    const properValue = parseVaccineFormToApiData(newData, name, subName, isCommonName);

    if (data && edit) {
      mutationUpdate.mutate({ ...data, ...properValue, id: id! });
      return;
    }

    mutationAdd.mutate({ ...properValue });
  };

  return (
    <ScreenModalLayout title={name!} subTitle={subName} isScrollable>
      <ElementWithAttachmentDataProvider
        sectionName="vaccine"
        name="primary-prevention"
        elementId={id!}
        keyList={[QUERY_KEYS.PRIMARY_PREVENTION_VACCINES_LIST_GET]}
      >
        <VaccineForm
          initialValues={data ? parseVaccineApiToFormData(data) : undefined}
          onSubmit={handleSubmit}
          deletionData={{
            onDelete: () => mutationDelete.mutate(id!),
            listName: 'Vaccines',
            title: 'Vaccine',
          }}
          edit={edit}
          isPending={isPending}
        />
      </ElementWithAttachmentDataProvider>
    </ScreenModalLayout>
  );
};
