import AbstractHttpService from '../../AbstractHttpService';
import type {
  NewSocialHistory,
  SocialHistory,
  SocialHistoryAllApiModel,
} from '../../../../model/api/medicalHistory/SocialHistory';

export class SocialHistoryClient extends AbstractHttpService {
  getSocialHistoryList(): Promise<SocialHistoryAllApiModel> {
    return this.http
      .get('medical-history/social-history/all')
      .then((res) => this.resolve<SocialHistoryAllApiModel>(res))
      .catch(this.reject);
  }

  postSocialHistory(data: NewSocialHistory): Promise<undefined> {
    return this.http
      .post(`medical-history/social-history`, {
        json: data,
      })
      .then(() => undefined)
      .catch(this.reject);
  }

  putSocialHistory(id: string, data: SocialHistory): Promise<void> {
    return this.http
      .put(`medical-history/social-history/${id}`, {
        json: data,
      })
      .then(() => undefined)
      .catch(this.reject);
  }

  deleteSocialHistory(id: string): Promise<void> {
    return this.http
      .delete(`medical-history/social-history/${id}`)
      .then(() => undefined)
      .catch(this.reject);
  }
}
