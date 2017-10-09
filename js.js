#!/usr/bin/env node
if (!process.argv[2]) return;

const ttyin = Boolean(process.stdin.isTTY);
const ttyout = Boolean(process.stdout.isTTY);

let input = '';
for (const item of process.argv.slice(2)) {
  if (item[0] !== '-' || item[1] !== '-') input += item;
  // its a switch
}
if (input[0] === '-' && input[1] === 'v' && input.length === 2) {
  stdout(`${require('./package.json').version}\n`);
  return;
}
if (input[0] === '{') input = `(${input})`;

if (ttyin) {
  run('');
  if (ttyout) stdout('\n');
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
    if (ttyout) stdout('\n');
  });
  process.stdin.resume();
}

function stdout(data) {
  process.stdout.write(typeof data === 'string' ? data :
    ttyout ?
      require('util').inspect(data, { colors: true }) :
      String(JSON.stringify(data)));
}

function run(stdin) { // eslint-disable-line no-unused-vars
  const ret = eval(input);
  if (!input.includes('stdout')) stdout(ret);
}
