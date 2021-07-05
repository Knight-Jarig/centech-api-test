import logging from './logging.utils';

describe('logging utils', () => {
  const message = '1';
  const component = '1';
  const data = [];

  it('info function should run properly', async () => {
    jest.spyOn(console, 'log').mockReturnValue(Promise.resolve([]) as any);
    logging.info(message, component, data);
    expect(console.log).toBeCalled();
  });

  it('warn function should run properly', async () => {
    jest.spyOn(console, 'log').mockReturnValue(Promise.resolve([]) as any);
    logging.warn(message, component, data);
    expect(console.log).toBeCalled();
  });

  it('error function should run properly', async () => {
    jest.spyOn(console, 'log').mockReturnValue(Promise.resolve([]) as any);
    logging.error(message, component, data);
    expect(console.log).toBeCalled();
  });

  it('debug function should run properly', async () => {
    jest.spyOn(console, 'log').mockReturnValue(Promise.resolve([]) as any);
    logging.debug(message, component, data);
    expect(console.log).toBeCalled();
  });

  it('trace function should run properly', async () => {
    jest.spyOn(console, 'log').mockReturnValue(Promise.resolve([]) as any);
    logging.trace(message, component, data);
    expect(console.log).toBeCalled();
  });
});
