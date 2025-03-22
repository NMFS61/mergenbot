"use client";
import * as React from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import StatCard, { StatCardProps } from "@/app/components/StatCard";
import HighlightedCard from "@/app/components/HiglightedCard";
import SessionsChart from "@/app/components/SessionsChart";
import PageViewsBarChart from "@/app/components/PageViewsBarChart";
import CustomTreeView from "@/app/components/CustomTreeView";
import ChartUserByCountry from "@/app/components/ChartUserByCountry";
import ColorCheckboxes from '@/app/components/ColorCheckboxes';
import Grid from "@mui/material/Grid2";
import SidebarHome from "@/app/components/layout/sidebar/SidebarHome";
import StudyDescriptionCard from "@/app/components/ui/StudyDescriptionCard";
import PageContentContainer from "@/app/components/layout/PageContentContainer";
import Study1Params from "./execParams/Study1Params";

import { Alert, Checkbox, Chip, FormControlLabel, Radio, RadioGroup } from "@mui/material";

import DateIntervalSelection from "@/app/components/layout/sidebar/DateIntervalSelection";
import { IDatesData } from "@/app/components/layout/sidebar/DateIntervalSelection";
import MarketGroupSelection from "@/app/components/layout/sidebar/MarketGroupSelection";

import MarketsTab from "@/app/components/layout/content/MarketsTab";
import MarketsVerticalTab from "@/app/components/layout/sidebar/MarketsVerticalTab";
import CheckIcon from '@mui/icons-material/Check';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import { PositionResult, TickerBasicInfo } from "@/app/interface/tickerInfo";
import ExecuteButton from "@/app/components/layout/sidebar/ExecuteButton";
import StudyParams from "./execParams/StudyParams";

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { IExecResult, IExecutionRequest } from "@/app/api/execStudy/route";
import MarketsTabGroupsOnly from "@/app/components/layout/content/MarketsTabGroupsOnly";
import { IExec_Results_Group } from "@/app/backend/study/study-executor-service";
import SuccessFailNumberBarForGroups from "@/app/components/ui/charts/SuccessFailNumberBarForGroups";
import SuccesFailTableGroups from "@/app/components/ui/charts/SuccesFailTableGroups";
import GroupsTickerResultsGrid from "@/app/components/ui/grids/GroupsTickerResultsGrid";

