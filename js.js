#!/usr/bin/env node
if (!process.argv[2]) return;

let input = '';
for (const item of process.argv.slice(2)) {
  if (item[0] !== '-' || item[1] !== '-') input += item;
  // its a switch
}

if (input[0] === '{') input = `(${input})`;

if (process.stdin.isTTY) {
  run('');
} else {
  let stdin = '';
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', (chunk) => {
    stdin += chunk;
  });
  process.stdin.on('end', () => {
    try {
      run(JSON.parse(stdin));
    } catch (err) {
      run(stdin.trimRight());
    }
  });
  process.stdin.resume();
}

function stdout(data) {
  process.stdout.write(typeof data === 'string' ? data :
    process.stdout.isTTY ?
      require('util').inspect(data, { colors: true }) :
      String(JSON.stringify(data)));
}

function run(stdin) { // eslint-disable-line no-unused-vars
  const ret = eval(input);
  if (!input.includes('stdout')) stdout(ret);
}
