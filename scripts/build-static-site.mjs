import { cp, mkdir, rm } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawn } from 'node:child_process'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const defaultSource = path.join(repoRoot, '.source', 'RebootSoftware')
const siblingSource = path.resolve(repoRoot, '..', 'RebootSoftware')
const sourceRoot = path.resolve(
  process.env.REBOOT_SOFTWARE_DIR ?? defaultSource,
)
const fallbackSourceRoot = siblingSource
const dashboardRoot = path.join(sourceRoot, 'RebootDashboard')
const fallbackDashboardRoot = path.join(fallbackSourceRoot, 'RebootDashboard')
const outputDir = path.join(repoRoot, 'dist')
const viteBase = process.env.REBOOT_SITE_BASE ?? './'
const publishTarget = process.env.REBOOT_PUBLISH_TARGET ?? 'dashboard'

async function pathExists(target) {
  try {
    await mkdir(target, { recursive: false })
    await rm(target, { recursive: true, force: true })
    return false
  } catch (error) {
    return error?.code === 'EEXIST'
  }
}

function run(command, args, cwd, env = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      env: { ...process.env, ...env },
      stdio: 'inherit',
    })

    child.on('exit', (code) => {
      if (code === 0) {
        resolve()
        return
      }

      reject(new Error(`${command} ${args.join(' ')} failed with exit code ${code}`))
    })
  })
}

async function resolveDashboardRoot() {
  if (await pathExists(dashboardRoot)) {
    return dashboardRoot
  }

  if (!process.env.REBOOT_SOFTWARE_DIR && await pathExists(fallbackDashboardRoot)) {
    return fallbackDashboardRoot
  }

  throw new Error(
    `Missing RebootDashboard. Set REBOOT_SOFTWARE_DIR or checkout RebootSoftware into ${defaultSource}.`,
  )
}

async function resolveSourceRoot() {
  if (await pathExists(sourceRoot)) {
    return sourceRoot
  }

  if (!process.env.REBOOT_SOFTWARE_DIR && await pathExists(fallbackSourceRoot)) {
    return fallbackSourceRoot
  }

  throw new Error(
    `Missing RebootSoftware. Set REBOOT_SOFTWARE_DIR or checkout RebootSoftware into ${defaultSource}.`,
  )
}

async function publishDashboard() {
  const resolvedDashboardRoot = await resolveDashboardRoot()
  const dashboardDist = path.join(resolvedDashboardRoot, 'dist')

  await run('npm', ['install'], resolvedDashboardRoot)
  await run('npm', ['run', 'build', '--', `--base=${viteBase}`], resolvedDashboardRoot, {
    REBOOT_STATIC_SITE: 'true',
  })

  await rm(outputDir, { recursive: true, force: true })
  await cp(dashboardDist, outputDir, { recursive: true })

  console.log(`Built static dashboard from ${resolvedDashboardRoot}`)
  console.log(`Wrote ${outputDir}`)
}

async function publishRebootSiteV6() {
  const resolvedSourceRoot = await resolveSourceRoot()
  const rebootSiteV6Root = path.join(resolvedSourceRoot, 'RebootSiteV6')

  if (!await pathExists(rebootSiteV6Root)) {
    throw new Error(`Missing RebootSiteV6 at ${rebootSiteV6Root}`)
  }

  await rm(outputDir, { recursive: true, force: true })
  await cp(rebootSiteV6Root, outputDir, {
    recursive: true,
    filter: (source) => !source.split(path.sep).includes('.vs'),
  })

  console.log(`Published RebootSiteV6 from ${rebootSiteV6Root}`)
  console.log(`Wrote ${outputDir}`)
}

if (publishTarget === 'dashboard') {
  await publishDashboard()
} else if (publishTarget === 'v6') {
  await publishRebootSiteV6()
} else {
  throw new Error(`Unknown REBOOT_PUBLISH_TARGET "${publishTarget}". Use "dashboard" or "v6".`)
}
