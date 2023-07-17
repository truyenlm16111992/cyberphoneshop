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
const getProductById = (id, option) => {
    let callback = {
        before: (config) => config,
        success: (respose) => respose,
        error: (error) => error
    };
}
export default Product;
export { getProductById };