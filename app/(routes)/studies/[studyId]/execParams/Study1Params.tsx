'use client';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid2";
import { TextField } from '@mui/material';
import { I_Study1Params } from '@/app/backend/study/study1-buy-dropPC';



interface IProp {
  onExecutableStateChange: (state: boolean) => void;
  onParamsUpdated: (params: any) => void;
}
export default function Study1Params(props: IProp) {
  const [params, setParams] = React.useState({"dropByPC":0,"increaseTargetPC":0} as I_Study1Params);
  React.useEffect(() => {
    let isExecutable=false;
    if(params.dropByPC && params.increaseTargetPC){
      if(params.dropByPC>0 && params.increaseTargetPC>0){
        isExecutable=true;
      }
    }
    props.onExecutableStateChange(isExecutable);
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
              <TextField id="txt-DropBy" type='number' label="Drops by %" defaultValue="0" 
                         onChange={(e)=>handleParamChange("dropByPC",e.target.value)}/>
            </Grid> 
            <Grid size={6}>
              <TextField id="txt-IncreaseBy" type='number' label="Then icreases by %" defaultValue="0"
                         onChange={(e)=>handleParamChange("increaseTargetPC",e.target.value)}/>
            </Grid> 
        </Grid>
           
      </CardContent>
    </Card>
  );
}
