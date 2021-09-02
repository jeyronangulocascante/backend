import {
  createLogger,
  format,
  Logger,
  LoggerOptions,
  transports,
} from 'winston';
import { Level } from './enum';
import { ILog, ILogData, ILogRepository } from './interfaces.d';

export class LogService implements ILogRepository {
  private readonly logger: Logger;

  // eslint-disable-next-line no-unused-vars
  constructor(private readonly requestId: string) {
    this.logger = this.create();
  }

  info(logEntity: ILog): void {
    this.logger.log({
      method: logEntity.method,
      level: Level.info,
      message: String(logEntity.message),
      meta: logEntity.data,
    });
  }

  error(logEntity: ILog): void {
    this.logger.log({
      method: logEntity.method,
      level: Level.error,
      message: String(logEntity.message),
      meta: logEntity.data,
    });
  }

  warn(logEntity: ILog): void {
    this.logger.log({
      method: logEntity.method,
      message: String(logEntity.message),
      level: Level.warn,
      meta: logEntity.data,
    });
  }

  debug(logEntity: ILog): void {
    this.logger.log({
      method: logEntity.method,
      message: String(logEntity.message),
      level: Level.debug,
      meta: logEntity.data,
    });
  }

  getCreateOptions(): LoggerOptions {
    return {
      level: Level.silly,
      format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.printf((info: ILogData) => this.transformData(info)),
      ),
      transports: [new transports.Console()],
    };
  }

  create(): Logger {
    const config: LoggerOptions = this.getCreateOptions();

    return createLogger(config);
  }

  transformData(info: ILogData): string {
    return `APP RequestId: ${this.requestId} ${
      info.method ? `- Method: ${info.method}` : ''
    } [${info.level}] ${info.message ? info.message : ''} ${
      info.meta ? `data: ${JSON.stringify(info.meta)}` : ''
    }`;
  }
}
