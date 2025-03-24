import React, { useEffect } from "react";
// Mui component imports
import Grid from "@mui/material/Grid2";
// Custom component imports
import SidebarHome from "@/app/components/layout/sidebar/SidebarHome";
import StudyParams from "../execParams/StudyParamsHandler";
import DateIntervalSelection, { IDatesData } from "@/app/components/layout/sidebar/DateIntervalSelection";
import MarketGroupSelection from "@/app/components/layout/sidebar/MarketChoiceSelection";
import { I_Warning } from "@/app/interface/IComponents";


interface IProp{
  open:boolean;
  studyID:string;
  gridSize:number;
  onDateChange:(dateData:IDatesData)=>void;
  onMarketChange:(marketchoice:string)=>void;
  onStudyParamsChange:(studyParams:any)=>void;
  onExecutableChange:(executable:boolean)=>void;
  onValidationWarningsChange:(warnings:I_Warning[])=>void;
}

export default function StudySidebar(props:IProp) {
  // states
    const [warnings, setWarnings] = React.useState([] as I_Warning[]);
    const [isStudyParamsExecutable, setStudyParamsExecutable] = React.useState(false);
    const [isMarketChoiceExecutable, setMarketChoiceExecutable] = React.useState(false);
    const [studyParams, setStudyParams] = React.useState({});
    const [datesData, setDatesData] = React.useState({"allDates":true,"dateStart":new Date(),"dateEnd":new Date()} as IDatesData);
    const [marketGroupChoice,setmarketGroupChoice]=React.useState("all");

  // handling functions
  const updateDates = (dateData:IDatesData) => {setDatesData(dateData);}
  const updateWarnings = (origin,warningList:string[]) => {
    const newWarnings=warnings.filter((w)=>w.origin!=origin) as I_Warning[]; //cleared all the origin ones
    warningList.forEach((w)=>{newWarnings.push({"origin":origin,"text":w} as I_Warning)})
    setWarnings(newWarnings);
  }
    
  // useEffects 
    // Check date selection
    useEffect(()=>{
      if(datesData.allDates || datesData.dateStart.getTime()<datesData.dateEnd.getTime()){
        updateWarnings("Date",[])
      }else{
        updateWarnings("Date",["Either it should be all dates, or 'Start date' should be earlier than 'End date'"])
      }
    },[datesData]);
    // Check if market choice is good for execution
    useEffect(()=>{
      props.onMarketChange(marketGroupChoice);
    },[marketGroupChoice]);
    // Check if dates are good for execution
    useEffect(()=>{
      props.onDateChange(datesData);
    },[datesData])
    // Check if dates are good for execution
    useEffect(()=>{
      props.onStudyParamsChange(studyParams);
    },[studyParams])
    // Check study param warnings raised by study
    useEffect(()=>{
      props.onValidationWarningsChange(warnings);
    },[warnings])
    // Check if Study is executable (no warnings)
    useEffect(()=>{
      props.onExecutableChange(warnings.length==0);
    },[warnings])
  
  // Visual Return
    return (

    <Grid size={props.gridSize}>     

      <SidebarHome />
      <StudyParams studyId={props.studyID} 
                   updateWarnings={(w)=>updateWarnings("StudyParams",w)} 
                   updateParams={setStudyParams}
                   />
      <DateIntervalSelection onDatesDataChange={updateDates}  />
      <MarketGroupSelection marketChoiceChanged={setmarketGroupChoice}/>

    </Grid>

      );
}

