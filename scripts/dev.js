import { spawn } from 'node:child_process'

const children = [
  spawn(process.execPath, ['server/dev-api.js'], { stdio: 'inherit' }),
  spawn(process.execPath, ['node_modules/vite/bin/vite.js', ...process.argv.slice(2)], {
    stdio: 'inherit',
  }),
]

let stopping = false

const stopChildren = (exitCode = 0) => {
  if (stopping) return
  stopping = true

  for (const child of children) {
    if (child.exitCode === null) child.kill()
  }

  process.exitCode = exitCode
}

for (const child of children) {
  child.on('error', (error) => {
    console.error('Failed to start development process:', error)
    stopChildren(1)
  })
  child.on('exit', (code, signal) => {
    if (!stopping) stopChildren(code ?? (signal ? 1 : 0))
  })
}

process.on('SIGINT', () => stopChildren(0))
process.on('SIGTERM', () => stopChildren(0))
