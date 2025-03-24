import { MARKET_GROUPS } from "@/app/constants/data/market-groups";
import { readCSVSync } from "@/app/helpers/pandas";
import { getMarketGroupsWithMeta } from "@/app/helpers/readMarketMetaData";

import { TickerMD } from "@/app/interface/IMarketinfo";
import { I_EvaluatedPosition, I_MarketParams, I_Study, I_StudyExec_indexGroup_Result, I_StudyExecParams } from "@/app/interface/IExecution";
import Study1 from "./study1-buy-dropPC2";
const _getRowsWithDateRange=(ticker:TickerMD,exchange:string,execParams:I_StudyExecParams)=>{
        const rows = readCSVSync(ticker.Ticker,exchange,"D1");
       
        if(execParams.dateAll) {return rows;}
        else{
            return rows.filter((row) => {
                return row.date>=execParams.dateFrom && row.date<=execParams.dateTo;
            });
        }
}

const _getGroupsHelper=(marketParams:I_MarketParams)=>{
    const groups=marketParams.markets; // FTSE100, FTSE250, BIST30, etc
    const tickers=marketParams.tickers;
   return {groups,tickers};
}
const _getStudy=(studyId:string)=>{
    switch(studyId){
        case "1":return new Study1();
        default:return new Study1();
    }
}
export function execute_Study(executionParams:I_StudyExecParams):I_StudyExec_indexGroup_Result[]
{
    console.log(executionParams);
    const a=_getStudy(executionParams.studyParams.studyId);
    const {groups,tickers}= _getGroupsHelper(executionParams.marketParams);

    let results=[] as I_StudyExec_indexGroup_Result[];
    getMarketGroupsWithMeta().forEach((group) => {

        if(groups.includes(group.name)){
            
            const indexMarketResult=[] as I_EvaluatedPosition[] //"NYSE100",etc
            group.tickers.forEach((ticker) => {
                const rows = _getRowsWithDateRange(ticker,group.exchange,executionParams);
                if(rows.length>0) {
                    const collectionRes = a.collect(executionParams.studyParams,rows,ticker.Ticker);
                    const res = a.eval(ticker.Ticker,collectionRes,executionParams.studyParams,rows);
                    res.forEach((r)=>indexMarketResult.push(r));
                }
            });
            results.push({"exchange":group.exchange,"indexGroup":group.name,"execResults":indexMarketResult});
        }
    })
    
return results;
}
