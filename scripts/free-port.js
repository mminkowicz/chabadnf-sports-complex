const net = require('net');

const ports = process.argv.slice(2).map(Number).filter(Boolean);

if (ports.length === 0) {
  console.error('Usage: node scripts/free-port.js <port> [port...]');
  process.exit(1);
}

function isPortInUse(port) {
  return new Promise((resolve) => {
    const socket = net.connect({ port, host: '127.0.0.1' });
    socket.once('connect', () => {
      socket.destroy();
      resolve(true);
    });
    socket.once('error', () => resolve(false));
    socket.setTimeout(500, () => {
      socket.destroy();
      resolve(false);
    });
  });
}

function killOnPort(port) {
  const { execFileSync } = require('child_process');

  try {
    const output = execFileSync('lsof', ['-ti', `tcp:${port}`], {
      encoding: 'utf8',
      timeout: 1500,
    }).trim();

    if (!output) {
      return;
    }

    for (const pid of output.split('\n')) {
      if (!pid) {
        continue;
      }

      try {
        process.kill(Number(pid), 'SIGKILL');
        console.log(`Stopped process ${pid} on port ${port}`);
      } catch (error) {
        if (error.code !== 'ESRCH') {
          throw error;
        }
      }
    }
  } catch (error) {
    if (error.status === 1 || error.killed || error.code === 'ETIMEDOUT') {
      return;
    }
    throw error;
  }
}

(async () => {
  for (const port of ports) {
    if (await isPortInUse(port)) {
      killOnPort(port);
    }
  }
})();
