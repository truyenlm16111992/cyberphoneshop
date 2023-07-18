import ProductList from "../model/productList.js"
import { getProductList } from "../model/productList.js"
import { renderHtmlProductItem } from "../components/productItem.js"
const list = new ProductList();
// Xử lý ẩn/hiện layout khi đang tải danh sách
const editLoadingProductLayout = (isLoadding)=>{
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
    list.arrProduct = result;
    getElement("#productList").innerHTML = renderHtmlProductItem(list.arrProduct);
    // Hiển thị danh sách sản phẩm và ẩn layout đang tải đi 
    editLoadingProductLayout(false);
});


const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const product = urlParams.get('product')
console.log(product);
