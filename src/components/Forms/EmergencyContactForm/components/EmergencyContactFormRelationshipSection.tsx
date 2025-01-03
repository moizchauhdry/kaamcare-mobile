import { SvgXml } from 'react-native-svg';

import { CustomSelectControlled } from '../../../UI/Inputs/Custom/CustomSelectControlled';
import { commonData } from '../../../../constants/forms/emergencyContact';
import select from '../../../../assets/icons/select.svg';
import { useQueryCustomRelationship } from '../../../../hooks/query/profile/useQueryCustomRelationship';
import { InputSkeleton } from '../../../UI/Inputs/InputSkeleton/InputSkeleton';
import { useMutationCustomRelationship } from '../../../../hooks/query/profile/useMutationCustomRelationship';

type EmergencyContactFormRelationshipSectionProps = {
  saveCustom?: boolean;
};

export const EmergencyContactFormRelationshipSection = ({
  saveCustom,
}: EmergencyContactFormRelationshipSectionProps) => {
  const { data = [], isLoading } = useQueryCustomRelationship();
  const { mutate } = useMutationCustomRelationship();
  const dynamicData = data.map((elem) => ({ value: elem.customRelationshipName, label: elem.customRelationshipName }));

  if (isLoading) {
    return <InputSkeleton />;
  }

  return (
    <CustomSelectControlled
      name="relationshipKind"
      label="Relationship"
      title="Select relationship"
      placeholder="Search relationship"
      onSaveCustomValue={saveCustom ? (value) => mutate(value) : undefined}
      commonData={commonData}
      dynamicData={dynamicData}
      inputProps={{ rightElement: <SvgXml xml={select} /> }}
    />
  );
};
