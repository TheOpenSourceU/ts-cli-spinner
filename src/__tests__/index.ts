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

  it('should not start twice', () => {
    const spinner = TextSpinner({ interval: 100 });
    spinner.start();
    spinner.start();
    expect(consoleSpy).toHaveBeenCalledTimes(1);
  });

  it('should not stop if not started', () => {
    const spinner = TextSpinner({ interval: 100 });
    spinner.stop();
    expect(consoleSpy).not.toHaveBeenCalled();
  });

  it('should rotate spinner characters', (done) => {
    const spinner = TextSpinner({ interval: 100 });
    spinner.start();
    setTimeout(() => {
      spinner.stop();
      expect(consoleSpy).toHaveBeenCalledTimes(2);
      done();
    }, 150);
  });
});
