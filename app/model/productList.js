import Product from "./product.js";
import { getAPIInstance } from "../constants/api.js";
class ProductList {
    constructor(list = []) {
        this.list = list;
    }
    getLastProduct(num){
        return this.list.sort((a,b)=>+b.createTime-a.createTime).filter((e,i)=>i<num);
    }
    searchProduct(keySearch) {
        return this.list.filter(e => {
            const { name, brand } = e;
            return convertStringSearch(name + brand).indexOf(convertStringSearch(keySearch)) > -1;
        });
    }
    searchProductByAttribute(keySearch){
        const keys = {
            "brand":"",
            "price":{
                "min":0
            },
            ...keySearch
        }
        return this.list.filter(e=>{
            let flag=true;
            Object.keys(keys).forEach(x=>{
                switch(x){
                    case "price":
                        flag&&=!(e.getSellPrice()<Number(keys[x]["min"])||e.getSellPrice()>Number(keys[x]["max"]));
                        break;
                    default:
                        flag&&=(!keys[x]||e[x]===keys[x]);
                }
            });
            return flag;
        });
    }
}
// Hàm xử dụng chung để lấy danh sách sản phẩm
const getProductList = async (option) => {
    const callback = {
        before: (config) => config,
        error: (error) => error,
        ...option
    }
    let instance = getAPIInstance();
    let list = [];
    instance.interceptors.request.use(callback.before);
    instance.interceptors.response.use(callback.error);
    await instance.get("/product").then(response => {
        list = response.data.map(e => {
            const { id, name, image, description, brand, price, discountPercent, createTime } = e;
            return new Product(id, name, image, description, brand, price, discountPercent, createTime);
        });
    });
    return list;
}
export default ProductList;
export { getProductList };