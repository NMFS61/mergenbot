export interface I_TickerRow{
    date:Date;
    open: number;
    close: number;
    low: number;
    high: number;
    volume: number;
}

export interface I_TickerSplitRow{
    date: Date
    split: string
    multiplyFactor:number
}

export interface I_TickerDivRow{
    date: Date
    div: number
    currency:string
    yield?:number
}
