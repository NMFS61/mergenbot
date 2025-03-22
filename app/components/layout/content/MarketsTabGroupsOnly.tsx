import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import { Checkbox, FormControlLabel } from '@mui/material';
interface IProp{
  onGroupSelectionChange: (selectedGroups:string[]) => void;
}
export default function MarketsTabGroupsOnly(props: IProp) {
  const [value, setValue] = React.useState('1');
  const [selectedAllNASDAQ100, setAllNASDAQ100] = React.useState(false);
  const [selectedAllNYSE100, setAllNYSE100] = React.useState(false);
  const [selectedAllNYSE200, setAllNYSE200] = React.useState(false);
  const [selectedAllFTSE100, setAllFTSE100] = React.useState(false);
  const [selectedAllFTSE250, setAllFTSE250] = React.useState(false);
  const [selectedAllBIST30, setAllBIST30] = React.useState(false);
  const [selectedAllBIST50, setAllBIST50] = React.useState(false);
  const [selectedAllBIST100, setAllBIST100] = React.useState(false);
  const [selectedAllForexPairs, setAllForexPairs] = React.useState(false);   
  
  React.useEffect(() => {
    let selectedGroups:string[]=[];
    if(selectedAllNASDAQ100) selectedGroups.push("NASDAQ 100");
    if(selectedAllNYSE100) selectedGroups.push("NYSE 100");
    if(selectedAllNYSE200) selectedGroups.push("NYSE 200");
    if(selectedAllFTSE100) selectedGroups.push("FTSE 100");
    if(selectedAllFTSE250) selectedGroups.push("FTSE 250");
    if(selectedAllBIST30) selectedGroups.push("BIST 30");
    if(selectedAllBIST50) selectedGroups.push("BIST 50");
    if(selectedAllBIST100) selectedGroups.push("BIST 100");
    if(selectedAllForexPairs) selectedGroups.push("FOREX");
    props.onGroupSelectionChange(selectedGroups);
  }, 
  [selectedAllNASDAQ100,selectedAllNYSE100,selectedAllNYSE200,selectedAllFTSE100,selectedAllFTSE250,
   selectedAllBIST30,selectedAllBIST50,selectedAllBIST100,selectedAllForexPairs]);

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
        <TabPanel value="1"> 
              <FormControlLabel control={<Checkbox checked={selectedAllNASDAQ100}  onChange={(e)=>{setAllNASDAQ100(e.target.checked)}}/>} label="All NASDAQ 100" />
              <FormControlLabel control={<Checkbox checked={selectedAllNYSE100}  onChange={(e)=>{setAllNYSE100(e.target.checked)}}/>} label="All NYSE 100" />
              <FormControlLabel control={<Checkbox checked={selectedAllNYSE200}  onChange={(e)=>{setAllNYSE200(e.target.checked)}}/>} label="All NYSE 200" />
        </TabPanel>
        <TabPanel value="2">
              <FormControlLabel control={<Checkbox checked={selectedAllFTSE100}  onChange={(e)=>{setAllFTSE100(e.target.checked)}}/>} label="All FTSE 100" />
              <FormControlLabel control={<Checkbox checked={selectedAllFTSE250}  onChange={(e)=>{setAllFTSE250(e.target.checked)}}/>} label="All FTSE 250" />
        </TabPanel>
        <TabPanel value="3">
              <FormControlLabel control={<Checkbox checked={selectedAllBIST30}  onChange={(e)=>{setAllBIST30(e.target.checked)}}/>} label="All BIST 30" />
              <FormControlLabel control={<Checkbox checked={selectedAllBIST50}  onChange={(e)=>{setAllBIST50(e.target.checked)}}/>} label="All BIST 50" />
              <FormControlLabel control={<Checkbox checked={selectedAllBIST100}  onChange={(e)=>{setAllBIST100(e.target.checked)}}/>} label="All BIST 100" />
          </TabPanel>
        <TabPanel value="4">
              <FormControlLabel control={<Checkbox checked={selectedAllForexPairs}  onChange={(e)=>{setAllForexPairs(e.target.checked)}}/>} label="All FOREX PAIRS" />
          </TabPanel>
      </TabContext>
    </Box>
  );
}
