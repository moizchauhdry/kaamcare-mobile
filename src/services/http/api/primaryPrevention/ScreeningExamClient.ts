import AbstractHttpService from '../../AbstractHttpService';
import type {
  NewScreeningExam,
  ScreeningExam,
  ScreeningExamsApiModel,
} from '../../../../model/api/primaryPrevention/ScreeningExam';
import { parseToMultipartFormData } from '../../../../model/parsers/common/MultipartFormDataParser';
import { screeningExamsItemApiKeys } from '../../../../constants/data/primaryPrevention/screeningExams';
import type { PostReturnType } from '../../../../model/api/common/ReturnType';

export class ScreeningExamClient extends AbstractHttpService {
  getAllScreeningExam(): Promise<ScreeningExam[]> {
    return this.http
      .get('primary-prevention/screening-exams/all')
      .then((res) => this.resolve<ScreeningExamsApiModel>(res))
      .then((res) => res.screeningExams)
      .catch(this.reject);
  }

  getScreeningExam(id: string): Promise<ScreeningExam> {
    return this.http
      .get(`primary-prevention/screening-exams/${id}`)
      .then((res) => this.resolve<ScreeningExam>(res))
      .catch(this.reject);
  }

  postScreeningExam(data: NewScreeningExam): Promise<string> {
    return this.http
      .post('primary-prevention/screening-exams', {
        body: parseToMultipartFormData(data, screeningExamsItemApiKeys),
      })
      .then((res) => this.resolve<PostReturnType>(res))
      .then((res) => res.id)
      .catch(this.reject);
  }

  putScreeningExam(id: string, data: ScreeningExam): Promise<void> {
    return this.http
      .put(`primary-prevention/screening-exams/${id}`, {
        body: parseToMultipartFormData(data, screeningExamsItemApiKeys),
      })
      .then(() => undefined)
      .catch(this.reject);
  }

  deleteScreeningExam(id: string): Promise<void> {
    return this.http
      .delete(`primary-prevention/screening-exams/${id}`)
      .then(() => undefined)
      .catch(this.reject);
  }
}
