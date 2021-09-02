import { ILog, ILogRepository } from '@logger/interfaces';

export const loggerRepositoryStub: ILogRepository = {
  info: (_logEntity: ILog) => {},
  debug: (_logEntity: ILog) => {},
  warn: (_logEntity: ILog) => {},
  error: (_logEntity: ILog) => {},
};
