import ProductList from "../model/productList.js";
import { getProductList } from "../model/productList.js";
const listSearch = new ProductList();

const renderResultSearch = (result) => {
    let content = "";
    result.forEach(e => {
        content += `
        <a href="#"
            class="flex group px-3 py-3 justify-center items-center hover:bg-gray-100">
            <div class="basis-[50px]">
                <img src="${e.image}" alt="">
            </div>
            <div class="flex-1">
                <span class="group-hover:text-lime-500 group-hover:underline">${e.name}</span>
            </div>
            <div class="flex justify-end basis-[200px] space-x-3">
                <span>Hãng sản xuất:</span>
                <span>${e.brand}</span>
            </div>
        </a>
        `;
    });
    getElement(".result-search__list").innerHTML = content;
    getElement(".result-search__num").innerHTML = result.length;
}
const searchProduct = (target) => {
    const editLayoutLoading = (isLoading) => {
        getElements(".result-search__loading").forEach(e => {
            e.classList.toggle("hidden", !isLoading);
            e.classList.toggle("flex", isLoading);
        });
        getElements(".result-search__list").forEach(e => {
            e.classList.toggle("hidden", isLoading);
            e.classList.toggle("grid", !isLoading);
        });
    };
    const callback = {
        before: (config) => {
            editLayoutLoading(true);
            return config;
        }
    };
    getProductList(callback).then(result => {
        listSearch.arrProduct = result;
        renderResultSearch(listSearch.searchProduct(target.value));
        editLayoutLoading(false);
    });
}
let timer;
getElement("#tbSearchProduct").onkeyup = (event) => {
    clearTimeout(timer);
    if (event.target.value)
        timer = setTimeout(() => searchProduct(event.target), 500);
    else
        renderResultSearch([]);
}