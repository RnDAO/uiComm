import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import TcTimeZone from './TcTimeZone';

test('should handle zone selection', async () => {
  const handleZoneFunction = jest.fn();

  const { getByTestId, getByLabelText } = render(
    <TcTimeZone handleZone={handleZoneFunction} />
  );

  const globeIcon = getByTestId('globe-icon');
  fireEvent.click(globeIcon);

  const searchInput = getByLabelText('Search timezone');
  expect(searchInput).toBeInTheDocument();
});
