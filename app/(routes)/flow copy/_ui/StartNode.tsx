import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import BasicDatePicker from '@/app/components/ui/BasicDatePicker';
import CustomCard from '@/app/components/ui/CustomCard';

export default function StartNode() {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">Start</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <CustomCard title='Date'>
            <br/>
          <BasicDatePicker label='Start Date' onChange={(d)=>console.log(d)}/>
          <BasicDatePicker label='End Date' onChange={(d)=>console.log(d)}/>
          </CustomCard>
        </AccordionDetails>
      </Accordion>

    </div>
  );
}