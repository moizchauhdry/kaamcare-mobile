import AbstractHttpService from '../../AbstractHttpService';
import type {
  NewWeightLog,
  WeightApiLog,
  WeightLogs,
  WeightLogsApiList,
  WeightLogsApiListAll,
} from '../../../../model/api/medicalLogs/Weight';
import type { DateFilterModel } from '../../../../model/api/common/Date';
import { sortByDate } from '../../../../utils/array/array';
import type { PostReturnType } from '../../../../model/api/common/ReturnType';

export class WeightClient extends AbstractHttpService {
  getLog(id: string): Promise<WeightApiLog> {
    return this.http
      .get(`health-tracker/weight/${id}`)
      .then((res) => this.resolve<WeightApiLog>(res))
      .catch(this.reject);
  }

  getWeightAll(): Promise<WeightLogs> {
    return this.http
      .get('health-tracker/weight/all')
      .then((res) => this.resolve<WeightLogsApiListAll>(res))
      .then((res) => sortByDate(res.weight, 'date'))
      .catch(this.reject);
  }

  getWeightFragment({ startDate, endDate }: DateFilterModel): Promise<WeightLogs> {
    return this.http
      .get('health-tracker/weight', {
        searchParams: {
          ...startDate,
          ...endDate,
        },
      })
      .then((res) => this.resolve<WeightLogsApiList>(res))
      .then((res) => sortByDate(res.weights, 'date'))
      .catch(this.reject);
  }

  postWeight(data: NewWeightLog): Promise<string> {
    return this.http
      .post('health-tracker/weight', {
        json: data,
      })
      .then((res) => this.resolve<PostReturnType>(res))
      .then((res) => res.id)
      .catch(this.reject);
  }

  putWeight(id: string, data: WeightApiLog): Promise<void> {
    return this.http
      .put(`health-tracker/weight`, {
        json: {
          ...data,
          id,
        },
      })
      .then(() => undefined)
      .catch(this.reject);
  }

  deleteWeight(id: string): Promise<void> {
    return this.http
      .delete(`health-tracker/weight/${id}`)
      .then(() => undefined)
      .catch(this.reject);
  }
}
