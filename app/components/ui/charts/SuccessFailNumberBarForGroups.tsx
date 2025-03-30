import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { BarChart } from '@mui/x-charts/BarChart';
import { useTheme } from '@mui/material/styles';
import { I_StudyExec_indexGroup_Result } from '@/app/interface/IExecution';
interface IData{
  groups:string[],
  success:number[],
  fail:number[]
}
interface IProps {
  results:I_StudyExec_indexGroup_Result[]
}
export default function SuccessFailNumberBarForGroups(props:IProps) {
  
  const theme = useTheme();
  const colorPalette = [
    (theme.vars || theme).palette.primary.dark,
    (theme.vars || theme).palette.error.main,
    (theme.vars || theme).palette.primary.light,
  ];
  const [data,setData]=React.useState({} as IData);
 
  React.useEffect(()=>{
        const res=props.results;
        const dataX=[] as string[];
        const dataY_Success=[] as number[];
        const dataY_Fail=[] as number[];
        res.forEach((r)=>{
        dataX.push(r.indexGroup);
        const success=r.execResults.filter((er)=>er.success==true).length;
        const fail=r.execResults.filter((er)=>er.success==false).length;
        dataY_Success.push(success);
        dataY_Fail.push(fail);
        setData({"groups":dataX,"success":dataY_Success,"fail":dataY_Fail});
  });
  },[props]);

  // const res=props.results;
  // const dataX=[] as string[];
  // const dataY_Success=[] as number[];
  // const dataY_Fail=[] as number[];
  // res.forEach((r)=>{
  //   dataX.push(r.indexGroup);
  //   const success=r.execResults.filter((er)=>er.success==true).length;
  //   const fail=r.execResults.filter((er)=>er.success==false).length;
  //   dataY_Success.push(success);
  //   dataY_Fail.push(fail);
  // });
  

  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Total Success/Fail numbers
        </Typography>
        <Stack sx={{ justifyContent: 'space-between' }}>
          <Stack
            direction="row"
            sx={{
              alignContent: { xs: 'center', sm: 'flex-start' },
              alignItems: 'center',
              gap: 1,
            }}
          >
            
            
          </Stack>
          
        </Stack>
        <BarChart
          borderRadius={8}
          colors={colorPalette}
          xAxis={
            [
              {
                scaleType: 'band',
                categoryGapRatio: 0.6,
                data: {...data}.groups,
              },
            ] as any
          }
          series={[
            {
              id: 'page-views',
              label: 'Sucess',
              data: {...data}.success,
              stack: 'A',
            },
            {
              id: 'downloads',
              label: 'Fail',
              data: {...data}.fail,
              stack: 'A',
            },
      
          ]}
          height={250}
          margin={{ left: 50, right: 0, top: 20, bottom: 20 }}
          grid={{ horizontal: true }}
          slotProps={{
            legend: {
              hidden: true,
            },
          }}
        />
      </CardContent>
    </Card>
  );
}
