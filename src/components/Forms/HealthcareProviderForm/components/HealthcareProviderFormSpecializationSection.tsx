import { View } from 'react-native';
import { useWatch } from 'react-hook-form';

import { useQuerySpecializationKinds } from 'hooks/query/profile/useQuerySpecializationKinds';

import { PickerSelectModalControlled } from '../../../UI/Inputs/PickerSelectModal/PickerSelectModalControlled';
import { allTitles, otherTitles, specializationDynamicData } from '../../../../constants/forms/healthcareProvider';
import { capitalize } from '../../../../utils/string/string';
import { CustomSelectControlled } from '../../../UI/Inputs/Custom/CustomSelectControlled';
import { useQueryCustomSpecialization } from '../../../../hooks/query/profile/useQueryCustomSpecialization';
import { useMutationCustomSpecialization } from '../../../../hooks/query/profile/useMutationCustomSpecialization';
import { InputSkeleton } from '../../../UI/Inputs/InputSkeleton/InputSkeleton';

export const HealthcareProviderFormSpecializationSection = () => {
  const { data = [], isLoading } = useQueryCustomSpecialization();
  const { data: specializationKinds = [] } = useQuerySpecializationKinds();
  const { mutate } = useMutationCustomSpecialization();
  const dynamicData = data.map((elem) => ({
    value: elem.customSpecializationName,
    label: elem.customSpecializationName,
  }));
  const commonData = specializationKinds.map((elem) => ({
    value: elem.name,
    label: elem.name,
  }));
  const properDynamicData = [...specializationDynamicData, ...dynamicData];
  const specializationValue = useWatch({ name: 'specialization' });

  return (
    <View style={{ gap: 16, flexDirection: 'row', paddingRight: 16 }}>
      <View style={{ width: '65%' }}>
        {isLoading ? (
          <InputSkeleton />
        ) : (
          <CustomSelectControlled
            label="Specialization"
            name="specialization"
            title="Select specialization"
            commonData={commonData}
            dynamicData={properDynamicData}
            onSaveCustomValue={(value) => mutate(value)}
            inputProps={{
              placeholder: 'Select',
            }}
          />
        )}
      </View>
      <View style={{ width: '35%' }}>
        <PickerSelectModalControlled
          name="title"
          label="Title"
          data={allTitles[specializationValue] ?? otherTitles}
          title="Select title name"
          dataTitle={capitalize(specializationValue ?? '')}
          inputProps={{ disabled: !specializationValue, editable: false }}
        />
      </View>
    </View>
  );
};
