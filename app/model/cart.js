import CartItem from "./cartItem.js";
import { instance, getAPIInstance } from "../constants/api.js";
class Cart {
    constructor(list = []) {
        this.list = list;
    }
    loadLocalStorage() {
        let data = localStorage.getItem("ShoppingCart");
        if (data) {
            let arrData = JSON.parse(data);
            this.list = arrData.map(e => {
                const { id, name, image, price, discount, quaty } = e;
                return new CartItem(+id, name, image, price, discount, quaty);
            });
        }
    }
    saveLocalStorage() {
        localStorage.setItem("ShoppingCart", JSON.stringify(this.list));
    }
    addItem(id, name, image, price, discount, quaty) {
        this.list.push(new CartItem(id, name, image, price, discount, quaty));
    }
    addItemByProductId(id, quaty, option) {
        let callback = {
            before: (config) => {
                return config;
            },
            success: () => {
            },
            error: () => {

            },
            ...option
        };
        let item = this.list.find(e => e.id===id);
        if (!item) {
            let instance = getAPIInstance();
            instance.interceptors.request.use(callback.before);
            instance.get(`/product/${id}`)
                .then(respon => {
                    const { id, name, image, price, discountPercent } = respon.data;
                    this.list.push(new CartItem(+id, name, image, price, discountPercent, quaty));
                    this.saveLocalStorage();
                    callback.success();
                })
                .catch(error => {
                    callback.error();
                });
        } else{
            item.quaty += quaty;
            this.saveLocalStorage();
            callback.success();
        }
        
    }
}
export default Cart;