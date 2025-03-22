import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button, Chip } from '@mui/material';
import { IExec_Results_Group } from '@/app/backend/study/study-executor-service';
import Grid from "@mui/material/Grid2";
import dayjs from 'dayjs';
import { I_TickerSummary, TickerDivData } from '@/app/interface/tickerInfo';

const columns: GridColDef<(typeof rows_)[number]>[] = [
    { field: 'id', headerName: 'ID', type:'number',width: 90 },
    { field: 'ticker',headerName: '',minWidth: 300,editable: false,},
    { field: 'yield17',headerName: 'Yield 17(%)',type: 'number',minWidth: 20,editable: false,},
    { field: 'yield20',headerName: 'Yield 20(%)',type: 'number',minWidth: 20,editable: false,},
    { field: 'yield23',headerName: 'Yield 23(%)',type: 'number',minWidth: 20,editable: false,},
    { field: 'yieldAvg1',headerName: 'Yield Avg(%)',type: 'number',minWidth: 20,editable: false,},
    { field: 'divYearCoverage',headerName: 'Div All years %',type: 'number',minWidth: 20,editable: false,},
    
  ];
  function createData(
    id:number, 
    ticker:string, 
    yield17:number, 
    yield20:number, 
    yield23:number, 
    yieldAvg1:number, 
    divYearCoverage:number
  ) {
    return { id, ticker, yield17, yield20, yield23, yieldAvg1, divYearCoverage };
  }

  const rows_=[{ "id":0, "ticker":"", "yield17":0, "yield20":0, "yield23":0, "yieldAvg1":0, "divYearCoverage":0 }];

  const getVariant=(selected:string,active:string)=>{
    if (selected===active) {return "contained";}
    else{ return "outlined" }
}



interface IData{
    market:string;
    rows:any[]
}
export interface IGroupDivStats{
  group:string;
  divSummaries:I_TickerSummary[];
  divs:TickerDivData[]
}
interface IProps {
    results:IGroupDivStats[];
}

export default function DividendSummaryGrid(props:IProps) {
   const [selectedGroup,setSelectedGroup]=React.useState(props.results[0]?.group);
   const [rows,setRows]=React.useState([]);

   const dataTables=[] as IData[];
   props.results.forEach((groupRes)=>{
            const rowsForGroup=[];
            let i=0;
            groupRes.divSummaries.forEach((r)=>{
                i++;
                rowsForGroup.push(
                                createData(i,
                                            r.ticker,
                                            parseFloat((r.yield17*100).toFixed(2)),
                                            parseFloat((r.yield20*100).toFixed(2)),
                                            parseFloat((r.yield23*100).toFixed(2)),
                                            parseFloat((r.yieldAvg1*100).toFixed(2)),
                                            parseFloat((r.divYearCoverage*100).toFixed(2))
                                ))
            });
            dataTables.push({"market":groupRes.group,"rows":rowsForGroup} as IData)
   })
   const [positionsData,setPositionsData]=React.useState(dataTables);
   
 

   React.useEffect(()=>{
      const dataForDisplay=positionsData.filter((d)=>d.market==selectedGroup);
      console.log("selected",dataForDisplay)
      if(dataForDisplay.length>0) {setRows(dataForDisplay[0].rows)}
      
   },[selectedGroup])
  return (
    <>
    <Grid size={12}>
        <Button onClick={()=>setSelectedGroup("BIST 30")} variant={getVariant(selectedGroup,"BIST 30")}>BIST 30</Button>
        <Button onClick={()=>setSelectedGroup("BIST 50")} variant={getVariant(selectedGroup,"BIST 50")}>BIST 50</Button>
        <Button onClick={()=>setSelectedGroup("BIST 100")} variant={getVariant(selectedGroup,"BIST 100")}>BIST 100</Button>
        <Button onClick={()=>setSelectedGroup("FTSE 100")} variant={getVariant(selectedGroup,"FTSE 100")}>FTSE 100</Button>
        <Button onClick={()=>setSelectedGroup("FTSE 250")} variant={getVariant(selectedGroup,"FTSE 250")}>FTSE 250</Button>
        <Button onClick={()=>setSelectedGroup("NASDAQ 100")} variant={getVariant(selectedGroup,"NASDAQ 100")}>NASDAQ 100</Button>
        <Button onClick={()=>setSelectedGroup("NYSE 100")} variant={getVariant(selectedGroup,"NYSE 100")}>NYSE 100</Button>
        <Button onClick={()=>setSelectedGroup("NYSE 200")} variant={getVariant(selectedGroup,"NYSE 200")}>NYSE 200</Button>
        <Button onClick={()=>setSelectedGroup("FOREX")} variant={getVariant(selectedGroup,"FOREX")}>FOREX</Button>  
    </Grid>
    <Grid>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
            pagination: { paginationModel: { pageSize: 50 } },
            columns: {
              columnVisibilityModel: {
                // Hide columns status and traderName, the other columns will remain visible
                id: false,
              }},
          }}
        sx={(theme) => ({
            borderColor:
              theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[200],
            '& .MuiDataGrid-cell': {
              borderColor:
                theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[200],
            },
          })}
        pageSizeOptions={[10, 20, 50, 100]}
        disableColumnResize
        density="compact"
        checkboxSelection
        disableRowSelectionOnClick
      />
      
      </div>
      </Grid>
      </>
  );
}
