import type { HTTPError } from 'ky';

import type { ErrorResponse } from '../../model/api/common/Error';
import type HttpConnectorService from './HttpConnectorService';

class AbstractHttpService {
  constructor(public http: HttpConnectorService) {}

  resolve = async <T>(response: Response): Promise<T> => (await response.json()) as Promise<T>;

  reject = (error: HTTPError): Promise<never> => {
    // `error.response` will be undefined if server don't response
    // See: https://github.com/sindresorhus/ky/issues/107#issuecomment-471112770
    if (!error.response) {
      return Promise.reject({
        error: 'Communicate error',
        message: 'Can`t communicate with server',
      });
    }

    // `error.response` is instance of Response class
    // See: https://github.com/sindresorhus/ky/issues/107#issuecomment-476048453
    // return error.response.json().then((err: ErrorResponse) => Promise.reject(err));
    return error.response.json().then((err) => Promise.reject(err as ErrorResponse));
  };
}

export default AbstractHttpService;
