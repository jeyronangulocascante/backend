import { IJson } from '@module/types/utils';

export class RequestServiceStub {
  path: string;
  headers: IJson;
  body: IJson;
  host: string;
  queryString: string;
  setHeaders(headers) {
    this.headers = headers;
    return this;
  }

  setBody(body: IJson) {
    this.body = body;
    return this;
  }

  setHost(host: string) {
    this.host = host;
    return this;
  }

  setPath(path: string) {
    this.path = path;
    return this;
  }
  setQueryString(queryString: string) {
    this.queryString = queryString;
    return this;
  }
  get() {
    return this;
  }
  post() {
    return this;
  }
  put() {
    return this;
  }
  patch() {
    return this;
  }
  delete() {
    return this;
  }
  async toJson(): Promise<any> {
    return {};
  }
  async resolve(): Promise<any> {
    return {};
  }
}

export const requestService = {
  getRequestService: jest.fn().mockImplementation(() => {
    return new RequestServiceStub();
  }),
};

export const requestServiceFunction = () => requestService;
