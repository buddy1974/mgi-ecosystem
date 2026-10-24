#!/usr/bin/env node
// Deploys exactly the committed HEAD to the isolated STAGING project (mgi-exos-preview) and
// points https://mgi-exos-preview.vercel.app at it. Never production, never a custom domain.
//   node scripts/briefing/deploy-staging.mjs
// - refuses when the working tree has uncommitted changes under apps/ or packages/
// - uploads a `git archive` of HEAD (no untracked or git-ignored files can be uploaded)
// - deploys with the preview target (no --prod) to the hard-coded staging project id
import { execFileSync } from 'node:child_process'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, appendFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const STAGING = { projectId: 'prj_fVvaYLzh68oc8n8iz0PPMVj38eGM', orgId: 'team_EAyech9xnsZIk9ajje9eCKp4', projectName: 'mgi-exos-preview' }
const ALIAS = 'mgi-exos-preview.vercel.app'
const SCOPE = 'buddy1974s-projects'
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..', '..')
const git = (...a) => execFileSync('git', a, { cwd: ROOT }).toString().trim()
const env = { ...process.env, MSYS_NO_PATHCONV: '1' }

const dirty = git('status', '--porcelain', '--', 'apps', 'packages')
if (dirty) { console.error(`REFUSED — uncommitted changes:\n${dirty}`); process.exit(1) }
const commit = git('rev-parse', 'HEAD')
const branch = git('rev-parse', '--abbrev-ref', 'HEAD')
const dir = mkdtempSync(join(tmpdir(), 'stg-deploy-'))
try {
  execFileSync('sh', ['-c', `git archive HEAD | tar -x -C "${dir.replace(/\\/g, '/')}"`], { cwd: ROOT, env })
  mkdirSync(join(dir, '.vercel'))
  writeFileSync(join(dir, '.vercel', 'project.json'), JSON.stringify(STAGING))
  console.log(`Deploying ${branch} @ ${commit.slice(0, 7)} to ${STAGING.projectName} (preview)…`)
  const out = execFileSync('npx', ['vercel', 'deploy', '--yes', '--scope', SCOPE, '--meta', `gitCommitSha=${commit}`, '--meta', `gitBranch=${branch}`], { cwd: dir, env, shell: true, stdio: ['ignore', 'pipe', 'inherit'] }).toString()
  const url = out.match(/https:\/\/mgi-exos-preview-[a-z0-9]+-buddy1974s-projects\.vercel\.app/)?.[0]
  if (!url) { console.error('No deployment URL in the CLI output'); process.exit(1) }
  execFileSync('npx', ['vercel', 'alias', 'set', url, ALIAS, '--scope', SCOPE], { env, shell: true, stdio: ['ignore', 'ignore', 'inherit'] })
  const line = `${new Date().toISOString()} ${commit} ${url} -> https://${ALIAS}\n`
  appendFileSync(join(ROOT, '.briefing-local', 'staging', 'deployments.log'), line)
  console.log(`READY ${url}\nAliased https://${ALIAS} → ${url}`)
} finally {
  rmSync(dir, { recursive: true, force: true })
}
