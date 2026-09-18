import crypto from 'node:crypto';
import { NextResponse } from 'next/server';
import { claimWebhook } from '@/lib/state';
import { processMessage } from '@/lib/flow';
import { sendSms, verifyHushSignature } from '@/lib/hushsms';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const raw = Buffer.from(await request.arrayBuffer());
  try {
    const valid = verifyHushSignature(raw, request.headers.get('x-hushsms-signature'));
    if (!valid) return NextResponse.json({ ok:false, error:'Invalid webhook signature' }, { status:403 });
  } catch (error) {
    return NextResponse.json({ ok:false, error:error instanceof Error?error.message:'Signature validation error' }, { status:500 });
  }
  let payload: Record<string, unknown>;
  try { payload = JSON.parse(raw.toString('utf8')) as Record<string, unknown>; }
  catch { return NextResponse.json({ ok:false, error:'Invalid JSON' }, { status:400 }); }
  if (payload.event !== 'message.received') return NextResponse.json({ ok:true, ignored:true });
  const from = String(payload.from || '').trim();
  const body = String(payload.body || '').trim();
  const lineId = String(payload.line_id || process.env.HUSHSMS_LINE_ID || '').trim();
  if (!from || !body) return NextResponse.json({ ok:true, ignored:true });
  const fingerprint = crypto.createHash('sha256').update(`${lineId}|${from}|${body}|${String(payload.received_at || '')}`).digest('hex');
  if (!(await claimWebhook(fingerprint))) return NextResponse.json({ ok:true, duplicate:true });
  try {
    const result = await processMessage({ from, body });
    await sendSms({ lineId, to:from, body:result.reply });
    return NextResponse.json({ ok:true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'SMS flow failed';
    try { await sendSms({ lineId, to:from, body:`Launch/SMS error: ${message}` }); } catch {}
    return NextResponse.json({ ok:false, error:message }, { status:500 });
  }
}
