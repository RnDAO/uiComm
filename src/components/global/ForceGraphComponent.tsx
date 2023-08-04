import React, { useEffect } from 'react';
import ForceGraph2D from 'react-force-graph-2d';

interface CustomNode {
  x?: number;
  y?: number;
  size: number;
  name?: string;
  id?: string;
}

const ForceGraphComponent = ({
  nodes,
  links,
  numberOfnodes,
  restProps,
}: any) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log('This component is being rendered on the client-side.');
    }
  }, []);

  const nodeBoundingBox = (nodes: CustomNode[]) => {
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    nodes.forEach((node) => {
      if (node.x !== undefined && node.x < minX) minX = node.x;
      if (node.y !== undefined && node.y < minY) minY = node.y;
      if (node.x !== undefined && node.x > maxX) maxX = node.x;
      if (node.y !== undefined && node.y > maxY) maxY = node.y;
    });

    return { minX, minY, maxX, maxY };
  };

  const { minX, minY, maxX, maxY } = nodeBoundingBox(nodes);
  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;
  const scaleFactor = 1.0 / Math.max(maxX - minX, maxY - minY);

  const graphView = {
    distance: 800 / scaleFactor,
    angleX: 0,
    angleY: 0,
    center: { x: centerX, y: centerY },
  };

  return (
    <div className="flex justify-center items-center h-full">
      <ForceGraph2D
        graphData={{ nodes, links }}
        nodeLabel="name"
        nodeVal={(node: CustomNode) => node.size / 1.5}
        nodeAutoColorBy="id"
        height={Number(numberOfnodes) > 300 ? 800 : 400} // Here's the corrected line        graphView={graphView}
        minZoom={0.5}
        {...restProps}
      />
    </div>
  );
};

export default ForceGraphComponent;
