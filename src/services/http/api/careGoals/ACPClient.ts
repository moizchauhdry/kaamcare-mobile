import AbstractHttpService from '../../AbstractHttpService';
import type { ACPApiModel } from '../../../../model/api/goalsOfCare/ACPModel';
import { parseToMultipartFormData } from '../../../../model/parsers/common/MultipartFormDataParser';
import { acpApiKeys } from '../../../../constants/data/goalsOfCare/acp';

export class ACPClient extends AbstractHttpService {
  getACPData(): Promise<ACPApiModel> {
    return this.http
      .get('goals-of-care/advanced-care-planning')
      .then((res) => this.resolve<ACPApiModel>(res))
      .catch(this.reject);
  }

  postACPData(data: ACPApiModel): Promise<undefined> {
    return this.http
      .post('goals-of-care/advanced-care-planning', {
        body: parseToMultipartFormData(data, acpApiKeys),
      })
      .then(() => undefined)
      .catch(this.reject);
  }

  putACPData(data: ACPApiModel): Promise<void> {
    return this.http
      .post(`goals-of-care/advanced-care-planning`, {
        body: parseToMultipartFormData(data, acpApiKeys),
      })
      .then(() => undefined)
      .catch(this.reject);
  }
}
