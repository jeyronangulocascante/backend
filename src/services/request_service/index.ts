// istanbul ignore file
// WHY?: Do not test fetching of external resources
/* eslint-disable indent */
import axios, { AxiosStatic, AxiosResponse } from 'axios';
import { IJson } from '@module/types/utils';

/**
 * Internal types
 */

type IBody<T> = T | IJson;
type IHeader<T> = T | IJson;
type IQuery<T> = T | IJson;
type IResponse<T> = T | IJson;
type IAxiosResponse<T> = {
  data: IResponse<T>;
};

interface IConfig {
  headers?: IHeader<any>;
}

export class RequestService<
  BodyType = any,
  ResponseType = any,
  QueryType = any,
  HeaderType = any,
> {
  private axios: AxiosStatic;
  private headers: IHeader<HeaderType> = {};
  private body: IBody<BodyType> = {};
  private defaultHeaders: IJson = {
    'Content-Type': 'application/json',
  };
  private host: string;
  private path: string;
  private queryString: IQuery<QueryType> = {};
  private response?: IAxiosResponse<ResponseType> = null;
  private httpAction: Promise<AxiosResponse<any>>;

  constructor() {
    this.axios = axios;
  }

  setHeaders(
    headers: IHeader<HeaderType>,
  ): RequestService<BodyType, ResponseType, QueryType, HeaderType> {
    this.headers = headers;
    return this;
  }

  setBody(
    body: IBody<BodyType>,
  ): RequestService<BodyType, ResponseType, QueryType, HeaderType> {
    this.body = body;
    return this;
  }

  setHost(
    host: string,
  ): RequestService<BodyType, ResponseType, QueryType, HeaderType> {
    this.host = host;
    return this;
  }

  setPath(
    path: string,
  ): RequestService<BodyType, ResponseType, QueryType, HeaderType> {
    this.path = path;
    return this;
  }

  setQueryString(
    queryString: IQuery<QueryType>,
  ): RequestService<BodyType, ResponseType, QueryType, HeaderType> {
    this.queryString = queryString;
    return this;
  }

  getQueryString(): string {
    return Object.keys(this.queryString)
      .map((key) => `${key}=${this.queryString[key]}`)
      .join('&');
  }

  private getAxios(): AxiosStatic {
    return this.axios;
  }

  private getHeaders(): IHeader<HeaderType> {
    return {
      ...this.defaultHeaders,
      ...this.headers,
    };
  }

  private getBody(): IBody<BodyType> {
    return this.body;
  }

  resetHeaders(): void {
    this.headers = {};
  }

  private getConfig(): IConfig {
    return {
      headers: this.getHeaders(),
    };
  }

  getUri(): string {
    return `${this.host}${this.path}?${this.getQueryString()}`;
  }

  get(): RequestService<BodyType, ResponseType, QueryType, HeaderType> {
    this.httpAction = this.getAxios().get(this.getUri(), this.getConfig());
    return this;
  }

  post(): RequestService<BodyType, ResponseType, QueryType, HeaderType> {
    this.httpAction = this.getAxios().post(
      this.getUri(),
      this.getBody(),
      this.getConfig(),
    );
    return this;
  }

  put(): RequestService<BodyType, ResponseType, QueryType, HeaderType> {
    this.httpAction = this.getAxios().put(
      this.getUri(),
      this.getBody(),
      this.getConfig(),
    );
    return this;
  }

  patch(): RequestService<BodyType, ResponseType, QueryType, HeaderType> {
    this.httpAction = this.getAxios().patch(
      this.getUri(),
      this.getBody(),
      this.getConfig(),
    );
    return this;
  }

  delete(): RequestService<BodyType, ResponseType, QueryType, HeaderType> {
    this.httpAction = this.getAxios().delete(this.getUri(), this.getConfig());
    return this;
  }

  async toJson(): Promise<IResponse<ResponseType>> {
    this.response = await this.httpAction;
    return this.response.data;
  }

  async resolve(): Promise<AxiosResponse> {
    return await this.httpAction;
  }
}

export const getRequestService = <
  BodyType = any,
  ResponseType = any,
  QueryType = any,
  HeaderType = any,
>(): RequestService<BodyType, ResponseType, QueryType, HeaderType> => {
  return new RequestService<BodyType, ResponseType, QueryType, HeaderType>();
};
