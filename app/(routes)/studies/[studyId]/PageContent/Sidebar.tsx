import React, { forwardRef, Ref, useEffect } from "react";
// Mui component imports
import Grid from "@mui/material/Grid2";
// Custom component imports
import SidebarHome from "@/app/components/layout/sidebar/SidebarHome";
import StudyParams from "../execParams/StudyParamsHandler";
import DateIntervalSelection, { IDatesData } from "@/app/components/layout/sidebar/DateIntervalSelection";
import MarketGroupSelection from "@/app/components/layout/sidebar/MarketChoiceSelection";
import { I_Warning } from "@/app/interface/IComponents";
import { I_MarketParams, I_StudyExecParams } from "@/app/interface/IExecution";
import { getMarketGroupsWithMeta } from "@/app/helpers/readMarketMetaData";
import { getFirstStudyParams } from "../execParams/studyMetadata";


interface IProp{
  open:boolean;
  studyID:string;
  gridSize:number;
  onMarketChange:(marketchoice:string)=>void;
  onExecutableChange:(executable:boolean)=>void;
  onValidationWarningsChange:(warnings:I_Warning[])=>void;
}
export interface IRefSidebar{
  fetchStudyExecParams:()=>I_StudyExecParams;
}
function StudySidebar(props:IProp,ref:Ref<IRefSidebar>) {
  // states
    const [warnings, setWarnings] = React.useState([] as I_Warning[]);
    const [studyParams, setStudyParams] = React.useState(getFirstStudyParams(props.studyID));
    const [datesData, setDatesData] = React.useState({"allDates":true,"dateStart":new Date(),"dateEnd":new Date()} as IDatesData);
    const [marketGroupChoice,setmarketGroupChoice]=React.useState("all");

  // handling functions
  const updateDates = (dateData:IDatesData) => {setDatesData(dateData);}
  const updateWarnings = (origin,warningList:string[]) => {

    const newWarnings=warnings.filter((w)=>w.origin!=origin) as I_Warning[]; //cleared all the origin ones
    warningList.forEach((w)=>{newWarnings.push({"origin":origin,"text":w} as I_Warning)})
    setWarnings(newWarnings);
  }
  const fetchStudyExecParams=():I_StudyExecParams=>{
     let retVal={} as I_StudyExecParams;
     retVal.studyId=props.studyID;
     // exec param - dates
     if(!datesData.allDates){
      retVal.dateFrom=datesData.dateStart;
      retVal.dateTo=datesData.dateEnd;
      retVal.dateAll=false;
     }
     else {retVal.dateAll=true;}
     // exec param - markets
     let marketParams={} as I_MarketParams;
     const selectedMarkets=[];
     if(marketGroupChoice=="all"){getMarketGroupsWithMeta().forEach((g)=>{selectedMarkets.push(g.name)}) }
     if(marketGroupChoice=="allStocks"){
                         const markets=   getMarketGroupsWithMeta().filter((g)=>g.name!="FOREX");
                         markets.forEach((g)=>{selectedMarkets.push(g.name)})
                        }
     if(marketGroupChoice=="allForex"){selectedMarkets.push("FOREX") }
     if(marketGroupChoice=="other"){}
     marketParams.markets=selectedMarkets;
     marketParams.tickers=[];
     retVal.marketParams=marketParams;
    // exec param - study (this is unique to each study)
     retVal.studyParams=studyParams;
     return retVal;
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
    // send market change to parent (maybe to handle other??)
    useEffect(()=>{
      props.onMarketChange(marketGroupChoice);
    },[marketGroupChoice]);

    // Check study param warnings raised by study
    useEffect(()=>{
      props.onValidationWarningsChange(warnings);
    },[warnings])
    // Check if Study is executable (no warnings)
    useEffect(()=>{
      props.onExecutableChange(warnings.length==0);
    },[warnings])
    
    // useImperative hook to get execution params
      React.useImperativeHandle(ref, () => ({
        fetchStudyExecParams 
  }));
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
export default forwardRef(StudySidebar);

// const StudySidebar = React.forwardRef((props:IProp, ref) => {

//     // states
//     const [warnings, setWarnings] = React.useState([] as I_Warning[]);
//     const [isStudyParamsExecutable, setStudyParamsExecutable] = React.useState(false);
//     const [isMarketChoiceExecutable, setMarketChoiceExecutable] = React.useState(false);
//     const [studyParams, setStudyParams] = React.useState({});
//     const [datesData, setDatesData] = React.useState({"allDates":true,"dateStart":new Date(),"dateEnd":new Date()} as IDatesData);
//     const [marketGroupChoice,setmarketGroupChoice]=React.useState("all");

//     // handling functions
//     const updateDates = (dateData:IDatesData) => {setDatesData(dateData);}
//     const updateWarnings = (origin,warningList:string[]) => {
//       const newWarnings=warnings.filter((w)=>w.origin!=origin) as I_Warning[]; //cleared all the origin ones
//       warningList.forEach((w)=>{newWarnings.push({"origin":origin,"text":w} as I_Warning)})
//       setWarnings(newWarnings);
//     }
    
//   // useEffects 
//     // Check date selection
//     useEffect(()=>{
//       if(datesData.allDates || datesData.dateStart.getTime()<datesData.dateEnd.getTime()){
//         updateWarnings("Date",[])
//       }else{
//         updateWarnings("Date",["Either it should be all dates, or 'Start date' should be earlier than 'End date'"])
//       }
//     },[datesData]);
//     // Check if market choice is good for execution
//     useEffect(()=>{
//       props.onMarketChange(marketGroupChoice);
//     },[marketGroupChoice]);
//     // Check if dates are good for execution
//     useEffect(()=>{
//       props.onDateChange(datesData);
//     },[datesData])
//     // Check if dates are good for execution
//     useEffect(()=>{
//       props.onStudyParamsChange(studyParams);
//     },[studyParams])
//     // Check study param warnings raised by study
//     useEffect(()=>{
//       props.onValidationWarningsChange(warnings);
//     },[warnings])
//     // Check if Study is executable (no warnings)
//     useEffect(()=>{
//       props.onExecutableChange(warnings.length==0);
//     },[warnings])

  
  
//   const [open, setOpen] = React.useState(false);

//   const handleClose = () => {
//     setOpen(false);
//   }; 

//   const handleToggle = () => {
//     setOpen(!open);
//   };

//   React.useImperativeHandle(ref, () => ({
//     handleClose, handleToggle 
//   }));

//   return (
//     <Grid size={props.gridSize}>     

//       <SidebarHome />
//       <StudyParams studyId={props.studyID} 
//                    updateWarnings={(w)=>updateWarnings("StudyParams",w)} 
//                    updateParams={setStudyParams}
//                    />
//       <DateIntervalSelection onDatesDataChange={updateDates}  />
//       <MarketGroupSelection marketChoiceChanged={setmarketGroupChoice}/>

//     </Grid>
//   );
// });

// export default StudySidebar;