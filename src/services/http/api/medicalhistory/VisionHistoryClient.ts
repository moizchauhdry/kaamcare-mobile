import AbstractHttpService from '../../AbstractHttpService';
import type {
  NewVisionHistoryModel,
  VisionHistoryAllApiModel,
  VisionHistoryModel,
} from '../../../../model/api/medicalHistory/VisionHistory';
import { parseToMultipartFormData } from '../../../../model/parsers/common/MultipartFormDataParser';
import {
  visionHistoryEyeWearApiKeys,
  visionHistoryItemApiKeys,
} from '../../../../constants/data/medicalHistory/visionHistory';
import type { PostReturnType } from '../../../../model/api/common/ReturnType';

export class VisionHistoryClient extends AbstractHttpService {
  getUserVisionHistory(): Promise<VisionHistoryAllApiModel> {
    return this.http
      .get('medical-history/vision/all')
      .then((res) => this.resolve<VisionHistoryAllApiModel>(res))
      .catch(this.reject);
  }

  postVisionHistory(name: string, data: NewVisionHistoryModel): Promise<string> {
    return this.http
      .post(`medical-history/vision/${name}`, {
        body: parseToMultipartFormData(
          data,
          name === 'eye-wear' ? visionHistoryEyeWearApiKeys : visionHistoryItemApiKeys,
        ),
      })
      .then((res) => this.resolve<PostReturnType>(res))
      .then((res) => res.id)
      .catch(this.reject);
  }

  putVisionHistory(name: string, id: string, data: VisionHistoryModel): Promise<void> {
    return this.http
      .put(`medical-history/vision/${name}/${id}`, {
        body: parseToMultipartFormData(
          data,
          name === 'eye-wear' ? visionHistoryEyeWearApiKeys : visionHistoryItemApiKeys,
        ),
      })
      .then(() => undefined)
      .catch(this.reject);
  }

  deleteVisionHistory(name: string, id: string): Promise<void> {
    return this.http
      .delete(`medical-history/vision/${name}/${id}`)
      .then(() => undefined)
      .catch(this.reject);
  }

  deleteVisionHistoryAttachment(name: string, visionId: string, attachmentId: string) {
    return this.http
      .delete(`medical-history/vision/${name}/${visionId}/attachment/${attachmentId}`)
      .then(() => undefined)
      .catch(this.reject);
  }

  getVisionAttachment(name: string, visionId: string, attachmentId: string) {
    return this.http
      .get(`medical-history/vision/${name}/${visionId}/attachment/${attachmentId}`)
      .then((res) => this.resolve(res))
      .catch(this.reject);
  }
}
