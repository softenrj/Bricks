// Copyright (c) 2025 Raj 
// See LICENSE for details.
"use client";
import React, { useEffect, useMemo, useState, useCallback } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  NodeTypes,
} from "@xyflow/react";
import dagre from "@dagrejs/dagre";
import ContextNode from "./ContextNode";
import { useAppSelector } from "@/hooks/redux";
import { ProjectContextNode } from "@/store/Reducers/fileContext";

const NODE_WIDTH = 180;
const NODE_HEIGHT = 60;

const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  dagreGraph.setGraph({
    rankdir: "LR",   // horizontal layout
    nodesep: 100,    // horizontal spacing
    ranksep: 560,    // vertical spacing between ranks
  });

  nodes.forEach((node, index) => {
    dagreGraph.setNode(node.id, { width: NODE_WIDTH, height: NODE_HEIGHT });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  return {
    nodes: nodes.map((node, index) => {
      const pos = dagreGraph.node(node.id);

      // Add slight vertical deviation for child nodes
      const deviation = Math.sin(index) * 20; // ±20px deviation
      return {
        ...node,
        position: {
          x: pos.x - NODE_WIDTH / 2,
          y: pos.y - NODE_HEIGHT / 2 + deviation,
        },
      };
    }),
    edges,
  };
};


const flattenTree = (
  node: ProjectContextNode,
  expandedNodes: Set<string>,
  parentId?: string
) => {
  const rfNode: Node = {
    id: node._id,
    type: "custom",
    data: { label: node.name, hasChildren: (node.child ?? []).length > 0, details: node },
    position: { x: 0, y: 0 },
  };

  const rfEdges: Edge[] = parentId
    ? [
      {
        id: `${parentId}-${node._id}`,
        source: parentId,
        target: node._id,
        animated: true,
      },
    ]
    : [];

  let allNodes = [rfNode];
  let allEdges = [...rfEdges];

  if (expandedNodes.has(node._id)) {
    (node.child ?? []).forEach((child) => {
      const { nodes: cNodes, edges: cEdges } = flattenTree(
        child,
        expandedNodes,
        node._id
      );
      allNodes = [...allNodes, ...cNodes];
      allEdges = [...allEdges, ...cEdges];
    });
  }

  return { nodes: allNodes, edges: allEdges };
};

function ContextNeurons() {
  const contextTree = useAppSelector((state) => state.context); // root node or array of roots

  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  const toggleNode = useCallback((nodeId: string) => {
    setExpandedNodes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) newSet.delete(nodeId);
      else newSet.add(nodeId);
      return newSet;
    });
  }, []);

  const { nodes: rfNodes, edges: rfEdges } = useMemo(() => {
    if (!contextTree) return { nodes: [], edges: [] };
    const roots = Array.isArray(contextTree) ? contextTree : [contextTree];
    return roots.reduce(
      (acc, rootNode) => {
        const { nodes, edges } = flattenTree(rootNode, expandedNodes);
        return {
          nodes: [...acc.nodes, ...nodes],
          edges: [...acc.edges, ...edges],
        };
      },
      { nodes: [] as Node[], edges: [] as Edge[] }
    );
  }, [contextTree, expandedNodes]);

  const [nodes, setNodes, onNodesChange] = useNodesState<Node>(rfNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(rfEdges);

  useEffect(() => {
    if (!rfNodes.length) return;
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      rfNodes,
      rfEdges
    );
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  }, [rfNodes, rfEdges, setNodes, setEdges]);

  const nodeTypes: NodeTypes = useMemo(
    () => ({
      custom: (props: any) => (
        <ContextNode {...props} onExpand={() => toggleNode(props.id)} />
      ),
    }),
    [toggleNode]
  );

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.0001}
        maxZoom={10}
        zoomOnDoubleClick={true}
        zoomOnScroll={true}
        zoomOnPinch={true}
        panOnDrag={true}
        panOnScroll={true}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default ContextNeurons;
