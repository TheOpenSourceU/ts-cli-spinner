
type TextSpinnerOptionsType = {
  interval: number;
};

const TextSpinner = function (options: TextSpinnerOptionsType) {
  const interval = options.interval || 100;
  const prefix = "";
  const postfix = '\x1B[0G';
  const spinner  = [ '|', '/', '-', '\\' ];

  let spinIdx = 0;
  let active = false;
  let autoInterval: NodeJS.Timeout;

  function clean() {
    process.stdout.write('\x1B[0G\x1B[2K');
  }
  function print(s:string) {
    process.stdout.write(prefix + s + postfix);
  }
  function rotate(idx?: number) {
    clean();
    if (idx) {
      spinIdx = idx;
    } else {
      spinIdx++;
    }
    spinIdx %= spinner.length;
    render();
  }
  function render() {
    //Was _print
    print(spinner[ spinIdx ]);
  }
  function start() {
    if(active) return;
    active = true;
    autoInterval = setInterval(() => {
      rotate();
    }, interval);
  }
  function stop() {
    if(!active) return;
    active = false;
    clearInterval(autoInterval);
    render();
  }

  return {start, stop};
}

export default TextSpinner;
