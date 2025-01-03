import AbstractHttpService from '../../AbstractHttpService';
import type {
  FamilyHistoryApiDiagnosisType,
  FamilyHistoryResponseModel,
  FamilyMemberDiagnosisModel,
  FamilyMemberModel,
  FamilyMemberResponseModel,
  FamilyMembersModel,
  NewFamilyMember,
} from '../../../../model/api/medicalHistory/FamilyHistory';
import { parseToMultipartFormData } from '../../../../model/parsers/common/MultipartFormDataParser';
import { familyHistoryItemApiKeys } from '../../../../constants/data/medicalHistory/familyHistory';
import { diagnosisItemApiKeys } from '../../../../constants/data/medicalHistory/diagnosis';
import { dentalHistoryItemApiKeys } from '../../../../constants/data/medicalHistory/dentalHistory';
import { hearingHistoryItemApiKeys } from '../../../../constants/data/medicalHistory/hearingHistory';
import { visionHistoryItemApiKeys } from '../../../../constants/data/medicalHistory/visionHistory';
import type { PostReturnType } from '../../../../model/api/common/ReturnType';

const secondaryApiKeys = {
  StandardDiagnosis: diagnosisItemApiKeys,
  DentalDiagnosis: dentalHistoryItemApiKeys,
  HearingDiagnosis: hearingHistoryItemApiKeys,
  VisionDiagnosis: visionHistoryItemApiKeys,
};

export class FamilyHistoryClient extends AbstractHttpService {
  getFamilyMembers(): Promise<FamilyMembersModel> {
    return this.http
      .get('medical-history/family-member/all')
      .then((res) => this.resolve<FamilyMemberResponseModel>(res))
      .then((res) => res.familyMembers)
      .catch(this.reject);
  }

  getFamilyHistory(): Promise<FamilyMemberDiagnosisModel[]> {
    return this.http
      .get('medical-history/family-history/all')
      .then((res) => this.resolve<FamilyHistoryResponseModel>(res))
      .then((res) => res.familyHistory)
      .catch(this.reject);
  }

  postFamilyMember(data: NewFamilyMember): Promise<void> {
    return this.http
      .post('medical-history/family-member', {
        json: data,
      })
      .then(() => undefined)
      .catch(this.reject);
  }

  postFamilyMemberDiagnosis(data: any): Promise<string> {
    return this.http
      .post('medical-history/family-history', {
        body: parseToMultipartFormData(
          data,
          familyHistoryItemApiKeys,
          secondaryApiKeys[data.formType as FamilyHistoryApiDiagnosisType],
        ),
      })
      .then((res) => this.resolve<PostReturnType>(res))
      .then((res) => res.id)
      .catch(this.reject);
  }

  putFamilyMember(id: string, data: FamilyMemberModel): Promise<void> {
    return this.http
      .put(`medical-history/family-member/${id}`, {
        json: data,
      })
      .then(() => undefined)
      .catch(this.reject);
  }

  putFamilyMemberDiagnosis(id: string, data: any): Promise<void> {
    return this.http
      .put(`medical-history/family-history/${id}`, {
        body: parseToMultipartFormData(
          data,
          familyHistoryItemApiKeys,
          secondaryApiKeys[data.formType as FamilyHistoryApiDiagnosisType],
        ),
      })
      .then(() => undefined)
      .catch(this.reject);
  }

  deleteFamilyMemberDiagnosis(id: string): Promise<void> {
    return this.http
      .delete(`medical-history/family-history/${id}`)
      .then(() => undefined)
      .catch(this.reject);
  }

  deleteFamilyMember(id: string): Promise<void> {
    return this.http
      .delete(`medical-history/family-member/${id}`)
      .then(() => undefined)
      .catch(this.reject);
  }
}
