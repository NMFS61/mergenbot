import { MarketGroupsWithMeta } from "./IMarketinfo";
import { I_TickerDivRow, I_TickerRow, I_TickerSplitRow } from "./ITickerData";

export interface I_Context{
    userCtx:I_UserContext;
    securityCtx:I_SecurityContext;
    appCtx:I_AppContext;
    localCtx:I_LocalContext;
}

interface I_UserContext{
    
}
interface I_SecurityContext{
    
}
interface I_LocalContext{
    params:{key:string,value:any}[]
}

interface I_AppContext{
    meta:MarketGroupsWithMeta[]
    marketData:I_AppCtx_MarketRows
}

export interface I_AppCtx_MarketRows
{
    indexGroup:string;
    ticker:string;
    rowsHD:I_TickerRow[];
    rowsDIV:I_TickerDivRow[];
    rowsSPLIT:I_TickerSplitRow[];
}