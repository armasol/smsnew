# Launch/SMS — Premium Next.js build

A Vercel-ready Next.js rebuild of Launch/SMS with a warm editorial visual system, a scroll-driven phone story, customer-facing docs, and the existing SMS → Pons launch backend preserved.

## Stack

- Next.js 15 / React 19 / TypeScript
- Native CSS animations + scroll-linked React interaction (no heavy animation dependency)
- Viem for Robinhood Chain / Pons v2
- HushSMS adapter for inbound/outbound SMS
- Upstash Redis REST for conversation state and webhook deduplication
- Vercel Route Handlers

## Public routes

- `/` — landing page
- `/docs` — customer-facing product docs
- `/privacy`
- `/terms`

There is deliberately no public test page or test link in the navigation.

## API routes

- `POST /api/sms` — HushSMS inbound webhook
- `GET /api/status` — deployment/Pons diagnostic endpoint
- `POST /api/internal/test-message` — optional private dry-run endpoint. Disabled by default and protected by a secret.

## Brand assets

Add your transparent assets here before deploying:

```text
public/images/logo.png
public/images/favicon.png
```

The navigation, footer and metadata already point to those paths. No code change is required after adding the files.

## Deploy to Vercel

1. Upload this folder to GitHub or import it directly into Vercel.
2. Add the variables from `.env.example`.
3. Keep these safe defaults initially:

```text
EXECUTION_MODE=dry-run
ENABLE_ONCHAIN_LAUNCH=false
```

4. Add your public messaging number:

```text
PUBLIC_PHONE_NUMBER=+...
PUBLIC_PHONE_DISPLAY=+...
```

5. Connect Upstash Redis.
6. Connect the HushSMS line and point its inbound webhook to:

```text
https://YOUR-DOMAIN.com/api/sms
```

7. Verify the deployment with:

```text
GET https://YOUR-DOMAIN.com/api/status
```

8. Test a real carrier conversation while still in dry-run mode.
9. Only configure the dedicated launcher wallet and enable onchain execution after dry-run testing passes.

## Hidden dry-run endpoint

For internal testing without exposing a tester in the UI:

```text
ENABLE_INTERNAL_TESTER=true
INTERNAL_TESTER_SECRET=your-long-random-secret
```

Then POST:

```json
{
  "from": "internal-test-user",
  "body": "LAUNCH"
}
```

to `/api/internal/test-message` with header:

```text
x-launchsms-test-secret: your-long-random-secret
```

This route always forces dry-run behavior.

## Mainnet safety

Two conditions must be true before the backend can broadcast a token launch:

```text
EXECUTION_MODE=mainnet
ENABLE_ONCHAIN_LAUNCH=true
```

The Pons contract's own launch permissions still apply. The application does not bypass contract-level restrictions.

## Notes for another AI/developer

- Public copy intentionally avoids exposing infrastructure details.
- The phone scroll story is in `components/PhoneStory.tsx`.
- Main landing-page composition is in `app/page.tsx`.
- Global design tokens and all responsive styling are in `app/globals.css`.
- SMS conversation logic is in `lib/flow.ts`.
- Pons integration is in `lib/pons.ts`.
- Messaging provider integration is isolated in `lib/hushsms.ts`; swap that adapter if you change SMS providers.
- Conversation state is isolated in `lib/state.ts`.
