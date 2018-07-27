export default (value) => {

  if (!value) {
    return value;
  }

  const currencyStr = value.replace(/[^\d.-]/g, '');

  if (currencyStr.includes('.') &&
    currencyStr.substring(currencyStr.lastIndexOf('.') + 1) >= 2) {
    return currencyStr.substring(0, currencyStr.lastIndexOf('.') + 3);
  }

  return currencyStr;
};
