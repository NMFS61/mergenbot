"use client";
import * as React from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import StatCard, { StatCardProps } from "../../components/StatCard";
import HighlightedCard from "../../components/HiglightedCard";
import SessionsChart from "../../components/SessionsChart";
import PageViewsBarChart from "../../components/PageViewsBarChart";
import CustomTreeView from "../../components/CustomTreeView";
import ChartUserByCountry from "../../components/ChartUserByCountry";
import ColorCheckboxes from '../../components/ColorCheckboxes';
import Grid from "@mui/material/Grid2";
import SidebarHome from "../../components/layout/sidebar/SidebarHome";
import StudyDescriptionCard from "@/app/components/ui/StudyDescriptionCard";
import PageContentContainer from "./PageContentContainer";

const data = [
  {
    title: "Study1",
    description: "Focuses on x% percentage of drops come back for a buy",
    interval: "Long term" as  "Intraday" | "Day" | "Long term",
  },
  {
    title: "Study2",
    description: "Focuses on x% percentage of drops come back for a buy",
    interval: "Long term" as "Intraday" | "Day" | "Long term",
  },
  {
    title: "Study3",
    description: "Focuses on x% percentage of drops come back for a buy",
    interval: "Long term" as "Intraday" | "Day" | "Long term",
  },
  {
    title: "Study3",
    description: "Focuses on x% percentage of drops come back for a buy",
    interval: "Long term" as "Intraday" | "Day" | "Long term",
  },
  {
    title: "Study3",
    description: "Focuses on x% percentage of drops come back for a buy",
    interval: "Long term" as "Intraday" | "Day" | "Long term",
  },
  {
    title: "Study3",
    description: "Focuses on x% percentage of drops come back for a buy",
    interval: "Long term" as "Intraday" | "Day" | "Long term",
  },

  
];
interface IProp {
  studyList: {
    title: string;
    description: string;
    interval: "Intraday" | "Day" | "Long term" ;
  }[];
}
export default function PageContent(props: IProp) {
  return (
    <Grid container spacing={1}>

      {/*  For spacing */}
      <Grid size={12} /> 

      {/*  Sidebar */}
      <Grid size={2}>
         <SidebarHome />
      </Grid>

      {/*  Content */}
      <Grid size={10}>
        <PageContentContainer pageHeaderTitle="Study area">
                                     
                                {/* ROW 1 : FILTER PANEL */}
                                <Grid size={{ xs: 12, md: 12 }}>
                                  <PageViewsBarChart />
                                </Grid>

                                {/* ROW 2 : DISPLAY STUDIES PANEL*/}
                                {props.studyList.map((card, index) => (
                                  <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
                                    <StudyDescriptionCard title={card.title} description={card.description} interval={card.interval} />
                                  </Grid>
                                ))}
                              
            </PageContentContainer>
                              
                            
                        
      </Grid>
    </Grid>
  );
}
