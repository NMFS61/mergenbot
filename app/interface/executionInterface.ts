import { TickerBasicInfo } from "./tickerInfo";

export interface IExec_DateParams{
    allDates: boolean;
    dateStart?: Date;
    dateEnd?: Date;
}
export interface IExec_MarketParams{
   marketsInputStr:string; // all, allStocks, allForex, other
   exchanges?: string[]; // LSE, IS, NYSE , NASDAQ
   groups?: string[]; // FTSE100, FTSE250, BIST30, etc
   tickers?: TickerBasicInfo[];
}