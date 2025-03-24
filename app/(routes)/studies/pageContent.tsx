"use client";
import * as React from "react";

import Grid from "@mui/material/Grid2";
import SidebarHome from "@/app/components/layout/sidebar/SidebarHome";
import StudyDescriptionCard from "@/app/components/ui/StudyDescriptionCard";
import PageContentContainer from "@/app/components/layout/PageContentContainer";
import ExecuteButton from "@/app/components/layout/sidebar/ExecuteButton";

interface IProp {
  studyList: {
    title: string;
    studyID?: string;
    description: string;
    interval: "Intraday" | "Day" | "Long term" ;
  }[];
}
export default function PageContent(props: IProp) {
  return (
  
  <Grid container spacing={1}>
      <Grid size={12} /> {/*  For spacing */}

      {/*  Sidebar */}
      <Grid size={3}>
         <SidebarHome />
      </Grid>

      {/*  Content */}
      <Grid size={9}>
        <PageContentContainer pageHeaderTitle="Study area" warnings={[]}>
                                     
                                {/* ROW 1 : FILTER PANEL */}
                                {/* <Grid size={{ xs: 12, md: 12 }}>
                                  <PageViewsBarChart />
                                </Grid> */}

                                {/* ROW 2 : DISPLAY STUDIES PANEL*/}
                                {props.studyList.map((card, index) => (
                                  <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
                                    <StudyDescriptionCard studyID={card.studyID} title={card.title} description={card.description} interval={card.interval} />
                                  </Grid>
                                ))}
                              
            </PageContentContainer>
                              
                            
                        
      </Grid>
    </Grid>
  );
}
