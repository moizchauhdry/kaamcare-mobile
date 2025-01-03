import AbstractHttpService from '../../AbstractHttpService';
import type {
  NewSaturationLog,
  SaturationLog,
  SaturationLogsApiList,
  SaturationApiLog,
} from '../../../../model/api/medicalLogs/Saturation';
import type { DateFilterModel } from '../../../../model/api/common/Date';
import { sortByDate } from '../../../../utils/array/array';
import type { PostReturnType } from '../../../../model/api/common/ReturnType';

export class SaturationClient extends AbstractHttpService {
  getSaturationLog(id: string): Promise<SaturationApiLog> {
    return this.http
      .get(`health-tracker/saturation/${id}`)
      .then((res) => this.resolve<SaturationApiLog>(res))
      .catch(this.reject);
  }

  getSaturationAll() {
    return this.http
      .get('health-tracker/saturation/all')
      .then((res) => this.resolve<SaturationLogsApiList>(res))
      .then((res) => sortByDate(res.saturation, 'date'))
      .catch(this.reject);
  }

  getSaturationFragment({ startDate, endDate }: DateFilterModel): Promise<SaturationApiLog[]> {
    return this.http
      .get('health-tracker/saturation', {
        searchParams: {
          ...startDate,
          ...endDate,
        },
      })
      .then((res) => this.resolve<SaturationLogsApiList>(res))
      .then((res) => sortByDate(res.saturation, 'date'))
      .catch(this.reject);
  }

  postSaturation(data: NewSaturationLog): Promise<string> {
    return this.http
      .post('health-tracker/saturation', {
        json: {
          date: data.date,
          saturationValue: data.spO2Value,
          explanation: data.explanation,
        },
      })
      .then((res) => this.resolve<PostReturnType>(res))
      .then((res) => res.id)
      .catch(this.reject);
  }

  putSaturation(id: string, data: SaturationLog): Promise<void> {
    return this.http
      .put(`health-tracker/saturation`, {
        json: {
          id,
          date: data.date,
          saturationValue: data.spO2Value,
          explanation: data.explanation,
        },
      })
      .then(() => undefined)
      .catch(this.reject);
  }

  deleteSaturation(id: string): Promise<void> {
    return this.http
      .delete(`health-tracker/saturation/${id}`)
      .then(() => undefined)
      .catch(this.reject);
  }
}
