
import { I_CollectPositions, PositionData, PositionResult, TickerData } from "@/app/interface/tickerInfo";
const prompt = require("prompt-sync")({ sigint: true });

const collectHelper_evaluate = (rows: TickerData[],dropIncreaseBy:number,execOption:number)=>{
    // console.log(rows.length);
    // console.log(rows);
    // const age = prompt("press enter ");

    let retVal={"new":false,position:{}};
    let open=rows[0].open;
    let dateOpen=rows[0].date;
    let hitUp=false;
    let hitDown=false;
    let upLevel=open * (1 + (dropIncreaseBy/100))
    let downLevel=open * (1 - (dropIncreaseBy/100))
    let dayCounter=0;
    rows.forEach((row)=>{
         dayCounter++;
         hitUp= hitUp || (row.high>upLevel);
         hitDown=hitDown || (row.low<downLevel);

        const conditionMet=execOption==2?hitDown||hitUp:hitDown&&hitUp;

        if(conditionMet){
            const positionData = {date: row.date, 
                open: row.open, 
                high: row.high, 
                low: row.low, 
                close: row.close, 
                volume: row.volume, 
                conditionMetIn: dayCounter,
                conditionStartDate: rows[0].date,
                conditionStartPrice: rows[0].open};
            retVal={"new":true,position:positionData}
            return retVal;
        }
    });
    return retVal;
}
export function collect(dropIncreaseBy: number,withinDays:number,rows: TickerData[]): I_CollectPositions {
    const retValue={} as I_CollectPositions; // positions + meta in case we need
    const positions = [];
   let i=0;
   let len=rows.length;
    rows.forEach((row)=>{
        if(i<=len-withinDays){ 
            const p=collectHelper_evaluate(rows.slice(i,i+withinDays),dropIncreaseBy,1);
            if(p.new){positions.push(p.position);}
        }
        i=i+1;
    });
    retValue.positionRows=positions;
    retValue.meta={};
    return retValue;

}

export function collect_2(dropIncreaseBy: number,withinDays:number,rows: TickerData[]): I_CollectPositions {
    const retValue={} as I_CollectPositions; // positions + meta in case we need
    const positions = [];
   let i=0;
   let len=rows.length;
    rows.forEach((row)=>{
        if(i<=len-withinDays){ 
            const p=collectHelper_evaluate(rows.slice(i,i+withinDays),dropIncreaseBy,2);
            if(p.new){positions.push(p.position);}
        }
        i=i+1;
    });
    retValue.positionRows=positions;
    retValue.meta={};
    return retValue;

}

const helper_daysAfter=(today:Date,d:number):Date=>{
    //const today = new Date(); 
    let td=new Date(today.getTime());
    td.setTime(td.getTime()+d*24*60*60*1000);
    return new Date(td);
    
}

export function evalaute(ticker:string,positionRows: PositionData[],rows: TickerData[],targetPercent:number,stopLossPercent:number,op:"BUY"|"SELL",withinDays:number): PositionResult[] {
    const retValue = [];
    
    
    positionRows.forEach((posRow) => {
        const limitDate=withinDays==0?new Date():helper_daysAfter(posRow.date,withinDays);
        
        let p={ticker:ticker,position:posRow} as PositionResult;
         const res=op=="BUY"?
                           rows.filter((r)=>(r.date>posRow.date && r.date<=limitDate &&  r.high>= posRow.low * (1+targetPercent/100)))
                           :
                           rows.filter((r)=>(r.date>posRow.date && r.date<=limitDate && r.high<= posRow.low * (1+targetPercent/100)))
         if (res.length>0) {
            p.positionClose=res[0];
            p.success=true;
            p.days=(res[0].date.getTime()-posRow.date.getTime())/(1000*60*60*24);
         }
         else{
            p.success=false;
            p.positionClose=rows[rows.length-2]; // The last row/last day 
            const lastDate = rows[rows.length-2].date;
            try {
                p.days=(lastDate.getTime()-posRow.date.getTime())/(1000*60*60*24);
            } catch (error) {
                p.days=-1;
            }
            
            
         }
         p.meta={'targetPercent':targetPercent};
         retValue.push(p);
});
return retValue;
}