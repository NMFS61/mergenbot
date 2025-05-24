
import { Box } from '@mui/material';
import { Handle, Position } from '@xyflow/react';
function RectangleNode() {
    return ( 
    <>
    <Box sx={{ width: '100px', height: '50px', backgroundColor: '#AAA239', borderRadius: '5px' }}>
    <Handle type="source" position={Position.Bottom} className='custom-handle' />
    <Handle type="target" position={Position.Top} className='custom-handle' />
    </Box>
    </> );
}

export default RectangleNode;