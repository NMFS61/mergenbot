import { MARKET_GROUPS } from "@/app/constants/data/market-groups";
import { readCSVSync } from "@/app/helpers/pandas";
import { getMarketGroupsWithMeta } from "@/app/helpers/readMarketMetaData";
import { IExec_DateParams, IExec_MarketParams } from "@/app/interface/executionInterface";
import {evalaute as evaluate_st1,collect as collect_st1, I_Study1Params} from '@/app/backend/study/study1-buy-dropPC';
import { PositionResult } from "@/app/interface/tickerInfo";
import { TickerMD } from "@/app/interface/marketinfo";

const _getRowsWithDateRange=(ticker:TickerMD,exchange:string,dateParams:IExec_DateParams)=>{
        const rows = readCSVSync(ticker.Ticker,exchange,"D1");
        if(dateParams.allDates) {return rows;}
        else{
            return rows.filter((row) => {
                return row.date>=dateParams.dateStart && row.date<=dateParams.dateEnd;
            });
        }
}

const _getGroupsHelper=(marketParams:IExec_MarketParams)=>{
    const groups=[]; // FTSE100, FTSE250, BIST30, etc
    const tickers=[];

    if(marketParams.marketsInputStr=="all") {MARKET_GROUPS.forEach((group) => {groups.push(group.name);});}
    if(marketParams.marketsInputStr=="allStocks") {
        MARKET_GROUPS.forEach((group) => {
            if(group.exchange!="FOREX" && group.exchange!="CRYPTO") {groups.push(group.name);}
            });
    }
    if(marketParams.marketsInputStr=="allForex") {
        MARKET_GROUPS.forEach((group) => {if(group.exchange=="FOREX") groups.push(group.name);});
    }
    if(marketParams.marketsInputStr=="other") {
        if(marketParams.groups.length>0) {
                            marketParams.groups.forEach((group) => {groups.push(group);});
        }
        else{
            marketParams.tickers.forEach((ticker) => {tickers.push(ticker);});
        }
    }
   return {groups,tickers};
}
export interface IExec_Results_Group{
    exchange:string;
    group:string;
    execResults:PositionResult[];
}

export function exec_study1(studyParams:I_Study1Params,dateParams:IExec_DateParams,marketParams:IExec_MarketParams):IExec_Results_Group[]
{
    let results=[] as IExec_Results_Group[];
    const {groups,tickers}= _getGroupsHelper(marketParams);
    getMarketGroupsWithMeta().forEach((group) => {

        if(groups.includes(group.name)){
            const exchangeGroupResults=[] as PositionResult[];

            group.tickers.forEach((ticker) => {
                // const rows = readCSVSync(ticker.Ticker,group.exchange,"D1");
                const rows = _getRowsWithDateRange(ticker,group.exchange,dateParams);
                const collectionRes = collect_st1(studyParams.dropByPC,rows);
                const res = evaluate_st1(ticker.Ticker,collectionRes.positionRows,rows,studyParams.increaseTargetPC,0);
                res.forEach((r) => {exchangeGroupResults.push(r);});
            });

            results.push({exchange:group.exchange,group:group.name,execResults:exchangeGroupResults});
        }
        
    });
    return results;
}