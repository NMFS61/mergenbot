
import { execute_Study } from "@/app/backend/study/study-executor-service";
import { I_StudyExec_indexGroup_Result, I_StudyExecParams } from "@/app/interface/IExecution";
import { getMarketGroupsWithMeta } from "@/app/helpers/readMarketMetaData";
import { checkIfExist } from "@/app/helpers/readData";
import { readCSVSync, readCSVSync_Div, readCSVSync_Split } from "@/app/helpers/pandas";
import { MarketGroupsWithMeta } from "@/app/interface/IMarketinfo";
import { I_AppCtx_MarketRows } from "@/app/interface/IContext";
import { I_TickerDivRow, I_TickerRow, I_TickerSplitRow } from "@/app/interface/ITickerData";

export const fetchAll = () => {
        const results=[] as I_AppCtx_MarketRows[];
        const indexGroups=getMarketGroupsWithMeta();
        getMarketGroupsWithMeta().forEach((group) => {
        group.tickers.forEach(async (ticker) => {
                console.log(ticker.Ticker);
                
                // const rows=readCSVSync(ticker.Ticker, group.exchange, "D1");
                // const divs = readCSVSync_Div(ticker.Ticker, group.exchange);
                // const splits = readCSVSync_Split(ticker.Ticker, group.exchange);
                const rows= await  _fetchHD(ticker.Ticker, group.exchange, "D1");
                const divs = await _fetchDIV(ticker.Ticker, group.exchange, "D1");
                const splits = await _fetchSPLIT(ticker.Ticker, group.exchange, "D1");
                results.push({"indexGroup":group.name,"ticker":ticker.Ticker,"rowsHD":rows,"rowsDIV":divs,"rowsSPLIT":splits})
                // readCSVSync(ticker.Ticker, group.exchange, "D1").forEach((row) => { console.log(row);}); 
              });
            
          });

          return results;
}
 async function  _fetchHD(exchange:string,ticker:string,timeFrame:string):Promise<I_TickerRow[]>{
    
        const res = await fetch(process.env.APP_HOST+"api/v1/fetch/hd",
            {
               method:'POST',
               headers: {
                    'Content-Type': 'application/json',
                    'API-Key': 'process.env.DATA_API_KEY',
               },
               body:JSON.stringify(
                   {
                   'exchange':exchange,
                   'ticker':ticker,
                   'timeFrame':timeFrame
               })
         })
         const data = await res.json();
         return data;
    

    
}

const _fetchDIV=async(exchange:string,ticker:string,timeFrame:string):Promise<I_TickerDivRow[]>=>{
    const res = await fetch(process.env.APP_HOST+"api/v1/fetch/div",
         {
            method:'POST',
            headers: {
            'Content-Type': 'application/json',
            'API-Key': 'process.env.DATA_API_KEY',
            },
            body:JSON.stringify(
                {
                'exchange':exchange,
                'ticker':ticker,
                'timeFrame':timeFrame
            })
      })
      const data = await res.json();
      return data;
}

const _fetchSPLIT=async(exchange:string,ticker:string,timeFrame:string):Promise<I_TickerSplitRow[]>=>{
    const res = await fetch(process.env.APP_HOST+"api/v1/fetch/split",
         {
            method:'POST',
            headers: {
            'Content-Type': 'application/json',
            'API-Key': 'process.env.DATA_API_KEY',
            },
            body:JSON.stringify(
                {
                'exchange':exchange,
                'ticker':ticker,
                'timeFrame':timeFrame
            })
      })
      const data = await res.json();
      return data;
}