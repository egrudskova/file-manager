export const NWD_COMMANDS = {
  up: 'up',
  cd: 'cd',
  ls: 'ls',
}

export const FS_COMMANDS = {
  cat: 'cat',
  add: 'add',
  rn: 'rn',
  cp: 'cp',
  mv: 'mv',
  rm: 'rm',
}

export const ZIP_COMMANDS = {
  compress: 'compress',
  decompress: 'decompress'
}

export const OS_COMMANDS = {
  EOL: '--EOL',
  CPUs: '--cpus',
  homedir: '--homedir',
  username: '--username',
  architecture: '--architecture'
}

export const CLI_COMMANDS = {
  ...NWD_COMMANDS,
  ...FS_COMMANDS,
  ...ZIP_COMMANDS,
  os: 'os',
  hash: 'hash',
  exit: '.exit'
}

