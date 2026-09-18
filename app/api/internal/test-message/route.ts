import { NextResponse } from 'next/server';
import { processMessage } from '@/lib/flow';
export const runtime='nodejs';
export const dynamic='force-dynamic';
export async function POST(request:Request){
  if(String(process.env.ENABLE_INTERNAL_TESTER||'false').toLowerCase()!=='true') return NextResponse.json({ok:false,error:'Not found'},{status:404});
  const expected=process.env.INTERNAL_TESTER_SECRET||''; const supplied=request.headers.get('x-launchsms-test-secret')||'';
  if(!expected||supplied!==expected) return NextResponse.json({ok:false,error:'Unauthorized'},{status:401});
  const payload=await request.json().catch(()=>null) as {from?:string;body?:string}|null;
  if(!payload?.from||!payload?.body) return NextResponse.json({ok:false,error:'from and body are required'},{status:400});
  const result=await processMessage({from:payload.from,body:payload.body,forceDryRun:true});
  return NextResponse.json({ok:true,...result});
}
