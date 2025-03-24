import { STOCKS_US } from "@/app/constants/data/_stocksUS";
import CustomCard from "../../ui/CustomCard";
import CustomizedTickerHook from "../../ui/CustomizedTickerHook";
import { TickerBasicInfo } from "@/app/interface/ITickerExtra";
import { MARKET_GROUPS } from "@/app/constants/data/market-groups";
import { Checkbox, FormControlLabel } from "@mui/material";
import React from "react";
const nasdaq100Tickers=MARKET_GROUPS.find((group)=>group.name==="NASDAQ 100")?.tickers;
const nasdaq100TickersList=STOCKS_US.filter((stock)=>nasdaq100Tickers.includes(stock.Code)) as TickerBasicInfo[];
const nyse100Tickers=MARKET_GROUPS.find((group)=>group.name==="NYSE 100")?.tickers;
const nyse100TickersList=STOCKS_US.filter((stock)=>nyse100Tickers.includes(stock.Code)) as TickerBasicInfo[];
const nyse200Tickers=MARKET_GROUPS.find((group)=>group.name==="NYSE 200")?.tickers;
const nyse200TickersList=STOCKS_US.filter((stock)=>nyse200Tickers.includes(stock.Code)) as TickerBasicInfo[];

interface IProp{
  onUpdatedItems: (tickerList:TickerBasicInfo[]) => void;
}
export default function StockChoicePanelUS(props:IProp) {
    const [allNASDAQ100, setAllNASDAQ100] = React.useState(true);
    const [allNYSE100, setAllNYSE100] = React.useState(true);
    const [allNYSE200, setAllNYSE200] = React.useState(true);

    const [selectedItems, setSelectedItems] = React.useState([] as TickerBasicInfo[]);
    const updateSelectedItems= (tickerList:TickerBasicInfo[])=>{
        setSelectedItems(tickerList);
    };

  return (
    <>
   
      <FormControlLabel control={<Checkbox defaultChecked onChange={(e)=>{setAllNASDAQ100(e.target.checked)}}/>} label="All NASDAQ 100" />
      <FormControlLabel control={<Checkbox defaultChecked onChange={(e)=>{setAllNYSE100(e.target.checked)}}/>} label="All NYSE 100" />
      <FormControlLabel control={<Checkbox defaultChecked onChange={(e)=>{setAllNYSE200(e.target.checked)}}/>} label="All NYSE 200" />

      { !allNASDAQ100 &&
      <CustomizedTickerHook title="NASDAQ 100"
                      tickerList={nasdaq100TickersList}
                      onValuesUpdate={updateSelectedItems}/>
     }
      { !allNYSE100 &&
      <CustomizedTickerHook title="NYSE 100"
                      tickerList={nyse100TickersList}
                      onValuesUpdate={updateSelectedItems}/>
     }
   
     { !allNYSE200 &&
      <CustomizedTickerHook title="NYSE 200"
                      tickerList={nyse200TickersList}
                      onValuesUpdate={updateSelectedItems}/>
     }
   
    </>
  );
}
