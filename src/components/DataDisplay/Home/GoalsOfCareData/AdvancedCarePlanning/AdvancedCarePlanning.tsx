import { View } from 'react-native';
import { memo } from 'react';

import { DataCard } from 'components/UI/DataCard/DataCard';
import { parseACPDataToRenderFormat } from 'model/parsers/goalsOfCare/ACPParser';

import type { HomeCardDataType } from '../../../../../model/common/HomeData';
import { useQueryGetACP } from '../../../../../hooks/query/goalsOfCare/acp/useQueryGetACP';
import { Typography } from '../../../../UI/Typography/Typography';
import { phoneNumberFormatter } from '../../../../../utils/formatter/phoneNumber';

const keys: { [key: string]: string } = {
  livingWill: 'Living Will',
  medical: 'Medical Power of Attorney',
  codeStatus: 'Code Status',
  religious: 'Religious / Spiritual preferences',
  organ: 'Organ donation',
};

export const AdvancedCarePlanning = memo((props: HomeCardDataType) => {
  const { data, isError, isLoading } = useQueryGetACP();
  const parsedData = data ? parseACPDataToRenderFormat(data) : [];

  const renderContent = () => {
    const allSectionDisable =
      !data?.isCodeStatusActive &&
      !data?.isLivingWillActive &&
      !data?.isMedicalPowerOfAttorneyActive &&
      !data?.isReligiousSpiritualPreferencesActive &&
      !data?.isOrganDonationActive;

    if (allSectionDisable) {
      return (
        <View>
          <Typography style={{ fontStyle: 'italic' }} color="gray">
            Tap to add more information
          </Typography>
        </View>
      );
    }

    return (
      <View style={{ gap: 8 }}>
        {parsedData?.map((elem) => {
          if (!elem.isActive) {
            return null;
          }

          if (elem.key === 'medical') {
            if (!elem.name) {
              return null;
            }

            return (
              <View style={{ flexDirection: 'column', gap: 4 }} key={elem.key}>
                <Typography weight="semiBold">Medical Power of Attorney:</Typography>
                <Typography>
                  {elem.name}
                  {elem.phone ? ` | ${phoneNumberFormatter(elem.phone)}` : null}
                </Typography>
              </View>
            );
          }

          return elem.value?.[0] || elem.explanation ? (
            <View style={{ flexDirection: 'column', gap: 4 }} key={elem.key}>
              <Typography weight="semiBold">{keys[elem.key]}:</Typography>
              {elem.value ? <Typography>{Array.isArray(elem.value) ? elem.value[0] : elem.value}</Typography> : null}
              {elem.explanation ? <Typography>{elem.explanation}</Typography> : null}
            </View>
          ) : null;
        })}
      </View>
    );
  };

  return (
    <DataCard
      title={props.title}
      navigationData={{
        navigationScreen: 'MedicalDataNavigation',
        navigationProps: {
          listScreenName: props.listNavigation,
          addNewScreenName: props.addNavigation,
        },
      }}
      dataProps={{
        isLoading,
        data,
        isError,
      }}
    >
      {renderContent()}
    </DataCard>
  );
});
