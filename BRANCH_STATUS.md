# BRANCH_STATUS — RAL Reviews

**App path:** `active_apps/ral-reviews/`
**Brand:** RALFeedback — AI-Powered Restaurant Feedback Analysis (general / multi-market)
**Palette:** Light Tan `#FAF0E6` bg + Vibrant Orange `#FF7B54` primary + Coral `#FF8E72` accent
**Fonts:** Alegreya (body serif) + Belleza (headline sans)
**Source zip:** `Websites Code 9/RALreviews.zip` (2025-08-04, Firebase Studio export)

**Live domain:** TBD — proposed `ral.mindwaveja.com` or `ralfeedback.com` (decision pending)
**VPS container:** Not deployed yet — proposed `mw-ral-reviews`
**VPS port:** 3010 (pre-allocated; next free in 3000-series)
**Repo:** Not yet its own git repo. Per CLAUDE.md INS-018, becomes `HammazoneRecords/ral-reviews` before first deploy.

---

## Current State

| Branch | Last Updated | Deployed? | Notes |
|---|---|---|---|
| (local only) | 2026-05-20 | ⬜ | Foundation done — builds-clean pending |

## Last Action

**Date:** 2026-05-20
**Branch:** local working tree (no git repo yet)
**Action:** Phase 1 foundation — stripped Firebase + Genkit, scaffolded Better Auth + Drizzle + DeepSeek-via-Ark, kept all UI/components/page-logic intact for Phase 2 port.

**What was stripped:**
- Firebase deps (`firebase`, `@firebase/*` removed from package.json)
- Genkit deps (`@genkit-ai/googleai`, `@genkit-ai/next`, `genkit`, `genkit-cli`)
- `apphosting.yaml`, `firebase.json`, `.firebaserc`, `firebase-debug.log`, `.modified`
- `src/ai/genkit.ts`, `src/ai/dev.ts`
- Duplicate root-level folders left over from Firebase Studio export (`/app`, `/ai`, `/components`, `/context`, `/flows`, `/hooks`, `/lib`, `/genkit.ts`, `/dev.ts` at root)

**What was scaffolded:**
- `src/lib/auth/{index,session,client}.ts` — Better Auth (admin-only login for /admin)
- `src/lib/db/{index.ts, schema/auth.ts, schema/app.ts}` — Drizzle pg + Postgres schema for restaurants, feedback, fawud_logs (per-visitor uniqueness), email_subscribers
- `src/lib/ark.ts` — DeepSeek client targeting local Ark server (OpenAI-compatible POST /v1/chat/completions; env vars `ARK_BASE_URL`, `DEEPSEEK_MODEL`, `DEEPSEEK_API_KEY`)
- `src/ai/flows/{analyze-sentiment,score-feedback,summarize-feedback,suggest-improvements,get-improvement-suggestions}.ts` — all 5 ported from Genkit to Ark `chatJson()` calls
- `src/app/api/auth/[...all]/route.ts` — single Better Auth handler
- `src/context/auth-context.tsx` — rewired to Better Auth's `authClient.useSession()` while keeping the legacy `{user, loading, login, logout}` shape so components don't break
- `src/lib/firebase.ts` — turned into a Drizzle-pending shim. Function signatures preserved; bodies throw `[firebase shim] X() not yet ported to Drizzle. See BRANCH_STATUS.md Phase 2.` so the codebase compiles, runtime calls fail loud
- `src/lib/types.ts` — `Timestamp` no longer imported from `firebase/firestore`; aliased to native `Date`
- `package.json` — `packageManager: pnpm@10.33.0`, Next.js 16, Better Auth ^1.6.9, Drizzle ^0.45.2, drizzle-kit ^0.31.10, pg ^8.20.0
- `Dockerfile` (pnpm 2-stage build, port 3010)
- `drizzle.config.ts`, `.env.example`

**Schema migration:** none yet — no DB exists. First `drizzle-kit push` runs against a fresh `ral_reviews` Postgres DB in Phase 2.

**Build status:** not yet run — `pnpm install && pnpm build` is the first task next session. Expect minor type errors from copy-from-firebase-Timestamp callsites; quick fixes.

---

## Phase 2 — Drizzle Query Port (next session)

The `src/lib/firebase.ts` shim throws on all 10 methods. Port each to Drizzle queries against the new schema:

| Method | New Drizzle query |
|---|---|
| `addFeedback` | `db.insert(feedback).values(...).returning()` |
| `updateFeedback` | `db.update(feedback).set(...).where(eq(feedback.id, id))` |
| `getFeedbackForRestaurant` | `db.select().from(feedback).where(eq(restaurantId, id)).orderBy(desc(createdAt))` |
| `getFeedbackForRestaurantPaginated` | same + `.limit(5).offset(N)` — replace Firestore `lastVisible` cursor with simple numeric offset; UI cursor becomes the last seen `createdAt` or just the page number |
| `incrementFawudCount` | transaction: upsert `fawud_logs` row, if `count < 3` then `db.update(feedback).set({ fawuds: sql\`${feedback.fawuds} + 1\` })` |
| `updateFeedbackSentimentScore` | `db.update(feedback).set({ sentimentScore, sentimentLabel })` |
| `addEmailSubscriber` | `db.insert(emailSubscribers).values({email}).onConflictDoNothing()` |
| `deleteFeedback` | `db.delete(feedback).where(eq(feedback.id, id))` |
| `scoreFeedbackQuality` | `db.update(feedback).set({ qualityScore, qualityNotes })` |
| `getAllFeedbackForExport` | `db.select().from(feedback).leftJoin(restaurants, ...).orderBy(desc(createdAt))` |

Also: seed initial restaurants from the existing `src/lib/mock-data.ts` via a one-off insert script.

---

## Phase 3 — Deploy to VPS (later session)

1. `git init` + create `HammazoneRecords/ral-reviews` (INS-018 protection)
2. Provision Postgres DB `ral_reviews` (on existing `mw-postgres` container or new)
3. Add `mw-ral-reviews` service to `/opt/mw/docker-compose.yml`, env passthrough for `DATABASE_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `NEXT_PUBLIC_APP_URL`, `ARK_BASE_URL`, `DEEPSEEK_MODEL`, `DEEPSEEK_API_KEY`
4. Pick domain (decision pending) + Nginx vhost + Certbot
5. Seed first admin user via `/api/auth/sign-up/email` then set `disableSignUp: true` in `lib/auth/index.ts`
6. Smoke-test: public feedback submission works, admin login works, AI sentiment analysis works through Ark

---

## History

| Date | Branch | Action | Notes |
|---|---|---|---|
| 2025-08-04 | (source zip) | Firebase Studio export | Original Genkit + Firestore implementation, archived in `Websites Code 9/RALreviews.zip` |
| 2026-05-20 | (local) | Phase 1 — Firebase/Genkit out, Better Auth + Drizzle + Ark in | See Last Action |
