import AbstractHttpService from '../../AbstractHttpService';
import type {
  BloodPressureLog,
  NewBloodPressureLog,
  BloodPressureLogsApiList,
  BloodPressureLogs,
} from '../../../../model/api/medicalLogs/BloodPressure';
import type { DateFilterModel } from '../../../../model/api/common/Date';
import { sortByDate } from '../../../../utils/array/array';
import type { PostReturnType } from '../../../../model/api/common/ReturnType';

export class BloodPressureClient extends AbstractHttpService {
  getLog(id: string): Promise<BloodPressureLog> {
    return this.http
      .get(`health-tracker/blood-pressure-pulse/${id}`)
      .then((res) => this.resolve<BloodPressureLog>(res))
      .catch(this.reject);
  }

  getBloodPressureAll() {
    return this.http
      .get('health-tracker/blood-pressure-pulse/all')
      .then((res) => this.resolve<BloodPressureLogsApiList>(res))
      .then((res) => sortByDate(res.bloodPressurePulses, 'date'))
      .catch(this.reject);
  }

  getBloodPressureFragment({ startDate, endDate }: DateFilterModel): Promise<BloodPressureLogs> {
    return this.http
      .get('health-tracker/blood-pressure-pulse', {
        searchParams: {
          ...startDate,
          ...endDate,
        },
      })
      .then((res) => this.resolve<BloodPressureLogsApiList>(res))
      .then((res) => sortByDate(res.bloodPressurePulses, 'date'))
      .catch(this.reject);
  }

  postBloodPressure(data: NewBloodPressureLog): Promise<string> {
    return this.http
      .post('health-tracker/blood-pressure-pulse', {
        json: data,
      })
      .then((res) => this.resolve<PostReturnType>(res))
      .then((res) => res.id)
      .catch(this.reject);
  }

  putBloodPressure(id: string, data: BloodPressureLog): Promise<void> {
    return this.http
      .put(`health-tracker/blood-pressure-pulse/`, {
        json: {
          ...data,
          id,
        },
      })
      .then(() => undefined)
      .catch(this.reject);
  }

  deleteBloodPressure(id: string): Promise<void> {
    return this.http
      .delete(`health-tracker/blood-pressure-pulse/${id}`)
      .then(() => undefined)
      .catch(this.reject);
  }
}
