import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import StockChoicePanelUS from './StockChoicePanelUS';
import StockChoicePanelUK from './StockChoicePanelUK';
import StockChoicePanelTR from './StockChoicePanelTR';
import StockChoicePanelFOREX from './StockChoicePanelFOREX';
import { TickerBasicInfo } from '@/app/interface/tickerInfo';
import { a } from '@react-spring/web';
interface IProp{
  onTickerDataChange: (changeGroup:string,selectedTickerData:TickerBasicInfo[]) => void;
}
export default function MarketsTab(props: IProp) {
  const [value, setValue] = React.useState('1');
  const [selectedUKTickers, setSelectedUKTickers] = React.useState([] as TickerBasicInfo[]);
  const [selectedUSTickers, setSelectedUSTickers] = React.useState([] as TickerBasicInfo[]);
  const [selectedTRTickers, setSelectedTRTickers] = React.useState([] as TickerBasicInfo[]);
  const [selectedFOREXTickers, setSelectedFOREXTickers] = React.useState([] as TickerBasicInfo[]);
  
  // Update the base component with the selected tickers
  React.useEffect(() => {props.onTickerDataChange("UK",selectedUKTickers);}, [selectedUKTickers]);
  React.useEffect(() => {props.onTickerDataChange("US",selectedUSTickers);}, [selectedUSTickers]);
  React.useEffect(() => {props.onTickerDataChange("TR",selectedTRTickers);}, [selectedTRTickers]);
  React.useEffect(() => {props.onTickerDataChange("FOREX",selectedFOREXTickers);}, [selectedFOREXTickers]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="USA Stocks" value="1" />
            <Tab label="UK Stocks" value="2" />
            <Tab label="Turkish Stocks" value="3" />
            <Tab label="FOREX" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1"> <StockChoicePanelUS onUpdatedItems={(tickers)=>setSelectedUSTickers} /></TabPanel>
        <TabPanel value="2"><StockChoicePanelUK onUpdatedItems={(tickers)=>setSelectedUKTickers}/></TabPanel>
        <TabPanel value="3"><StockChoicePanelTR onUpdatedItems={(tickers)=>setSelectedTRTickers}/></TabPanel>
        <TabPanel value="4"><StockChoicePanelFOREX onUpdatedItems={(tickers)=>setSelectedFOREXTickers}/></TabPanel>
      </TabContext>
    </Box>
  );
}
