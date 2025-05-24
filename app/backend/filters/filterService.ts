import { I_Context } from "@/app/interface/IContext";
import { I_SearchFilterFundementals } from "@/app/interface/ISearchFilter";


export function filter(request:I_SearchFilterFundementals,ctx:I_Context){
    let results=[];
    
    if(request.date.dateFrom!='*'){
        
    }
    if(request.date.dateTo!='*'){}
    if(request.market.selectBy=="EXCHAGE"){}
    if(request.market.selectBy=="INDEX"){}
    if(request.market.selectBy=="TICKERS"){}
    if(request.market.selectBy=="SINGLE"){}
    

}