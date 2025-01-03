import AbstractHttpService from '../../AbstractHttpService';
import { parseToMultipartFormData } from '../../../../model/parsers/common/MultipartFormDataParser';
import type {
  DentalHistory,
  DentalHistoryAllApiModel,
  NewDentalHistory,
} from '../../../../model/api/medicalHistory/DentalHistory';
import { dentalHistoryItemApiKeys } from '../../../../constants/data/medicalHistory/dentalHistory';
import type { PostReturnType } from '../../../../model/api/common/ReturnType';

export class DentalHistoryClient extends AbstractHttpService {
  getDentalHistoryList(): Promise<DentalHistoryAllApiModel> {
    return this.http
      .get('medical-history/dental-history/all')
      .then((res) => this.resolve<DentalHistoryAllApiModel>(res))
      .catch(this.reject);
  }

  postDentalHistory(data: NewDentalHistory): Promise<string> {
    return this.http
      .post(`medical-history/dental-history`, {
        body: parseToMultipartFormData(data, dentalHistoryItemApiKeys),
      })
      .then((res) => this.resolve<PostReturnType>(res))
      .then((res) => res.id)
      .catch(this.reject);
  }

  putDentalHistory(id: string, data: DentalHistory): Promise<void> {
    return this.http
      .put(`medical-history/dental-history/${id}`, {
        body: parseToMultipartFormData(data, dentalHistoryItemApiKeys),
      })
      .then(() => undefined)
      .catch(this.reject);
  }

  deleteDentalHistory(id: string): Promise<void> {
    return this.http
      .delete(`medical-history/dental-history/${id}`)
      .then(() => undefined)
      .catch(this.reject);
  }
}
