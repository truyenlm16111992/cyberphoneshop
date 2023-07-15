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
                    if ((value > 1 && operator === "--") || (value < 99 & operator === "++"))
                        num.value = eval(`${operator}num.value`);
                });
            }
        });
    });
}