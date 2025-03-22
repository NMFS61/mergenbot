import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef<(typeof rows)[number]>[] = [
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
const columns2: GridColDef<(typeof rows)[number]>[] = [
   
    { field: 'ticker',headerName: '',minWidth: 150,editable: false,},
    { field: 'open',headerName: 'Open',type: 'number',minWidth: 150,editable: false,},
    { field: 'close',headerName: 'Close',type: 'number',minWidth: 110,editable: false,},
    { field: 'openDate',headerName: 'High',type: 'number',minWidth: 110,editable: false,},
    { field: 'closeDate',headerName: 'Low',type: 'number',minWidth: 110,editable: false,},
    { field: 'status',headerName: 'Low',type: 'number',minWidth: 110,editable: false,},
    { field: 'days',headerName: 'Volume',type: 'number',minWidth: 110,editable: false,},
    { field: 'maturity days',headerName: 'Change(%)',minWidth: 160,
      description: 'How long did it take to reach the open position',
      editable: false, valueGetter: (value, row) => `${((row.close-row.open)*100/row.open).toFixed(2)} %`,},
  ];

const rows = [
  { id: 1, date: new Date(), open: 1.1, close:1.2,high: 1.4,low:1.0,volume:1000 },
  { id: 2, date: new Date(), open: 1.1, close:1.2,high: 1.4,low:1.0,volume:1000 },
  { id: 3, date: new Date(), open: 1.1, close:1.2,high: 1.4,low:1.0,volume:1000 },
  { id: 4, date: new Date(), open: 1.1, close:1.2,high: 1.4,low:1.0,volume:1000 },
  { id: 5, date: new Date(), open: 1.1, close:1.2,high: 1.4,low:1.0,volume:1000 },
  { id: 6, date: new Date(), open: 1.1, close:1.2,high: 1.4,low:1.0,volume:1000 },
  { id: 7, date: new Date(), open: 1.1, close:1.2,high: 1.4,low:1.0,volume:1000 },
];

export default function CustomDataGrid2() {
  return (
    // <Box sx={{ height: 400, width: '100%' }}>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
            pagination: { paginationModel: { pageSize: 50 } },
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
