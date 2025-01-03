import AbstractHttpService from '../../AbstractHttpService';
import type {
  NewVaccine,
  NewVaccineCard,
  Vaccine,
  VaccineCard,
  VaccinesApiModel,
  VaccinesCardApiModel,
} from '../../../../model/api/primaryPrevention/Immunization';
import { parseToMultipartFormData } from '../../../../model/parsers/common/MultipartFormDataParser';
import {
  vaccinesCardItemApiKeys,
  vaccinesItemApiKeys,
} from '../../../../constants/data/primaryPrevention/immunizations';
import type { PostReturnType } from '../../../../model/api/common/ReturnType';

export class ImmunizationClient extends AbstractHttpService {
  getAllVaccine(): Promise<Vaccine[]> {
    return this.http
      .get('primary-prevention/vaccine/all')
      .then((res) => this.resolve<VaccinesApiModel>(res))
      .then((res) => res.vaccines)
      .catch(this.reject);
  }

  getAllVaccineCard(): Promise<VaccineCard[]> {
    return this.http
      .get('primary-prevention/vaccine-card/all')
      .then((res) => this.resolve<VaccinesCardApiModel>(res))
      .then((res) => res.vaccineCards)
      .catch(this.reject);
  }

  getVaccine(id: string): Promise<Vaccine> {
    return this.http
      .get(`primary-prevention/vaccine/${id}`)
      .then((res) => this.resolve<Vaccine>(res))
      .catch(this.reject);
  }

  getVaccineCard(id: string): Promise<VaccineCard> {
    return this.http
      .get(`primary-prevention/vaccine-card/${id}`)
      .then((res) => this.resolve<VaccineCard>(res))
      .catch(this.reject);
  }

  postVaccine(data: NewVaccine): Promise<string> {
    return this.http
      .post('primary-prevention/vaccine', {
        body: parseToMultipartFormData(data, vaccinesItemApiKeys),
      })
      .then((res) => this.resolve<PostReturnType>(res))
      .then((res) => res.id)
      .catch(this.reject);
  }

  putVaccine(id: string, data: Vaccine): Promise<void> {
    return this.http
      .put(`primary-prevention/vaccine/${id}`, {
        body: parseToMultipartFormData(data, vaccinesItemApiKeys),
      })
      .then(() => undefined)
      .catch(this.reject);
  }

  deleteVaccine(id: string): Promise<void> {
    return this.http
      .delete(`primary-prevention/vaccine/${id}`)
      .then(() => undefined)
      .catch(this.reject);
  }

  postVaccineCard(data: NewVaccineCard): Promise<string> {
    return this.http
      .post('primary-prevention/vaccine-card', {
        body: parseToMultipartFormData(data, vaccinesCardItemApiKeys),
      })
      .then((res) => this.resolve<PostReturnType>(res))
      .then((res) => res.id)
      .catch(this.reject);
  }

  putVaccineCard(id: string, data: VaccineCard): Promise<void> {
    return this.http
      .put(`primary-prevention/vaccine-card/${id}`, {
        body: parseToMultipartFormData(data, vaccinesCardItemApiKeys),
      })
      .then(() => undefined)
      .catch(this.reject);
  }

  deleteVaccineCard(id: string): Promise<void> {
    return this.http
      .delete(`primary-prevention/vaccine-card/${id}`)
      .then(() => undefined)
      .catch(this.reject);
  }
}
