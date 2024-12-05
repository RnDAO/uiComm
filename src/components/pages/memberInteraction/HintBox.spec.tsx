import React from 'react';
import { render } from '@testing-library/react';

import HintBox from './HintBox';

describe('HintBox component', () => {
  test('renders correctly', () => {
    const { getByText } = render(<HintBox />);

    // Assert that the "Number of interactions" text is rendered
    expect(getByText('Number of interactions')).toBeInTheDocument();

    // Assert that the interaction elements are rendered
    expect(getByText('+10')).toBeInTheDocument();
    expect(getByText('+50')).toBeInTheDocument();
    expect(getByText('+100')).toBeInTheDocument();

    // Assert that the "Member Behaviour" text is rendered
    expect(getByText('Member Behaviour')).toBeInTheDocument();

    // Assert that the member behavior elements are rendered
    expect(getByText('Frequent receiver')).toBeInTheDocument();
    expect(getByText('Frequent sender')).toBeInTheDocument();
    expect(getByText('Balanced')).toBeInTheDocument();
  });
});
