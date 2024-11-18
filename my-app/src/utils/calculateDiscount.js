 const calculateDiscount = (totalQuantity) => {
  if (totalQuantity > 300000) {
    return 15;
  } else if (totalQuantity > 50000) {
    return 10;
  } else if (totalQuantity > 10000) {
    return 5;
  } else {
    return 0;
  }
};

export default calculateDiscount;