# Deployment checklist

## Visual
- [ ] Add `public/images/logo.png`
- [ ] Add `public/images/favicon.png`
- [ ] Confirm the production phone number is visible in the hero and final CTA
- [ ] Check mobile hero and phone scroll story on iPhone Safari

## Messaging
- [ ] Provision the messaging number
- [ ] Add HushSMS line ID/token/signing secret
- [ ] Set inbound webhook to `/api/sms`
- [ ] Keep signature validation enabled in production

## State
- [ ] Add Upstash Redis REST URL/token
- [ ] Confirm `/api/status` reports `state: upstash`

## Chain
- [ ] Confirm Robinhood RPC responds
- [ ] Confirm the configured Pons factory/status endpoint responds
- [ ] Use a dedicated low-balance operational launcher wallet
- [ ] Dry-run a full LAUNCH → CONFIRM thread
- [ ] Enable mainnet only after the above works

## Vercel
- [ ] Node 20+
- [ ] Framework preset: Next.js
- [ ] Build command: `npm run build`
- [ ] No output directory override
