import { View } from 'react-native';

import { Typography } from '../../../../UI/Typography/Typography';
import { ListItemTypography } from '../../../../UI/Typography/ListItemTypography/ListItemTypography';
import { useQueryFamilyMemberData } from '../../../../../hooks/query/medicalHistory/familyHistory/useQueryFamilyMemberData';
import { AttachmentTypography } from '../../../../UI/Typography/AttachmentTypography/AttachmentTypography';
import type { FamilyMemberDiagnosisModelValues } from '../../../../../model/api/medicalHistory/FamilyHistory';
import { capitalize } from '../../../../../utils/string/string';

const DISPLAY_ELEM_COUNT = 3;

type FamilyHistoryMemberContentProps = {
  id: string;
  name: string;
};

export const FamilyHistoryMemberContent = ({ id, name }: FamilyHistoryMemberContentProps) => {
  const data = useQueryFamilyMemberData(id);
  const diagnosisDisplay = data.slice(0, DISPLAY_ELEM_COUNT) ?? [];
  const calculateMore = data.length - DISPLAY_ELEM_COUNT;
  const properName = name ? capitalize(name) : name;

  return (
    <View style={{ gap: 4 }}>
      <Typography weight="semiBold">{properName}</Typography>
      {diagnosisDisplay.length > 0 ? (
        <View style={{ gap: 4 }}>
          {diagnosisDisplay.map((elem) => (
            <View key={elem.id} style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
              <ListItemTypography key={elem.id}>
                {Array.isArray(elem.values)
                  ? elem.values.find((value) => value.key === 'Name').value
                  : (elem.values as FamilyMemberDiagnosisModelValues).name}
              </ListItemTypography>
              <AttachmentTypography attachments={elem.attachments} />
            </View>
          ))}
          {calculateMore > 0 ? (
            <Typography size="sm" color="secondary" weight="regular">{`+ ${calculateMore} more`}</Typography>
          ) : null}
        </View>
      ) : null}
    </View>
  );
};
