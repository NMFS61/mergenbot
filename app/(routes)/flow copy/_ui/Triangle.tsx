import { Box } from '@mui/material';
import { Handle, Position } from '@xyflow/react';
const up={ width: '0', height: '0', borderLeft:'25px solid transparent',borderRight:"25px solid transparent",borderBottom: '50px solid #555' }
const down={ width: '0', height: '0', borderLeft:'25px solid transparent',borderRight:"25px solid transparent",borderTop: '50px solid #555' }
const right={ width: '0', height: '0', borderTop:'25px solid transparent',borderLeft:"50px solid #555",borderBottom: '25px solid transparent' }
const left={ width: '0', height: '0', borderTop:'25px solid transparent',borderRight:"50px solid #555",borderBottom: '25px solid transparent' }



function TriangleNode() {
    return ( 
    <>
    <Box sx={left}>
    <Handle type="source" position={Position.Bottom} className='custom-handle' />
    <Handle type="target" position={Position.Top} className='custom-handle' />
    </Box>
    </> );
}

export default TriangleNode;