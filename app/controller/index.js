import { instance } from "../constants/api.js"
import Product from "../model/product.js";
import ProductList from "../model/productList.js"
import { getProductList } from "../model/productList.js"
import CartItem from "../model/cartItem.js";
import Cart from "../model/cart.js";
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




