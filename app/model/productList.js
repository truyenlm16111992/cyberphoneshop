import Product from "./product.js";
import { getAPIInstance } from "../constants/api.js";
class ProductList{
    constructor(arrProduct=[]){
        this.arrProduct=arrProduct;
    }
    searchProduct(keySearch){
        return this.arrProduct.filter(e=>{
            const {name, brand}=e;
            return convertStringSearch(name+brand).indexOf(convertStringSearch(keySearch))>-1;
        });
    }
}
// Hàm xử dụng chung để lấy danh sách sản phẩm
const getProductList = async (option)=>{
    const callback = {
        before:(config)=>config,
        error:(error)=>error,
        ...option
    }
    let instance = getAPIInstance();
    let list=[];
    instance.interceptors.request.use(callback.before);
    instance.interceptors.response.use(callback.error);
    await instance.get("/product").then(response=>{
        list=response.data.map(e=>{
            const { id, name, image, description, brand, price, discountPercent, createTime } = e;
            return new Product(id, name, image, description, brand, price, discountPercent, createTime);
        });
    });
    return list;
}
export default ProductList;
export {getProductList};