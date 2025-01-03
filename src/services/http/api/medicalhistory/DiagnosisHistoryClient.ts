import AbstractHttpService from '../../AbstractHttpService';
import { parseToMultipartFormData } from '../../../../model/parsers/common/MultipartFormDataParser';
import { diagnosisItemApiKeys } from '../../../../constants/data/medicalHistory/diagnosis';
import type { Diagnosis, DiagnosisAllApiModel, NewDiagnosis } from '../../../../model/api/medicalHistory/Diagnosis';
import type { PostReturnType } from '../../../../model/api/common/ReturnType';

export class DiagnosisHistoryClient extends AbstractHttpService {
  getDiagnosisHistoryList(): Promise<Diagnosis[]> {
    return this.http
      .get('medical-history/diagnosis/all')
      .then((res) => this.resolve<DiagnosisAllApiModel>(res))
      .then((res) => res.diagnoses.map((elem) => ({ ...elem, diagnosisDate: elem.date })))
      .catch(this.reject);
  }

  postDiagnosisHistory(data: NewDiagnosis): Promise<string> {
    return this.http
      .post(`medical-history/diagnosis`, {
        body: parseToMultipartFormData(data, diagnosisItemApiKeys),
      })
      .then((res) => this.resolve<PostReturnType>(res))
      .then((res) => res.id)
      .catch(this.reject);
  }

  putDiagnosisHistory(id: string, data: Diagnosis): Promise<void> {
    return this.http
      .put(`medical-history/diagnosis/${id}`, {
        body: parseToMultipartFormData(data, diagnosisItemApiKeys),
      })
      .then(() => undefined)
      .catch(this.reject);
  }

  deleteDiagnosisHistory(id: string): Promise<void> {
    return this.http
      .delete(`medical-history/diagnosis/${id}`)
      .then(() => undefined)
      .catch(this.reject);
  }
}
