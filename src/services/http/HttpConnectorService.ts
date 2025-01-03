import ky from 'ky';
import type { Options, ResponsePromise, Input } from 'ky';

class HttpConnectorService {
  instance: typeof ky;

  headers: Record<never, never> = {};

  constructor(options: Options) {
    if (options.headers) {
      this.headers = options.headers;
    }

    this.instance = ky.create(options);
  }

  get(url: Input, options?: Options): ResponsePromise {
    return this.instance.get(url, options);
  }

  post(url: Input, options?: Options): ResponsePromise {
    return this.instance.post(url, options);
  }

  put(url: Input, options?: Options): ResponsePromise {
    return this.instance.put(url, options);
  }

  delete(url: Input, options?: Options): ResponsePromise {
    return this.instance.delete(url, options);
  }

  patch(url: Input, options?: Options): ResponsePromise {
    return this.instance.patch(url, options);
  }

  head(url: Input, options?: Options): ResponsePromise {
    return this.instance.head(url, options);
  }

  extend(options: Options): void {
    this.instance = this.instance.extend(options);
  }

  addHeader(name: string, value: string): void {
    this.headers = {
      ...this.headers,
      [name]: value,
    };

    this.extend({
      headers: this.headers,
    });
  }

  removeHeader(name: string): void {
    this.headers = {
      ...this.headers,
      [name]: undefined,
    };

    this.extend({
      headers: this.headers,
    });
  }
}

export default HttpConnectorService;
