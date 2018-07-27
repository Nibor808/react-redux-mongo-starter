import moment from 'moment';

export const formatDate = (date) => {
  return moment(date).format('Do MMMM YYYY');
};

export const formatMonthDate = (date) => {
  return moment(date).format('MMMM YYYY');
};

export const formatDateTime = (date) => {
  return moment(date).format('MMMM Do YYYY h:mma');
};
