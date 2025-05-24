import { STOCKS_LSE } from "@/app/constants/data/_stocksLSE";
import CustomCard from "../../ui/CustomCard";
import CustomizedTickerHook from "../../ui/CustomizedTickerHook";
import { TickerBasicInfo } from "@/app/interface/ITickerExtra";
import { INDEX_GROUPS } from "@/app/constants/data/market-groups";
import { Checkbox, FormControlLabel } from "@mui/material";
import React from "react";
const forexTickers=INDEX_GROUPS.find((group)=>group.name==="FOREX")?.tickers;
const forexTickersList=[] as TickerBasicInfo[];
forexTickers.forEach((val)=>{forexTickersList.push({"Code":val,"Country":"","Currency":"","Exchange":"FOREX","Isin":"","Name":"","Type":""}) });

interface IProp{
   onUpdatedItems: (tickerList:TickerBasicInfo[]) => void;
}
export default function StockChoicePanelFOREX(props) {
    const [allForexPairs, setAllForexPairs] = React.useState(true);
    const [selectedItems, setSelectedItems] = React.useState([] as TickerBasicInfo[]);
    
    const updateSelectedItems= (tickerList:TickerBasicInfo[])=>{
        setSelectedItems(tickerList);
    };

  return (
    <>
   
      <FormControlLabel control={<Checkbox defaultChecked onChange={(e)=>{setAllForexPairs(e.target.checked)}}/>} label="All FOREX PAIRS" />
      
      { !allForexPairs &&
      <CustomizedTickerHook title="FOREX Pairs"
                      tickerList={forexTickersList}
                      onValuesUpdate={updateSelectedItems}/>
     }
   
    </>
  );
}
