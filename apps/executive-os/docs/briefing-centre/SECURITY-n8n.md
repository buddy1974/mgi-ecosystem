# n8n security findings and remediation — 24 October 2026

Scope: the production n8n behind `n8n.maxpromo.digital` (Docker container `n8n` on Marcel's
machine, **v2.9.4**). Inspected read-only (`n8n export:workflow`, read-only SQLite queries). No
production workflow, credential or setting was changed. No secret value is reproduced here.

## 1. "MGI — New Approval Alert" (`oLXVXlcLpslPDj4b`, active)

| Finding | Exposure | Impact |
|---|---|---|
| Resend API key written into the HTTP node's `Authorization` header (not a credential) | Stored unencrypted in the workflow JSON: visible to every n8n editor, in workflow exports and backups (`database.sqlite*`, incl. `owner-password-reset-2026-10-14.bak`), and it appeared in a local assistant transcript on 24 Oct | Anyone holding it can send e-mail through the Resend account (quota, sender reputation) |
| Webhook `mgi-approval-alert` has no authentication | Anyone on the internet can POST to it (verified 24 Oct with a harmless GET: `/webhook/*` is answered by n8n publicly, while `/api/*` redirects to Cloudflare Access) | Sends an e-mail "from MGI Executive OS" to the owner's Gmail with an **attacker-chosen title and button link**, values not HTML-escaped → phishing aimed at the owner |
| OS sent the shared secret as `?key=` in the URL | Query strings land in proxy / n8n access logs | Secret leakage (fixed in the OS, see §3) |
| The invite flow (`/api/users/invite`) uses this workflow, whose recipient is fixed | Invitations go to the owner, never to the invitee | Functional bug (not security); fix when e-mail is redesigned |

Operational impact of securing it: **none observed.** Production Vercel has no `N8N_SECRET`, so
the OS never calls the webhook, and the n8n execution log (retained since 13 Oct, 10 069
executions) holds **zero** executions of this workflow — no abuse observed in that window.

## 2. Instance-wide scan (counts only)

105 workflows scanned for hard-coded keys and open webhooks. **9 active** workflows have
findings; most belong to other clients on the same instance:

| Active workflow | Finding |
|---|---|
| MGI — New Approval Alert | Resend key inline; open webhook |
| maxpromo-content-publishing, maxpromo-comments-sm, maxpromo-content-generator | OpenAI + Anthropic keys inline |
| Concord — Comment Engagement | OpenAI + Anthropic keys inline |
| Concord — Telegram Poller | Telegram bot token inline |
| DRIMP-Daily-AutoPost | OpenAI key + 2 bearer tokens inline |
| Envico Escalation Handler | open webhook |
| MCP Bridge — ai-trigger | open webhook |

22 inactive workflows also contain inline keys (old copies). Recommendation: move every key to
n8n credentials, rotate keys that were inline, delete superseded inactive copies, and add
header auth to every webhook that is not intentionally public. These are outside the MGI
mission and were not changed.

## 3. Remediation prepared (MGI)

* **OS** (`src/lib/n8n.ts`, this branch): the secret is sent in the `x-n8n-key` header, never in
  the URL.
* **Secured workflow** `n8n-security/mgi-approval-alert.secured.json` (4 nodes): webhook with
  *Header Auth* credential (`x-n8n-key`) → Code node (HTML-escapes all fields, 200-char limit,
  link must be `https://os.mgi-ventures.com/…` else replaced) → Resend via *Header Auth*
  credential → `202`. Recipient left as `REPLACE-WITH-RECIPIENT`.
* **Verified** in throwaway n8n 2.9.4 and 2.4.8 containers (`scripts/briefing/n8n-verify-approval.mjs`):
  no key → 403, wrong key → 403, correct key → accepted, `<img onerror>` escaped, foreign link
  replaced. The test copy sends to a dead loopback address, so no e-mail was sent.

## 4. Procedure for Marcel (needs your Resend and n8n accounts)

1. **Resend** → API Keys → revoke the existing key used by "MGI — New Approval Alert"; create a
   new key restricted to *Sending access* for the sending domain.
2. **n8n** → Credentials → new *Header Auth* "Resend API key (Authorization: Bearer …)":
   name `Authorization`, value `Bearer <new key>`.
3. **n8n** → Credentials → new *Header Auth* "MGI OS → n8n webhook key (x-n8n-key)": name
   `x-n8n-key`, value = a new secret (`openssl rand -base64 32`).
4. **n8n** → deactivate "MGI — New Approval Alert" (no impact, see §1), import
   `mgi-approval-alert.secured.json`, select the two credentials, set the recipient, activate.
5. Only when approval e-mails are wanted: Vercel `mgi-ecosystem` → production env
   `N8N_SECRET` = the value from step 3, and deploy a build that contains this branch's
   `src/lib/n8n.ts` (header instead of query).
6. Delete or archive the old workflow once the new one works; the old key is already revoked.
