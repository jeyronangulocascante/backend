import { logServiceStubFunction } from '@tests/unit/stubs/logServiceStub';
import { awsEventStub } from '@tests/unit/stubs/infrastructure/awsEventStub';
import { middyfyStubFunction } from '@tests/unit/stubs/infrastructure/middyfyStub';
import { contextRequestStub } from '@tests/unit/stubs/infrastructure/contextRequestStub';
import { callbackStub } from '@tests/unit/stubs/infrastructure/callbackStub';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const requestService = require('../../../../stubs/services/requestServiceStub');

let getFnMocked;
const requestServiceMock = new requestService.RequestServiceStub();
const moduleRequestServiceStub = jest.fn().mockImplementation(() => {
  return {
    getRequestService: () => requestServiceMock,
  };
});

const pokemonsResult = {
  count: 1118,
  next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
  previous: null,
  results: [
    {
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
    },
    {
      name: 'ivysaur',
      url: 'https://pokeapi.co/api/v2/pokemon/2/',
    },
    {
      name: 'venusaur',
      url: 'https://pokeapi.co/api/v2/pokemon/3/',
    },
    {
      name: 'charmander',
      url: 'https://pokeapi.co/api/v2/pokemon/4/',
    },
    {
      name: 'charmeleon',
      url: 'https://pokeapi.co/api/v2/pokemon/5/',
    },
    {
      name: 'charizard',
      url: 'https://pokeapi.co/api/v2/pokemon/6/',
    },
    {
      name: 'squirtle',
      url: 'https://pokeapi.co/api/v2/pokemon/7/',
    },
    {
      name: 'wartortle',
      url: 'https://pokeapi.co/api/v2/pokemon/8/',
    },
    {
      name: 'blastoise',
      url: 'https://pokeapi.co/api/v2/pokemon/9/',
    },
    {
      name: 'caterpie',
      url: 'https://pokeapi.co/api/v2/pokemon/10/',
    },
    {
      name: 'metapod',
      url: 'https://pokeapi.co/api/v2/pokemon/11/',
    },
    {
      name: 'butterfree',
      url: 'https://pokeapi.co/api/v2/pokemon/12/',
    },
    {
      name: 'weedle',
      url: 'https://pokeapi.co/api/v2/pokemon/13/',
    },
    {
      name: 'kakuna',
      url: 'https://pokeapi.co/api/v2/pokemon/14/',
    },
    {
      name: 'beedrill',
      url: 'https://pokeapi.co/api/v2/pokemon/15/',
    },
    {
      name: 'pidgey',
      url: 'https://pokeapi.co/api/v2/pokemon/16/',
    },
    {
      name: 'pidgeotto',
      url: 'https://pokeapi.co/api/v2/pokemon/17/',
    },
    {
      name: 'pidgeot',
      url: 'https://pokeapi.co/api/v2/pokemon/18/',
    },
    {
      name: 'rattata',
      url: 'https://pokeapi.co/api/v2/pokemon/19/',
    },
    {
      name: 'raticate',
      url: 'https://pokeapi.co/api/v2/pokemon/20/',
    },
  ],
};

describe('Hello', () => {
  beforeEach(() => {
    jest.mock('@logger/index', logServiceStubFunction);
    jest.mock('@module/infrastructure/libs/middyfy', middyfyStubFunction);
    jest.mock('@services/request_service/index', moduleRequestServiceStub);
  });
  afterEach(() => {
    getFnMocked.mockReset();
  });

  it('should call the main function successfully.', async () => {
    getFnMocked = jest
      .spyOn(requestServiceMock, 'toJson')
      .mockImplementation(
        () => new Promise((resolve) => resolve(pokemonsResult)),
      );
    const main = (
      await import('@module/infrastructure/functions/get_pokemons/handler')
    ).main;
    const result = await main(
      { ...awsEventStub, method: 'GET', body: {} },
      contextRequestStub,
      callbackStub,
    );

    expect(getFnMocked).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
  });
});
