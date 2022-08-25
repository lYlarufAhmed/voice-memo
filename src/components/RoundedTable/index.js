import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Scrollbar from 'components/Scrollbar';
import Paginate from 'components/Paginate';
import Loading from 'components/Loading';

import './style.css';

let pageOptions = [12, 25, 50, 100];
if (process.env.NODE_ENV === 'development') {
  pageOptions = [5, 12, 25, 50, 100];
}

const RoundedTable = React.memo(
  React.forwardRef(
    ({ data, headings, showPagenate, showCount, minWidth, minHeight, maxHeight, loading }, ref) => {
      const widthArray = headings.map(head => head.percentWidth);
      const [itemCntPerPage, setItemCntPerPage] = useState(12);
      const [offset, setOffset] = useState(0);
      let pageData = data;

      useEffect(() => {
        setOffset(0);
      }, [data.length]);

      if (showPagenate && !loading) {
        pageData = data.slice(offset, offset + itemCntPerPage);
      }

      const handlePageClick = ({ selected }) => {
        if (!data || !data.length) return;
        setOffset(Math.ceil(selected * itemCntPerPage));
      };

      const changePageOption = val => {
        setOffset(Math.floor(offset / val) * val);
        setItemCntPerPage(val);
      };

      return (
        <>
          {!!showCount && <div className="table-count">{data.length} Items found</div>}
          <div className="table rounded card transparent-card border-card">
            <Scrollbar
              ref={ref}
              autoHeight
              autoHeightMin={minHeight}
              autoHeightMax={maxHeight}
              style={{
                borderRadius: '30px',
              }}
              verticalBarStyle={{
                height: 'calc(100% - 90px)',
                marginTop: '60px',
              }}
              horizontalBarStyle={{
                width: 'calc(100% - 60px)',
                marginLeft: '30px',
              }}
            >
              <div className="card-header table-header table-row" style={{ minWidth }}>
                {headings.map((head, idx) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <div key={idx} className="table-cell" style={{ width: `${widthArray[idx]}%` }}>
                    {head.component}
                  </div>
                ))}
              </div>
              <div className="card-block table-body" style={{ minWidth }}>
                {loading ? (
                  <Loading />
                ) : (
                  !!(pageData && pageData.length) &&
                  pageData.map((rowItem, index) => {
                    const isObj = !Array.isArray(rowItem) && typeof rowItem === 'object';
                    let rowProps = {};
                    let cells = [];
                    if (isObj) {
                      rowProps = rowItem.props;
                      cells = rowItem.childs;
                    } else {
                      cells = rowItem;
                    }

                    return (
                      <div
                        {...rowProps}
                        // eslint-disable-next-line react/no-array-index-key
                        key={index}
                        className={rowProps.className ? `table-row ${rowProps.className}` : 'table-row'}
                      >
                        {cells.map((item, idx) => (
                          // eslint-disable-next-line react/no-array-index-key
                          <div key={idx} className="table-cell" style={{ width: `${widthArray[idx]}%` }}>
                            {item}
                          </div>
                        ))}
                      </div>
                    );
                  })
                )}
              </div>
            </Scrollbar>
          </div>
          {!!showPagenate && !loading && (
            <div className="table-pagination">
              <Paginate
                pageCount={Math.ceil((data && data.length ? data.length : 1) / itemCntPerPage)}
                currentPage={Math.floor(offset / itemCntPerPage)}
                onPageChange={handlePageClick}
              />
              <div className="table-show">
                <span>Showing:</span>
                <ul>
                  {pageOptions.map(val => (
                    <li key={val} className={`page-item ${val === itemCntPerPage ? 'active' : ''}`}>
                      <div
                        role="button"
                        onClick={() => changePageOption(val)}
                        tabIndex={0}
                        style={{ width: '100%', height: '100%' }}
                      >
                        {val}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </>
      );
    },
  ),
);

RoundedTable.defaultProps = {
  minWidth: 0,
  showPagenate: false,
  showCount: false,
  minHeight: 540,
  maxHeight: 780,
  loading: false,
};

RoundedTable.propTypes = {
  headings: PropTypes.arrayOf(
    PropTypes.shape({
      component: PropTypes.node,
      percentWidth: PropTypes.number.isRequired,
    }),
  ).isRequired,
  data: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.shape({
        props: PropTypes.object,
        childs: PropTypes.arrayOf(PropTypes.node),
      }),
    ]),
  ).isRequired,
  showPagenate: PropTypes.bool,
  showCount: PropTypes.bool,
  loading: PropTypes.bool,
  minWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  minHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  maxHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default RoundedTable;
