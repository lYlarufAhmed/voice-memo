import React from 'react';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import './style.css';

const Paginate = React.memo(({ pageCount, currentPage, onPageChange }) => (
  <ReactPaginate
    previousLabel={<ChevronLeftIcon />}
    nextLabel={<ChevronRightIcon />}
    breakLabel="..."
    pageCount={pageCount}
    forcePage={currentPage}
    marginPagesDisplayed={1}
    pageRangeDisplayed={2}
    onPageChange={onPageChange}
    containerClassName="pagination justify-content-center"
    pageClassName="page-item"
    pageLinkClassName="page-link"
    activeLinkClassName="page-link active"
    breakClassName="page-item"
    breakLinkClassName="page-link"
    previousClassName="page-item"
    previousLinkClassName="page-link"
    nextClassName="page-item"
    nextLinkClassName="page-link"
  />
));

Paginate.propTypes = {
  pageCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Paginate;
