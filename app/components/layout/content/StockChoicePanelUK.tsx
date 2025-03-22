import { STOCKS_LSE } from "@/app/constants/data/_stocksLSE";
import CustomCard from "../../ui/CustomCard";
import CustomizedTickerHook from "../../ui/CustomizedTickerHook";
import { TickerBasicInfo } from "@/app/interface/tickerInfo";
import { MARKET_GROUPS } from "@/app/constants/data/market-groups";
import { Checkbox, FormControlLabel } from "@mui/material";
import React from "react";
const ftse100Tickers=MARKET_GROUPS.find((group)=>group.name==="FTSE 100")?.tickers;
const ftse100TickersList=STOCKS_LSE.filter((stock)=>ftse100Tickers.includes(stock.Code)) as TickerBasicInfo[];
const ftse250Tickers=MARKET_GROUPS.find((group)=>group.name==="FTSE 250")?.tickers;
const ftse250TickersList=STOCKS_LSE.filter((stock)=>ftse250Tickers.includes(stock.Code)) as TickerBasicInfo[];

interface IProp{
  onUpdatedItems: (tickerList:TickerBasicInfo[]) => void;
}
export default function StockChoicePanelUK(props:IProp) {
    const [allFTSE100, setAllFTSE100] = React.useState(true);
    const [allFTSE250, setAllFTSE250] = React.useState(true);

    const [selectedItems, setSelectedItems] = React.useState([] as TickerBasicInfo[]);
    const updateSelectedItems= (tickerList:TickerBasicInfo[])=>{
        setSelectedItems(tickerList);
    };
  return (
    <>
   
      <FormControlLabel control={<Checkbox defaultChecked onChange={(e)=>{setAllFTSE100(e.target.checked)}}/>} label="All FTSE 100" />
      <FormControlLabel control={<Checkbox defaultChecked onChange={(e)=>{setAllFTSE250(e.target.checked)}}/>} label="All FTSE 250" />
      { !allFTSE100 &&
      <CustomizedTickerHook title="FTSE 100"
                      tickerList={ftse100TickersList}
                      onValuesUpdate={updateSelectedItems}/>
     }
     { !allFTSE250 &&
      <CustomizedTickerHook title="FTSE 250"
                      tickerList={ftse250TickersList}
                      onValuesUpdate={updateSelectedItems}/>
     }
   
    </>
  );
}
