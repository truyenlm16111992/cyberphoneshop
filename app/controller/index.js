import { getElement, getElements, formatPercent, formatMoney } from "../../assets/utils/utils.js";
import { instance } from "../constants/api.js"
import Product from "../model/product.js";
import ProductList from "../model/productList.js"
const list = new ProductList();
const getProductList = () => {
    instance.get("/product")
    .then(result=>{
        let arrTmp=[];
        result.data.forEach(e=>{
            const {id,name,image,description,brand,price,discountPercent,createTime}=e;
            arrTmp.push(new Product(id,name,image,description,brand,price,discountPercent,createTime));
        });
        list.arrProduct=arrTmp;
        getElement("#productList").innerHTML=renderHtmlProductGrid(list.arrProduct);
    });
};
getProductList();
const renderHtmlProductGrid=(arr)=>{
    let content="";
    arr.forEach(e=>{
        console.log(formatMoney(1000));
        content+=`
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
                                <button onclick="getElement('#test').click();" data-tooltip-target="tooltipQuickView1"
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
                                    style="width: ${formatPercent(1-e.discountPercent)}">${formatMoney(e.getSellPrice())}</div>
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
