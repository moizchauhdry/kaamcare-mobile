import AbstractHttpService from '../../AbstractHttpService';
import { parseToMultipartFormData } from '../../../../model/parsers/common/MultipartFormDataParser';
import type {
  HearingHistory,
  HearingHistoryAllApiModel,
  NewHearingHistory,
} from '../../../../model/api/medicalHistory/HearingHistory';
import { hearingHistoryItemApiKeys } from '../../../../constants/data/medicalHistory/hearingHistory';
import type { PostReturnType } from '../../../../model/api/common/ReturnType';

export class HearingHistoryClient extends AbstractHttpService {
  getUserHearingHistory(): Promise<HearingHistoryAllApiModel> {
    return this.http
      .get('medical-history/hearing/all')
      .then((res) => this.resolve<HearingHistoryAllApiModel>(res))
      .catch(this.reject);
  }

  postHearingHistory(name: string, data: NewHearingHistory): Promise<string> {
    return this.http
      .post(`medical-history/hearing/${name}`, {
        body: parseToMultipartFormData(data, hearingHistoryItemApiKeys),
      })
      .then((res) => this.resolve<PostReturnType>(res))
      .then((res) => res.id)
      .catch(this.reject);
  }

  putHearingHistory(name: string, id: string, data: HearingHistory): Promise<void> {
    return this.http
      .post(`medical-history/hearing/${name}/${id}`, {
        body: parseToMultipartFormData(data, hearingHistoryItemApiKeys),
      })
      .then(() => undefined)
      .catch(this.reject);
  }

  deleteHearingHistory(name: string, id: string): Promise<void> {
    return this.http
      .delete(`medical-history/hearing/${name}/${id}`)
      .then(() => undefined)
      .catch(this.reject);
  }

  deleteHearingHistoryAttachment(name: string, hearingId: string, attachmentId: string) {
    return this.http
      .delete(`medical-history/hearing/${name}/${hearingId}/attachment/${attachmentId}`)
      .then(() => undefined)
      .catch(this.reject);
  }

  getHearingAttachment(name: string, hearingId: string, attachmentId: string) {
    return this.http
      .get(`medical-history/hearing/${name}/${hearingId}/attachment/${attachmentId}`)
      .then((res) => this.resolve(res))
      .catch(this.reject);
  }
}
