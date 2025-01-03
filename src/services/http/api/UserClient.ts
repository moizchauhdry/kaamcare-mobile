import AbstractHttpService from '../AbstractHttpService';

export class UserClient extends AbstractHttpService {
  deleteAccount(): Promise<void> {
    return this.http
      .delete('users')
      .then(() => undefined)
      .catch(this.reject);
  }

  getIdentity(): Promise<void> {
    return this.http
      .post('Identity')
      .then((res) => this.resolve<void>(res))
      .catch(this.reject);
  }
}
