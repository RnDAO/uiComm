import { Paper, Popover } from '@mui/material';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { AiOutlineExclamationCircle, AiOutlineLeft } from 'react-icons/ai';

import EmptyState from '@/components/global/EmptyState';

import emptyState from '@/assets/svg/empty-state.svg';

import Link from '../components/global/Link';
import SimpleBackdrop from '../components/global/LoadingBackdrop';
import SEO from '../components/global/SEO';
import HintBox from '../components/pages/memberInteraction/HintBox';
import { useToken } from '../context/TokenContext';
import { defaultLayout } from '../layouts/defaultLayout';
import useAppStore from '../store/useStore';
import { withRoles } from '../utils/withRoles';

const ForceGraphComponent = dynamic(
  () =>
    import('../components/pages/memberInteraction/ForceGraphComponent').then(
      (cmp) => cmp
    ),
  { ssr: false }
);

const getNodeSize = (radius: number) => {
  if (radius >= 0 && radius <= 10) {
    return 1;
  } else if (radius >= 11 && radius <= 50) {
    return 5;
  } else {
    return 8;
  }
};

const transformApiResponseToMockData = (apiResponse: any[]) => {
  const nodes: any[] = [];
  const links: any[] = [];

  apiResponse.forEach(({ from, to, width }) => {
    const sourceNode = {
      id: from.id,
      username: from.username,
      color:
        from.stats === 'SENDER'
          ? '#3AAE2B'
          : from.stats === 'RECEIVER'
            ? '#FFCB33'
            : '#804EE1',
      size: getNodeSize(from.radius),
      stats: from.stats,
      ngu: from.ngu,
      roles: from.roles,
      radius: from.radius,
      discordId: from.id,
      avatar: from.avatar,
    };
    const targetNode = {
      id: to.id,
      username: to.username,
      color:
        to.stats === 'SENDER'
          ? '#3AAE2B'
          : to.stats === 'RECEIVER'
            ? '#FFCB33'
            : '#804EE1',
      size: getNodeSize(to.radius),
      stats: to.stats,
      ngu: to.ngu,
      roles: to.roles,
      radius: to.radius,
      discordId: to.id,
      avatar: to.avatar,
    };
    const link = { source: from.id, target: to.id, width };

    // Add nodes to the nodes array only if they don't exist already
    if (!nodes.find((node) => node.id === sourceNode.id)) {
      nodes.push(sourceNode);
    }

    if (!nodes.find((node) => node.id === targetNode.id)) {
      nodes.push(targetNode);
    }

    // Add the link to the links array
    links.push(link);
  });

  return { nodes, links };
};

function MembersInteraction() {
  const { community, selectedPlatform } = useToken();

  const [nodes, setNodes] = useState<any[]>([]);
  const [links, setLinks] = useState<any[]>([]);

  const [nodeSizes, setNodeSizes] = useState<number[]>([]);

  const [popoverAnchorEl, setPopoverAnchorEl] = useState<null | HTMLElement>(
    null
  );

  const { getMemberInteraction, isLoading } = useAppStore();

  useEffect(() => {
    const platform = community?.platforms.find(
      (platform) => platform.id === selectedPlatform
    );

    if (platform) {
      getMemberInteraction(selectedPlatform, platform.name).then(
        (apiResponse: any[]) => {
          const { nodes, links } = transformApiResponseToMockData(apiResponse);
          const nodeSizes = nodes.map((node) => node.size);
          setNodes(nodes);
          setLinks(links);
          setNodeSizes(nodeSizes);
        }
      );
    }
  }, [selectedPlatform]);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setPopoverAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setPopoverAnchorEl(null);
  };

  const open = Boolean(popoverAnchorEl);
  const popoverId = open ? 'hint-popover' : undefined;

  const hasActivePlatform = community?.platforms?.some(
    (platform) =>
      (platform.name === 'discord' || platform.name === 'discourse') &&
      platform.disconnectedAt === null
  );

  if (!hasActivePlatform) {
    return (
      <>
        <SEO />
        <EmptyState image={<Image alt='Image Alt' src={emptyState} />} />
      </>
    );
  }

  if (isLoading) {
    return <SimpleBackdrop />;
  }

  return (
    <>
      <SEO titleTemplate='Member interactions' />
      <div className='container flex flex-col justify-between px-4 py-3 md:px-12'>
        <Link to='/' className='mb-3'>
          <div className='flex items-center text-base text-gray-subtitle hover:text-black'>
            <AiOutlineLeft />
            <span className='pl-1'>Community Insights</span>
          </div>
        </Link>
        <Paper
          sx={{
            maxHeight: { xs: 'calc(100vh - 100px)', md: 'calc(100vh - 60px)' },
          }}
          className='space-y-4 overflow-hidden rounded-xl px-4 py-6 shadow-box md:px-8'
        >
          <h3 className='text-xl font-medium text-lite-black'>
            Member interactions graph
          </h3>
          <p>Data from the last 7 days</p>
          <div className='flex flex-col md:flex-row md:items-start md:space-x-5'>
            <div className='border-gray-150 items-center justify-center overflow-hidden rounded-lg border bg-gray-hover shadow-sm lg:w-11/12'>
              <ForceGraphComponent
                nodes={nodes}
                links={links}
                nodeRelSize={nodeSizes}
                numberOfnodes={nodes.length}
                platformType={
                  community?.platforms.find(
                    (platform) => platform.id === selectedPlatform
                  )?.name
                }
              />
            </div>
            <div className='hidden justify-end md:flex md:w-1/2  lg:flex-1'>
              <HintBox />
            </div>
          </div>
          <div className='float-left md:hidden'>
            <button onClick={handlePopoverOpen}>
              <AiOutlineExclamationCircle size={30} />
            </button>
            <Popover
              id={popoverId}
              open={open}
              anchorEl={popoverAnchorEl}
              onClose={handlePopoverClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              PaperProps={{
                style: { background: 'none', boxShadow: 'none' },
              }}
            >
              <div className='p-4'>
                <HintBox />
              </div>
            </Popover>
          </div>
        </Paper>
      </div>
    </>
  );
}

MembersInteraction.pageLayout = defaultLayout;

export default withRoles(MembersInteraction, ['view', 'admin']);
