import { useQueryGetACP } from 'hooks/query/goalsOfCare/acp/useQueryGetACP';
import { useMutationPostACP } from 'hooks/query/goalsOfCare/acp/useMutationPostACP';
import { useMutationPutACP } from 'hooks/query/goalsOfCare/acp/useMutationPutACP';

import { ACPForm } from '../../../../components/Forms/GoalsOfCare/ACPForm/ACPForm';
import { ScreenModalLayout } from '../../../../components/Layouts/ScreenModalLayout/ScreenModalLayout';
import { parseACPApiToFormData } from '../../../../model/parsers/goalsOfCare/ACPParser';
import type { ACPApiModel } from '../../../../model/api/goalsOfCare/ACPModel';
import { ElementWithAttachmentDataProvider } from '../../../../context/ElementWithAttachmentDataContext';
import { QUERY_KEYS } from '../../../../constants/query/queryKeys';

export const ACPScreen = () => {
  const { data } = useQueryGetACP();
  const mutateAdd = useMutationPostACP();
  const mutatePut = useMutationPutACP();

  const handleSubmit = (newData: ACPApiModel) => {
    if (!data) {
      mutateAdd.mutate(newData);
      return;
    }

    mutatePut.mutate(newData);
  };

  return (
    <ScreenModalLayout title="Advance Care Planning" isScrollable>
      <ElementWithAttachmentDataProvider
        name="goals-of-care"
        sectionName="advanced-care-planning"
        elementId=""
        sectionTypeName=""
        keyList={[QUERY_KEYS.GOALS_OF_CARE_ACP_GET]}
      >
        <ACPForm
          initialValues={data ? parseACPApiToFormData(data) : undefined}
          onFormSubmit={handleSubmit}
          isPending={mutateAdd.isPending || mutatePut.isPending}
        />
      </ElementWithAttachmentDataProvider>
    </ScreenModalLayout>
  );
};
