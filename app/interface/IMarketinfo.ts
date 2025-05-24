import { I_TickerDivRow, I_TickerRow, I_TickerSplitRow } from "./ITickerData"

export interface MarketGroups {
        name: string
        exchange: string
        tickers: string[]
      }

export interface MarketGroupsWithMeta {
        name: string
        exchange: string
        tickers: TickerMD[]
}

export interface TickerMD{
    Ticker: string
    Name: string
    Exchange: string
    Currency: string
    Sector: string
}