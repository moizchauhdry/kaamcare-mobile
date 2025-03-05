import { ScreenModalLayout } from '../../../../components/Layouts/ScreenModalLayout/ScreenModalLayout';
import { ADLForm } from '../../../../components/Forms/GoalsOfCare/ADLForm/ADLForm';
import { useQueryGetADL } from '../../../../hooks/query/goalsOfCare/adl/useQueryGetADL';
import { parseADLApiToFormData } from '../../../../model/parsers/goalsOfCare/ADLParser';
import { useMutationPostADL } from '../../../../hooks/query/goalsOfCare/adl/useMutationPostADL';
import type { ADLSections } from '../../../../model/api/goalsOfCare/ADLModel';
import { useMutationPutADL } from '../../../../hooks/query/goalsOfCare/adl/useMutationPutADL';
import { View } from 'react-native';

export const ADLScreen = () => {
  const { data = [] } = useQueryGetADL();
  const mutateAdd = useMutationPostADL();
  const mutatePut = useMutationPutADL();

  const handleSubmit = (newData: ADLSections) => {
    if (data.length === 0) {
      mutateAdd.mutate(newData);
      return;
    }

    mutatePut.mutate(newData);
  };

  return (
    <ScreenModalLayout title="Activities of Daily Living (ADL's)" isScrollable>
      {/* <View style={{ backgroundColor: 'red', flex: 1 }}> */}
      <ADLForm
        initialValues={data.length > 0 ? parseADLApiToFormData(data) : undefined}
        onFormSubmit={handleSubmit}
        isPending={mutateAdd.isPending || mutatePut.isPending}
      />
      {/* </View> */}
    </ScreenModalLayout>
  );
};
