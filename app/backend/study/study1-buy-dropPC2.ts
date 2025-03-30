/**
 * if it ever drops @param dropBy % , from the peak(high)
 * @param rows are the ticker data for the given date range
 * @returns the series of rows with dates when the drop happened, followed by 1st drop date
 */

import { I_CollectedPosition, I_EvaluatedPosition, I_Study } from "@/app/interface/IExecution";
import { I_TickerRow } from "@/app/interface/ITickerData";
import { console } from "inspector";
export interface I_Study1Params {
   dropByPC: number;
   increaseTargetPC: number;
}

class Study1 implements I_Study {
  
   collect = (studyParams: any, rows: I_TickerRow[],ticker:string): I_CollectedPosition[] => {
      const positions = [] as I_CollectedPosition[];
      try{
      let peak = rows[0].high;
      let analysisStarted = rows[0].date;
      const dropBy = studyParams.dropByPC as number;
      rows.forEach((row) => {
         if (row.high > peak) {
            peak = row.high;
         }
         else if (row.low <= peak * (1 - dropBy / 100)) {
            const conditionMetIn = (row.date.getTime() - analysisStarted.getTime()) / 1000 / 60 / 60 / 24; // in days
            const positionData = {
               openRow: row,
               openPrice: row.low,
               openDate: row.date,
               conditionMetIn: conditionMetIn,
               conditionStartDate: analysisStarted,
               conditionStartPrice: peak,
               meta: {}
            } as I_CollectedPosition;
            positions.push(positionData);
            peak = row.high; // update the peak
            analysisStarted = row.date; // update the analysis start date
         }
      });
   }catch(e){console.log(e);}
   // try{}}catch(e){console.log(e);}
      return positions;
   }

   eval = (ticker: string, positionRows: I_CollectedPosition[], studyParams: any, rows: I_TickerRow[]) => {
      const retValue = [] as I_EvaluatedPosition[];
      const targetPercent = studyParams.increaseTargetPC as number;

      positionRows.forEach((posRow) => {
         let p = { ticker: ticker, position: posRow } as I_EvaluatedPosition;
         const res = rows.filter((r) => (r.date > posRow.openDate && r.high >= posRow.openPrice * (1 + targetPercent / 100)));
         if (res.length > 0) {
            p.closePrice = res[0].high;
            p.closeRow = res[0];
            p.success = true;
            p.days = (res[0].date.getTime() - posRow.openDate.getTime()) / (1000 * 60 * 60 * 24);
         }
         else {

            p.success = false;
            p.closeRow = rows[rows.length - 2]; // The last row/last day 
            p.closePrice = rows[rows.length - 2].close;// actually not closed but came to last day
            const lastDate = rows[rows.length - 2].date;
            p.days = (lastDate.getTime() - posRow.openDate.getTime()) / (1000 * 60 * 60 * 24);

         }
         p.meta = { 'targetPercent': targetPercent };
         retValue.push(p);
      });
      return retValue;

   };
}
export default Study1;
