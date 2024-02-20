import React from 'react';
import { render } from '@testing-library/react';
import TcBoxContainer from './TcBoxContainer';

// Mock the child components
jest.mock('./TcBoxTitleContainer', () => (props: any) => (
  <div data-testid='mock-title-container'>{props.children}</div>
));
jest.mock('./TcBoxContentContainer', () => (props: any) => (
  <div data-testid='mock-content-container'>{props.children}</div>
));

describe('<TcBoxContainer />', () => {
  it('renders title and content children correctly', () => {
    const titleChild = <span>Title Child</span>;
    const contentChild = <span>Content Child</span>;

    const { getByTestId, getByText } = render(
      <TcBoxContainer
        titleContainerChildren={titleChild}
        contentContainerChildren={contentChild}
      />
    );

    const titleContainer = getByTestId('mock-title-container');
    const contentContainer = getByTestId('mock-content-container');

    expect(titleContainer).toContainElement(getByText('Title Child'));
    expect(contentContainer).toContainElement(getByText('Content Child'));
  });
});
