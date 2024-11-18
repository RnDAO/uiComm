import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import TcRolesAndPermissionsContainer from './TcRolesAndPermissionsContainer';

jest.mock('../../../context/TokenContext', () => ({
  __esModule: true,
  useToken: jest.fn().mockImplementation(() => ({
    community: {
      id: '3213215125125521',
      platforms: [{ id: '312312325152521' }],
    },
  })),
}));

jest.mock('../../../context/SnackbarContext', () => ({
  __esModule: true,
  useSnackbar: jest.fn().mockImplementation(() => ({
    showMessage: jest.fn(),
  })),
}));

describe('TcRolesAndPermissionsContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should render DOM elements correctly', () => {
    render(<TcRolesAndPermissionsContainer />);

    expect(screen.getByText('Roles & Permissions')).toBeInTheDocument();
    expect(
      screen.getByText('Configure the following for Admins vs. Viewers')
    ).toBeInTheDocument();
    expect(screen.getByText('Admins')).toBeInTheDocument();
    expect(screen.getByText('Viewers')).toBeInTheDocument();
    expect(screen.getByText('Save Changes')).toBeInTheDocument();
  });
  it('should render the correct text for Admins and Viewers', () => {
    render(<TcRolesAndPermissionsContainer />);

    expect(
      screen.getByText(
        'Admins have full access to the account. They can manage members, permissions and other settings of the account.'
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Viewers can see all the metrics but don't have permission to change the settings."
      )
    ).toBeInTheDocument();
  });
});
