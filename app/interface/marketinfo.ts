export interface StockExchangeData {
    change30D: number;
    change90D: number;
    changeY1: number;
    changeY2: number;
    changeY5: number;

}

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