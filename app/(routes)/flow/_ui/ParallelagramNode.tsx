import { Box } from '@mui/material';
import { Handle, Position } from '@xyflow/react';

function ParallelagramNode() {
    return ( 
    <>
    <Box sx={{ width: '100px', height: '50px', backgroundColor: '#AAA239', transform: 'skew(20deg)' }}>
    <Handle type="source" position={Position.Bottom} className='custom-handle' />
    <Handle type="target" position={Position.Top} className='custom-handle' />
    </Box>
    </> );
}

export default ParallelagramNode;