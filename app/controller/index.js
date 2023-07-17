import { instance } from "../constants/api.js"
import Product from "../model/product.js";
import ProductList from "../model/productList.js"
import CartItem from "../model/cartItem.js";
import Cart from "../model/cart.js";
import {renderHtmlProductItem} from "../components/productItem.js"

const list = new ProductList();

const getProductList = () => {
    instance.get("/product")
        .then(result => {
            let arrTmp = [];
            result.data.forEach(e => {
                const { id, name, image, description, brand, price, discountPercent, createTime } = e;
                arrTmp.push(new Product(id, name, image, description, brand, price, discountPercent, createTime));
            });
            list.arrProduct = arrTmp;
            getElement("#productList").innerHTML = renderHtmlProductItem(list.arrProduct);
        });
};
getProductList();




