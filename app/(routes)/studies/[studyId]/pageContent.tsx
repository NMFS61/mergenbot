"use client";
import * as React from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import Grid from "@mui/material/Grid2";

import PageContentContainer from "@/app/components/layout/PageContentContainer";
import MarketsTabGroupsOnly from "@/app/components/layout/content/MarketsTabGroupsOnly";

import SuccessFailNumberBarForGroups from "@/app/components/ui/charts/SuccessFailNumberBarForGroups";
import SuccesFailTableGroups from "@/app/components/ui/charts/SuccesFailTableGroups";
import GroupsTickerResultsGrid from "@/app/components/ui/grids/GroupsTickerResultsGrid";
import StudySidebar, { IRefSidebar } from "./PageContent/Sidebar";
import MainLayout from "@/app/components/layout/MainLayout";
import { I_Warning } from "@/app/interface/IComponents";
import { I_StudyExec_indexGroup_Result, I_StudyExecParams } from "@/app/interface/IExecution";
import ExecuteButton from "@/app/components/layout/sidebar/ExecuteButton";
import { get } from "http";
import { getStudyDescription } from "./execParams/studyMetadata";

interface IProp {
  studyID: string;
}
export default function PageContent(props: IProp) {
  const [marketGroupChoice,setmarketGroupChoice]=React.useState("all");
  const [selectedGroups,setSelectedGroups]=React.useState([] as string[]);
  const [alerts,setAlerts]=React.useState([] as I_Warning[]);
  const [executable, setExecutable] = React.useState(false);
  const [inProgress, setInProgress] = React.useState(false);
  const [results, setResults] = React.useState([] as I_StudyExec_indexGroup_Result[]);
  const [showDesription, setDescription] = React.useState(true);
  const sidebarRef=React.useRef<IRefSidebar>(null);//inital 
  
  // Execute the study
  const handleExecute=()=>{
   
    // get execution params from study
    const execParams=sidebarRef.current.fetchStudyExecParams() as I_StudyExecParams;
  
    const executeStudy=async()=>{
      const response=await fetch("http://localhost:3000/api/execStudy", {
          method: 'POST',
          headers: {'Content-Type': 'application/json',},
          body: JSON.stringify(execParams),
        });
        const results=await response.json() as I_StudyExec_indexGroup_Result[];
        console.log("Received the Results: ",results);
        setResults(results);
        setInProgress(false);
    };
    executeStudy();
    setInProgress(true);
  }

  return (
   <MainLayout inProgress={inProgress}>
      
      {/*  Sidebar */}
      <StudySidebar
          open={true}
          studyID={props.studyID}
          gridSize={3}
          onMarketChange={(m)=>setmarketGroupChoice(m)}
          onExecutableChange={(e)=>setExecutable(e)}
          onValidationWarningsChange={setAlerts}
          ref={sidebarRef}
      />
  
      {/*  Page Content */}
      <Grid size={9}>
        <PageContentContainer pageHeaderTitle="Study area" warnings={alerts}>
           
           {/* ROW 0 : Execute button & Info about study */}
           
           <Grid size={12}>
                {showDesription&& getStudyDescription(props.studyID)}
                  
              </Grid>   

           {/* ROW 1 : Execute button & Info about study */}
           
             <Grid size={12}>
                {executable&&<ExecuteButton onExecute={()=>handleExecute()} />}
                  
              </Grid>   

            {/* ROW 2 : Individual Market choice */}

              <Grid size={12}>
                 <Stack direction="row">
                    { marketGroupChoice=="other" &&
                     <MarketsTabGroupsOnly onGroupSelectionChange={(grp)=>{console.log(grp);setSelectedGroups(grp);}} />              
                    }
                 </Stack>
              </Grid>
                      
            {/* ROW 3 & 4 : DISPLAY STUDIES PANEL*/}

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
    </MainLayout>
  );
}
