import React from 'react';
import SEO from '../../../../components/global/SEO';
import { defaultLayout } from '../../../../layouts/defaultLayout';
import { withRoles } from '../../../../utils/withRoles';
import TcWalletContainer from '../../../../components/pages/engagement/TcWalletContainer';
import TcIdentityPermissionContainer from '../../../../components/pages/engagement/TcIdentityPermissionContainer';
import TcMintTokenContainer from '../../../../components/pages/engagement/TcMintTokenContainer';
import TcBreadcrumbs from '../../../../components/shared/TcBreadcrumbs';

function Mint() {
    const communityToken = {
        name: 'nima community token',
        description: 'Mint Reputation Score Description',
    }

    return (
        <>
            <SEO titleTemplate='Mint Reputation Score' />
            <div className='container flex flex-col justify-between px-4 py-3 md:px-12 space-y-4'>
                <TcBreadcrumbs
                    items={[
                        {
                            label: 'Engagement Score NFTs',
                            path: '/engagement/reputation-nft',
                        },
                        {
                            label: 'Mint Reputation Score',
                            path: '',
                        },
                    ]}
                />
                <TcWalletContainer tokenDetails={communityToken} />
                <TcIdentityPermissionContainer />
                <TcMintTokenContainer tokenDetails={communityToken} />
            </div>
        </>
    );
}

Mint.pageLayout = defaultLayout;

export default withRoles(Mint, ['view']);
