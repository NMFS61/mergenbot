import { Box } from '@mui/material';
import { Handle, Position } from '@xyflow/react';
import MultipleSelectMarket from './MultipleSelectMarket';
import MuiltipleSelectMarket2 from './MuiltipleSelectMarket2';
function MarketChoiceNode() {
    return ( 
    <>
    {/* <Box sx={{ width: '100px', height: '50px', backgroundColor: '#AAA239', borderRadius: '5px' }}> */}
    <Box>
    <Handle type="source" position={Position.Bottom} className='custom-handle' />
    <Handle type="target" position={Position.Top} className='custom-handle' />
    <MultipleSelectMarket />
    </Box>
    {/* </Box> */}
    </> );
}

export default MarketChoiceNode;
