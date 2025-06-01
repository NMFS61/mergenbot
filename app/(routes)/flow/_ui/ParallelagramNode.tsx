import { Box } from '@mui/material';
import { Handle, Position } from '@xyflow/react';
import MarketGroupSelection from "@/app/components/layout/sidebar/MarketChoiceSelection";
function ParallelagramNode() {
    return ( 
    <>
    <Box sx={{ width: '200px', height: '100px', backgroundColor: '#AAA239', transform: 'skew(20deg)' }}>
    <Handle type="source" position={Position.Bottom} className='custom-handle' />
    <MarketGroupSelection marketChoiceChanged={()=>{}}/>
    <Handle type="target" position={Position.Top} className='custom-handle' />
    </Box>
    </> );
}

export default ParallelagramNode;