import Cart from "../model/cart.js";
import CartItem from "../model/cartItem.js";
const myCart = new Cart();
// Tải giỏ hàng từ bộ nhớ 
myCart.loadLocalStorage();
// Hàm render danh sách sản phẩm trong giỏ hàng 
const renderMyCart = (listCartItem) => {
    let numItem = 0, totalPrice = 0, totalAmountDiscount = 0, totalPayment = 0;
    numItem = listCartItem.length;
    let content="";
    listCartItem.forEach(e => {
        totalPrice += e.price * e.quaty;
        totalAmountDiscount += e.price * e.quaty * e.discountPercent;
        totalPayment += e.price * e.quaty * (1 - e.discountPercent);
        content+=`
            <div class="flex items-center space-x-1">
                <div class="basis-[80px]">
                    <img src="${e.image}" class="w-full" alt="">
                </div>
                <div class="flex-1">
                    ${e.name}
                </div>
                <div class="basis-[85px] flex flex-col">
                    <div class="qty-adjust flex">
                        <button class="qty-adjust__operator px-1 border border-gray-400 hover:text-lime-600"
                            data-operator="--" type="button"><i class="fa fa-minus-circle"></i></button>
                        <input type="number" data-id="${e.id}" onchange="updateQuatyCartItem(this, ${e.id});"
                            class="qty-adjust__num p-0 text-center appearance-none border border-gray-400 focus:border-gray-400 focus:shadow-none focus:ring-0"
                            maxlength="2" min="1" max="99" value="${e.quaty}" readonly>
                        <button class="qty-adjust__operator px-1 border border-gray-400 hover:text-lime-600"
                            data-operator="++" type="button"><i class="fa fa-plus-circle"></i></button>
                    </div>
                    <button type="button" class=" hover:underline hover:text-lime-500" onclick="removeCartItem(${e.id});">Xóa</button>
                </div>
                <div class="basis-[120px] flex flex-col text-right">
                    <h3 class="text-red-500">${formatMoney(e.price*(1-e.discountPercent))}</h3>
                    <h3 class="text-gray-400 line-through">${formatMoney(e.price)}</h3>
                </div>
            </div>
        `;
    });
    getElements(".my-cart").forEach(e => {
        switch (e.getAttribute("name")) {
            case "num-items":
                e.innerHTML = numItem;
                break;
            case "total-price":
                e.innerHTML = formatMoney(totalPrice);
                break;
            case "total-amount-discount":
                e.innerHTML = formatMoney(totalAmountDiscount);
                break;
            case "total-payment":
                e.innerHTML = formatMoney(totalPayment);
                break;
            case "list":
                e.innerHTML=content;
        }
    });
    initQuatyAdjustControl(".qty-adjust");
}
// Gọi hàm render giỏ hàng từ dữ liệu đã lấy ra được từ bộ nhớ 
renderMyCart(myCart.list);
// Xử lý khi click nút mở giỏ hàng
getElement("#btnMyCart").onclick = () => {
    getElement("#btnViewMyCart").click();
}
// Xử lý khi thay đổi số lượng sản phẩm 
window.updateQuatyCartItem = (target, id)=>{
    let index = myCart.findIndexItem(id);
    let obj = myCart.getItemAt(index);
    if(obj){
        obj.quaty=+target.value;
        myCart.updateItemAt(index,obj);
        myCart.saveLocalStorage();
        renderMyCart(myCart.list);
    }
}
// Xử lý xóa sản phẩm khỏi giỏ hàng 
window.removeCartItem = (id)=>{
    myCart.removeItemAt(myCart.findIndexItem(id));
    myCart.saveLocalStorage();
    renderMyCart(myCart.list);
}
//export default myCart;
export {myCart,renderMyCart};