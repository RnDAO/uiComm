import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import CustomPagination from './CustomPagination';

describe('CustomPagination', () => {
  const mockTotalItems = 100;
  const mockItemsPerPage = 10;
  const mockCurrentPage = 1;
  const mockOnChangePage = jest.fn();

  it('renders the component', () => {
    render(
      <CustomPagination
        totalItems={mockTotalItems}
        itemsPerPage={mockItemsPerPage}
        currentPage={mockCurrentPage}
        onChangePage={mockOnChangePage}
      />
    );

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('triggers onChangePage when a page is clicked', () => {
    render(
      <CustomPagination
        totalItems={mockTotalItems}
        itemsPerPage={mockItemsPerPage}
        currentPage={mockCurrentPage}
        onChangePage={mockOnChangePage}
      />
    );

    fireEvent.click(screen.getByText('2'));
    expect(mockOnChangePage).toHaveBeenCalledWith(2);
  });

  it('does not trigger onChangePage when the current page is clicked', () => {
    render(
      <CustomPagination
        totalItems={mockTotalItems}
        itemsPerPage={mockItemsPerPage}
        currentPage={mockCurrentPage}
        onChangePage={mockOnChangePage}
      />
    );

    fireEvent.click(screen.getByText('1'));
    expect(mockOnChangePage).toHaveBeenCalled();
  });
});
