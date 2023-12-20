import { spawn, fork } from "child_process"

const prepareLog = pid => (msg: string) => console.log(`pid: [${process.pid}] - ${msg}`);
const INSTANCES = 3

function spinUpInstance() {
  const cp = fork(`./index`)
  const log = prepareLog(cp.pid)
  log(`Starting...`)

  cp.on('exit', (code) => {
    // 0 finished with success
    // 1 finished with error
    log(`exited with code [${code}]`)
    if (code === 0) {
      return
    }
    spinUpInstance()
  })
}

for (let i = 0; i < INSTANCES; i ++) {
  spinUpInstance()
}