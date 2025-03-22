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

export default function Content() {
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
                    <Box sx={{ display: "flex", flex: 1 ,marginRight:2 }}>
                      <Box
                        component="main"
                        sx={(theme) => ({flexGrow: 1,
                                         backgroundColor: theme.vars
                                                  ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
                                                  : alpha(theme.palette.background.default, 1),
                                        overflow: "auto",
                                      })}>
                  
                        <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
                            
                            <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
                              Overview
                            </Typography>

                            <Grid container spacing={2}  sx={{ mb: (theme) => theme.spacing(2) }}>

                              {/* ROW 1 : FILTER PANEL */}
                              <Grid size={{ xs: 12, md: 12 }}>
                                <PageViewsBarChart />
                              </Grid>

                              {/* ROW 2 : DISPLAY STUDIES PANEL*/}
                              {data.map((card, index) => (
                                <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
                                  <StudyDescriptionCard title={card.title} description={card.description} interval={card.interval} />
                                </Grid>
                              ))}
          
                              
                            </Grid>
                        
                          </Box>
                      </Box>
                    </Box>
      </Grid>
    </Grid>
  );
}
