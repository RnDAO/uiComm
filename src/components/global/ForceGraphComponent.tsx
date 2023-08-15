import { Avatar, Popover, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';

interface CustomNode {
  x?: number;
  y?: number;
  size: number;
  name?: string;
  id?: string;
}

const ForceGraphComponent = ({ nodes, links, numberOfnodes }: any) => {
  const [popOverOpen, setpopOverOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [user, setUser] = useState<{ id: string; name: string } | null>(null);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null
  );

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

  const handleSelectedNode = (node: any, event: MouseEvent) => {
    setpopOverOpen(true);
    setAnchorEl(event.currentTarget as HTMLElement);
    setUser({ id: node.id, name: node.name });
    setPosition({
      x: event.clientX,
      y: event.clientY,
    });
  };

  return (
    <div className="flex justify-center items-center h-full">
      <ForceGraph2D
        graphData={{ nodes, links }}
        nodeLabel="name"
        nodeVal={(node: CustomNode) => node.size / 1.5}
        nodeAutoColorBy="id"
        height={Number(numberOfnodes) > 300 ? 800 : 400}
        {...graphView}
        minZoom={0.5}
        onNodeClick={(node: any, event: MouseEvent) => {
          handleSelectedNode(node, event);
        }}
        onBackgroundClick={() => setpopOverOpen(false)}
      />
      <Popover
        open={popOverOpen}
        onClose={() => setpopOverOpen(false)}
        anchorEl={anchorEl} // Use the anchorEl state here
        sx={{
          position: 'absolute',
          top: `${position?.y}px`,
          left: `${position?.x}px`,
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <div className="px-4 py-3 flex items-center flex-row space-x-3">
          <Avatar />
          <Typography variant="body1" color="initial">
            {user ? user?.name : ''}
          </Typography>
        </div>
      </Popover>
    </div>
  );
};

export default ForceGraphComponent;
