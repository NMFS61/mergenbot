import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
export default function MarketsChoice() {
    const [selectedMarkets,setSelectedMarkets]=React.useState<'*'|'allStocks'|'forex'|'crypto'|'custom'>('*');
    const [customSelection,setCustomSelection]=React.useState({"FTSE100":false,"FTSE250":false,"NYSE100":false,"NYSE200":false,"NASDAQ100":false,"BIST30":false,"BIST50":false,"BIST100":false});
    
    const handleCustomChange=(marketName:string)=>{
        console.log(marketName);
        const currentChecked = customSelection[marketName.replace(" ","")];
        const newSelection = {...customSelection, [marketName.replace(" ","")]: !currentChecked};
        console.log(newSelection);
        setCustomSelection(newSelection);
    }
    React.useEffect(() => {

    }, [selectedMarkets]);
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Markets</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
        onChange={(event) => setSelectedMarkets(event.target.value as '*'|'allStocks'|'forex'|'crypto'|'custom' )}
      >
        <FormControlLabel value="*" control={<Radio />} label="All markets" />
        <FormControlLabel value="allStocks" control={<Radio />} label="All stock markets" />
        <FormControlLabel value="forex" control={<Radio />} label="Forex" />
        <FormControlLabel value="custom" control={<Radio />} label="Custom" />
      </RadioGroup>
      {selectedMarkets === 'custom' && 
      ( 
        <FormGroup>
            <FormControlLabel control={<Checkbox checked={customSelection.FTSE100} onChange={(e)=>handleCustomChange('FTSE 100')}/>} label="FTSE 100" />
            <FormControlLabel control={<Checkbox checked={customSelection.FTSE250}/>} onChange={(e)=>handleCustomChange('FTSE 250')} label="FTSE 250" />
            <FormControlLabel control={<Checkbox checked={customSelection.NYSE100}/>} onChange={(e)=>handleCustomChange('NYSE 100')} label="NYSE 100" />
            <FormControlLabel control={<Checkbox checked={customSelection.NYSE200}/>} onChange={(e)=>handleCustomChange('NYSE 200')} label="NYSE 200" />
            <FormControlLabel control={<Checkbox checked={customSelection.NASDAQ100}/>} onChange={(e)=>handleCustomChange('NASDAQ 100')} label="NASDAQ 100" />
            <FormControlLabel control={<Checkbox checked={customSelection.BIST30}/>} onChange={(e)=>handleCustomChange('BIST 30')} label="BIST 30" />
            <FormControlLabel control={<Checkbox checked={customSelection.BIST50}/>} onChange={(e)=>handleCustomChange('BIST 50')} label="BIST 50" />
            <FormControlLabel control={<Checkbox checked={customSelection.BIST100}/>} onChange={(e)=>handleCustomChange('BIST 100')} label="BIST 100" />
        </FormGroup>
        
      )}
    </FormControl>
    )
}
