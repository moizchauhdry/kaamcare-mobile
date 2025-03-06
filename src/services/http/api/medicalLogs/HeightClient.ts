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
    console.log('🔵 [API Request] GET /health-tracker/height/', { id });
    return this.http
      .get(`health-tracker/height/${id}`)
      .then((res) => this.resolve<HeightLog>(res))
      .then((res) => {
        console.log('✅ [API Response] GET /health-tracker/height/', { id, data: res });
        return res;
      })
      .catch((error) => {
        console.log('❌ [API Error] GET /health-tracker/height/', { id, error });
        return this.reject(error);
      });
  }

  getHeightAll(): Promise<HeightLogs> {
    console.log('🔵 [API Request] GET /health-tracker/height/all');
    return this.http
      .get('health-tracker/height/all')
      .then((res) => this.resolve<HeightLogsApiListAll>(res))
      .then((res) => {
        const sortedData = sortByDate(res.heights, 'date');
        console.log('✅ [API Response] GET /health-tracker/height/all:', {
          count: sortedData.length,
          data: sortedData,
        });
        return sortedData;
      })
      .catch((error) => {
        console.log('❌ [API Error] GET /health-tracker/height/all:', error);
        return this.reject(error);
      });
  }

  getHeightFragment({ startDate, endDate }: DateFilterModel, signal: AbortSignal): Promise<HeightLogs> {
    console.log('🔵 [API Request] GET /health-tracker/height', { startDate, endDate });
    return this.http
      .get('health-tracker/height', {
        searchParams: {
          ...startDate,
          ...endDate,
        },
        signal,
      })
      .then((res) => this.resolve<HeightLogsApiList>(res))
      .then((res) => {
        const sortedData = sortByDate(res.height, 'date');
        console.log('✅ [API Response] GET /health-tracker/height:', {
          count: sortedData.length,
          data: sortedData,
          params: { startDate, endDate },
        });
        return sortedData;
      })
      .catch((error) => {
        console.log('❌ [API Error] GET /health-tracker/height:', {
          params: { startDate, endDate },
          error,
        });
        return this.reject(error);
      });
  }

  postHeight(data: NewHeightLog): Promise<string> {
    console.log('🔵 [API Request] POST /health-tracker/height', {
      payload: data,
    });
    return this.http
      .post('health-tracker/height', {
        json: data,
      })
      .then((res) => this.resolve<PostReturnType>(res))
      .then((res) => {
        console.log('✅ [API Response] POST /health-tracker/height:', {
          id: res.id,
          data: res,
        });
        return res.id;
      })
      .catch((error) => {
        console.log('❌ [API Error] POST /health-tracker/height:', {
          payload: data,
          error,
        });
        return this.reject(error);
      });
  }

  putHeight(data: HeightLog): Promise<void> {
    console.log('🔵 [API Request] PUT /health-tracker/height/:id', {
      id: data.id,
      payload: data,
    });
    return this.http
      .put(`health-tracker/height/${data.id}`, {
        json: data,
      })
      .then(() => {
        console.log('✅ [API Response] PUT /health-tracker/height/:id', {
          id: data.id,
        });
        return undefined;
      })
      .catch((error) => {
        console.log('❌ [API Error] PUT /health-tracker/height/:id', {
          id: data.id,
          payload: data,
          error,
        });
        return this.reject(error);
      });
  }

  deleteHeight(id: string): Promise<void> {
    console.log('🔵 [API Request] DELETE /health-tracker/height/', { id });
    return this.http
      .delete(`health-tracker/height/${id}`)
      .then(() => {
        console.log('✅ [API Response] DELETE /health-tracker/height/', { id });
        return undefined;
      })
      .catch((error) => {
        console.log('❌ [API Error] DELETE /health-tracker/height/', { id, error });
        return this.reject(error);
      });
  }
}
