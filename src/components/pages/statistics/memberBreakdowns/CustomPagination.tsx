import { Pagination, PaginationItem } from '@mui/material';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onChangePage: (page: number) => void;
}

const CustomPagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onChangePage,
}) => {
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
      renderItem={(item) => <PaginationItem component='button' {...item} />}
    />
  );
};

export default CustomPagination;
