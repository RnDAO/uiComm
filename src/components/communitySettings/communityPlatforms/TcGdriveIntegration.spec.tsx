import { render } from '@testing-library/react';
import TcGdriveIntegration from './TcGdriveIntegration';
import { SnackbarProvider } from '../../../context/SnackbarContext';

describe('TcGdriveIntegration', () => {
    it('should render without throwing an error', () => {
        render(
            <SnackbarProvider>
                <TcGdriveIntegration
                    isLoading={false}
                    connectedPlatforms={[]}
                    handleUpdateCommunityPlatoform={() => jest.fn()}
                />
            </SnackbarProvider>
        );
    });
});
