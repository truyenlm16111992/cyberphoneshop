import { instance } from "../constants/api.js"
import Product from "../model/product.js";
import ProductList from "../model/productList.js"
import CartItem from "../model/cartItem.js";
import Cart from "../model/cart.js";
const list = new ProductList();
window.shoppingCart = new Cart();
shoppingCart.loadLocalStorage();
const getProductList = () => {
    instance.get("/product")
        .then(result => {
            let arrTmp = [];
            result.data.forEach(e => {
                const { id, name, image, description, brand, price, discountPercent, createTime } = e;
                arrTmp.push(new Product(id, name, image, description, brand, price, discountPercent, createTime));
            });
            list.arrProduct = arrTmp;
            getElement("#productList").innerHTML = renderHtmlProductGrid(list.arrProduct);
        });
};
getProductList();
const renderHtmlProductGrid = (arr) => {
    let content = "";
    arr.forEach(e => {
        content += `
            <div class="group mb-[3px] hover:mb-0 h-full">
                <div
                    class="flex flex-col h-full justify-center text-center bg-white rounded-md border group-hover:border-lime-500 group-hover:border-b-4">
                    <div
                        class="relative overflow-hidden transition-all duration-500 rounded-t-md border-b border-b-lime-500 group-hover:border-b-white">
                        <img src="${e.image}"
                            class="w-full  h-auto rounded-t-md transition-all duration-500 group-hover:scale-125 group-hover:bg-gray-200"
                            alt="">
                        <ul
                            class="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-md grid grid-cols-2 gap-3 transition-all duration-500 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100">
                            <li>
                                <button onclick="quickViewProdutct(${e.id})" data-tooltip-target="tooltipQuickView1"
                                    class="h-10 w-10 rounded-full flex items-center justify-center bg-white hover:text-white hover:bg-lime-500"><i
                                        class="fa fa-search"></i></button>
                                <div id="tooltipQuickView1" role="tooltip"
                                    class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 bg-opacity-80 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                    Xem nhanh sản phẩm
                                    <div class="tooltip-arrow" data-popper-arrow></div>
                                </div>
                            </li>
                            <li>
                                <button data-tooltip-target="tooltipQuickView2"
                                    class="h-10 w-10 rounded-full flex items-center justify-center bg-white hover:text-white hover:bg-lime-500"><i
                                        class="fa fa-cart-plus"></i></button>
                                <div id="tooltipQuickView2" role="tooltip"
                                    class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 bg-opacity-80 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                    Thêm vào giỏ hàng
                                    <div class="tooltip-arrow" data-popper-arrow></div>
                                </div>
                            </li>
                        </ul>
                        <span
                            class="absolute top-2 right-2 px-2 py-1 bg-red-500 text-white text-sm before:content-['-']">${formatPercent(e.discountPercent)}</span>
                    </div>
                    <div class="p-3 flex-auto flex flex-col justify-between">
                        <a href="#" class="flex justify-center items-center text-xl font-semibold hover:text-lime-700">${e.name}</a>
                        <div class="flex text-sm">
                            <div class="w-[60%] h-8 bg-red-300 rounded-full dark:bg-gray-700">
                                <div class="h-full bg-red-500 text-sm font-bold text-white py-1 px-2 leading-none rounded-l-full flex items-center justify-center"
                                    style="width: ${formatPercent(1 - e.discountPercent)}">${formatMoney(e.getSellPrice())}</div>
                            </div>
                            <div class="w-[40%] flex items-center justify-end line-through">
                                ${formatMoney(e.price)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    return content;
};
window.quickViewProdutct = (id) => {
    instance.get(`/product/${id}`)
        .then(result => {
            const { id, name, image, description, brand, price, discountPercent, createTime } = result.data;
            const product = new Product(id, name, image, description, brand, price, discountPercent, createTime);
            getElements("#quickViewModal .quick-view, #btnAddToCart").forEach(e => {
                switch (e.getAttribute("name")) {
                    case "id":
                        e.dataset.id = product.id;
                        break;
                    case "image":
                        e.src = product.image;
                        break;
                    case "sellprice":
                        e.innerHTML = formatMoney(product.getSellPrice());
                        break;
                    case "price":
                        e.innerHTML = formatMoney(product.price);
                        break;
                    case "link":
                        break;
                    default:
                        e.innerHTML = product[e.getAttribute("name")];
                }
            });
            getElement("#quickViewModal .qty-adjust__num").value = 1;
        })
    getElement('#btnShowQuickView').click();
};
const test = () => {
    console.log("Test");
}
getElement("#btnAddToCart").onclick = () => {
    let callback = {
        success: () => {
            getElement("#quickViewModal button[data-modal-hide]").click();
        }
    };
    shoppingCart.addItemByProductId(+getElement("#btnAddToCart").dataset.id, +getElement("#quickViewModal .qty-adjust__num").value, callback);
};
const renderShoppingCart = (listProducts) => {
    let numItem = 0, totalPrice = 0, totalAmountDiscount = 0, totalPayment = 0;
    numItem = listProducts.length;
    let content="";
    listProducts.forEach(e => {
        totalPrice += e.price * e.quaty;
        totalAmountDiscount += e.price * e.quaty * e.discountPercent;
        totalPayment += e.price * e.quaty * (1 - e.discountPercent);
        content+=`
            <div class="flex items-center space-x-1">
                <div class="basis-[80px]">
                    <img src="${e.image}" class="w-full" alt="">
                </div>
                <div class="flex-1">
                    ${e.name}
                </div>
                <div class="basis-[85px] flex flex-col">
                    <div class="qty-adjust flex">
                        <button class="qty-adjust__operator px-1 border border-gray-400 hover:text-lime-600"
                            data-operator="--" type="button"><i class="fa fa-minus-circle"></i></button>
                        <input type="number" data-id="${e.id}" onchange="updateQuatyCartItem(${e.id});"
                            class="qty-adjust__num p-0 text-center appearance-none border border-gray-400 focus:border-gray-400 focus:shadow-none focus:ring-0"
                            maxlength="2" min="1" max="99" value="${e.quaty}" readonly>
                        <button class="qty-adjust__operator px-1 border border-gray-400 hover:text-lime-600"
                            data-operator="++" type="button"><i class="fa fa-plus-circle"></i></button>
                    </div>
                    <button type="button" class=" hover:underline hover:text-lime-500">Xóa</button>
                </div>
                <div class="basis-[120px] flex flex-col text-right">
                    <h3 class="text-red-500">${formatMoney(e.price*(1-e.discountPercent))}</h3>
                    <h3 class="text-gray-400 line-through">${formatMoney(e.price)}</h3>
                </div>
            </div>
        `;
    });
    getElements(".your-cart").forEach(e => {
        switch (e.getAttribute("name")) {
            case "num-items":
                e.innerHTML = numItem;
                break;
            case "total-price":
                e.innerHTML = formatMoney(totalPrice);
                break;
            case "total-amount-discount":
                e.innerHTML = formatMoney(totalAmountDiscount);
                break;
            case "total-payment":
                e.innerHTML = formatMoney(totalPayment);
                break;
            case "list":
                e.innerHTML=content;
        }
    });
    initQuatyAdjustControl(".qty-adjust");
}
renderShoppingCart(shoppingCart.list);
getElement("#btnYourCart").onclick = () => {
    getElement("#btnViewYourCart").click();
}
window.updateQuatyCartItem = (id)=>{
    console.log(shoppingCart.findIndexItem(id));
}