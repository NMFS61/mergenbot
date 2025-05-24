import React, { memo } from 'react';
import { Handle, useStore, Position } from '@xyflow/react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

export default function CircleNode(){

  return (
    <div style={{ width: '50px', height: '50px', backgroundColor: '#AAA239', borderRadius: '50%' }}>
      <Fab color="primary" aria-label="add">
        <AddIcon />
      </Fab>
      <Handle type="target" position={Position.Left} className='custom-handle' />
    </div>
  );
}