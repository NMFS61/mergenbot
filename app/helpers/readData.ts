import { MarketGroupsWithMeta } from "@/app/interface/marketinfo";
import { readFileSync, existsSync } from "fs"
export const checkIfExist=(marketGroup: MarketGroupsWithMeta)=> {
    const rootFolder = process.cwd()+"/data/"+marketGroup.exchange;
    console.log(rootFolder);
    let prefix="";
    marketGroup.tickers.forEach((ticker)=>{
        if (existsSync(rootFolder+"/"+ticker.Ticker+"_D1.csv")) {
            //console.log("File exists");
           }else{
            console.log("File does not exist",marketGroup.exchange,marketGroup.name,ticker.Name,ticker.Ticker);
           }
    });
    
}
export const read=(ticker: string)=> {
    const rootFolder = process.cwd()+"/data";
    const dataFile = readFileSync(rootFolder+"/"+ticker+".json", "utf8");
    
}