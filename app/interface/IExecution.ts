import { type } from "os";
import { I_TickerRow } from "./ITickerData";
import { TickerMD } from "./IMarketinfo";

export interface I_CollectedPosition{
    openRow:I_TickerRow;
    openPrice:number;
    openDate:Date;
    conditionMetIn: number;
    conditionStartDate: Date;
    conditionStartPrice: number;
    meta:any;
}
export interface I_EvaluatedPosition{
    ticker:string;
    position:I_CollectedPosition;
    closeRow:I_TickerRow;
    closePrice:number;// Rather then relying on Row, because it can be high,low,open,close of the row
    days:number; // either close day, or 
    success:boolean;
    profitPC:number;
    meta:any;
}
export interface I_StudyExec_indexGroup_Result{
    exchange:string;
    indexGroup:string;
    execResults:I_EvaluatedPosition[];
}
export interface I_Study{
    collect:(studyParams:any,rows:I_TickerRow[],ticker?:string) => I_CollectedPosition[];
    eval:(ticker:string,positionRows: I_CollectedPosition[],studyParams:any,rows: I_TickerRow[])=>I_EvaluatedPosition[];
}

export interface I_StudyExecParams{
    studyId:string;
    dateFrom?:Date;
    dateTo?:Date;
    dateAll:boolean;
    marketParams:I_MarketParams;
    studyParams:any;
}

export interface I_MarketParams{
    markets:string[];
    tickers:TickerMD[];
}