import 'source-map-support/register';
import { schema } from '@module/types/schemas/schema';
import { LogService } from '@logger/index';
import { middyfy } from '@module/infrastructure/libs/middyfy';
import { ModuleController } from '@module/module.controller';
import { ValidatedEventAPIGatewayProxyEvent } from '@module/types/request';
import { formatJSONResponse } from '@module/utils/request';

export const handlerName = 'hello';

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event,
  context,
) => {
  const logger = new LogService(context.awsRequestId);
  logger.debug({ method: `Handler.${handlerName}`, data: event });
  const ctrl = new ModuleController(logger);
  const message = await ctrl.getHello(event.body);
  return formatJSONResponse({
    message,
    event,
  });
};
export const main = middyfy(hello);
