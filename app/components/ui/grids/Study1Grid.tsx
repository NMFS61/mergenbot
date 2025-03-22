import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Chip } from '@mui/material';

const columns2: GridColDef<(typeof rows)[number]>[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'date',headerName: 'Date',type:'date',minWidth: 150,editable: false,},
  { field: 'open',headerName: 'Open',type: 'number',minWidth: 150,editable: false,},
  { field: 'close',headerName: 'Close',type: 'number',minWidth: 110,editable: false,},
  { field: 'high',headerName: 'High',type: 'number',minWidth: 110,editable: false,},
  { field: 'low',headerName: 'Low',type: 'number',minWidth: 110,editable: false,},
  { field: 'volume',headerName: 'Volume',type: 'number',minWidth: 110,editable: false,},
  { field: 'change',headerName: 'Change(%)',minWidth: 160,
    description: 'This column has a value getter and is not sortable.',
    editable: false, valueGetter: (value, row) => `${((row.close-row.open)*100/row.open).toFixed(2)} %`,},
];
const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: 'id', headerName: 'ID', type:'number',width: 90 },
    { field: 'ticker',headerName: '',minWidth: 300,editable: false,},
    { field: 'open',headerName: 'Open',type: 'number',minWidth: 20,editable: false,},
    { field: 'close',headerName: 'Close',type: 'number',minWidth: 20,editable: false,},
    { field: 'openDate',headerName: 'Date(Open)',type: 'date',minWidth: 120,editable: false,},
    { field: 'closeDate',headerName: 'Date(Close)',type: 'date',minWidth: 120,editable: false,},
    { field: 'status',headerName: 'Status',minWidth: 80,editable: false,renderCell: (params) => renderStatus(params.value),},
    { field: 'days',headerName: 'Days',type: 'number',minWidth: 20,editable: false,description: 'How many days position kept open',},
    { field: 'maturity days',headerName: 'Maturity',minWidth: 20,
      description: 'How long did it take to reach the open position',
      editable: false, valueGetter: (value, row) => `${Math.round((row.closeDate.getTime() - row.openDate.getTime()) / (1000 * 60 * 60 * 24))} %`,},
  ];

const rows = [
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
export default function Study1Grid() {
  return (
    // <Box sx={{ height: 400, width: '100%' }}>
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
      {/* </Box> */}
      </div>
    
  );
}
