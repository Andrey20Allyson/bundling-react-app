const { exec } = require('child_process');

const controller = new AbortController();

/**@param {string} command */
function createChild(command) {
  const child = exec(command, {
    signal: controller.signal,
    env: process.env,
  });

  child.on('error', (error) => {
    controller.abort(error);
    throw error;
  });

  child.on('exit', (code) => {
    process.exit(code);
  });

  return child;
}

const COMPILER_COMMAND = 'tsc --watch';
const BUNDLER_COMMAND = 'webpack --mode development';
const SERVER_COMMAND = 'live-server public'

const compilerProcess = createChild(COMPILER_COMMAND);
const bundlerProcess = createChild(BUNDLER_COMMAND);
const serverProcess = createChild(SERVER_COMMAND);