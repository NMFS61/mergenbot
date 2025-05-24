import { STOCKS_IS } from "@/app/constants/data/_stocksIS";
import CustomCard from "../../ui/CustomCard";
import CustomizedTickerHook from "@/app/components/ui/CustomizedTickerHook";
import { TickerBasicInfo } from "@/app/interface/ITickerExtra";
import { INDEX_GROUPS } from "@/app/constants/data/market-groups";
import { Checkbox, FormControlLabel } from "@mui/material";
import React from "react";
const bist30Tickers=INDEX_GROUPS.find((group)=>group.name==="BIST 30")?.tickers;
const bist30TickersList=STOCKS_IS.filter((stock)=>bist30Tickers.includes(stock.Code)) as TickerBasicInfo[];

const bist50Tickers=INDEX_GROUPS.find((group)=>group.name==="BIST 50")?.tickers;
const bist50TickersList=STOCKS_IS.filter((stock)=>bist50Tickers.includes(stock.Code)) as TickerBasicInfo[];

const bist100Tickers=INDEX_GROUPS.find((group)=>group.name==="BIST 100")?.tickers;
const bist100TickersList=STOCKS_IS.filter((stock)=>bist100Tickers.includes(stock.Code)) as TickerBasicInfo[];

interface IProp{
  onUpdatedItems: (tickerList:TickerBasicInfo[]) => void;
}
export default function StockChoicePanelTR(props:IProp) {
    const [allBIST30, setAllBIST30] = React.useState(true);
    const [allBIST50, setAllBIST50] = React.useState(true);
    const [allBIST100, setAllBIST100] = React.useState(true);

    const [selectedItems, setSelectedItems] = React.useState([] as TickerBasicInfo[]);
    
    const updateSelectedItems= (tickerList:TickerBasicInfo[])=>{
        setSelectedItems(tickerList);
    };

  return (
    <>
   
   <FormControlLabel control={<Checkbox defaultChecked onChange={(e)=>{setAllBIST30(e.target.checked)}}/>} label="All BIST 30" />
   <FormControlLabel control={<Checkbox defaultChecked onChange={(e)=>{setAllBIST50(e.target.checked)}}/>} label="All BIST 50" />
   <FormControlLabel control={<Checkbox defaultChecked onChange={(e)=>{setAllBIST100(e.target.checked)}}/>} label="All BIST 100" />
     
      { !allBIST30 &&
      <CustomizedTickerHook title="BIST 30"
                      tickerList={bist30TickersList}
                      onValuesUpdate={updateSelectedItems}/>
     }
     { !allBIST50 &&
      <CustomizedTickerHook title="BIST 50"
                      tickerList={bist50TickersList}
                      onValuesUpdate={updateSelectedItems}/>
     }
     { !allBIST100 &&
      <CustomizedTickerHook title="BIST 100"
                      tickerList={bist100TickersList}
                      onValuesUpdate={updateSelectedItems}/>
     }
     
   
    </>
  );
}
