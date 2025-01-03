import { HealthInsuranceCard } from './HealthInsuranceCard';
import { useQueryInsuranceCardsGet } from '../../../../hooks/query/insuranceCards/useQueryInsuranceCardsGet';

export const HealthInsurance = () => {
  const {
    data = [],
    isLoading,
    isError,
  } = useQueryInsuranceCardsGet({
    retry: 1,
  });

  return (
    <HealthInsuranceCard
      title="Health insurance cards"
      dataProps={{
        isLoading,
        data,
        isError,
      }}
    />
  );
};
