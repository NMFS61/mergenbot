import CustomCard from "@/app/components/ui/CustomCard";
import { Checkbox, FormControlLabel } from "@mui/material";
import BasicDatePicker from "../../ui/BasicDatePicker";
import React, { useEffect } from "react";
interface IProp {
    onDatesDataChange: (dateData:IDatesData) => void;
}
export interface IDatesData{
    allDates: boolean;
    dateStart: Date;
    dateEnd: Date;
}
function DateIntervalSelection(props: IProp) {
    const [allDates, setAllDates] = React.useState(true);
    const [dateStart, setDateStart] = React.useState(new Date());
    const [dateEnd, setDateEnd] = React.useState(new Date());
    useEffect(() => {
        props.onDatesDataChange({allDates,dateStart,dateEnd});
    }, [allDates,dateStart,dateEnd]);
    return (
        <CustomCard title="Date Selection">
                                     <FormControlLabel control={<Checkbox defaultChecked onChange={(e)=>{setAllDates(e.target.checked)}}/>} label="All available dates" />
                                     <br/><br/>
                                     { !allDates &&
                                        <>
                                            <BasicDatePicker label='From' onChange={setDateStart}/>
                                            <br/><br/>
                                            <BasicDatePicker label='To' onChange={setDateEnd}/>
                                            <br/>
                                        </>
}
          </CustomCard>
      );
}

export default DateIntervalSelection;