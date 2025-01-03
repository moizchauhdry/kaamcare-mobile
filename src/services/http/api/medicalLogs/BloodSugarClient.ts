import AbstractHttpService from '../../AbstractHttpService';
import type {
  BloodSugarLog,
  BloodSugarLogs,
  BloodSugarLogsApiList,
  NewBloodSugarLog,
} from '../../../../model/api/medicalLogs/BloodSugar';
import type { DateFilterModel } from '../../../../model/api/common/Date';
import { sortByDate } from '../../../../utils/array/array';
import type { PostReturnType } from '../../../../model/api/common/ReturnType';

export class BloodSugarClient extends AbstractHttpService {
  getBloodSugarLog(id: string): Promise<BloodSugarLog> {
    return this.http
      .get(`health-tracker/blood-sugar/${id}`)
      .then((res) => this.resolve<BloodSugarLog>(res))
      .catch(this.reject);
  }

  getBloodSugarAll(): Promise<BloodSugarLogs> {
    return this.http
      .get('health-tracker/blood-sugar/all')
      .then((res) => this.resolve<BloodSugarLogsApiList>(res))
      .then((res) => sortByDate(res.bloodSugars, 'date'))
      .catch(this.reject);
  }

  getBloodSugarFragment({ startDate, endDate }: DateFilterModel): Promise<BloodSugarLogs> {
    return this.http
      .get('health-tracker/blood-sugar', {
        searchParams: {
          ...startDate,
          ...endDate,
        },
      })
      .then((res) => this.resolve<BloodSugarLogsApiList>(res))
      .then((res) => sortByDate(res.bloodSugars, 'date'))
      .catch(this.reject);
  }

  postBloodSugar(data: NewBloodSugarLog): Promise<string> {
    return this.http
      .post('health-tracker/blood-sugar', {
        json: {
          ...data,
          millimolesPerLitreValue: data.bloodPressureUnitType === 'mmolL' ? data.millimolesPerLitreValue : null,
          milligramsPerMillilitresValue:
            data.bloodPressureUnitType === 'mmolL' ? null : data.milligramsPerMillilitresValue,
        },
      })
      .then((res) => this.resolve<PostReturnType>(res))
      .then((res) => res.id)
      .catch(this.reject);
  }

  putBloodSugar(data: BloodSugarLog): Promise<void> {
    return this.http
      .put('health-tracker/blood-sugar', {
        json: {
          ...data,
          millimolesPerLitreValue: data.bloodPressureUnitType === 'mmolL' ? data.millimolesPerLitreValue : null,
          milligramsPerMillilitresValue:
            data.bloodPressureUnitType === 'mmolL' ? null : data.milligramsPerMillilitresValue,
        },
      })
      .then(() => undefined)
      .catch(this.reject);
  }

  deleteBloodSugar(id: string): Promise<void> {
    return this.http
      .delete(`health-tracker/blood-sugar/${id}`)
      .then(() => undefined)
      .catch(this.reject);
  }
}
