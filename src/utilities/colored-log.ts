export const LogColor = {
  Red: '\x1b[31m',
  Green: '\x1b[32m',
  Yellow: '\x1b[33m',
  White: '\x1b[37m'
}

export const coloredLog = {
  log: (msg: any) => console.log(LogColor.White, msg, `\n`),
  error: (msg: any) => console.log(LogColor.Red, msg, `\n`),
  debug: (msg: any) => console.log(LogColor.Green, msg, `\n`),
}