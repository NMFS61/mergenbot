import { writeFile,readFileSync,rmSync ,existsSync,mkdirSync } from "fs";
import { EOD_TOKEN } from "@/constants";
import { readCSVSync } from "../pandas";
import { console } from "inspector";
import { getMarketGroupsWithMeta } from "../readMarketMetaData";

const dowloadGroupIndex=["FOREX","BIST 100","FTSE 100","FTSE 250","NASDAQ 100","NYSE 200"];
export function resetDataFolder(){
    // delete data folder and recreate it with subfolders
    const dir=process.cwd()+"/data";
    rmSync(dir, { recursive: true, force: true });
    const dirs=["FOREX","FOREX/DIVIDENDS","FOREX/SPLITS",
                "IS","IS/DIVIDENDS","IS/SPLITS",
                "LSE","LSE/DIVIDENDS","LSE/SPLITS",
                "IS","IS/DIVIDENDS","IS/SPLITS",
                "LSE","LSE/DIVIDENDS","LSE/SPLITS",
                "US","US/DIVIDENDS","US/SPLITS"
                ];
    mkdirSync(dir);
    dirs.forEach((d)=>{
        if(!existsSync(dir+"/"+d)){mkdirSync(dir+"/"+d);}
        
    });
}
const _dowloadAllHistoricalData=(dateTo:string)=>{
    
    getMarketGroupsWithMeta().forEach((group) => {
        group.tickers.forEach((ticker) => {
            if(dowloadGroupIndex.includes(group.name)){
                downloadHistoricalData(
                "2000-01-01",
                "2025-03-24",
                ticker.Ticker,
                group.exchange
                );
            }
        });
    });
};
const _dowloadAllDivData=(dateTo:string)=>{
    getMarketGroupsWithMeta().forEach((group) => {
        group.tickers.forEach((ticker) => {
          
          if (group.name != "FOREX" && dowloadGroupIndex.includes(group.name)) {
            download_DIVIDENDHistory(
              "2000-01-01",
              dateTo,
              ticker.Ticker,
              group.exchange
            );
          }
        });
      });
}
const _dowloadAllSplitData=(dateTo:string)=>{
    getMarketGroupsWithMeta().forEach((group) => {
        group.tickers.forEach((ticker) => {
        if (group.name != "FOREX" && dowloadGroupIndex.includes(group.name)) {
            try {
                download_StockSplitHistory(
                "2000-01-01",
                dateTo,
                ticker.Ticker,
                group.exchange
                );
            }catch(e){}
          }
        });
      });
}

export function updateHistoricalData_ALL(){
    
    // const dt=new Date(); // today
    // dt.setDate(dt.getDate() - 1); // Yesterday!
    // const dateTo=dt.toISOString().split('T')[0]; // morning run, so yesterday's data is available
    // we'll use yesterday, because if this runs on early in the morning.
    const dt_Last=new Date();
    dt_Last.setDate(dt_Last.getDate()-1);
        
    const dateTo=dt_Last.toLocaleString("default", { year: "numeric" })+"-"+
                 dt_Last.toLocaleString("default", { month: "2-digit" })+"-"+
                 dt_Last.toLocaleString("default", { day: "2-digit" });
    // STEP 1: Delete all data
    resetDataFolder();
    //STEP 2: Download all historical data
     _dowloadAllHistoricalData(dateTo);
     _dowloadAllDivData(dateTo);
     _dowloadAllSplitData(dateTo);

    return "Data update completed";
}

export function downloadHistoricalData(dateFrom:string,dateTo:string,ticker:string,exchange:string){
    const path=process.cwd()+"/data/"+exchange+"/"+ticker+"_D1.csv";

    (async () => {
        const rawResponse = await fetch(`https://eodhd.com/api/eod/${ticker}.${exchange}?api_token=${EOD_TOKEN}&fmt=json&from=${dateFrom}&to=${dateTo}`);
        const rows = await rawResponse.json();
       
        let data="Date,Open,High,Low,Close,Volume\n";
        
        rows.forEach((row)=>{
            data+=`${row.date},${row.open},${row.high},${row.low},${row.close},${row.volume}\n`;
        });
        
        writeFile(path, data, (err) => {
            if (err) throw err;
        })    
    })();
    
}

export function downloadHistoricalData_USD(dateFrom:string,dateTo:string,ticker:string,exchange:string){
    const path=process.cwd()+"/data/"+exchange+"/"+ticker+"_USD_D1.csv";

    (async () => {
        const rawResponse = await fetch(`https://eodhd.com/api/eod/${ticker}.${exchange}?api_token=${EOD_TOKEN}&fmt=json&from=${dateFrom}&to=${dateTo}`);
        const rows = await rawResponse.json();
       
        let data="Date,Open,High,Low,Close,Volume\n";
        
        rows.forEach((row)=>{
            data+=`${row.date},${row.open},${row.high},${row.low},${row.close},${row.volume}\n`;
        });
        
        writeFile(path, data, (err) => {
            if (err) throw err;
        })    
    })();
    
}

export function download_StockSplitHistory(dateFrom:string,dateTo:string,ticker:string,exchange:string){
    const path=process.cwd()+"/data/"+exchange+"/SPLITS/"+ticker+"_Splits.csv";

    (async () => {
        const rawResponse = await fetch(`https://eodhd.com/api/splits/${ticker}.${exchange}?api_token=${EOD_TOKEN}&fmt=json&from=${dateFrom}&to=${dateTo}`);
        const rows = await rawResponse.json();
       
        let data="Date,Split\n";
        
        rows.forEach((row)=>{
            data+=`${row.date},${row.split}\n`;
        });
        
        writeFile(path, data, (err) => {
            if (err) throw err;
        })    
    })();
    
}
export function download_DIVIDENDHistory(dateFrom:string,dateTo:string,ticker:string,exchange:string){
    const path=process.cwd()+"/data/"+exchange+"/DIVIDENDS/"+ticker+"_Divs.csv";

    (async () => {
        const rawResponse = await fetch(`https://eodhd.com/api/div/${ticker}.${exchange}?api_token=${EOD_TOKEN}&fmt=json&from=${dateFrom}&to=${dateTo}`);
        const rows = await rawResponse.json();

        let data="Date,Amount,Currency\n";
        
        rows.forEach((row)=>{
            data+=`${row.date},${row.value},${row.currency}\n`;
        });
        
        writeFile(path, data, (err) => {
            if (err) throw err;
        })    
    })();
    
}

