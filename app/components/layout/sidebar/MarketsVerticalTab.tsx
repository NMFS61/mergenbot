import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import { TickerBasicInfo } from '@/app/interface/tickerInfo';
import { a } from '@react-spring/web';
interface IProp{
  onSelectionChange: (selectedGroups:string[]) => void;
}
export default function MarketsVerticalTab(props: IProp) {
  const [value, setValue] = React.useState('1');
  const [selectedGroups, setSelectedGroups] = React.useState(false);
  
  
  // Update the base component with the selected tickers
  React.useEffect(() => {props.onSelectionChange([]);}, [selectedGroups]);
 
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="Exchanges"  orientation="vertical">
            <Tab label="USA Stocks" value="1" />
            <Tab label="UK Stocks" value="2" />
            <Tab label="Turkish Stocks" value="3" />
            <Tab label="FOREX" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1"> aaaaa</TabPanel>
        <TabPanel value="2">aaaaa</TabPanel>
        <TabPanel value="2">aaaaa</TabPanel>
        <TabPanel value="2">aaaaa</TabPanel>
      </TabContext>
    </Box>
  );
}
