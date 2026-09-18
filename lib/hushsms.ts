import crypto from 'node:crypto';
const API_BASE = (process.env.HUSHSMS_API_BASE || 'https://api.hushsms.com').replace(/\/$/, '');

export function verifyHushSignature(rawBody: Buffer, signatureHeader: string | null) {
  const shouldValidate = String(process.env.HUSHSMS_VALIDATE_SIGNATURE || 'true').toLowerCase() !== 'false';
  if (!shouldValidate) return true;
  const secret = process.env.HUSHSMS_WEBHOOK_SECRET || '';
  if (!secret) throw new Error('HUSHSMS_WEBHOOK_SECRET is missing while webhook validation is enabled');
  if (!signatureHeader) return false;
  const expected = `sha256=${crypto.createHmac('sha256', secret).update(rawBody).digest('hex')}`;
  const a = Buffer.from(expected); const b = Buffer.from(signatureHeader);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export async function sendSms({ lineId, to, body }: { lineId?: string; to: string; body: string }) {
  const token = process.env.HUSHSMS_LINE_TOKEN || '';
  const resolvedLine = lineId || process.env.HUSHSMS_LINE_ID || '';
  if (!token) throw new Error('HUSHSMS_LINE_TOKEN is not configured');
  if (!resolvedLine) throw new Error('HUSHSMS_LINE_ID is not configured');
  const response = await fetch(`${API_BASE}/v1/lines/${encodeURIComponent(resolvedLine)}/messages`, {
    method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ to, body }), cache: 'no-store'
  });
  const text = await response.text();
  if (!response.ok) throw new Error(`HushSMS send failed (${response.status})${text ? `: ${text.slice(0,180)}` : ''}`);
  try { return JSON.parse(text); } catch { return { ok: true }; }
}
