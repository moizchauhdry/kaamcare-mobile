import { View } from 'react-native';

import { Typography } from '../../../../UI/Typography/Typography';
import { ListItemTypography } from '../../../../UI/Typography/ListItemTypography/ListItemTypography';
import { useQueryFamilyMemberData } from '../../../../../hooks/query/medicalHistory/familyHistory/useQueryFamilyMemberData';
import { AttachmentTypography } from '../../../../UI/Typography/AttachmentTypography/AttachmentTypography';
import type { FamilyMemberDiagnosisModelValues } from '../../../../../model/api/medicalHistory/FamilyHistory';
import { capitalize } from '../../../../../utils/string/string';

const DISPLAY_ELEM_COUNT = 2;

type FamilyHistoryMemberContentProps = {
  id: string;
  name: string;
};

export const FamilyHistoryMemberContent = ({ id, name }: FamilyHistoryMemberContentProps) => {
  const data = useQueryFamilyMemberData(id);
  const diagnosisDisplay = data?.slice(0, DISPLAY_ELEM_COUNT) ?? [];
  const calculateMore = (data?.length ?? 0) - DISPLAY_ELEM_COUNT;
  const properName = capitalize(name);
  console.log('data============', data);
  // if (!data?.length) {
  //   return null;
  // }

  return (
    <View style={{ gap: 4 }}>
      <Typography weight="semiBold" color="secondary">
        {properName}
      </Typography>
      <View style={{ gap: 4, paddingLeft: 8 }}>
        {diagnosisDisplay.map((elem) => {
          const diagnosisName = Array.isArray(elem.values)
            ? elem.values.find((value) => value.key === 'Name')?.value
            : (elem.values as FamilyMemberDiagnosisModelValues)?.name;

          return (
            <View key={elem.id} style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
              <ListItemTypography>{diagnosisName}</ListItemTypography>
              {elem.attachments?.length > 0 && <AttachmentTypography attachments={elem.attachments} />}
            </View>
          );
        })}
        {calculateMore > 0 && (
          <Typography size="sm" color="secondary">
            {`+ ${calculateMore} more ${calculateMore === 1 ? 'diagnosis' : 'diagnoses'}`}
          </Typography>
        )}
      </View>
    </View>
  );
};
