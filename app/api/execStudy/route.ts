import {NextRequest, NextResponse} from "next/server";
import { cookies } from "next/headers";

import { execute_Study } from "@/app/backend/study/study-executor-service";
import { I_MarketParams, I_StudyExec_indexGroup_Result, I_StudyExecParams } from "@/app/interface/IExecution";

export interface I_Request{
    studyId:string;
    dateFrom?:string;
    dateTo?:string;
    dateAll:boolean;
    marketParams:I_MarketParams;
    studyParams:any;
}
export async function POST (request: NextRequest){
    
    // const email=request.nextUrl.searchParams.get("email");
    const reqBody = await request.json() as I_StudyExecParams;
    const req= {
        studyId: reqBody.studyId,
        dateFrom: new Date(reqBody.dateFrom),
        dateTo: new Date(reqBody.dateTo),
        dateAll: reqBody.dateAll,
        marketParams: reqBody.marketParams,
        studyParams: reqBody.studyParams
      } as I_StudyExecParams;
    console.log("Received the Request: ",req);
    const results=execute_Study(req);
    
    return NextResponse.json(results);
    
 }
