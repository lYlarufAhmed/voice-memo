import React, { Component } from 'react';
import qs from 'querystring';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import moment from 'moment';
import { MANUAL_PAYMENT_METHODS } from 'config/payment-type';
import { INITIAL_DATE_RANGE } from 'config/giving-history';
import { logger, utils } from 'service';
import { DatePicker, ExcelDownLoad, Loading, RoundedTable, Scrollbar, StyledModal } from 'components';
import {
  cancelSubscriptionRequest,
  fetchGiftsRequest,
  fetchGivingHistoryRequest,
  fetchRecurringGivingRequest,
} from 'redux/actions/GiftActions';
import GivingHistoryImage from 'assets/images/givinghistory.png';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import './style.css';
import { withRouter } from 'react-router-dom';
import { FormControl, List, ListItem, Select } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

class GivingHistoryDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedProductID: 'all',
      selectedPaymentMethod: 'all',
      step: 'history',
      showConfirmDialog: false,
      cancelingSubscriptionId: null,
      giftSummary: {
        history: [],
        productTotalMap: {},
        total: 0,
        // isLoading: false,
      },
    };
  }

  componentDidMount() {
    this.loadData(true);
  }

  componentDidUpdate(prevProps, prevState) {
    logger.warn('component did update');
    const { from: prevFrom, to: prevTo } = prevProps;
    const { selectedProductID, selectedPaymentMethod } = this.state;
    const { selectedProductID: currPID, selectedPaymentMethod: currPM } = prevState;
    const { from, to } = this.props;

    if (
      prevFrom !== from ||
      prevTo !== to ||
      selectedProductID !== currPID ||
      selectedPaymentMethod !== currPM
    ) {
      this.loadData(false);
    }
  }

  getTableForExcel() {
    const { giftSummary } = this.state;
    const { gifts } = this.props;
    return (
      <table hidden id="user-ghistory-detail-table-to-xls">
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Giving Type</th>
            <th>Payment Method</th>
          </tr>
        </thead>
        <tbody>
          {giftSummary.history?.map((gh, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <tr key={index}>
              <td>{utils.formatValue(gh.date, 'date')}</td>
              <td>{utils.formatValue(gh.total / 100, 'currency')}</td>
              <td>{(gifts.data.find(g => g.productID === gh.productID) || { title: 'No Title' }).title}</td>
              <td>
                {
                  (
                    [{ label: 'Faithmo', value: 'faithmo' }, ...MANUAL_PAYMENT_METHODS].find(
                      g => g.value === gh.methodType,
                    ) || { label: null }
                  ).label
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  goBack = () => {
    const { history, location, from, to } = this.props;
    if (location.state && location.state.from) {
      history.goBack();
    } else {
      history.replace(`/dashboard/history?from=${from}&to=${to}`, {
        from: location.state ? location.state.from : undefined,
      });
    }
  };

  loadData = async isRefresh => {
    const { selectedProductID, selectedPaymentMethod, step, giftSummary } = this.state;
    const { gifts, dispatch, churchID, user, from, to } = this.props;
    if (isRefresh)
      await Promise.all([dispatch(fetchGiftsRequest(churchID)), dispatch(fetchRecurringGivingRequest())]);

    // logger.warn('loading data', step);
    if (step === 'history') {
      this.setState({ giftSummary: { ...giftSummary } }, async () => {
        // if (gifts.data.length === 0) await dispatch(fetchGiftsRequest(churchID));
        try {
          let gHistory;
          const productTotalMap = {};

          if (isRefresh || gifts.from > from || gifts.to < to) {
            const [hist] = await dispatch(fetchGivingHistoryRequest(churchID, from, to));
            gHistory = hist;
          } else {
            gHistory = [...gifts.history];
          }

          if (gHistory && gHistory.length) {
            gHistory.forEach(item => {
              productTotalMap[item.productID] = (productTotalMap[item.productID] || 0) + item.total / 100;
            });
          }
          gHistory = gHistory.map(gh => ({
            ...gh,
            productName: (gifts.data.find(g => g.productID === gh.productID) || { title: 'No Title' })
              .title,
          }));

          gHistory = gHistory.filter(
            item =>
              item.date >= from &&
              item.date <= to &&
              item.customerID === user.customerID &&
              (selectedProductID === 'all' || item.productID === selectedProductID) &&
              (selectedPaymentMethod === 'all' ||
                (selectedPaymentMethod === 'manual' && item.giftID) ||
                selectedPaymentMethod === item.methodType),
          );
          let total = 0;
          gHistory.forEach(item => {
            total += item.total / 100;
          });

          this.setState({
            giftSummary: {
              history: gHistory,
              productTotalMap,
              total,
              // isLoading: false,
            },
          });
          return;
        } catch (error) {
          logger.warn('loadData in GivingHistoryDetail', error);
        }
        this.setState({
          giftSummary: {
            history: [],
            productTotalMap: {},
            total: 0,
            // isLoading: false,
          },
        });
      });
    }
  };

  handleChangeFilter = async (name, value) => {
    const { history, location, churchID, dispatch, from, to } = this.props;

    if (name === 'from' || name === 'to') {
      const dateFrom = name === 'from' ? moment(value.getTime()).startOf('day').valueOf() : from;
      const dateTo = name === 'to' ? moment(value.getTime()).endOf('day').valueOf() : to;

      history.replace(`/dashboard/history/?from=${dateFrom}&to=${dateTo}`, {
        from: location.state ? location.state.from : undefined,
      });
      const [hist] = await dispatch(fetchGivingHistoryRequest(churchID, dateFrom, dateTo));
      this.setState(prevState => {
        const newGiftSummary = prevState.giftSummary;
        newGiftSummary.history = hist;
        return { giftSummary: newGiftSummary };
      });
    } else {
      this.setState({ [name]: value });
    }
  };

  handleChangeStep = async step => {
    this.setState({ step });
  };

  handleCancelSubscription = subID => {
    this.setState({ showConfirmDialog: true, cancelingSubscriptionId: subID });
  };

  handleCloseConfirmDialog = () => {
    this.setState({ showConfirmDialog: false, cancelingSubscriptionId: null });
  };

  cancelSubscription = async subsID => {
    const {
      churchID,
      user: { customerID },
      dispatch,
    } = this.props;
    this.setState({ giftSummary: { isLoading: true } });

    await dispatch(cancelSubscriptionRequest(churchID, customerID, subsID));
    this.setState({
      // giftSummary: { isLoading: false },
      showConfirmDialog: false,
      cancelingSubscriptionId: null,
    });
    // await dispatch(cancelSubscriptionRequest(churchID, customerID, subsID));
    // this.setState({
    //   // giftSummary: { isLoading: false },
    //   showConfirmDialog: false,
    //   cancelingSubscriptionId: null,
    // });
  };

  renderStep = () => {
    const { step } = this.state;
    switch (step) {
      case 'history':
        return this.renderGivingHistory();
      default:
        return this.renderRecurringGivingHistory();
    }
  };

  renderGiftHistoryByProduct = () => {
    const {
      giftSummary: { history: gHistory },
    } = this.state;
    const { gifts } = this.props;
    if (!gHistory || !gHistory.length) return <div />;

    const reducer = (accumulator, currentValue) => ({
      total: accumulator.total + currentValue.total,
    });
    const historyObj = utils.groupByProductID(gHistory);

    return Object.keys(historyObj)
      .map(key => {
        const gift = gifts.data.find(g => g.productID === key) || { title: 'No Title' };
        const { total } = (historyObj[key] || []).reduce(reducer, { total: 0 });
        return {
          gift,
          history: historyObj[key] || [],
          total,
        };
      })
      .sort((a, b) => {
        if (a.gift.title === 'No Title') return 1;
        if (b.gift.title === 'No Title') return -1;
        return b.total - a.total;
      })
      .map((obj, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <ListItem key={index}>
          <div className="g-showgiving-detail">
            <p style={{ fontWeight: 'bolder' }}>{`${obj.gift.title}`}</p>
            <span className={obj.total < 0 ? 'color-danger' : ''}>
              {utils.formatValue(obj.total / 100, 'currency')}
            </span>
          </div>
        </ListItem>
      ));
  };

  renderRecurringGivingHistory = () => {
    const { giftSummary, showConfirmDialog, cancelingSubscriptionId } = this.state;
    const {
      isLoading,
      gifts: { subs },
    } = this.props;
    // const isLoading = giftSummary.isLoading || !subs;
    logger.warn(isLoading, giftSummary.isLoading, subs);
    return isLoading ? (
      <div
        style={{
          position: 'relative',
          minHeight: '120px',
          minWidth: '120px',
        }}
      >
        <Loading />
      </div>
    ) : (
      <>
        <div className="d-flex flex-column subs-cards py-4 px-2">
          {!subs.length && <h2 className="text-center">No Subscriptions</h2>}
          {subs.map(({ nextPayment, invoiceUrl, id, totalAmount, subItems }) => (
            <div key={id} className="d-flex flex-column subs-card">
              <div className="py-3 px-sm-2 px-md-5 mx-sm-2 mx-md-5 mt-4 mother-box border-0 rounded">
                <div className="d-flex flex-row py-3 rounded bg-white justify-content-center align-items-center mx-2">
                  <span className="mr-3 font-weight-bold">Next Payment Date:</span>
                  <span>{nextPayment}</span>
                </div>
                <div className="mx-3 mt-3 d-flex res-container justify-content-between align-items-start">
                  <div className="py-4">
                    <h3 className="mb-4 bold-size">Breakdown:</h3>
                    {subItems.map(({ interval, intervalCount, amount, title, prodId }) => (
                      <p key={prodId}>
                        {title} - ${(amount / 100).toFixed(2)} / every {intervalCount} {interval}
                        {intervalCount > 1 && 's'}
                      </p>
                    ))}
                  </div>
                  <div className="py-4 d-flex justify-content-center align-items-center">
                    <div>
                      <h2 className="bold-size">Total Amount:</h2>
                      <h2 className="bold-size text-center">${(totalAmount / 100).toFixed(2)}</h2>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-end pr-2">
                  <div className="d-flex w-50 justify-content-around">
                    <div>
                      <a
                        className="my-button bold-size"
                        href={invoiceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Invoice
                      </a>
                    </div>
                    <button
                      type="button"
                      className="border-0 text-danger bold-size"
                      onClick={() => this.handleCancelSubscription(id)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <StyledModal
          onClose={this.handleCloseConfirmDialog}
          open={showConfirmDialog}
          title="Are you sure you want to cancel this recurring gift?"
          // className="profile-modal"
          showCloseIcon
          disableBackdropClick={false}
          disableEscapeKeyDown={false}
        >
          <button
            type="button"
            onClick={() => this.cancelSubscription(cancelingSubscriptionId)}
            className="button darkblue border medium mb-2 mr-2"
          >
            Confirm
          </button>
          <button
            type="button"
            className="button neutral border medium"
            onClick={this.handleCloseConfirmDialog}
          >
            Cancel
          </button>
        </StyledModal>
      </>
    );
  };

  renderGivingHistory = () => {
    const { giftSummary, selectedProductID, selectedPaymentMethod } = this.state;
    const { gifts, from, to, isLoading } = this.props;
    // const isLoading = giftSummary.isLoading || false;
    // logger.warn(isLoading, giftSummary.isLoading);
    return (
      <div className="card-block g-main-detail-history container">
        <div
          className="row history-filter-group"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '1rem',
          }}
        >
          <div className="col-lg-7 col-md-12">
            <div className="row history-filter-group" style={{ display: 'flex' }}>
              <div className="col-lg-6 col-sm-12">
                <div className="label mr-1 mr-lg-0">From:</div>
                <DatePicker
                  clearIcon={null}
                  onChange={value => this.handleChangeFilter('from', value)}
                  value={new Date(from)}
                />
              </div>
              <div className="col-lg-6 col-sm-12">
                <div className="label mr-1 mr-lg-0">To:</div>
                <DatePicker
                  clearIcon={null}
                  onChange={value => this.handleChangeFilter('to', value)}
                  value={new Date(to)}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-5 col-md-12">
            <div className="row" style={{ display: 'flex' }}>
              <div className="col-md-6 col-sm-12">
                <FormControl fullWidth>
                  <span className="label">Gift Options: </span>
                  <Select
                    variant="filled"
                    disableUnderline
                    MenuProps={MenuProps}
                    IconComponent={ExpandMoreIcon}
                    value={selectedProductID}
                    onChange={e => this.handleChangeFilter('selectedProductID', e.target.value)}
                  >
                    {[{ title: 'All', productID: 'all' }, ...(gifts.data || [])]
                      .filter(
                        gift =>
                          gift.productID === 'all' ||
                          (giftSummary.productTotalMap && giftSummary.productTotalMap[gift.productID]),
                      )
                      .map(item => ({
                        label: item.title,
                        value: item.productID,
                      }))
                      .sort((a, b) => {
                        if (a.value === 'all') return -1;
                        if (b.value === 'all') return 1;
                        return a.label.localeCompare(b.label);
                      })
                      .map(v => (
                        <MenuItem key={v.value} value={v.value}>
                          {v.label}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </div>
              <div className="col-md-6 col-sm-12">
                <FormControl fullWidth>
                  <span className="label">Payment Method: </span>
                  <Select
                    variant="filled"
                    disableUnderline
                    value={selectedPaymentMethod}
                    MenuProps={MenuProps}
                    IconComponent={ExpandMoreIcon}
                    onChange={e => this.handleChangeFilter('selectedPaymentMethod', e.target.value)}
                  >
                    {[
                      { label: 'All', value: 'all' },
                      { label: 'Faithmo', value: 'faithmo' },
                      { label: 'Manual', value: 'manual' },
                      ...MANUAL_PAYMENT_METHODS,
                    ].map(v => (
                      <MenuItem key={v.value} value={v.value}>
                        {v.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>
        </div>
        {isLoading ? (
          <div
            style={{
              position: 'relative',
              minHeight: '120px',
              minWidth: '120px',
            }}
          >
            <Loading />
          </div>
        ) : (
          <div className="row">
            <div className="col-lg-8 col-md-12 g-main-history-table">
              <RoundedTable
                // showPagenate
                showCount
                minWidth={250}
                data={
                  giftSummary.history
                    ? giftSummary.history?.map(gh => [
                        <div>{utils.formatValue(gh.date, 'date')}</div>,
                        <div className={gh.total < 0 ? 'amount color-danger' : 'amount'}>
                          {utils.formatValue(gh.total / 100, 'currency')}
                        </div>,
                        <div>
                          {
                            (gifts.data.find(g => g.productID === gh.productID) || { title: 'No Title' })
                              .title
                          }
                        </div>,
                        <div>
                          {
                            (
                              [{ label: 'Faithmo', value: 'faithmo' }, ...MANUAL_PAYMENT_METHODS].find(
                                g => g.value === gh.methodType,
                              ) || { label: null }
                            ).label
                          }
                        </div>,
                      ])
                    : []
                }
                headings={[
                  { component: <div>Date</div>, percentWidth: 20 },
                  {
                    component: <div>Amount</div>,
                    percentWidth: 20,
                  },
                  { component: <div>Giving Type</div>, percentWidth: 30 },
                  { component: <div>Payment Method</div>, percentWidth: 30 },
                ]}
              />
            </div>
            <div className="col-lg-4 col-md-12 g-total-by">
              <div className="g-total-by-date">
                <div className="g-total-by-date-top">
                  <p>
                    <span>Showing Givings From</span>
                    &nbsp;
                    <span>{utils.formatValue(from, 'date')}</span>
                    &nbsp;-&nbsp;
                    <span>{utils.formatValue(to, 'date')}</span>
                  </p>
                </div>
                <div className="g-total-by-date-main">
                  <Scrollbar autoHeight autoHeightMin={100} autoHeightMax={576}>
                    <List>{this.renderGiftHistoryByProduct()}</List>
                  </Scrollbar>
                </div>
                <div className="g-total-by-date-bottom">
                  <span style={{ fontWeight: 'bolder', fontSize: 'larger' }}>Grand Total: </span>
                  <span className={giftSummary.total < 0 ? 'color-danger' : ''}>
                    {utils.formatValue(giftSummary.total || 0, 'currency')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  render() {
    const { step } = this.state;
    const { user, from, to, isLoading } = this.props;
    // const isLoading = giftSummary.isLoading || false;

    return (
      <>
        <Helmet title="Giving history details" />
        <div className="giving-history card-wrapper customWidth">
          <div className="back">
            <ChevronLeftIcon />
            <button type="button" onClick={this.goBack}>
              Back
            </button>
          </div>
          <div className="card">
            <div className="card-header">
              <div className="title">
                <img src={GivingHistoryImage} alt="Giving History" />
                <p style={{ whiteSpace: 'normal' }}>
                  <span style={{ whiteSpace: 'nowrap', display: 'inline-block' }}>
                    {step === 'history' ? 'Giving history' : 'Recurring Givings'}
                  </span>
                  &nbsp;-&nbsp;
                  {user && (
                    <span style={{ whiteSpace: 'nowrap', display: 'inline-block' }}>
                      {user.profile.firstName} {user.profile.lastName}
                    </span>
                  )}
                </p>
              </div>
              <div className="title-buttons">
                {step === 'history' && (
                  <ExcelDownLoad
                    table="user-ghistory-detail-table-to-xls"
                    filename={
                      user
                        ? `Giving history - ${user.profile.firstName} ${user.profile.lastName}`
                        : 'Giving history'
                    }
                    sheet={`${utils.formatValue(from, 'date')} - ${utils.formatValue(to, 'date')}`}
                    buttonText="Export To Excel"
                    className="button darkblue medium"
                    disabled={isLoading}
                  />
                )}

                <button
                  type="button"
                  className="button lightgreen medium"
                  style={{ maxWidth: 'unset' }}
                  onClick={() => this.handleChangeStep(step === 'history' ? 'recurring' : 'history')}
                >
                  {step === 'history' ? 'Manage Recurring' : 'Back to Giving History'}
                </button>
                {!isLoading && this.getTableForExcel()}
              </div>
            </div>
            {this.renderStep()}
          </div>
        </div>
        {/* <div className="FaithmoAuth__bottom"> */}
        {/*  <div /> */}
        {/*  <a className="FaithmoAuth__terms" href="https://faithmo.org/terms"> */}
        {/*    Terms & Conditions */}
        {/*  </a> */}
        {/*  <span className="FaithmoAuth__copyright">Ⓒ 2021 Faithmo</span> */}
        {/* </div> */}
      </>
    );
  }
}

GivingHistoryDetail.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  churchID: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  gifts: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        churchID: PropTypes.string.isRequired,
        created: PropTypes.number.isRequired,
        productID: PropTypes.string.isRequired,
        status: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
      }),
    ),
    history: PropTypes.arrayOf(
      PropTypes.shape({
        methodType: PropTypes.string.isRequired,
        churchID: PropTypes.string.isRequired,
        customerID: PropTypes.string,
        userID: PropTypes.string.isRequired,
        productID: PropTypes.string.isRequired,
        date: PropTypes.number.isRequired,
        created: PropTypes.number.isRequired,
        total: PropTypes.number.isRequired,
        desc: PropTypes.string,
        giftID: PropTypes.string,
      }),
    ),
    from: PropTypes.number.isRequired,
    to: PropTypes.number.isRequired,
    isLoading: PropTypes.number.isRequired,
    subs: PropTypes.arrayOf(
      PropTypes.shape({
        currency: PropTypes.string,
        interval: PropTypes.string,
        intervalCount: PropTypes.number,
        totalAmount: PropTypes.number,
        created: PropTypes.number,
        nextPaymentDate: PropTypes.number,
        subItems: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.string,
            title: PropTypes.string,
            amount: PropTypes.number,
            interval: PropTypes.string,
            intervalCount: PropTypes.number,
          }),
        ),
      }),
    ),
  }).isRequired,
  user: PropTypes.object.isRequired,
  from: PropTypes.number,
  to: PropTypes.number,
  isLoading: PropTypes.bool.isRequired,
};

GivingHistoryDetail.defaultProps = {
  from: INITIAL_DATE_RANGE.from,
  to: INITIAL_DATE_RANGE.to,
};

// Retrieve data from store as props
const mapStateToProps = (params, props) => {
  // console.info('History', params, props);
  const {
    auth: { user },
    church: { id: churchID },
    gifts,
  } = params;
  let from;
  let to;
  const isLoading = gifts.isLoading > 0;
  if (props.location.search && props.location.search.length > 1) {
    try {
      const queryObj = qs.parse(props.location.search.substr(1), '&', '=');
      from = parseInt(queryObj.from, 10);
      to = parseInt(queryObj.to, 10);
    } catch (error) {
      // continue regardless of error
      // console.info('error in gh ');
    }
  }
  return {
    gifts,
    user,
    churchID,
    from,
    to,
    isLoading,
  };
};

export default withRouter(connect(mapStateToProps)(GivingHistoryDetail));
