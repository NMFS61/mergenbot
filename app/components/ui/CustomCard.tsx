import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
interface IProp {
    title: string;
    children: React.ReactNode;
}
// { children }: Readonly<{ children: React.ReactNode }>
export default function CustomCard(props: IProp) {
  return (
    <Card variant="outlined" sx={{ display: "flex", flexDirection: "column", gap: "8px", flexGrow: 1 }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2">
        {props.title}
        
        </Typography>
        {props.children}
      </CardContent>
    </Card>
  );
}
