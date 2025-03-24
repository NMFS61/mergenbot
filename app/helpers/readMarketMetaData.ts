import {MARKET_GROUPS} from '@/app/constants/data/market-groups';
import {STOCKS_IS} from '@/app/constants/data/_stocksIS';
import {STOCKS_LSE} from '@/app/constants/data/_stocksLSE';
import {STOCKS_US} from '@/app/constants/data/_stocksUS';
import {TickerMD,MarketGroupsWithMeta} from '@/app/interface/IMarketinfo';

export const getMarketGroupsWithMeta = () => {
    const marketGroupsWithMeta = MARKET_GROUPS.map((group) => {
        
        const tickers = group.tickers.map((ticker) => getTickerMD(ticker,group.exchange));   
        return {
            name: group.name,
            exchange: group.exchange,
            tickers: tickers
        } as MarketGroupsWithMeta;
    });
    return marketGroupsWithMeta;

}

const getTickerMD = (ticker: string,exchange) => {
    let STOCKS;
    if (exchange === "US") {STOCKS = STOCKS_US;} else if (exchange === "LSE") {STOCKS = STOCKS_LSE;} 
    else if (exchange === "IS") {STOCKS = STOCKS_IS;} 
    else if (exchange === "FOREX") {return{Ticker: ticker,Name:"",Exchange: exchange,Currency: "", Sector: ""} as TickerMD;}
    else {
        STOCKS = [];
    }
    
        const tickerMD= STOCKS.find((stock) => stock.Code === ticker);
        if(tickerMD){
            return {
                Ticker: tickerMD.Code,
                Name: tickerMD.Name,
                Exchange: tickerMD.Exchange,
                Currency: tickerMD.Currency,
                Sector: ""
            } as TickerMD
        }
        else {console.log("Error (ticker not found)",ticker,' ,',exchange);return {Ticker: "",Name: "",Exchange: "",Currency: "",Sector: ""} as TickerMD;}
}
