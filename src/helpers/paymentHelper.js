import { FinanceConst } from "../constants/AppConstants";

export const getNPer = (terms, freq) => {
  let result = 0;
  /*eslint default-case: "error"*/
  switch (freq) {
    case 'Monthly':
      result = (terms / 12) * FinanceConst.payments.monthly.periodicPayments;
      break;

    case 'Weekly':
      result = (terms / 12) * FinanceConst.payments.weekly.periodicPayments;
      break;
      // no default
    case 'Bi-Weekly':
      result = (terms / 12) * FinanceConst.payments.bi_weekly.periodicPayments;
      break;
      // No Default
  }
  return result;
}

export const computeFinancing = (price, terms, freq) => {
  let rate = (FinanceConst.apr / 100) / 12;
  let nper = getNPer(terms, freq);
  let pv = -Math.abs(price + FinanceConst.finance_fee);
  return rate * pv * Math.pow((1 + rate), nper) / (1 - Math.pow((1 + rate), nper));
}