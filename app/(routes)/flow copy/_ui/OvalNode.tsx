import { Box } from '@mui/material';
import { Handle, Position } from '@xyflow/react';
const oval={ width: '100px', height: '50px', backgroundColor:'#555',borderRadius:" 50%" }
const square={ width: '50px', height: '50px', backgroundColor:'#555' }
const trapezoid={ width: '125px', height: '0', borderRight:'25px solid transparent', borderleft:'25px solid transparent', borderBottom:'50px solid #555' }


function OvalNode() {
    return ( 
    <>
    <Box sx={oval}>
    <Handle type="source" position={Position.Bottom} className='custom-handle' />
    <Handle type="target" position={Position.Top} className='custom-handle' />
    </Box>
    </> );
}

export default OvalNode;