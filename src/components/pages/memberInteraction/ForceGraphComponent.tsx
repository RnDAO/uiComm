import { Avatar, Popover, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import ForceGraph2D, {
  ForceGraphMethods,
  NodeObject,
} from 'react-force-graph-2d';
import { conf } from '../../../configs';
import { IRoles, IUserProfile } from '../../../utils/interfaces';
import clsx from 'clsx';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

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
  const [user, setUser] = useState<IUserProfile>();
  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null
  );
  const graphRef = useRef<
    | ForceGraphMethods<NodeObject<CustomNode>, { [others: string]: any }>
    | undefined
  >(undefined);

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

  const handleSelectedNode = (selectedNode: any, event: MouseEvent) => {
    setpopOverOpen(true);
    setAnchorEl(event.currentTarget as HTMLElement);
    const selectedUser = nodes.find((node: any) => node.id === selectedNode.id);
    setUser(selectedUser);

    setPosition({
      x: event.clientX,
      y: event.clientY,
    });
  };

  const ZOOM_DURATION = 300;

  const zoomTo = (targetZoom: number) => {
    const startZoom = graphRef.current?.zoom() || 1;
    const startTime = Date.now();

    const animateZoom = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const fraction = Math.min(1, elapsed / ZOOM_DURATION);

      const currentZoom = startZoom + (targetZoom - startZoom) * fraction;
      graphRef.current?.zoom(currentZoom);

      if (fraction < 1) {
        requestAnimationFrame(animateZoom);
      }
    };

    requestAnimationFrame(animateZoom);
  };

  const zoomIn = () => {
    if (graphRef.current) {
      const currentZoom = graphRef.current.zoom();
      zoomTo(currentZoom + 0.5);
    }
  };

  const zoomOut = () => {
    if (graphRef.current) {
      const currentZoom = graphRef.current.zoom();
      zoomTo(currentZoom - 0.5);
    }
  };

  return (
    <div className="flex justify-center items-center h-full relative">
      <ForceGraph2D
        graphData={{ nodes, links }}
        nodeLabel="username"
        nodeVal={(node: CustomNode) => node.size / 1.5}
        nodeAutoColorBy="id"
        height={Number(numberOfnodes) > 300 ? 800 : 350}
        {...graphView}
        minZoom={0.5}
        ref={graphRef}
        onNodeClick={(node: any, event: MouseEvent) => {
          handleSelectedNode(node, event);
        }}
        onBackgroundClick={() => setpopOverOpen(false)}
      />
      <div className="absolute bottom-4 right-4 flex p-1 py-2 flex-row items-center bg-gray-background rounded-md">
        <button
          className="px-2 pl-1  border-r border-[#AAAAAA]"
          onClick={zoomOut}
        >
          <AiOutlineMinus size={20} />
        </button>
        <button className="px-2 pr-1" onClick={zoomIn}>
          <AiOutlinePlus size={20} />
        </button>
      </div>
      <Popover
        open={popOverOpen}
        onClose={() => setpopOverOpen(false)}
        anchorEl={anchorEl}
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
        PaperProps={{
          style: {
            boxShadow: '0 0 0.1px 0.1px solid gray',
            borderRadius: '8px',
            minWidth: '14rem',
            maxWidth: '19rem',
            border: '1px solid #E1E1E1',
            overflow: 'wrap',
          },
        }}
      >
        <div className="px-3 py-3 flex flex-col items-start space-y-3">
          <div className="flex flex-row items-center space-x-3">
            <Avatar
              src={`${conf.DISCORD_CDN}avatars/${user?.discordId}/${user?.avatar}.png`}
              alt="User Avatar"
            />{' '}
            <div className="flex flex-col items-baseline">
              <Typography variant="body2" color="initial">
                {user ? user.username : ''}
              </Typography>
              <Typography variant="body2" className="text-gray-subtitle">
                {user ? user.ngu : ''}
              </Typography>
            </div>
          </div>
          <div className="flex flex-col space-y-1 md:space-y-0 md:flex-row flex-wrap">
            {user?.roles ? (
              <>
                {user.roles.slice(0, 4).map((role: IRoles) => (
                  <div
                    key={role.roleId}
                    className="flex flex-row flex-wrap"
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    <span
                      className="bg-white p-1 px-2 rounded-[4px] border border-[#D1D1D1] text-xs mb-1 mr-1"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor:
                          role.color !== 0
                            ? `#${role.color.toString(16).padStart(6, '0')}`
                            : '#96A5A6',
                      }}
                    >
                      <span
                        className="w-2 h-2 rounded-full mr-1"
                        style={{
                          backgroundColor:
                            role.color !== 0
                              ? `#${role.color.toString(16).padStart(6, '0')}`
                              : '#96A5A6',
                          flexShrink: 0,
                        }}
                      />
                      {role.name}
                    </span>
                  </div>
                ))}
                {user.roles.length > 4 && (
                  <div className="flex flex-row flex-wrap">
                    <span
                      className="bg-white p-1 rounded-[4px] border border-[#D1D1D1] text-xs mb-1 mr-1"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: '#AAAAAA',
                      }}
                    >
                      +{user.roles.length - 4}
                    </span>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-row flex-wrap">
                <span
                  className="bg-white p-1 px-2 rounded-[4px] border border-[#D1D1D1] text-xs"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#AAAAAA',
                  }}
                >
                  <span className="w-2 h-2 rounded-full mr-1" />
                  None
                </span>
              </div>
            )}
          </div>
          <div className="flex flex-row w-2/3 justify-center mx-auto space-x-8">
            <div className="text-center text-sm">
              <div
                className={clsx(
                  'rounded-full w-3.5 h-3.5 bg-secondary mx-auto',
                  user && user?.radius <= 10
                    ? 'w-3.5 h-3.5'
                    : user && user?.radius > 10 && user?.radius <= 50
                    ? 'w-5 h-5'
                    : 'w-8 h-8'
                )}
              />
              <span>
                +
                {user && user?.radius <= 10
                  ? '10'
                  : user && user?.radius > 10 && user?.radius <= 50
                  ? '50'
                  : '100'}
              </span>
            </div>
            <div className="text-center text-sm">
              <div
                className={clsx(
                  'rounded-full mx-auto w-5 h-5',
                  user?.stats === 'BALANCED'
                    ? 'bg-secondary'
                    : user?.stats === 'SENDER'
                    ? 'bg-green'
                    : 'bg-yellow-400'
                )}
              />
              <span>
                {user?.stats === 'BALANCED'
                  ? 'Balanced'
                  : user?.stats === 'SENDER'
                  ? 'Frequent sender'
                  : 'Frequent receiver'}
              </span>
            </div>
          </div>
        </div>
      </Popover>
    </div>
  );
};

export default ForceGraphComponent;
