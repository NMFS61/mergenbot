import { I_TickerRow } from "./ITickerData";

export interface I_CollectedPosition{
    openRow:I_TickerRow;
    openPrice:number;
    openDate:Date;
    meta:any;
}
export interface I_EvaluatedPosition{
    position:I_CollectedPosition;
    closeRow:I_TickerRow;
    closePrice:number;// Rather then relying on Row, because it can be high,low,open,close of the row
    days:number; // either close day, or 
    success:boolean;
    profitPC:number;
    meta:any;
}
export interface I_Study{
    collect:() => I_CollectedPosition[];
    eval:()=>I_EvaluatedPosition[];
}
interface I_StudyExecParams{
    rows:I_TickerRow[]; // all the historical data|
    dateFrom?:Date;
    dateTo?:Date;
    dateAll:boolean;
    studyParams:any;

}