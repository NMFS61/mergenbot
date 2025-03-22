/**
 * if it ever drops @param dropBy % , from the peak(high)
 * @param rows are the ticker data for the given date range
 * @returns the series of rows with dates when the drop happened, followed by 1st drop date
 */

import { checkIfExist } from "@/app/helpers/readData";
import { getMarketGroupsWithMeta } from "@/app/helpers/readMarketMetaData";
import { readCSVSync } from "@/app/helpers/pandas";
import {  I_CollectPositions, PositionData, PositionResult, TickerData } from "@/app/interface/tickerInfo";

export interface I_Study1Params {
   dropByPC: number;
   increaseTargetPC: number;
}
// For run time checks, returns the current level high
export function getCurrentMeta(dropBy: number, rows: TickerData[]): any {
   let peak = rows[0].high;
   let analysisStarted = rows[0].date;
   rows.forEach((row) => {
      if(row.high>peak) {peak = row.high;}
      else if(row.low<=peak*(1-dropBy/100)) {
         peak = row.high; // update the peak
         analysisStarted = row.date;
      }
   });
   return {"param_dropByPC":dropBy,"peak":peak,"dateOfPeak":analysisStarted};
}

export function collect(dropBy: number, rows: TickerData[]): I_CollectPositions {
   const retValue={} as I_CollectPositions; // positions + meta in case we need
   const positions = [];
   let peak = rows[0].high;
   let analysisStarted = rows[0].date;
   
   rows.forEach((row) => {
         if(row.high>peak) {
              peak = row.high;
         }
         else if(row.low<=peak*(1-dropBy/100)) {
            const conditionMetIn=(row.date.getTime()-analysisStarted.getTime())/1000/60/60/24; // in days
            const positionData = {date: row.date, 
                                 open: row.open, 
                                 high: row.high, 
                                 low: row.low, 
                                 close: row.close, 
                                 volume: row.volume, 
                                 conditionMetIn: conditionMetIn,
                                 conditionStartDate: analysisStarted,
                                 conditionStartPrice: peak};
                                 positions.push(positionData);
            peak = row.high; // update the peak
            analysisStarted = row.date; // update the analysis start date
         }
   });
   retValue.positionRows=positions;
   retValue.meta={dropBy:dropBy,currentPeak:peak};
    return retValue;
}

export function evalaute(ticker:string,positionRows: PositionData[],rows: TickerData[],targetPercent:number,stopLossPercent:number): PositionResult[] {
    const retValue = [];

    
    positionRows.forEach((posRow) => {
        let p={ticker:ticker,position:posRow} as PositionResult;
         const res=rows.filter((r)=>(r.date>posRow.date && r.high>= posRow.low * (1+targetPercent/100)));
         if (res.length>0) {
            p.positionClose=res[0];
            p.success=true;
            p.days=(res[0].date.getTime()-posRow.date.getTime())/(1000*60*60*24);
         }
         else{
            p.success=false;
            p.positionClose=rows[rows.length-2]; // The last row/last day 
            const lastDate = rows[rows.length-2].date;
            p.days=(lastDate.getTime()-posRow.date.getTime())/(1000*60*60*24);
            
         }
         p.meta={'targetPercent':targetPercent};
         retValue.push(p);
});
return retValue;
}
