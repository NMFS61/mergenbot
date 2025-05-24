export interface I_SearchFilterFundementals{
    date:DateFilters;
    market:MarketFilters;

}

export interface DateFilters{
    dateFrom:Date|"*";
    dateTo:Date|"*";
}

export interface MarketFilters{
    selectBy:"INDEX"|"EXCHAGE"|"TICKERS"|"SINGLE"
    selectedIndexGroups:[];
    selectedExchanges:[];
    selectedTickers:[];
}
