// App-specific test-environment configuration — MGI Executive OS.
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"

export const APP_DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "..")
export const TEST_ENV_FILE = join(APP_DIR, ".env.test.local")        // git-ignored (.env*.local)
export const ALLOWLIST_FILE = join(APP_DIR, ".test-db-allowlist")    // git-ignored (see .gitignore)

/** Must be set and verified. */
export const REQUIRED_DB_VARS = ["DATABASE_URL"]
/** Verified when non-empty (the NMI bridge must point at the NMI *test* branch). */
export const OPTIONAL_DB_VARS = ["DATABASE_URL_UNPOOLED", "NMI_DATABASE_URL"]

/** Outbound integrations and legacy credentials that must be blank during tests. */
export const FORBIDDEN_VARS = [
  "TELEGRAM_BOT_TOKEN", "OPERATIONS_CHAT_ID", "TELEGRAM_CHAT_ID",
  "N8N_SECRET", "N8N_BASE_URL",
  "EMAIL_SERVER", "RESEND_API_KEY",
  "OPENAI_API_KEY",
  "CF_ACCESS_CLIENT_ID", "CF_ACCESS_CLIENT_SECRET",
  "PAYUNIT_API_KEY", "PAYUNIT_API_USER", "PAYUNIT_API_PASSWORD",
  "CALLMEBOT_PHONE", "CALLMEBOT_API_KEY",
  "OS_PASSWORD",
]
/** Allowed only with TEST_ALLOW_AI=1 and a separate low-limit test key (decision D5). */
export const AI_VARS = ["ANTHROPIC_API_KEY"]
export const AI_HOSTS = ["api.anthropic.com"]
