import moment from 'moment';

export const INITIAL_DATE_RANGE = {
  // for giving history
  from: moment().startOf('week').valueOf(),
  to: moment().endOf('week').valueOf(),
  // for dashboard
  dateRange: 'week',
};

export default { INITIAL_DATE_RANGE };
