import crypto from 'node:crypto';

type SessionRecord = { payload: unknown; expires: number };
const memory = new Map<string, SessionRecord>();
const hasRedis = () => Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
const digest = (value: string) => crypto.createHash('sha256').update(String(value)).digest('hex').slice(0, 40);
const sessionKey = (sender: string) => `launchsms:session:${digest(sender)}`;
const webhookKey = (fingerprint: string) => `launchsms:webhook:${digest(fingerprint)}`;

async function redis(command: string, ...args: Array<string | number>) {
  const base = process.env.UPSTASH_REDIS_REST_URL?.replace(/\/$/, '');
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!base || !token) throw new Error('Upstash Redis is not configured');
  const path = [command, ...args].map(v => encodeURIComponent(String(v))).join('/');
  const response = await fetch(`${base}/${path}`, { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' });
  if (!response.ok) throw new Error(`Redis ${command} failed (${response.status})`);
  return (await response.json()).result as unknown;
}

export async function setSession<T>(sender: string, payload: T, ttlSeconds = 3600) {
  const key = sessionKey(sender);
  if (hasRedis()) { await redis('SET', key, JSON.stringify(payload), 'EX', ttlSeconds); return; }
  memory.set(key, { payload, expires: Date.now() + ttlSeconds * 1000 });
}

export async function getSession<T>(sender: string): Promise<T | null> {
  const key = sessionKey(sender);
  if (hasRedis()) {
    const value = await redis('GET', key);
    return typeof value === 'string' ? JSON.parse(value) as T : null;
  }
  const entry = memory.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expires) { memory.delete(key); return null; }
  return entry.payload as T;
}

export async function clearSession(sender: string) {
  const key = sessionKey(sender);
  if (hasRedis()) { await redis('DEL', key); return; }
  memory.delete(key);
}

export async function claimWebhook(fingerprint: string, ttlSeconds = 86400) {
  const key = webhookKey(fingerprint);
  if (hasRedis()) {
    const result = await redis('SET', key, '1', 'NX', 'EX', ttlSeconds);
    return result === 'OK';
  }
  const existing = memory.get(key);
  if (existing && Date.now() < existing.expires) return false;
  memory.set(key, { payload: true, expires: Date.now() + ttlSeconds * 1000 });
  return true;
}

export function stateBackend() { return hasRedis() ? 'upstash' : 'memory'; }
