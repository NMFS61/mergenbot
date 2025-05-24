
'use client';
import { useCallback, useState } from 'react';
import {
  Edge,
  Node,
  ReactFlow,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
 
import TextUpdaterNode from './_ui/TextUpdaterNode';
import CircleNode from './_ui/CircleNode';
import RectangleNode from './_ui/RectangleNode';
import ParallelagramNode from './_ui/ParallelagramNode';
import TriangleNode from './_ui/Triangle';

import { on } from 'events';
import StartNode from './_ui/StartNode';
 
const rfStyle = {
  backgroundColor: '#B8CEFF',
};
 

const nodeTypes = 
{
    textUpdater: TextUpdaterNode,
    circle: CircleNode,
    rectangle:RectangleNode,
    parallel:ParallelagramNode,
    triangle:TriangleNode,
    start:StartNode
};
interface IProp {
    initialNodes: Node[];
    initialEdges: Edge[];
}
export default function PageContent(props:IProp) {
    const [nodes, setNodes] = useState(props.initialNodes);
    const [edges, setEdges] = useState(props.initialEdges);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
   
    const onNodesChange = useCallback(
      (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
      [setNodes],
    );
    const onEdgesChange = useCallback(
      (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
      [setEdges],
    );
    const onConnect = useCallback(
      (connection) => setEdges((eds) => addEdge(connection, eds)),
      [setEdges],
    );

    const onInit = useCallback((reactFlowInstance) => {
      setTimeout(reactFlowInstance.fitView);
      setReactFlowInstance(reactFlowInstance);
      console.log('flow loaded:', reactFlowInstance);
    }, []);
   
    return (
        <>
        {/* <div style={{ position: 'sticky', top: 0, zIndex: 1 }}>
  <h1>Scroll Down</h1>
  <p>Scroll down to see the sticky effect.</p>
</div> */}

      <ReactFlow
        onInit={onInit}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        style={rfStyle}
      />
      </>
    );
  }