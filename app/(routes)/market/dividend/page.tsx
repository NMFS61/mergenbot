import { getMarketGroupsWithMeta } from "@/app/helpers/readMarketMetaData";
import PageContent from "./pageContent";
import { readCSVSync, readCSVSync_Div, readCSVSync_Split } from "@/app/helpers/pandas";
import { TickerDivData } from "@/app/interface/tickerInfo";
import { IGroupDivStats } from "@/app/components/ui/grids/DividendSummaryGrid";

const getDivSummary=(divs,rows)=>{
    const firstDate = rows[0].date;
    const rows2017 = rows.filter((r) => r.date >= new Date(2017, 0, 1));
    const price2017 = rows2017[0].open;
    const rows2020 = rows.filter((r) => r.date >= new Date(2018, 0, 1));
    const price2020 = rows2020[0].open;
    const rows2023 = rows.filter((r) => r.date >= new Date(2018, 0, 1));
    const price2023 = rows2023[0].open;
    let y = firstDate.getFullYear();
   
    const yearsToCheck = [];
    const results=[]
    while (y < 2025){
      yearsToCheck.push(y);
      y++;
    }
    let divCounter=0;
    let yield1720=0;
    let yield2023=0;
    let yield2324=0;
    const divTotals=[] as {key:string,total:number}[];
    yearsToCheck.forEach((yy)=>{
      const yearDivs=divs.filter((d)=>d.date.getFullYear()==yy);
      let total=0;
      yearDivs.forEach((d)=>{total=total+d.div});
      divTotals.push({key:yy.toString(),"total":total})
    })
    divTotals.forEach((d) => {
       const divYear=parseInt(d.key);
  
       if(yearsToCheck.includes(divYear) && d.total>0) {divCounter++;}
       
       if(divYear>=2017 && divYear<=2020 ){ yield1720=yield1720+(d.total/ price2017);}
       if(divYear>=2020 && divYear<=2023 ){ yield2023=yield2023+(d.total/ price2020);}
       if(divYear>=2023 && divYear<=2024 ){ yield2324=yield2324+(d.total/ price2023);}
     
     });
    
    return {
                  "allYearCoverage":divCounter/yearsToCheck.length,
                  "yield17":yield1720/4,
                  "yield20":yield2023/4,
                  "yield23":yield1720/2
          }
  }

  const getSharesByDividendYield = () => {
    const retVal=[] as IGroupDivStats[]
    const allDivs=[];
    getMarketGroupsWithMeta().forEach((group) => {
      if (group.name != "FOREX") {
        const divsForGroup=[];
        const divSummaryResults = [];
  
        group.tickers.forEach((ticker) => {
          const rows = readCSVSync(ticker.Ticker, group.exchange, "D1");
          const divs = readCSVSync_Div(ticker.Ticker, group.exchange);
        //   const splits = readCSVSync_Split(ticker.Ticker, group.exchange);
          if(divs.length>0){
            const divSummary=getDivSummary(divs,rows);
            divSummaryResults.push({"ticker":ticker.Ticker,"tickerName":ticker.Name,"exchange":group.exchange,"group":group.name,
              "divYearCoverage":divSummary.allYearCoverage,
              "yield17":divSummary.yield17,
              "yield20":divSummary.yield20,
              "yield23":divSummary.yield23,
              "yieldAvg1":(divSummary.yield17+divSummary.yield20+divSummary.yield23)/3,
              })
          }
          else{
            divSummaryResults.push({"ticker":ticker.Ticker,"tickerName":ticker.Name,"exchange":group.exchange,"group":group.name,
              "divYearCoverage":0,
              "yield17":0,
              "yield20":0,
              "yield23":0,
              "yieldAvg1":0
      
            })
          }
          divsForGroup.push(divs); // Ticker's divs for the group
        retVal.push({"group":group.name,"divSummaries":divSummaryResults,"divs":divsForGroup})
        });
        //   {}
      }
    });
    return retVal;
  }
function Page() {
    const divResults=getSharesByDividendYield();
    return (
        <PageContent results={divResults}/>
      );
}

export default Page;