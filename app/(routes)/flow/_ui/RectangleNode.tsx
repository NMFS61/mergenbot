
import DateIntervalSelection from '@/app/components/layout/sidebar/DateIntervalSelection';
import { Box } from '@mui/material';
import { Handle, Position } from '@xyflow/react';
function RectangleNode() {
    return ( 
    <>
    <Box sx={{ width: '200px', height: '10px', borderRadius: '5px' }}>
    
    <Handle type="target" position={Position.Top} className='custom-handle' />
    <DateIntervalSelection onDatesDataChange={(dateData)=>{}}  />
        <Handle type="source" position={Position.Bottom} className='custom-handle' />
    </Box>
    </> );
}

export default RectangleNode;