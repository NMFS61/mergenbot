import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { I_EvaluatedPosition, I_StudyExec_indexGroup_Result } from '@/app/interface/IExecution';

function createData(
  name: string,
  success: number,
  fail: number,
  targetPC:number,
  lossIncomefor100:number,
  avgDays:number,
) {

    const successRate=100*success/(success+fail);
    const totalWin=100*success*(1+targetPC/100); // I bought 100 of stocks, so if %100, 200 return
    const totalSpent=100*(success+fail);
    //const totalWinInc=100*success*(1+targetPC/100);
    const your100exc=100*totalWin/totalSpent;
    const your100inc=your100exc+lossIncomefor100;
    
  
  return { name, success, fail, successRate, your100exc, your100inc, avgDays };
}

function calcFailsAvgReturnfor100(fails:I_EvaluatedPosition[]){
    const totalSpent=fails.length*100;
    let totalWin=0;
    fails.forEach((f)=>{
        const diff=Math.abs(f.closePrice - f.position.openPrice); 
        const diffPCLoss=100*diff/f.closePrice;
        totalWin=100*fails.length*(1-diffPCLoss/100);
    });
    return 100*totalWin/totalSpent;
}

function avgDaysToClose(success:I_EvaluatedPosition[]){
    let totalDays=0;
    success.forEach((s)=>{
        totalDays=totalDays+s.days;
    });
    return totalDays/success.length;
}


interface IProps {
    results:I_StudyExec_indexGroup_Result[];
}

export default function SuccesFailTableGroups(props:IProps) {
    const [rows,setRows]=React.useState([]);

    React.useEffect(()=>{
          const _rows = [];
          try{
          const targetPC=props.results[0].execResults[0].meta.targetPercent;
          props.results.forEach((r)=>{
            
            const success=r.execResults.filter((er)=>er.success==true).length;
            const fail=r.execResults.filter((er)=>er.success==false).length;
            const lossIncomefor100=calcFailsAvgReturnfor100(r.execResults.filter((er)=>er.success==false));
            const avgDays=avgDaysToClose(r.execResults.filter((er)=>er.success==true));
            _rows.push(createData(r.indexGroup,success,fail,targetPC,lossIncomefor100,avgDays));
          
          });
        }catch(e){console.log(e);}
          setRows(_rows);

    },[props.results]);
    

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>E. Group</TableCell>
            <TableCell align="right">Success</TableCell>
            <TableCell align="right">Fail</TableCell>
            <TableCell align="right">Success rate(%)</TableCell>
            <TableCell align="right">Avg Days to close(success)</TableCell>
            <TableCell align="right">Your 100 (L is exc)</TableCell>
            <TableCell align="right">Your 100 (L is inc)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.success}</TableCell>
              <TableCell align="right">{row.fail}</TableCell>
              <TableCell align="right">{row.successRate.toFixed(1)}</TableCell>
              <TableCell align="right">{Math.round(row.avgDays)}</TableCell>
              <TableCell align="right">{row.your100exc.toFixed(1)}</TableCell>
              <TableCell align="right">{row.your100inc.toFixed(1)}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
