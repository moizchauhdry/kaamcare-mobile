import * as z from 'zod';

import { isStringLongEnough } from 'utils/validator/string';
import { phoneNumberSchema } from 'schemas/common/phoneNumber';

import { AddressTypeEnum, OtherResidentialFacilityData } from '../../constants/enums/profile/profile';

const addressSchemaCommonObject = {
  addressType: z.union([z.string(), z.null()]).optional(),
  address: z
    .string()
    .min(3, 'Please enter at least 3 characters.')
    .max(140, 'Field must not exceed 140 characters.')
    .nullable()
    .optional()
    .or(z.literal('')),
  phoneNumber: phoneNumberSchema,
  facilityName: z
    .string()
    .min(3, 'Please enter at least 3 characters.')
    .max(80, 'Field must not exceed 80 characters.')
    .nullable()
    .optional()
    .or(z.literal('')),
  isOtherOptions: z.boolean().nullable().optional(),
  residentialFacility: z.string().nullable().optional(),
  otherFacilityName: z
    .string()
    .min(3, 'Please enter at least 3 characters.')
    .max(80, 'Field must not exceed 80 characters.')
    .nullable()
    .optional()
    .or(z.literal('')),
  otherPhoneNumber: phoneNumberSchema,
  otherAddress: z.string().max(140, 'Field must not exceed 140 characters.').nullable().optional(),
};

export const addressSchemaPut = z.object({
  ...addressSchemaCommonObject,
});

export const addressSchemaPost = z
  .object(addressSchemaCommonObject)
  .refine((data) => data.addressType !== null && (data?.addressType?.length ?? 0) > 0, {
    path: ['addressType'],
    message: 'Address Type is required',
  })
  .refine(
    (data) => !(data.addressType === AddressTypeEnum.HomelessShelter && !isStringLongEnough(data.facilityName, 3)),
    { path: ['facilityName'], message: 'Please enter at least 3 characters' },
  )
  .refine((data) => !(data.addressType === AddressTypeEnum.HomeAddress && !isStringLongEnough(data.address, 3)), {
    path: ['address'],
    message: 'Please enter at least 3 characters',
  })
  .refine(
    (data) =>
      !data.isOtherOptions ||
      (data.residentialFacility &&
        Object.values(OtherResidentialFacilityData).includes(data.residentialFacility as OtherResidentialFacilityData)),
    { path: ['residentialFacility'], message: 'Please select one option' },
  )
  .refine(
    (data) =>
      !(
        Object.values(OtherResidentialFacilityData).includes(
          data.residentialFacility as OtherResidentialFacilityData,
        ) && !isStringLongEnough(data.otherFacilityName, 3)
      ),
    { path: ['otherFacilityName'], message: 'Please enter at least 3 characters' },
  );

export type AddressFormData = z.infer<typeof addressSchemaPost> | z.infer<typeof addressSchemaPut>;
