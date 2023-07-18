import { getAPIInstance } from "../constants/api.js";
class Product {
    constructor(id, name, image, description, brand, price, discountPercent, createTime) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.description = description;
        this.brand = brand;
        this.price = price;
        this.discountPercent = discountPercent;
        this.createTime = createTime;
    }
    getSellPrice() {
        return this.price * (1 - this.discountPercent);
    }
}
// Hàm sử dụng chung để lấy thông tin sản phâm
const getProductById = async (id, option) => {
    const callback = {
        before: (config) => config,
        error: (error) => error,
        ...option
    };
    let obj;
    const instance = getAPIInstance();
    instance.interceptors.request.use(callback.before);
    instance.interceptors.response.use(callback.error);
    await instance.get(`/product/${id}`).then((response => {
        const { id, name, image, description, brand, price, discountPercent, createTime } = response.data;
        obj = new Product(+id, name, image, description, brand, price, discountPercent, createTime);
    }));
    return obj;
}
export default Product;
export { getProductById };