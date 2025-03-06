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
    console.log('🔵 [API Request] GET /primary-prevention/vaccine/all');
    return this.http
      .get('primary-prevention/vaccine/all')
      .then((res) => this.resolve<VaccinesApiModel>(res))
      .then((res) => {
        console.log('✅ [API Response] GET /primary-prevention/vaccine/all:', {
          count: res.vaccines?.length,
          data: res.vaccines,
        });
        return res.vaccines;
      })
      .catch((error) => {
        console.log('❌ [API Error] GET /primary-prevention/vaccine/all:', error);
        return this.reject(error);
      });
  }

  getAllVaccineCard(): Promise<VaccineCard[]> {
    console.log('🔵 [API Request] GET /primary-prevention/vaccine-card/all');
    return this.http
      .get('primary-prevention/vaccine-card/all')
      .then((res) => this.resolve<VaccinesCardApiModel>(res))
      .then((res) => {
        console.log('✅ [API Response] GET /primary-prevention/vaccine-card/all:', {
          count: res.vaccineCards?.length,
          data: res.vaccineCards,
        });
        return res.vaccineCards;
      })
      .catch((error) => {
        console.log('❌ [API Error] GET /primary-prevention/vaccine-card/all:', error);
        return this.reject(error);
      });
  }

  getVaccine(id: string): Promise<Vaccine> {
    console.log('🔵 [API Request] GET /primary-prevention/vaccine/', { id });
    return this.http
      .get(`primary-prevention/vaccine/${id}`)
      .then((res) => this.resolve<Vaccine>(res))
      .then((res) => {
        console.log('✅ [API Response] GET /primary-prevention/vaccine/', { id, data: res });
        return res;
      })
      .catch((error) => {
        console.log('❌ [API Error] GET /primary-prevention/vaccine/', { id, error });
        return this.reject(error);
      });
  }

  getVaccineCard(id: string): Promise<VaccineCard> {
    console.log('🔵 [API Request] GET /primary-prevention/vaccine-card/', { id });
    return this.http
      .get(`primary-prevention/vaccine-card/${id}`)
      .then((res) => this.resolve<VaccineCard>(res))
      .then((res) => {
        console.log('✅ [API Response] GET /primary-prevention/vaccine-card/', { id, data: res });
        return res;
      })
      .catch((error) => {
        console.log('❌ [API Error] GET /primary-prevention/vaccine-card/', { id, error });
        return this.reject(error);
      });
  }

  postVaccine(data: NewVaccine): Promise<string> {
    const formData = parseToMultipartFormData(data, vaccinesItemApiKeys);
    console.log('🔵 [API Request] POST /primary-prevention/vaccine', {
      payload: data,
      formData: formData,
    });

    return this.http
      .post('primary-prevention/vaccine', {
        body: formData,
      })
      .then((res) => this.resolve<PostReturnType>(res))
      .then((res) => {
        console.log('✅ [API Response] POST /primary-prevention/vaccine:', {
          id: res.id,
          data: res,
        });
        return res.id;
      })
      .catch((error) => {
        console.log('❌ [API Error] POST /primary-prevention/vaccine:', {
          payload: data,
          error,
        });
        return this.reject(error);
      });
  }

  putVaccine(id: string, data: Vaccine): Promise<void> {
    const formData = parseToMultipartFormData(data, vaccinesItemApiKeys);
    console.log('🔵 [API Request] PUT /primary-prevention/vaccine/', {
      id,
      payload: data,
      formData: formData,
    });

    return this.http
      .put(`primary-prevention/vaccine/${id}`, {
        body: formData,
      })
      .then(() => {
        console.log('✅ [API Response] PUT /primary-prevention/vaccine/', { id });
        return undefined;
      })
      .catch((error) => {
        console.log('❌ [API Error] PUT /primary-prevention/vaccine/', {
          id,
          payload: data,
          error,
        });
        return this.reject(error);
      });
  }

  deleteVaccine(id: string): Promise<void> {
    console.log('🔵 [API Request] DELETE /primary-prevention/vaccine/', { id });
    return this.http
      .delete(`primary-prevention/vaccine/${id}`)
      .then(() => {
        console.log('✅ [API Response] DELETE /primary-prevention/vaccine/', { id });
        return undefined;
      })
      .catch((error) => {
        console.log('❌ [API Error] DELETE /primary-prevention/vaccine/', { id, error });
        return this.reject(error);
      });
  }

  postVaccineCard(data: NewVaccineCard): Promise<string> {
    const formData = parseToMultipartFormData(data, vaccinesCardItemApiKeys);
    console.log('🔵 [API Request] POST /primary-prevention/vaccine-card', {
      payload: data,
      formData: formData,
    });

    return this.http
      .post('primary-prevention/vaccine-card', {
        body: formData,
      })
      .then((res) => this.resolve<PostReturnType>(res))
      .then((res) => {
        console.log('✅ [API Response] POST /primary-prevention/vaccine-card:', {
          id: res.id,
          data: res,
        });
        return res.id;
      })
      .catch((error) => {
        console.log('❌ [API Error] POST /primary-prevention/vaccine-card:', {
          payload: data,
          error,
        });
        return this.reject(error);
      });
  }

  putVaccineCard(id: string, data: VaccineCard): Promise<void> {
    const formData = parseToMultipartFormData(data, vaccinesCardItemApiKeys);
    console.log('🔵 [API Request] PUT /primary-prevention/vaccine-card/', {
      id,
      payload: data,
      formData: formData,
    });

    return this.http
      .put(`primary-prevention/vaccine-card/${id}`, {
        body: formData,
      })
      .then(() => {
        console.log('✅ [API Response] PUT /primary-prevention/vaccine-card/', { id });
        return undefined;
      })
      .catch((error) => {
        console.log('❌ [API Error] PUT /primary-prevention/vaccine-card/', {
          id,
          payload: data,
          error,
        });
        return this.reject(error);
      });
  }

  deleteVaccineCard(id: string): Promise<void> {
    console.log('🔵 [API Request] DELETE /primary-prevention/vaccine-card/', { id });
    return this.http
      .delete(`primary-prevention/vaccine-card/${id}`)
      .then(() => {
        console.log('✅ [API Response] DELETE /primary-prevention/vaccine-card/', { id });
        return undefined;
      })
      .catch((error) => {
        console.log('❌ [API Error] DELETE /primary-prevention/vaccine-card/', { id, error });
        return this.reject(error);
      });
  }
}
