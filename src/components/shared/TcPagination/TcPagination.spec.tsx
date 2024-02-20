import { fireEvent,render } from '@testing-library/react';
import React from 'react';

import TcPagination from './TcPagination';

describe('TcPagination', () => {
  const totalItems = 100;
  const itemsPerPage = 10;
  const currentPage = 1;
  const onChangePage = jest.fn();

  it('renders the pagination component correctly', () => {
    const { getByText } = render(
      <TcPagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onChangePage={onChangePage}
      />
    );

    // Ensure the pagination component renders with the correct total pages and current page.
    expect(getByText('1')).toBeInTheDocument();
    expect(getByText('10')).toBeInTheDocument();
  });

  it('calls onChangePage when a page is clicked', () => {
    const { getByText } = render(
      <TcPagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onChangePage={onChangePage}
      />
    );

    // Click on page 2
    fireEvent.click(getByText('2'));

    // Ensure onChangePage is called with the correct page number (2)
    expect(onChangePage).toHaveBeenCalledWith(2);
  });
});
