export default (value, previousValue) => {
  if (!value) {
    return value;
  }

  if (!previousValue || value.length > previousValue.length) {
    if (value.length === 1 && !isNaN(Number(value))) {
      return;
    } else if (value.length === 1 && isNaN(Number(value))) {
      return value.toUpperCase().trim();
    }

    if (value.length === 2 && isNaN(Number(value.slice(1, 2)))) {
      return;
    } else if (value.length === 2 && !isNaN(Number(value.slice(1, 2)))) {
      return value.trim();
    }

    if (value.length === 3 && !isNaN(Number(value.slice(2, 3)))) {
      return;
    } else if (value.length === 3 && isNaN(Number(value.slice(2, 3)))) {
      return value.toUpperCase().trim();
    }

    if (value.length === 4 && isNaN(Number(value.slice(3, 4)))) {
      return;
    } else if (value.length === 4 && !isNaN(Number(value.slice(3, 4)))) {
      return value.trim();
    }

    if (value.length === 5 && !isNaN(Number(value.slice(4, 5)))) {
      return;
    } else if (value.length === 5 && isNaN(Number(value.slice(4, 5)))) {
      return value.toUpperCase().trim();
    }

    if (value.length === 6 && isNaN(Number(value.slice(5, 6)))) {
      return;
    } else if (value.length === 6 && !isNaN(Number(value.slice(5, 6)))) {
      return value.trim();
    }
  }

  if (value.length <= 3) {
    return value;
  }

  if (value.length <= 6) {
    return value;
  }
};
