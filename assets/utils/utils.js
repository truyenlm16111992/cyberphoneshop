const getElements = (selector) => document.querySelectorAll(selector);
const getElement = (selector) => document.querySelector(selector);
const formatPercent = (per) => new Intl.NumberFormat("en-GB", { style: "percent" }).format(per);
const formatMoney = (money) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(money);
const initQuatyAdjustControl = (selector) => {
    getElements(".qty-adjust").forEach(e => {
        [...e.children].filter(e => e.classList.contains("qty-adjust__operator")).forEach(btn => {
            btn.onclick = (event) => {
                [...btn.parentElement.children].filter(e => e.classList.contains("qty-adjust__num")).forEach(num => {
                    let value = +num.value;
                    let operator = btn.dataset.operator;
                    if ((value > 1 && operator === "--") || (value < 99 & operator === "++")) {
                        num.value = eval(`${operator}num.value`);
                        num.onchange();
                    }
                });
            }
        });
    });
}
const removeAccents = (str) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
const convertStringSearch = (str) => {
    return removeAccents(str.toLowerCase());
}
const showMessage = (_selector, _msgError) => {
    let domMsg = getElement(_selector);
    domMsg.innerHTML = _msgError;
    if (_msgError.trim().length > 0)
        domMsg.style.setProperty("display", "inherit");
    else
        domMsg.style.setProperty("display", "none");
    return 1;
}
const checkRegex = (_string, _regex, _selector, _msgError) => {
    if (!_regex.test(_string)) {
        showMessage(_selector, _msgError);
        return 0;
    }
    showMessage(_selector, "");
    return 1;
}
const checkRangeNumber = (_number, _min, _max, _selector, _msgError) => {
    if (Number.isNaN(_number) || _number < Number(_min) || _number > Number(_max)) {
        showMessage(_selector, _msgError);
        return 0;
    }
    showMessage(_selector, "");
    return 1;
}
const checkStringLength = (_string, _min, _max, _selector, _msgError) => {
    let len = _string.trim().length;
    if (len < _min || len > Number(_max)) {
        showMessage(_selector, _msgError);
        return 0;
    }
    showMessage(_selector, "");
    return 1;
}

const convertStringToDate = (str) => {
    const splits = str.match(/.{1,2}/g) ?? [];
    return new Date(+`${splits[0]}${splits[1]}`, +`${splits[2]}`, +`${splits[3]}`, +`${splits[4]}`, +`${splits[5]}`, +`${splits[6]}`);
}
const convertDateToString = (value) => {
    const padL = (nr, len = 2, chr = `0`) => `${nr}`.padStart(2, chr);
    return `${value.getFullYear()}${padL(value.getMonth() + 1)}${padL(value.getDate())}${padL(value.getHours())}${padL(value.getMinutes())}${padL(value.getSeconds())}`;
}
const formatDate = (value) => {
    const padL = (nr, len = 2, chr = `0`) => `${nr}`.padStart(2, chr);
    return `${padL(value.getDate())}/${padL(value.getMonth() + 1)}/${value.getFullYear()} ${padL(value.getHours())}:${padL(value.getMinutes())}:${padL(value.getSeconds())}`;
}