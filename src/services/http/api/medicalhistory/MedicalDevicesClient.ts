import AbstractHttpService from '../../AbstractHttpService';
import { parseToMultipartFormData } from '../../../../model/parsers/common/MultipartFormDataParser';
import type {
  MedicalDevice,
  MedicalDevicesAllApiModel,
  NewMedicalDevice,
} from '../../../../model/api/medicalHistory/MedicalDevices';
import { medicalDeviceItemApiKeys } from '../../../../constants/data/medicalHistory/medicalDevices';
import type { PostReturnType } from '../../../../model/api/common/ReturnType';

export class MedicalDevicesClient extends AbstractHttpService {
  getMedicalDevicesList(): Promise<MedicalDevicesAllApiModel> {
    return this.http
      .get('medical-history/medical-devices')
      .then((res) => this.resolve<MedicalDevicesAllApiModel>(res))
      .catch(this.reject);
  }

  postMedicalDevices(data: NewMedicalDevice): Promise<string> {
    return this.http
      .post(`medical-history/medical-devices`, {
        body: parseToMultipartFormData(data, medicalDeviceItemApiKeys),
      })
      .then((res) => this.resolve<PostReturnType>(res))
      .then((res) => res.id)
      .catch(this.reject);
  }

  putMedicalDevices(id: string, data: MedicalDevice): Promise<void> {
    return this.http
      .post(`medical-history/medical-devices/${id}`, {
        body: parseToMultipartFormData(data, medicalDeviceItemApiKeys),
      })
      .then(() => undefined)
      .catch(this.reject);
  }

  deleteMedicalDevices(id: string): Promise<void> {
    return this.http
      .delete(`medical-history/medical-devices/${id}`)
      .then(() => undefined)
      .catch(this.reject);
  }
}
