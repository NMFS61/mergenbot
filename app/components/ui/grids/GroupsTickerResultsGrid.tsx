import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button, Chip } from '@mui/material';
import { IExec_Results_Group } from '@/app/backend/study/study-executor-service';
import Grid from "@mui/material/Grid2";
import dayjs from 'dayjs';

const columns: GridColDef<(typeof rows_)[number]>[] = [
    { field: 'id', headerName: 'ID', type:'number',width: 90 },
    { field: 'ticker',headerName: '',minWidth: 300,editable: false,},
    { field: 'open',headerName: 'Open',type: 'number',minWidth: 20,editable: false,},
    { field: 'close',headerName: 'Close',type: 'number',minWidth: 20,editable: false,},
    { field: 'openDate',headerName: 'Date(Open)',type: 'date',minWidth: 120,editable: false,valueFormatter: (val) => dayjs(val).format('DD/MM/YYYY'),},
    { field: 'closeDate',headerName: 'Date(Close)',type: 'date',minWidth: 120,editable: false,valueFormatter: (val) => dayjs(val).format('DD/MM/YYYY'),},
    { field: 'status',headerName: 'Status',minWidth: 80,editable: false,renderCell: (params) => renderStatus(params.value),},
    { field: 'days',headerName: 'Days',type: 'number',minWidth: 20,editable: false,description: 'How many days position kept open',},
    //{ field: 'Matured in(days)',headerName: 'Days',type: 'number',minWidth: 20,editable: false,description: 'How many days did it take to get into position',},
    // { field: 'maturity days',headerName: 'Maturity',minWidth: 20,
    //   description: 'How long did it take to reach the open position',
    //   editable: false, valueGetter: (value, row) => `${Math.round((row.closeDate.getDate() - row.openDate.getDate()) / (1000 * 60 * 60 * 24))} %`,},
  ];
  function createData(
    id:number, 
    ticker:string, 
    open:number, 
    close:number, 
    openDate:Date, 
    closeDate:Date, 
    status:string,
    days:number
  ) {
    return { id, ticker, open, close, openDate, closeDate, status, days };
  }

const rows_ = [
  { id:1,ticker: 'A', open: 1.1, close:1.2, openDate: new Date(), closeDate: new Date(), status: 'success',days:1 },
  { id:2,ticker: 'B', open: 1.1, close:1.2, openDate: new Date(), closeDate: new Date(), status: 'success',days:1 },
  { id:3,ticker: 'C', open: 1.1, close:1.2, openDate: new Date(), closeDate: new Date(), status: 'success',days:1 },
  { id:4,ticker: 'D', open: 1.1, close:1.2, openDate: new Date(), closeDate: new Date(), status: 'success',days:1 },
  { id:5,ticker: 'E', open: 1.1, close:1.2, openDate: new Date(), closeDate: new Date(), status: 'success',days:1 },
];

function renderStatus(status:string ) {
  if (status === 'success') {
    return <Chip label={status} color="success" size="small" />;
  }
 else{
  return <Chip label={status} color="error" size="small" />;
 }
  
}
const getVariant=(selected:string,active:string)=>{
    if (selected===active) {return "contained";}
    else{ return "outlined" }
}

interface IData{
    market:string;
    rows:any[]
}
interface IProps {
    results:IExec_Results_Group[];
}

export default function GroupsTickerResultsGrid(props:IProps) {
   const [selectedGroup,setSelectedGroup]=React.useState(props.results[0]?.group);
   const [rows,setRows]=React.useState([]);

   //{ id:1,ticker: 'A', open: 1.1, close:1.2, openDate: new Date(), closeDate: new Date(), status: 'success',days:1 },
   const dataTables=[] as IData[];
   props.results.forEach((groupRes)=>{
            const rowsForGroup=[];
            let i=0;
            groupRes.execResults.forEach((r)=>{
                i++;
                rowsForGroup.push(
                                createData(i,
                                            r.ticker,
                                            r.position.open,
                                            r.positionClose.close,
                                            r.position.date,
                                            r.positionClose.date,
                                            r.success?"success":"fail",
                                            r.days)
                );
            })
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
