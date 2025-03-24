import CustomCard from "@/app/components/ui/CustomCard";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
interface IProp {
    marketChoiceChanged: (choice:string) => void;
}
export default function MarketChoiceSelection(props: IProp) {
    const handleChoiceChange = (choice:string) => {props.marketChoiceChanged(choice);}
    return (
        <CustomCard title="What markets to execute?">
   
                                     <RadioGroup aria-labelledby="demo-radio-buttons-group-label"
                                                 defaultValue="all"
                                                 name="radio-buttons-group"
                                                 onChange={(e)=>handleChoiceChange(e.target.value)}
                                                 >
                                     
                                            <FormControlLabel value="all" control={<Radio />} label="All markets (Stocks, Forex, Crypto)" />
                                            <FormControlLabel value="allStocks" control={<Radio />} label="All Stock markets" />
                                            <FormControlLabel value="AllForex" control={<Radio />} label="All FOREX Pairs" />
                                            <FormControlLabel value="other" control={<Radio />} label="Hand pick" />
                                     </RadioGroup>
                                  </CustomCard> 
      );
}

