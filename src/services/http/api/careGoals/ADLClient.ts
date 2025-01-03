import AbstractHttpService from '../../AbstractHttpService';
import type { ADLSections } from '../../../../model/api/goalsOfCare/ADLModel';

export class ADLClient extends AbstractHttpService {
  getADLData(): Promise<ADLSections> {
    return this.http
      .get('goals-of-care/activities-daily-living')
      .then((res) => this.resolve<ADLSections>(res))
      .catch(this.reject);
  }

  postADLData(data: ADLSections): Promise<undefined> {
    return this.http
      .post('goals-of-care/activities-daily-living', {
        json: {
          activities: [...data],
        },
      })
      .then(() => undefined)
      .catch(this.reject);
  }

  putADLData(data: ADLSections): Promise<void> {
    return this.http
      .put(`goals-of-care/activities-daily-living`, {
        json: {
          activities: [...data],
        },
      })
      .then(() => undefined)
      .catch(this.reject);
  }
}
