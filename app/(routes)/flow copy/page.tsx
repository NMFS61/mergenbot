import PageContent from "./pageContent";
const nodes = [];
const edges = [];
nodes.push({id: 'node-1', type: 'textUpdater', position: { x: 0, y: 0 }, data: { value: 123 },});
nodes.push({id: 'node-2', type: 'circle', position: { x: 100, y: 100 }, data: { value: 123 },});
nodes.push({id: 'node-3', type: 'rectangle', position: { x: 200, y: 300 }, data: { value: 123 },});
nodes.push({id: 'node-4', type: 'parallel', position: { x: 300, y: 400 }, data: { value: 123 },});
nodes.push({id: 'node-5', type: 'triangle', position: { x: 400, y: 500 }, data: { value: 123 },});
nodes.push({id: 'node-6', type: 'start', position: { x: 450, y: 550 }, data: { value: 123 },});
    

edges.push({ id: 'e1-2', source: 'node-1', sourceHandle: 'a', target: 'node-2',type:'smoothstep',label:'label',  style: { stroke: '#f6ab6c', strokeWidth: 8 }, animated: true });
function Page() {
    return (<PageContent initialNodes={nodes} initialEdges={edges}/>  );
}

export default Page;