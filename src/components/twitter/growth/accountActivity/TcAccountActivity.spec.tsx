import React from 'react';
import { render } from '@testing-library/react';
import TcAccountActivity from './TcAccountActivity';
import TcAccountActivityHeader from './TcAccountActivityHeader';
import TcAccountActivityContent from './TcAccountActivityContent';
import { unmountComponentAtNode } from 'react-dom';

// Mocking the child components to check only if they're rendered
jest.mock('./TcAccountActivityHeader', () => {
  return {
    __esModule: true,
    default: jest.fn(() => <div data-testid="header-mock" />),
  };
});

jest.mock('./TcAccountActivityContent', () => {
  return {
    __esModule: true,
    default: jest.fn(() => <div data-testid="content-mock" />),
  };
});

describe('<TcAccountActivity />', () => {
  let container: any = null;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('renders without crashing', () => {
    render(<TcAccountActivity />, container);
  });

  it('renders TcAccountActivityHeader component', () => {
    const { getByTestId } = render(<TcAccountActivity />, container);
    expect(getByTestId('header-mock')).toBeInTheDocument();
  });

  it('renders TcAccountActivityContent component', () => {
    const { getByTestId } = render(<TcAccountActivity />, container);
    expect(getByTestId('content-mock')).toBeInTheDocument();
  });
});
