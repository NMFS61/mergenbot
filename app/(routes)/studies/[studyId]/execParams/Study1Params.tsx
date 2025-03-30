'use client';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid2";
import { TextField } from '@mui/material';
import { I_Study1Params } from '@/app/backend/study/study1-buy-dropPC2';
import { getFirstStudyParams } from './studyMetadata';



interface IProp {
  onParamWarningsChange: (warnings:string[]) => void;
  onParamsUpdated: (params: any) => void;
}
export default function Study1Params(props: IProp) {
  const [params, setParams] = React.useState(getFirstStudyParams("1") as I_Study1Params);
  
  // is study params complete (aka executable)
  React.useEffect(() => {
    let isExecutable=false;
    const warnings=[] as string[];
    if(params.dropByPC && params.increaseTargetPC){
      if(params.dropByPC>0 && params.increaseTargetPC>0){
        isExecutable=true;
      }
      else{
        warnings.push("Both the 'Drop by Percent' and 'Increase Target percent' should be  be greater than 1")
      }
    }
    else{
      warnings.push("'Drop by Percent' and 'Increase Target percent' should be entered and be greater than 1")
    }
    props.onParamWarningsChange(warnings);
  }, [params]);


  const handleParamChange = (paramName: string, value: any) => {
    
    let newParams = {...params};
    newParams[paramName] = value;
    setParams(newParams);
    props.onParamsUpdated(newParams);
  }
  return (
    <Card variant="highlighted" sx={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2">
          Execution Params
        </Typography>
        <Grid container spacing={2}>
            <Grid size={12} /> 
            <Grid size={6}>
              <TextField id="txt-DropBy" type='number' label="Drops by %" defaultValue={params.dropByPC} 
                         onChange={(e)=>handleParamChange("dropByPC",e.target.value)}/>
            </Grid> 
            <Grid size={6}>
              <TextField id="txt-IncreaseBy" type='number' label="Then icreases by %" defaultValue={params.increaseTargetPC} 
                         onChange={(e)=>handleParamChange("increaseTargetPC",e.target.value)}/>
            </Grid> 
        </Grid>
           
      </CardContent>
    </Card>
  );
}
