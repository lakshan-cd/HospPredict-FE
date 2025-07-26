import React, { useMemo, useState, useCallback, useEffect } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  Node,
  Edge,
} from "react-flow-renderer";

// Helper to convert your data to react-flow format
function useGraphElements(graphData: any) {
  return useMemo(() => {
    if (!graphData) return { nodes: [], edges: [] };

    const center = { x: 0, y: 0 };
    const spacing = 300;

    const hotelNode = graphData.nodes.find((node: any) => node.type === "Hotel");
    if (!hotelNode) return { nodes: [], edges: [] };

    const hotelId = hotelNode.id;
    const otherNodes = graphData.nodes.filter((node: any) => node.id !== hotelId);

    // Position hotel node in the center
    const nodes: Node[] = [
      {
        id: hotelNode.id,
        data: { label: hotelNode.name || hotelNode.id },
        position: center,
        type: "default",
        draggable: true,
      },
    ];

    // Spread other nodes around the hotel node at varying distances
    const angleStep = (2 * Math.PI) / otherNodes.length;
    otherNodes.forEach((node: any, i: number) => {
      const angle = i * angleStep;
      // Randomize radius between 200 and 400
      const radius = 200 + Math.random() * 200;
      const pos = {
        x: center.x + Math.cos(angle) * radius,
        y: center.y + Math.sin(angle) * radius,
      };
      nodes.push({
        id: node.id,
        data: { label: node.name || node.id },
        position: pos,
        type: "default",
        draggable: true,
      });
    });

    // Only connect other nodes to the hotel node
    const edges: Edge[] = otherNodes.map((node: any) => ({
      id: `e${hotelId}-${node.id}`,
      source: hotelId,
      target: node.id,
      animated: true,
    }));

    return { nodes, edges };
  }, [graphData]);
}

export default function GraphVisualizer({ graphData }: { graphData: any }) {
  const { nodes: initialNodes, edges: initialEdges } = useGraphElements(graphData);
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  // Update state if graphData changes
  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [initialNodes, initialEdges]);

  const onNodesChange = useCallback(
    (changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  if (!graphData) return null;

  return (
    <div style={{ width: "100%", height: 600 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        minZoom={0.2}
        maxZoom={2}
        nodesDraggable={true}
        nodesConnectable={false}
        elementsSelectable={true}
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}