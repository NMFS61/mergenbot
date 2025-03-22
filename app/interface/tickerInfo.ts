export interface TickerBasicInfo{
    Code: string
    Name: string
    Country: string
    Exchange: string
    Currency: string
    Type: string
    Isin: string
}

export interface PositionResult{
    ticker: string;
    position:PositionData;
    positionClose:TickerData;
    success?:boolean;
    days?:number;
    meta?:any;
}
export interface TickerSplitData{
    date: Date
    split: string
    multiplyFactor:number
}
export interface TickerDivData{
    date: Date
    div: number
    currency:string
    yield?:number
}
export interface I_TickerSummary{
    ticker: string
    tickerName: string
    exchange: string
    group: string
    divYearCoverage: number
    yield17: number
    yield20: number
    yield23: number
    yieldAvg1: number
    
}
export interface TickerData{
    date: Date
    open: number
    high: number
    low: number
    close: number
    volume: number
}
export interface I_CollectPositions{
    positionRows:PositionData[]
    meta:any
}
export interface PositionData{
    date: Date
    open: number
    high: number
    low: number
    close: number
    volume: number
    conditionMetIn:number
    conditionStartDate:Date
    conditionStartPrice:number
}

export interface TickerDataEnhanced{
    date: string
    open: number
    high: number
    low: number
    close: number
    volume:number;
    changePC:number;
    volatilityHighLow:number;
}

export interface TickerDataEnhanced2{
    date: string
    open: number
    high: number
    low: number
    close: number
    volume:number;
    changePC:number;
    volatilityHighLow:number;
    ma3:number;
    ma10:number;
    ma15:number;
    ma30:number;
    ma90:number;
    ma180:number;
    ma365:number;
    ma780:number;
    ma1825:number;
}