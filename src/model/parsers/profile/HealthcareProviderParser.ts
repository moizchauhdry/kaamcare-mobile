import { formattedPhoneNumberStringToNumber, phoneNumberFormatter } from 'utils/formatter/phoneNumber';

import type { HealthcareProvider, HealthcareProviderNew } from '../../api/ProfileInformation';
import type { HealthcareProviderFormData } from '../../../schemas/forms/healthcareProvider';

export const parseHealthcareProviderFormToApiData = (values: HealthcareProviderFormData): HealthcareProviderNew => ({
  firstName: values.firstName,
  lastName: values.lastName,
  phoneNumber: formattedPhoneNumberStringToNumber(values.phoneNumber),
  title: values.title || null,
  specialization: values.specialization || null,
  isPrimaryCareProvider: values.isPrimaryCareProvider ?? false,
});

export const parseHealthcareProviderApiToFormData = (data: HealthcareProvider): HealthcareProviderFormData => ({
  firstName: data.firstName,
  lastName: data.lastName,
  phoneNumber: phoneNumberFormatter(data.phoneNumber),
  title: data.title || null,
  specialization: data.specialization || null,
  isPrimaryCareProvider: data.isPrimaryCareProvider,
});
