import type {
  EmergencyContact,
  ProfileInformation,
  AddressInformation,
  Pharmacy,
  Caregiver,
  CustomRelationship,
  CustomSpecialization,
  HealthcareProvider,
  SpecializationKinds,
  HealthcareProviderNew,
} from 'model/api/ProfileInformation';

import AbstractHttpService from '../AbstractHttpService';

export class ProfileClient extends AbstractHttpService {
  getProfileInformation(): Promise<ProfileInformation> {
    return this.http
      .get('User/profile')
      .then((res) => this.resolve<ProfileInformation>(res))
      .catch(this.reject);
  }

  putEmail(email: string): Promise<void> {
    return this.http
      .put('User/email', {
        json: { email },
      })
      .then(() => undefined)
      .catch(this.reject);
  }

  putProfileInformation(data: ProfileInformation): Promise<void> {
    return this.http
      .put('User/profile', {
        json: {
          ...data,
        },
      })
      .then(() => undefined)
      .catch(this.reject);
  }

  getEmergencyContact(): Promise<EmergencyContact> {
    return this.http
      .get('User/emergency-contact')
      .then((res) => this.resolve<EmergencyContact>(res))
      .catch(this.reject);
  }

  postEmergencyContact(data: EmergencyContact): Promise<void> {
    return this.http
      .post('User/emergency-contact', {
        json: {
          ...data,
        },
      })
      .then(() => undefined)
      .catch(this.reject);
  }

  putEmergencyContact(data: EmergencyContact): Promise<void> {
    return this.http
      .put('User/emergency-contact', {
        json: {
          ...data,
        },
      })
      .then(() => undefined)
      .catch(this.reject);
  }

  getAddressInformation(): Promise<AddressInformation> {
    return this.http
      .get('User/address-information')
      .then((res) => this.resolve<AddressInformation>(res))
      .catch(this.reject);
  }

  putAddressInformation(data: AddressInformation): Promise<void> {
    return this.http
      .put('User/address-information', {
        json: {
          ...data,
        },
      })
      .then(() => undefined)
      .catch(this.reject);
  }

  postAddressInformation(data: AddressInformation): Promise<void> {
    return this.http
      .post('User/address-information', {
        json: {
          ...data,
        },
      })
      .then(() => undefined)
      .catch(this.reject);
  }

  getPharmacy(): Promise<Pharmacy> {
    return this.http
      .get('User/pharmacy')
      .then((res) => this.resolve<Pharmacy>(res))
      .catch(this.reject);
  }

  postPharmacy(data: Pharmacy): Promise<void> {
    return this.http
      .post('User/pharmacy', {
        json: {
          ...data,
        },
      })
      .then(() => undefined)
      .catch(this.reject);
  }

  putPharmacy(data: Pharmacy): Promise<void> {
    return this.http
      .put('User/pharmacy', {
        json: {
          ...data,
        },
      })
      .then(() => undefined)
      .catch(this.reject);
  }

  getCaregiver(): Promise<Caregiver> {
    return this.http
      .get('User/caregiver')
      .then((res) => this.resolve<Caregiver>(res))
      .catch(this.reject);
  }

  postCaregiver(data: Caregiver): Promise<void> {
    return this.http
      .post('User/caregiver', {
        json: {
          ...data,
        },
      })
      .then(() => undefined)
      .catch(this.reject);
  }

  putCaregiver(data: Caregiver): Promise<void> {
    return this.http
      .put('User/caregiver', {
        json: {
          ...data,
        },
      })
      .then(() => undefined)
      .catch(this.reject);
  }

  getCustomRelationship(): Promise<CustomRelationship[]> {
    return this.http
      .get('User/custom-relationship')
      .then((res) => this.resolve<CustomRelationship[]>(res))
      .catch(this.reject);
  }

  getCustomSpecialization(): Promise<CustomSpecialization[]> {
    return this.http
      .get('User/custom-specialization')
      .then((res) => this.resolve<CustomSpecialization[]>(res))
      .catch(this.reject);
  }

  postCustomRelationship(name: string): Promise<void> {
    return this.http
      .post('User/custom-relationship', {
        json: {
          name,
        },
      })
      .then(() => undefined)
      .catch(this.reject);
  }

  postCustomSpecialization(name: string): Promise<void> {
    return this.http
      .post('User/custom-specialization', {
        json: {
          name,
        },
      })
      .then(() => undefined)
      .catch(this.reject);
  }

  getHealthcareProviders(): Promise<HealthcareProvider[]> {
    return this.http
      .get('User/healthcare-provider')
      .then((res) => this.resolve<HealthcareProvider[]>(res))
      .then((healthcareProviders) => healthcareProviders.sort((a) => (a?.isPrimaryCareProvider ? -1 : 0)))
      .catch(this.reject);
  }

  postHealthcareProvider(value: HealthcareProviderNew): Promise<void> {
    return this.http
      .post('User/healthcare-provider', {
        json: {
          ...value,
        },
      })
      .then(() => undefined)
      .catch(this.reject);
  }

  putHealthcareProvider(id: string, value: HealthcareProviderNew): Promise<void> {
    return this.http
      .put(`User/healthcare-provider`, {
        json: {
          ...value,
          healthcareProviderId: id,
        },
      })
      .then(() => undefined)
      .catch(this.reject);
  }

  deleteHealthcareProvider(id: string): Promise<void> {
    return this.http
      .delete(`User/healthcare-provider/${id}`)
      .then(() => undefined)
      .catch(this.reject);
  }

  getSpecializationKinds(): Promise<SpecializationKinds> {
    return this.http
      .get('User/specialization-kinds')
      .then((res) => this.resolve<SpecializationKinds>(res))
      .catch(this.reject);
  }
}
