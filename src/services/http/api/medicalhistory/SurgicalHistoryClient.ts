import AbstractHttpService from '../../AbstractHttpService';
import { parseToMultipartFormData } from '../../../../model/parsers/common/MultipartFormDataParser';
import type {
  NewSurgicalHistory,
  SurgicalHistory,
  SurgicalHistoryAllApiModel,
} from '../../../../model/api/medicalHistory/SurgicalHistory';
import { surgicalHistoryItemApiKeys } from '../../../../constants/data/medicalHistory/surgicalHistory';
import type { PostReturnType } from '../../../../model/api/common/ReturnType';

export class SurgicalHistoryClient extends AbstractHttpService {
  getSurgicalHistoryList(): Promise<SurgicalHistoryAllApiModel> {
    return this.http
      .get('medical-history/surgical-history/all')
      .then((res) => this.resolve<SurgicalHistoryAllApiModel>(res))
      .catch(this.reject);
  }

  postSurgicalHistory(data: NewSurgicalHistory): Promise<string> {
    return this.http
      .post(`medical-history/surgical-history`, {
        body: parseToMultipartFormData(data, surgicalHistoryItemApiKeys),
      })
      .then((res) => this.resolve<PostReturnType>(res))
      .then((res) => res.id)
      .catch(this.reject);
  }

  putSurgicalHistory(id: string, data: SurgicalHistory): Promise<void> {
    return this.http
      .post(`medical-history/surgical-history/${id}`, {
        body: parseToMultipartFormData(data, surgicalHistoryItemApiKeys),
      })
      .then(() => undefined)
      .catch(this.reject);
  }

  deleteSurgicalHistory(id: string): Promise<void> {
    return this.http
      .delete(`medical-history/surgical-history/${id}`)
      .then(() => undefined)
      .catch(this.reject);
  }
}
