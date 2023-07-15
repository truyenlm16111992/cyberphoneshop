const getElements = (selector) => document.querySelectorAll(selector);
const getElement = (selector) => document.querySelector(selector);
const formatPercent = (per)=> new Intl.NumberFormat("en-GB",{style:"percent"}).format(per);
const formatMoney = (money)=> new Intl.NumberFormat("en-GB").format(money)+" đ";
export {getElements, getElement, formatPercent, formatMoney};