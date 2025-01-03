import AbstractHttpService from '../../AbstractHttpService';
import type {
  Medication,
  Medications,
  MedicationsApiReturnModel,
  MedicationsSelectModels,
  NewMedication,
} from '../../../../model/api/medicalHistory/Medications';
import { parseMedicationsApiData } from '../../../../model/parsers/medicalHistory/MedicationParser';

export class MedicationsClient extends AbstractHttpService {
  getUserMedications(): Promise<Medications> {
    return this.http
      .get('medical-history/user-medications')
      .then((res) => this.resolve<Medications>(res))
      .catch(this.reject);
  }

  postUserMedication(data: NewMedication): Promise<void> {
    return this.http
      .post('medical-history/user-medications', {
        json: data,
      })
      .then(() => undefined)
      .catch(this.reject);
  }

  putUserMedication(data: Medication): Promise<void> {
    return this.http
      .put('medical-history/user-medications', {
        json: data,
      })
      .then(() => undefined)
      .catch(this.reject);
  }

  deleteUserMedication(id: string): Promise<void> {
    return this.http
      .delete(`medical-history/user-medications/${id}`)
      .then(() => undefined)
      .catch(this.reject);
  }

  getMedications(): Promise<MedicationsSelectModels> {
    return this.http
      .get('medical-history/medications')
      .then((res) => this.resolve<MedicationsApiReturnModel>(res))
      .then((res) => parseMedicationsApiData(res))
      .catch(this.reject);
  }

  postCustomMedication(name: string): Promise<string> {
    return this.http
      .post('medical-history/custom-medications', {
        json: {
          medicationName: name,
        },
      })
      .then((res) => this.resolve<string>(res))
      .catch(this.reject);
  }
}
