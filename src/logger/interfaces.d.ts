/* eslint-disable no-unused-vars */
import { Level } from './enum';

export interface ILog {
  method?: string;
  message?: string;
  level?: Level;
  data?: any;
}

export interface ILogRepository {
  info(logEntity: ILog): void;
  error(logEntity: ILog): void;
  warn(logEntity: ILog): void;
  debug(logEntity: ILog): void;
}

export interface ILogData {
  domain?: string;
  provider?: string;
  method: string;
  message: any;
  level: string;
  meta: { [key: string]: any };
  timestamp?: string;
}
