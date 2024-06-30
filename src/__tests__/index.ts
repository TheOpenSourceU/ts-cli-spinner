import TextSpinner from '../index';

describe('TextSpinner', () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleSpy = jest.spyOn(process.stdout, 'write').mockImplementation();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('should start and stop without errors', () => {
    const spinner = TextSpinner({ interval: 100 });
    spinner.start();
    spinner.stop();
    expect(consoleSpy).toHaveBeenCalled();
  });

  it.skip('should not start twice', () => {
    const spinner = TextSpinner({ interval: 100 });
    const m = jest.spyOn(spinner, 'start');
    spinner.start();
    spinner.start();
    expect(m).toHaveBeenCalledTimes(2);
  });

  it('should not stop if not started', () => {
    const spinner = TextSpinner({ interval: 100 });
    spinner.stop();
    expect(consoleSpy).not.toHaveBeenCalled();
  });

  it('should rotate spinner characters', () => {
    jest.useFakeTimers()

    const spinner = TextSpinner({ interval: 100 });
    spinner.start();

    // Advance timers by 150ms
    jest.advanceTimersByTime(150);

    spinner.stop();

    expect(consoleSpy).toHaveBeenCalledTimes(3);
  });
});
