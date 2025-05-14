'use server';
import { checkIfExist } from "@/app/helpers/readData";
import { getMarketGroupsWithMeta } from "@/app/helpers/readMarketMetaData";
import {
  getTopN,
  readCSVSync,
  readCSVSync_Div,
  readCSVSync_Split,
} from "@/app/helpers/pandas";
import PageContent from "./pageContent";
import { execute_Study } from "../backend/study/study-executor-service";
import { MARKET_GROUPS } from "@/app/constants/data/market-groups";

import {
  downloadHistoricalData,
  download_DIVIDENDHistory,
  download_StockSplitHistory,
  resetDataFolder,
  updateHistoricalData_ALL,
} from "../helpers/data/tickerDataUpdater";


import { NextRequest } from "next/server";
import { TickerDivData } from "../interface/ITickerExtra";
import { I_StudyExecParams } from "../interface/IExecution";
import Study1 from "../backend/study/study2-buy-drop-volatility";


const downloadSingle = (ticker: string, exchange: string) => {
  downloadHistoricalData("2000-01-01", "2025-02-28", ticker, exchange);
};
const part1 = () => {
  getMarketGroupsWithMeta().forEach((group) => {
    // 1. Prints if not found in the STOCKS list
    group.tickers.forEach((ticker) => {
      if (ticker.Ticker == "") console.log(ticker);
    });
    // 2. checks if historical data exists
    if (group.exchange != "US") checkIfExist(group);
    // 3. fetch historical data for BIST 30
    if (group.name == "BIST 30") {
      group.tickers.forEach((ticker) => {
        console.log(ticker.Ticker);
        readCSVSync(ticker.Ticker, group.exchange, "D1").forEach((row) => {
          console.log(row);
        });
      });
    }
  });
  MARKET_GROUPS.forEach((group) => {
    console.log(group.name);
  });
};

function getAllIndexes(text:string, substring:string) {
  var indexes = [], i = -1;
  while ((i = text.indexOf(substring, i+1)) != -1){
      indexes.push(i);
  }
  return indexes;
}

const getDivSummary=(divs,rows)=>{
  const firstDate = rows[0].date;
  const rows2017 = rows.filter((r) => r.date >= new Date(2017, 0, 1));
  const price2017 = rows2017[0].open;
  const rows2020 = rows.filter((r) => r.date >= new Date(2018, 0, 1));
  const price2020 = rows2020[0].open;
  const rows2023 = rows.filter((r) => r.date >= new Date(2018, 0, 1));
  const price2023 = rows2023[0].open;
  let y = firstDate.getFullYear();
 
  const yearsToCheck = [];
  const results=[]
  while (y < 2025){
    yearsToCheck.push(y);
    y++;
  }
  let divCounter=0;
  let yield1720=0;
  let yield2023=0;
  let yield2324=0;
  const divTotals=[] as {key:string,total:number}[];
  yearsToCheck.forEach((yy)=>{
    const yearDivs=divs.filter((d)=>d.date.getFullYear()==yy);
    let total=0;
    yearDivs.forEach((d)=>{total=total+d.div});
    divTotals.push({key:yy.toString(),"total":total})
  })
  divTotals.forEach((d) => {
     const divYear=parseInt(d.key);

     if(yearsToCheck.includes(divYear) && d.total>0) {divCounter++;}
     
     if(divYear>=2017 && divYear<=2020 ){ yield1720=yield1720+(d.total/ price2017);}
     if(divYear>=2020 && divYear<=2023 ){ yield2023=yield2023+(d.total/ price2020);}
     if(divYear>=2023 && divYear<=2024 ){ yield2324=yield2324+(d.total/ price2023);}
   
   });
  
  return {
                "allYearCoverage":divCounter/yearsToCheck.length,
                "yield17":yield1720/4,
                "yield20":yield2023/4,
                "yield23":yield1720/2
        }
}
const getSharesByDividendYield = () => {

  getMarketGroupsWithMeta().forEach((group) => {
    if (group.name != "FOREX") {
    // if (group.name == "NYSE 200") {
      const divSummaryResults = [];

      group.tickers.forEach((ticker) => {
        const rows = readCSVSync(ticker.Ticker, group.exchange, "D1");
        const divs = readCSVSync_Div(ticker.Ticker, group.exchange);
        const splits = readCSVSync_Split(ticker.Ticker, group.exchange);
        if(divs.length>0){
          const divSummary=getDivSummary(divs,rows);
          divSummaryResults.push({"ticker":ticker.Ticker,"tickerName":ticker.Name,"exchange":group.exchange,"group":group.name,
            "divYearCoverage":divSummary.allYearCoverage,
            "yield17":divSummary.yield17,
            "yield20":divSummary.yield20,
            "yield23":divSummary.yield23,
            "yieldAvg1":(divSummary.yield17+divSummary.yield20+divSummary.yield23)/3,
            })
        }
        else{
          divSummaryResults.push({"ticker":ticker.Ticker,"tickerName":ticker.Name,"exchange":group.exchange,"group":group.name,
            "divYearCoverage":0,
            "yield17":0,
            "yield20":0,
            "yield23":0,
            "yieldAvg1":0
    
          })
        }
        
      });
      //console.log(divSummaryResults);
      const filtered=divSummaryResults.filter((d)=>d.yieldAvg1>0.1)
      console.log(filtered);
      console.log(filtered.length);
    }
  });
}
  //console.log(divs);
  //console.log(splits);
  

export default async function Page({searchParams,}: 
                                                {searchParams?: { [key: string]: string | undefined };}) 
  {
  
    //  console.log(updateHistoricalData_ALL());

  // dropByAnalysis1();
  // dropByAnalysisWithStudyExecutor();
  // getSharesByDividendYield();

  let params={
    studyId: '2',
    dateFrom: new Date('2000-01-01T00:00:00.000Z'),
    dateTo: new Date('2025-01-01T00:00:00.000Z'),
    dateAll: false,
    marketParams: {
      markets: [
        'BIST 30',  'BIST 50',
        'BIST 100', 'FTSE 100',
        'FTSE 250', 'NASDAQ 100',
        'NYSE 100', 'NYSE 200',
        'FOREX'
      ],
      tickers: []
    },
    studyParams: { dropByPC: '50', increaseTargetPC: '100', 'shorterVolatilityPC': '5' },
  } as I_StudyExecParams;

  
  const results=execute_Study(params);
  results.forEach((r)=>{
    console.log(r.indexGroup);
    r.execResults.forEach((er)=>{
      console.log(er.ticker);
      // console.log(er.meta.pattern);
      let patternStr="";
      er.meta.pattern.forEach((p)=>{
        patternStr=patternStr+p.pattern;
      })
      
      const indexes=getAllIndexes(patternStr,"-------+");
      let resStr="";
      indexes.forEach((i)=>{
        resStr=resStr+patternStr.substring(i+"-------+".length,i+"-------+".length+1);
      });
      if(resStr!="") {
        
        const indplus=getAllIndexes(resStr,"+")
        const indminus=getAllIndexes(resStr,"-")
        const pc=indplus.length/(indplus.length+indminus.length);
        console.log(`${er.ticker}:${resStr} (${pc}%)`);
       
      }
    })
  })
  

  return <PageContent temp={[""]} />;
}
