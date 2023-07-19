import ProductList from "../model/productList.js"
import { getProductList } from "../model/productList.js"
import { renderHtmlProductItem } from "../components/productItem.js"
import Product from "../model/product.js";
const products = new ProductList();
const domBrand = getElement("#cbManufacturer");
const domPrice = getElement(".range-number");
const pagination = {
    numberPerPage: 8,
    totalPage: 0,
    list: []
};
let timer;

// Set lại theo điều kiện lọc từ tham số địa chỉ
const urlParams = new URLSearchParams(window.location.search);
// Hãng sản xuất
if (urlParams.get("brand"))
    domBrand.value = urlParams.get("brand");
// Giá
if (urlParams.get("maxPrice")){
    domPrice.value = urlParams.get("maxPrice");
    getElement("#toPrice").innerHTML=formatMoney(domPrice.value);
}
// Hàm lấy điều kiện lọc
const getFilterCondition = () => {
    return {
        brand: domBrand.value,
        price: {
            max: domPrice.value
        }
    }
}

const renderPagination = () => {
    let selectContent = "";
    for (let i = 1; i <= pagination.totalPage; i++)
        selectContent += `<option value="${i}"${i === 1 ? " selected" : ""}>${i}</option>`;
    getElement("#selectPage").innerHTML = selectContent;
    goToPage(1);
}

window.goToPage = (page) => {
    const pageConfig = {
        numberPerPage: pagination.numberPerPage,
        page: page
    };
    const domPrev = getElement("#btnPrev");
    const domNext = getElement("#btnNext");
    if (page <= 1)
        domPrev.setAttribute("disabled", true);
    else
        domPrev.removeAttribute("disabled");
    if (page >= pagination.totalPage)
        domNext.setAttribute("disabled", true);
    else
        domNext.removeAttribute("disabled");
    getElement("#productList").innerHTML = renderHtmlProductItem(pagination.list, pageConfig);
    getElement("#selectPage").value=+page;
}

const loadList = () => {
    pagination.list=products.searchProductByAttribute(getFilterCondition());
    pagination.totalPage=Math.ceil(pagination.list.length/pagination.numberPerPage);
    renderPagination();
    editLoadingProductLayout(false);
}

domBrand.onchange = (event) => {
    clearTimeout(timer);
    editLoadingProductLayout(true);
    timer = setTimeout(() => loadList(), 1000);
}

domPrice.oninput = (event) => {
    let target = event.target;
    getElement(target.dataset.text).innerHTML = formatMoney(target.value);
    clearTimeout(timer);
    editLoadingProductLayout(true);
    timer = setTimeout(() => loadList(), 1000);
}
// Xử lý ẩn/hiện layout khi đang tải danh sách
const editLoadingProductLayout = (isLoadding) => {
    getElements(".product-list").forEach(e => {
        e.classList.toggle("grid", !isLoadding);
        e.classList.toggle("hidden", isLoadding);
    });
    getElements(".product-list__loading").forEach(e => {
        e.classList.toggle("hidden", !isLoadding);
        e.classList.toggle("flex", isLoadding);
    });
}

const callbackLoadProduct = {
    before: (config) => {
        // Ẩn danh sách sản phẩm cũ và hiển thị layout đang tải
        editLoadingProductLayout(true);
        return config;
    }
};

getProductList(callbackLoadProduct).then(result => {
    products.list = result;
    loadList();
});

