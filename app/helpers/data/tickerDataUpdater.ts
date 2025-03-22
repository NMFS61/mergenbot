import { writeFile,readFileSync } from "fs";
import { EOD_TOKEN } from "@/constants";
import { readCSVSync } from "../pandas";
import { console } from "inspector";

export function updateHistoricalData(ticker:string,exchange:string){
    console.log("**9")
    const path=process.cwd()+"/data/"+exchange+"/"+ticker+"_D1.csv";
    let data=readFileSync(path, 'utf8');
    const rows=readCSVSync(ticker, exchange, "D1");
    const lastRow=rows[rows.length-2];
   
    const dateFrom=lastRow.date.toLocaleString("default", { year: "numeric" })+"-"+
                   lastRow.date.toLocaleString("default", { month: "2-digit" })+"-"+
                   lastRow.date.toLocaleString("default", { day: "2-digit" })
    const dt_Last=new Date();
    // we'll use yesterday, because if this runs on early in the morning.
    dt_Last.setDate(dt_Last.getDate()-1);
    
    const dateTo=dt_Last.toLocaleString("default", { year: "numeric" })+"-"+
                 dt_Last.toLocaleString("default", { month: "2-digit" })+"-"+
                 dt_Last.toLocaleString("default", { day: "2-digit" });
    const lines=readFileSync(path,"utf-8").split('\n');
    const newLines=[]
    lines.forEach((line)=>{if(line.trim()!=""){newLines.push(line);}});
    console.log(dateFrom," - ", dateTo);
    (async () => {
        const rawResponse = await fetch(`https://eodhd.com/api/eod/${ticker}.${exchange}?api_token=${EOD_TOKEN}&fmt=json&from=${dateFrom}&to=${dateTo}`);
        const rows = await rawResponse.json();
        
        //let data="Date,Open,High,Low,Close,Volume\n";
        let i=0
        rows.forEach((row)=>{
            // first one is the last date of existing , skip it
            if(i>0){ data+=`${row.date},${row.open},${row.high},${row.low},${row.close},${row.volume}\n`;}
            i++;
        });
        let newLinesStr="";
        newLines.forEach((line)=>{newLinesStr=line+"\n"}); // existing file content
        newLinesStr=newLinesStr+data; // finally added the updates
        writeFile(path, newLinesStr, (err) => {
            if (err) throw err;
        })    
    })();
    
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

