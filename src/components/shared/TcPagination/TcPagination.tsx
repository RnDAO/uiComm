import { Pagination, PaginationItem, PaginationProps } from '@mui/material';

interface ITcPaginationProps extends PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onChangePage: (page: number) => void;
}

/**
 * TcPagination Component
 *
 * A pagination component using Material-UI's `Pagination` to handle page navigation.
 *
 * @component
 * @param {ITcPaginationProps} props - The props for configuring the pagination.
 * @param {number} props.totalItems - The total number of items to paginate.
 * @param {number} props.itemsPerPage - The number of items per page.
 * @param {number} props.currentPage - The current active page.
 * @param {(page: number) => void} props.onChangePage - A callback function to handle page changes.
 * @returns {JSX.Element} - The rendered pagination component.
 *
 * @example
 * // Usage:
 * <TcPagination
 *   totalItems={100}
 *   itemsPerPage={10}
 *   currentPage={1}
 *   onChangePage={(page) => handlePageChange(page)}
 * />
 */

function TcPagination({
  onChangePage,
  currentPage,
  itemsPerPage,
  totalItems,
  ...props
}: ITcPaginationProps): JSX.Element {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleChangePage = (page: number) => {
    if (page !== currentPage) {
      onChangePage(page);
    }
  };

  return (
    <Pagination
      shape='rounded'
      count={totalPages}
      page={currentPage}
      onChange={(event, page) => handleChangePage(page)}
      {...props}
      renderItem={(item) => <PaginationItem component='button' {...item} />}
    />
  );
}

export default TcPagination;
