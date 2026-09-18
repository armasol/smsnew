import { NextResponse } from 'next/server';
import { getPonsStatus } from '@/lib/pons';
import { stateBackend } from '@/lib/state';

export const runtime='nodejs';
export const dynamic='force-dynamic';

export async function GET(){
  try {
    const pons=await getPonsStatus();
    return NextResponse.json({ok:true,state:stateBackend(),mode:process.env.EXECUTION_MODE||'dry-run',onchainEnabled:String(process.env.ENABLE_ONCHAIN_LAUNCH||'false').toLowerCase()==='true',pons});
  } catch(error){return NextResponse.json({ok:false,state:stateBackend(),error:error instanceof Error?error.message:'Status unavailable'},{status:503});}
}
