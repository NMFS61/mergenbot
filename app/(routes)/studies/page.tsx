import * as React from 'react';
import PageContent from './pageContent';

const data = [
  {
    title: "Study1",
    studyID: "1",
    description: "Focuses on x% percentage of drops come back for a buy",
    interval: "Long term" as  "Intraday" | "Day" | "Long term",
  },
  {
    title: "Study2",
    studyID: "2",
    description: "Focuses on x% percentage of drops come back for a buy",
    interval: "Long term" as "Intraday" | "Day" | "Long term",
  },
  {
    title: "Study3",
    studyID: "3",
    description: "Focuses on x% percentage of drops come back for a buy",
    interval: "Long term" as "Intraday" | "Day" | "Long term",
  },
  {
    title: "Study4",
    studyID: "4",
    description: "Focuses on x% percentage of drops come back for a buy",
    interval: "Long term" as "Intraday" | "Day" | "Long term",
  },

];

export default function Dashboard() {
  return <PageContent studyList={data}/>;
  
}
