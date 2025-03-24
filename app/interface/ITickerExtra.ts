export interface TickerBasicInfo{
    Code: string
    Name: string
    Country: string
    Exchange: string
    Currency: string
    Type: string
    Isin: string
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


