import {NextRequest, NextResponse} from "next/server";
import { cookies } from "next/headers";

import { execute_Study } from "@/app/backend/study/study-executor-service";
import { I_StudyExec_indexGroup_Result, I_StudyExecParams } from "@/app/interface/IExecution";


export async function POST (request: NextRequest){
    
    // const email=request.nextUrl.searchParams.get("email");
    const req = await request.json() as I_StudyExecParams;
    const results=execute_Study(req);
    return NextResponse.json(results);
    
 }
