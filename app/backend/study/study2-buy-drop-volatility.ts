/**
 * if it ever drops @param dropBy % , from the peak(high)
 * @param rows are the ticker data for the given date range
 * @returns the series of rows with dates when the drop happened, followed by 1st drop date
 */

import { I_CollectedPosition, I_EvaluatedPosition, I_Study } from "@/app/interface/IExecution";
import { I_TickerRow } from "@/app/interface/ITickerData";
import { console } from "inspector";
import Study1 from "./study1-buy-dropPC";
export interface I_Study2Params {
   dropByPC: number;
   increaseTargetPC: number;
   shorterVolatilityPC: number;
}

export default class Study2 implements I_Study {
  
   collect = (studyParams: any, rows: I_TickerRow[],ticker:string): I_CollectedPosition[] => {
      // const positions = [] as I_CollectedPosition[];
      const st1= new Study1();
      const _positionsS1 = st1.collect(studyParams,rows,ticker)
      
      return _positionsS1;
   }

   eval = (ticker: string, positionRows: I_CollectedPosition[], studyParams: any, rows: I_TickerRow[]) => {
      const retValue = [] as I_EvaluatedPosition[];
      const pattern=[];
      const study1= new Study1();
      const _retValue=study1.eval(ticker,positionRows,studyParams,rows);
      const shorterVolatilityPC= studyParams.shorterVolatilityPC;
      _retValue.forEach((p) => {
         let openDate = p.position.openDate;
         let closeDate = p.closeRow.date;
         let openPrice = p.position.openPrice;
         let targetUpPrice = openPrice * (1 + shorterVolatilityPC / 100);
         let targetDownPrice = openPrice * (1 - shorterVolatilityPC / 100);
         const _rows= rows.filter((r) => r.date >= openDate && r.date <= closeDate);
         _rows.forEach((r) => {
         //    
            if(r.open >= targetUpPrice){
               pattern.push({"pattern":"+",
                              "dateOpen":openDate,
                              "dateClose":r.date,
                              "priceOpen":openPrice,
                              "priceClose":r.open,
                              "days":(r.date.getTime() - openDate.getTime())/ (1000 * 60 * 60 * 24)
                           
                            });
               openDate = r.date;
               openPrice = r.open;
               targetUpPrice = openPrice * (1 + shorterVolatilityPC / 100);
               targetDownPrice = openPrice * (1 - shorterVolatilityPC / 100);
            }
            else if(r.open <= targetDownPrice){
               pattern.push({"pattern":"-",
                  "dateOpen":openDate,
                  "dateClose":r.date,
                  "priceOpen":openPrice,
                  "priceClose":r.open,
                  "days":(r.date.getTime() - openDate.getTime())/ (1000 * 60 * 60 * 24)
               
                           });
               openDate = r.date;
               openPrice = r.open;
               targetUpPrice = openPrice * (1 + shorterVolatilityPC / 100);
               targetDownPrice = openPrice * (1 - shorterVolatilityPC / 100);
            }

         });

         retValue.push({...p,
            meta:{...p.meta,pattern:pattern}
         });
      });
      return retValue;

   };
}

