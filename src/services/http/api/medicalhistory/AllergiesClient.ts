import AbstractHttpService from '../../AbstractHttpService';
import type {
  Allergies,
  Allergy,
  NewAllergy,
  AllergiesApiReturnModel,
  AllergiesSelectModels,
} from '../../../../model/api/medicalHistory/Allergies';
import { parseAllergiesApiData } from '../../../../model/parsers/medicalHistory/AllergiesParser';

export class AllergiesClient extends AbstractHttpService {
  getUserAllergies(): Promise<Allergies> {
    return this.http
      .get('medical-history/user-allergies')
      .then((res) => this.resolve<Allergies>(res))
      .catch(this.reject);
  }

  postUserAllergy(data: NewAllergy): Promise<void> {
    return this.http
      .post('medical-history/user-allergies', {
        json: data,
      })
      .then(() => undefined)
      .catch(this.reject);
  }

  putUserAllergy(data: Allergy): Promise<void> {
    return this.http
      .put('medical-history/user-allergies', {
        json: data,
      })
      .then(() => undefined)
      .catch(this.reject);
  }

  deleteUserAllergy(id: string): Promise<void> {
    return this.http
      .delete(`medical-history/user-allergies/${id}`)
      .then(() => undefined)
      .catch(this.reject);
  }

  getAllergies(): Promise<AllergiesSelectModels> {
    return this.http
      .get('medical-history/allergies')
      .then((res) => this.resolve<AllergiesApiReturnModel>(res))
      .then((res) => parseAllergiesApiData(res))
      .catch(this.reject);
  }

  postCustomAllergy(name: string): Promise<string> {
    return this.http
      .post('medical-history/custom-allergies', {
        json: {
          allergyName: name,
        },
      })
      .then((res) => this.resolve<string>(res))
      .catch(this.reject);
  }
}
