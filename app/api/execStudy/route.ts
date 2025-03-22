import {NextRequest, NextResponse} from "next/server";
import { cookies } from "next/headers";
import { PositionResult, TickerBasicInfo } from "@/app/interface/tickerInfo";
import { I_Study1Params } from "@/app/backend/study/study1-buy-dropPC";
import { IExec_DateParams, IExec_MarketParams } from "@/app/interface/executionInterface";
import { exec_study1, IExec_Results_Group } from "@/app/backend/study/study-executor-service";

export interface IExecutionRequest {
    studyId: string;
    studyParams:I_Study1Params;
    dateParams:IExec_DateParams;
    marketParams:IExec_MarketParams;
    
}
export interface IExecResult{
    
}

export async function POST (request: NextRequest){
    
    // const email=request.nextUrl.searchParams.get("email");
    const req = await request.json() as IExecutionRequest;
    console.log("Received the request ",req.dateParams,req.marketParams,req.studyParams);
    if(req.studyId==="1"){
            const results=exec_study1(req.studyParams,req.dateParams,req.marketParams);
            return NextResponse.json(results);
    }
        
     const res=[] as IExec_Results_Group[];
     return NextResponse.json(res);
 }
