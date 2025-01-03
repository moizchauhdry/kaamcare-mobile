import AbstractHttpService from '../../AbstractHttpService';
import type {
  NewHeightLog,
  HeightLog,
  HeightLogs,
  HeightLogsApiList,
  HeightLogsApiListAll,
} from '../../../../model/api/medicalLogs/height';
import type { DateFilterModel } from '../../../../model/api/common/Date';
import { sortByDate } from '../../../../utils/array/array';
import type { PostReturnType } from '../../../../model/api/common/ReturnType';

export class HeightClient extends AbstractHttpService {
  getLog(id: string): Promise<HeightLog> {
    return this.http
      .get(`health-tracker/height/${id}`)
      .then((res) => this.resolve<HeightLog>(res))
      .catch(this.reject);
  }

  getHeightAll(): Promise<HeightLogs> {
    return this.http
      .get('health-tracker/height/all')
      .then((res) => this.resolve<HeightLogsApiListAll>(res))
      .then((res) => sortByDate(res.heights, 'date'))
      .catch(this.reject);
  }

  getHeightFragment({ startDate, endDate }: DateFilterModel, signal: AbortSignal): Promise<HeightLogs> {
    return this.http
      .get('health-tracker/height', {
        searchParams: {
          ...startDate,
          ...endDate,
        },
        signal,
      })
      .then((res) => this.resolve<HeightLogsApiList>(res))
      .then((res) => sortByDate(res.height, 'date'))
      .catch(this.reject);
  }

  postHeight(data: NewHeightLog): Promise<string> {
    return this.http
      .post('health-tracker/height', {
        json: data,
      })
      .then((res) => this.resolve<PostReturnType>(res))
      .then((res) => res.id)
      .catch(this.reject);
  }

  putHeight(data: HeightLog): Promise<void> {
    return this.http
      .put('health-tracker/height', {
        json: data,
      })
      .then(() => undefined)
      .catch(this.reject);
  }

  deleteHeight(id: string): Promise<void> {
    return this.http
      .delete(`health-tracker/height/${id}`)
      .then(() => undefined)
      .catch(this.reject);
  }
}
