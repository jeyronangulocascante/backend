import 'source-map-support/register';
import { schema } from '@module/types/schemas/schema';
import { LogService } from '@logger/index';
import { middyfy } from '@module/infrastructure/libs/middyfy';
import { getRequestService } from '@services/request_service';
import { ValidatedEventAPIGatewayProxyEvent } from '@module/types/request';
import { formatJSONResponse } from '@module/utils/request';

export const handlerName = 'pokemons';

const pokemons: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event,
  context,
) => {
  const logger = new LogService(context.awsRequestId);
  logger.debug({ method: `Handler.${handlerName}`, data: event });
  const requestService = getRequestService();
  const message = await requestService
    .setHost('https://pokeapi.co')
    .setPath('/api/v2/pokemon')
    .get()
    .toJson();

  return formatJSONResponse({
    message,
    event,
  });
};
export const main = middyfy(pokemons);
