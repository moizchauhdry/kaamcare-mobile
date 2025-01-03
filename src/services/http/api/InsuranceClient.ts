import type {
  InsuranceCard,
  InsuranceCards,
  InsuranceCardsApiResponse,
  NewInsuranceCard,
} from '../../../model/api/insurance/Insurance';
import AbstractHttpService from '../AbstractHttpService';
import { parseInsuranceCardToMultipart } from '../../../model/parsers/common/MultipartFormDataParser';
import type { PostReturnType } from '../../../model/api/common/ReturnType';

export class InsuranceClient extends AbstractHttpService {
  getInsuranceCards(): Promise<InsuranceCards> {
    return this.http
      .get('insurance-card')
      .then((res) => this.resolve<InsuranceCardsApiResponse>(res))
      .then((res) => res.insuranceCards)
      .catch(this.reject);
  }

  postInsuranceCard(data: NewInsuranceCard): Promise<string> {
    return this.http
      .post('insurance-card', {
        body: parseInsuranceCardToMultipart(data),
      })
      .then((res) => this.resolve<PostReturnType>(res))
      .then((res) => res.id)
      .catch(this.reject);
  }

  putInsuranceCard(id: string, data: InsuranceCard): Promise<string> {
    return this.http
      .put(`insurance-card/${id}`, {
        body: parseInsuranceCardToMultipart(data),
      })
      .then((res) => this.resolve<PostReturnType>(res))
      .then((res) => res.id)
      .catch(this.reject);
  }

  deleteInsuranceCard(id: string): Promise<void> {
    return this.http
      .delete(`insurance-card/${id}`)
      .then(() => undefined)
      .catch(this.reject);
  }
}
