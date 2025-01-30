"use client";

import { roadmapConfig } from "@/config/roadmap";
import { useCallback, useEffect } from "react";
import ReactFlow, {
  Background,
  Connection,
  ConnectionMode,
  Controls,
  Edge,
  MiniMap,
  Node,
  addEdge,
  useEdgesState,
  useNodesState,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import RoadmapNode from "@/components/features/roadmap/RoadmapNode";

// Add type definition
type RoadmapItem = {
  id: string;
  title: string;
  highlighted?: boolean;
  recommended?: boolean;
  alternative?: boolean;
  description?: string;
  children?: RoadmapItem[];
};

const nodeTypes = {
  roadmap: RoadmapNode,
};

const nodeWidth = 250;
const nodeHeight = 80;
const MAIN_PATH_X = 800;
const HORIZONTAL_SPACING = 400;
const BASE_VERTICAL_SPACING = 500; // Base vertical spacing
const SIDE_OFFSET = 500;
const CHILD_SPACING = 150;
const CHILD_HEIGHT_MULTIPLIER = 100; // Additional space per child

// Calculate required vertical space based on children count
const calculateRequiredVerticalSpace = (node: RoadmapItem) => {
  const directChildren = node.children?.length || 0;
  const subChildren =
    node.children?.reduce(
      (acc: number, child: RoadmapItem) => acc + (child.children?.length || 0),
      0
    ) || 0;
  const totalChildren = Math.max(directChildren, subChildren);

  // Return base spacing plus additional space per child
  return BASE_VERTICAL_SPACING + totalChildren * CHILD_HEIGHT_MULTIPLIER;
};

// Helper to get main node position with dynamic spacing
const getMainNodePosition = (
  index: number,
  totalNodes: number,
  previousNodes: RoadmapItem[]
) => {
  const nodesPerRow = 2;
  const row = Math.floor(index / nodesPerRow);
  const col = index % nodesPerRow;

  // Calculate cumulative vertical spacing based on previous nodes in the same column
  let cumulativeY = 250; // Initial offset
  for (let i = 0; i < row; i++) {
    const previousNodeIndex = i * nodesPerRow + col;
    if (previousNodeIndex < previousNodes.length) {
      cumulativeY += calculateRequiredVerticalSpace(
        previousNodes[previousNodeIndex]
      );
    }
  }

  return {
    x: MAIN_PATH_X + col * HORIZONTAL_SPACING,
    y: cumulativeY,
  };
};

const getChildPosition = (
  parentX: number,
  startY: number,
  index: number,
  totalChildren: number,
  isLeft: boolean
) => {
  // Center the children group vertically around the parent
  const totalHeight = (totalChildren - 1) * CHILD_SPACING;
  const startOffset = -totalHeight / 2;

  return {
    x: parentX + (isLeft ? -SIDE_OFFSET : SIDE_OFFSET),
    y: startY + startOffset + index * CHILD_SPACING,
  };
};

// Helper function to determine edge type and style based on nodes
const getEdgeParams = (
  source: string,
  target: string,
  isChild: boolean,
  isLeft?: boolean
) => {
  if (isChild) {
    return {
      type: "smoothstep",
      style: { stroke: "#666", strokeWidth: 2 },
      sourceHandle: isLeft ? "left" : "right",
      targetHandle: isLeft ? "right" : "left",
    };
  }

  // For main path connections
  return {
    type: "smoothstep",
    style: { stroke: "#666", strokeWidth: 2 },
    sourceHandle: "bottom",
    targetHandle: "top",
    markerEnd: { type: MarkerType.Arrow },
  } as Edge;
};

export default function RoadmapPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const transformData = useCallback((config: typeof roadmapConfig) => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];
    const totalMainNodes = config.children.length;

    // Process root node
    nodes.push({
      id: "root",
      type: "roadmap",
      position: { x: MAIN_PATH_X + HORIZONTAL_SPACING / 2, y: 50 },
      data: {
        label: config.title,
        highlighted: true,
        isMainNode: true,
      },
    });

    const processMainPathNode = (
      node: (typeof config.children)[0],
      index: number
    ) => {
      const nodeId = `main-${index}`;
      const prevNodeId = index === 0 ? "root" : `main-${index - 1}`;
      const isLeft = index % 2 === 0;
      const position = getMainNodePosition(
        index,
        totalMainNodes,
        config.children
      );

      // Add main path node
      nodes.push({
        id: nodeId,
        type: "roadmap",
        position: position,
        data: {
          label: node.title,
          highlighted: node.highlighted,
          isMainNode: true,
        },
      });

      // Connect to previous node with improved routing
      edges.push({
        id: `edge-${prevNodeId}-${nodeId}`,
        source: prevNodeId,
        target: nodeId,
        ...getEdgeParams(prevNodeId, nodeId, false),
      });

      if (node.children) {
        const totalChildren = node.children.length;

        node.children.forEach((child, childIndex) => {
          const childId = `${nodeId}-child-${childIndex}`;
          const childPosition = getChildPosition(
            position.x,
            position.y,
            childIndex,
            totalChildren,
            isLeft
          );

          nodes.push({
            id: childId,
            type: "roadmap",
            position: {
              x: childPosition.x - nodeWidth / 2,
              y: childPosition.y - nodeHeight / 2,
            },
            data: {
              label: child.title,
              description: child.description,
              recommended: child.recommended,
              alternative: child.alternative,
              isMainNode: false,
            },
          });

          // Connect to child with improved routing
          edges.push({
            id: `edge-${nodeId}-${childId}`,
            source: nodeId,
            target: childId,
            ...getEdgeParams(nodeId, childId, true, isLeft),
          });

          // Process sub-children with similar spacing logic
          if (child.children) {
            const totalSubChildren = child.children.length;

            child.children.forEach((subChild, subIndex) => {
              const subChildId = `${childId}-sub-${subIndex}`;
              const subChildPosition = getChildPosition(
                childPosition.x,
                childPosition.y,
                subIndex,
                totalSubChildren,
                isLeft
              );

              nodes.push({
                id: subChildId,
                type: "roadmap",
                position: {
                  x: subChildPosition.x - nodeWidth / 2,
                  y: subChildPosition.y - nodeHeight / 2,
                },
                data: {
                  label: subChild.title,
                  recommended: subChild.recommended,
                  alternative: subChild.alternative,
                },
              });

              edges.push({
                id: `edge-${childId}-${subChildId}`,
                source: childId,
                target: subChildId,
                ...getEdgeParams(childId, subChildId, true, isLeft),
              });
            });
          }
        });
      }
    };

    config.children.forEach(processMainPathNode);

    return { nodes, edges };
  }, []);

  useEffect(() => {
    const { nodes: newNodes, edges: newEdges } = transformData(roadmapConfig);
    setNodes(newNodes);
    setEdges(newEdges);
  }, [transformData, setNodes, setEdges]);

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges]
  );

  return (
    <div className="h-screen w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        connectionMode={ConnectionMode.Loose}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        defaultViewport={{
          x: 150,
          y: 150,
          zoom: 0.5,
        }}
        // Restrict panning area
        translateExtent={[
          [-50, -250], // [left, top] minimum coordinates
          [2000, 11500], // [right, bottom] maximum coordinates
        ]}
        fitView={false}
        minZoom={0.08}
        maxZoom={5}
        attributionPosition="bottom-right"
        defaultEdgeOptions={{
          type: "smoothstep",
          animated: false,
          style: {
            stroke: "#fff", // White edges
            strokeWidth: 2,
          },
        }}
      >
        <Controls showZoom={true} showFitView={true} position="bottom-right" />
        <MiniMap zoomable pannable />
        <Background
          gap={12}
          size={1}
          color="#E2E8F0"
          className="dark:!bg-gray-900"
        />
      </ReactFlow>
    </div>
  );
}
