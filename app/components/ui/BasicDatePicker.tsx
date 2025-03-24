import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface IProp{
label: string;
onChange?: (d: Date) => void;
}
export default function BasicDatePicker(props: IProp) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
     
        <DatePicker label={props.label} onChange={(e)=>{props.onChange(e.toDate())}}/>
    
    </LocalizationProvider>
  );
}
