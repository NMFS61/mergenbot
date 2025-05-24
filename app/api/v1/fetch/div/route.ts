import {NextRequest, NextResponse} from "next/server";
import { cookies } from "next/headers";

import { execute_Study } from "@/app/backend/study/study-executor-service";
import { I_StudyExec_indexGroup_Result, I_StudyExecParams } from "@/app/interface/IExecution";
import { getMarketGroupsWithMeta } from "@/app/helpers/readMarketMetaData";
import { checkIfExist } from "@/app/helpers/readData";
import { readCSVSync, readCSVSync_Div, readCSVSync_Split } from "@/app/helpers/pandas";
import { MarketGroupsWithMeta } from "@/app/interface/IMarketinfo";
import { I_AppCtx_MarketRows } from "@/app/interface/IContext";

interface I_Request{
  exchange:string;
  ticker:string;
  timeFrame:"D1"|"W1"|"M1";
}
export async function POST (request: NextRequest){

      const reqBody=await request.json() as I_Request;
      const divs = readCSVSync_Div(reqBody.ticker, reqBody.exchange);
      return NextResponse.json(divs);
 }
