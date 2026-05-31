const { execFileSync } = require('child_process');

const ports = process.argv.slice(2);

if (ports.length === 0) {
  console.error('Usage: node scripts/free-port.js <port> [port...]');
  process.exit(1);
}

for (const port of ports) {
  let output = '';

  try {
    output = execFileSync('lsof', ['-ti', `tcp:${port}`], {
      encoding: 'utf8',
      timeout: 2000,
    }).trim();
  } catch (error) {
    if (error.status === 1 || error.killed || error.code === 'ETIMEDOUT') {
      continue;
    }

    throw error;
  }

  if (!output) {
    continue;
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
}
