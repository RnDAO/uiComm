import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmStartProcessing from './ConfirmStartProcessing';

describe('ConfirmStartProcessing', () => {
  const onClose = jest.fn();
  const onSubmitProcess = jest.fn();

  beforeEach(() => {
    onClose.mockClear();
    onSubmitProcess.mockClear();
  });

  it('renders the correct text', () => {
    render(
      <ConfirmStartProcessing
        open
        onClose={onClose}
        onSubmitProcess={onSubmitProcess}
      />
    );

    expect(
      screen.getByText(
        /Data from selected channels may take some time to process/i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Please confirm you want to start data processing. It might take up to 6 hours to complete. Once it is done we will send you a message on Discord./i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /During this period, it will not be possible to change your imported channels./i
      )
    ).toBeInTheDocument();
    expect(screen.getByText(/Cancel/i)).toBeInTheDocument();
    expect(screen.getByText(/Start data processing/i)).toBeInTheDocument();
  });

  it('calls onClose when cancel button is clicked', () => {
    render(
      <ConfirmStartProcessing
        open
        onClose={onClose}
        onSubmitProcess={onSubmitProcess}
      />
    );

    const cancelButton = screen.getByText(/Cancel/i);
    fireEvent.click(cancelButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onSubmitProcess when start button is clicked', () => {
    render(
      <ConfirmStartProcessing
        open
        onClose={onClose}
        onSubmitProcess={onSubmitProcess}
      />
    );

    const startButton = screen.getByText(/Start data processing/i);
    fireEvent.click(startButton);

    expect(onSubmitProcess).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when close icon is clicked', () => {
    render(
      <ConfirmStartProcessing
        open
        onClose={onClose}
        onSubmitProcess={onSubmitProcess}
      />
    );

    const closeIcon = screen.getByTestId('close-modal-icon');
    fireEvent.click(closeIcon);

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