interface IProp {
  studyID: string;
}
export default function PageContent(props: IProp) {
  const [marketGroupChoice,setmarketGroupChoice]=React.useState("all");
  const [selectedGroups,setSelectedGroups]=React.useState([] as string[]);
  const [datesData, setDatesData] = React.useState({"allDates":true,"dateStart":new Date(),"dateEnd":new Date()} as IDatesData);
  const [studyParams, setStudyParams] = React.useState({});
  const [studyParamsGoodToExec, setStudyParamsGoodToExec] = React.useState(false);
  const [executable, setExecutable] = React.useState(false);
  const [inProgress, setInProgress] = React.useState(false);
  const [results, setResults] = React.useState([] as IExec_Results_Group[]);
  const updateDates = (dateData:IDatesData) => {
    console.log("PageContent: ",dateData);
    setDatesData(dateData);
  }

  // Hand pick stocks/tickers updates come here
  const handleHandPickTickerDataChange= (changeGroup:string,selectedTickerData:TickerBasicInfo[])=>{

  }

  // Evaluate if it is executable
  React.useEffect(() => {
    let isExecutable=true;
    isExecutable=isExecutable&&(datesData.allDates|| (datesData.dateEnd>datesData.dateStart)); // if All dates is selected
    isExecutable=isExecutable && (marketGroupChoice!="other"||selectedGroups.length>0); // for now only group selection is allowed
    // todo: if marketchoice is other, then handpicked tickers should be checked
    isExecutable=isExecutable&&studyParamsGoodToExec; // if study parameters are good to execute
    setExecutable(isExecutable);
  }, [datesData,marketGroupChoice,studyParamsGoodToExec,selectedGroups]);

  // Execute the study
  const handleExecute=()=>{
    console.log("Executing study with the following parameters: ",datesData,marketGroupChoice,studyParams);
    const reqBody={
      "studyId":"1",
      "dateParams":datesData,
      "studyParams":studyParams,
      "marketParams":{"marketsInputStr":marketGroupChoice,"groups":selectedGroups}
    } as IExecutionRequest;

    const executeStudy=async()=>{
      const response=await fetch("http://localhost:3000/api/execStudy", {
          method: 'POST',
          headers: {'Content-Type': 'application/json',},
          body: JSON.stringify(reqBody),
        });
      const results=await response.json() as IExec_Results_Group[];
      console.log("Received the Results: ",results);
      setResults(results);
      setInProgress(false);
    };
    executeStudy();
    setInProgress(true);
  }

  return (
    <Grid container spacing={1}>
<Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })} 
          open={inProgress}
          onClick={()=>setInProgress(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {/*  For spacing */}
      <Grid size={12} /> 

      {/*  Sidebar */}
      <Grid size={3}>
         <SidebarHome />
         <StudyParams studyId={props.studyID} 
                      updateExecutableState={setStudyParamsGoodToExec} 
                      updateParams={setStudyParams}/>
         <DateIntervalSelection onDatesDataChange={updateDates}  />
         <MarketGroupSelection marketGroupChanged={setmarketGroupChoice}/>

      </Grid>

      {/*  Content */}
      <Grid size={9}>
        <PageContentContainer pageHeaderTitle="Study area">
                                     
                                {/* ROW 1 : FILTER PANEL */}
                                {/* <Grid size={{ xs: 12, md: 12 }}> */}
                                <Grid size={12}>
                                {executable&&<ExecuteButton onExecute={()=>handleExecute()} />}
                                  <Alert  variant="outlined" icon={<InfoIcon fontSize="inherit" />} severity="info">
                                    Looking for <Chip size="small" color="primary" label="-8%" /> drop to happen, 
                                    then it searches if it increase <Chip size="small" color="success" label="-8%" />
                                    
                                   </Alert>
                                  
                                </Grid>
                                {/* VALIDATION MESSAGES */}
                                <Grid size={12}>
                                { !(datesData.allDates || (datesData.dateEnd>datesData.dateStart))&&
                                 
                                 <Alert  variant="outlined" icon={<CloseIcon fontSize="inherit" />} severity="warning">
                                    End date should be greater than start date, or All available dates should be selected.
                                   </Alert>
                                  }
                          
                                  { !studyParamsGoodToExec &&
                                  <Alert  variant="outlined" icon={<CloseIcon fontSize="inherit" />} severity="warning">
                                    Please check the study execution paramaters. They are invalid.
                                   </Alert>
                                  }

                                  { (marketGroupChoice=="other" && selectedGroups.length==0) &&
                                  <Alert  variant="outlined" icon={<CloseIcon fontSize="inherit" />} severity="warning">
                                    Currently hand pick tickers are not supported. Please select at least 1 group (NYSE 100, FTSE 100,).
                                   </Alert>
                                  }
                                </Grid>
                             

                                <Grid size={12}>
                                <Stack direction="row">
                                
                               
                                  {
                                    marketGroupChoice=="other" &&
                                  // <DetailedMarketChoice /> COME BACK HERE DO I NEED
                                  <MarketsTabGroupsOnly onGroupSelectionChange={(grp)=>{console.log(grp);setSelectedGroups(grp);}} />
                                  // <MarketsVerticalTab onSelectionChange={(selectedGroups)=>console.log("Selected Groups: ",selectedGroups)} />
                                 }
                                 
                                  </Stack>
                                
                                </Grid>
                         
              

                                {/* ROW 2 : DISPLAY STUDIES PANEL*/}
                                { results.length>0 &&
                                <>
                                <Grid size={12}>
                                      <SuccessFailNumberBarForGroups results={results}/>
                                </Grid>
                                <Grid size={12}>
                                  <SuccesFailTableGroups results={results}/>
                                </Grid>
                                <GroupsTickerResultsGrid results={results}/>
                                </>
                                }
                               
                              
            </PageContentContainer>
                              
                            
                        
      </Grid>
    </Grid>
  );
}
