import * as React from 'react';
import PageContent from './pageContent';

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

export default function Dashboard() {
  return <PageContent studyList={data}/>;
}
