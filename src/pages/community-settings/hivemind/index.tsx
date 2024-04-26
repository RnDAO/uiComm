import React from 'react'
import { defaultLayout } from '../../../layouts/defaultLayout';
import { withRoles } from '../../../utils/withRoles';
import SEO from '../../../components/global/SEO';
import TcBoxContainer from '../../../components/shared/TcBox/TcBoxContainer';
import TcText from '../../../components/shared/TcText';
import TcButton from '../../../components/shared/TcButton';
import TcHivemindSettings from '../../../components/communitySettings/HivemindSettings';
import TcBreadcrumbs from '../../../components/shared/TcBreadcrumbs';
import { conf } from '../../../configs';

function Index() {
    return (
        <>
            <SEO titleTemplate='Hivemind Settings' />
            <div className='container flex flex-col px-4 py-4 md:px-12'>
                <TcBoxContainer
                    contentContainerChildren={
                        <div className='space-y-4'>
                            <TcBreadcrumbs items={[{
                                label: 'Community Settings',
                                path: '/community-settings',
                            }, {
                                label: 'Hivemind Settings',
                                path: '/community-settings/hivemind',
                            }]}
                            />
                            <div className='space-y-4 px-4 pt-4 pb-[1rem] md:px-10'>
                                <TcText text="Hivemind Settings" variant='h6' fontWeight='bold' />
                                <div className='flex items-center justify-between'>
                                    <TcText className='w-2/3' text="Hivemind is a Q&A bot that retrieves answers from your documentation, website, and live chats, serving as a research assistant for team discussions or customer support inquiries. Learn More" variant='body2' />
                                    <TcButton text="Permissions?" variant='outlined' onClick={() =>
                                        window.open(
                                            `${conf.GITBOOK_URL}features/smart-announcements#how-to-set-permissions-for-the-smart-announcements-to-work`
                                        )
                                    } />
                                </div>
                                <TcHivemindSettings />
                            </div>
                        </div>
                    }
                />
            </div>
        </>
    )
}

Index.pageLayout = defaultLayout;

export default withRoles(Index, ['admin']);