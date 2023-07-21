import { getProductById } from "../model/product.js";
import { myCart } from "./myCart.js";
import CartItem from "../model/cartItem.js";
// Xử lý render danh sách sản phẩm 
const renderHtmlProductItem = (arr, option) => {
    const pageConfig = {
        numberPerPage: 100,
        page: 1,
        ...option
    };
    let content = "";
    let totalPage = Math.ceil(arr.length / pageConfig.numberPerPage);
    if (pageConfig.page > totalPage)
        pageConfig.page = totalPage;
    // Vị trí phần tử đầu của trang
    let start = (pageConfig.page - 1) * pageConfig.numberPerPage;
    // Vị trí phần tử cuối cùng của trang
    let end = start + pageConfig.numberPerPage - 1;
    arr.filter((e, i) => i >= start && i <= end).forEach(e => {
        content += `
            <div class="product-item group mb-[3px] hover:mb-0 h-full">
                <div
                    class="flex flex-col h-full justify-center text-center bg-white rounded-md border group-hover:border-lime-500 group-hover:border-b-4">
                    <div
                        class="relative overflow-hidden transition-all duration-500 rounded-t-md border-b border-b-lime-500 group-hover:border-b-white">
                        <img src="${e.image}"
                            class="w-full min-h-[300px] object-cover object-center rounded-t-md transition-all duration-500 group-hover:scale-125 group-hover:bg-gray-200"
                            alt="">
                        <ul
                            class="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-md grid grid-cols-2 gap-3 transition-all duration-500 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100">
                            <li class="group/button h-10 w-10 flex justify-center items-center rounded-full bg-white hover:bg-lime-500">
                                <button onclick="quickViewProduct(${e.id})" data-tooltip-target="tooltipQuickView${e.id}-1" class="w-full h-full rounded-full group-hover/button:text-white">
                                    <i class="fa fa-search"></i>
                                </button>
                                <div class="hidden">
                                    <div role="status">
                                        <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-lime-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </div> 
                                <div id="tooltipQuickView${e.id}-1" role="tooltip"
                                    class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 bg-opacity-80 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                    Xem nhanh sản phẩm
                                    <div class="tooltip-arrow" data-popper-arrow></div>
                                </div>
                            </li>
                            <li class="group/button h-10 w-10 flex justify-center items-center rounded-full bg-white hover:bg-lime-500">
                                <button onclick="addItemToMyCart(this, ${e.id}, 1)" data-tooltip-target="tooltipQuickView${e.id}-2" class="w-full h-full rounded-full group-hover/button:text-white">
                                    <i class="fa fa-cart-plus"></i>
                                </button>    
                                <div class="product-item__loading hidden">
                                    <div role="status">
                                        <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-lime-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </div> 
                                <div id="tooltipQuickView${e.id}-2" role="tooltip"
                                    class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 bg-opacity-80 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                    Thêm vào giỏ hàng
                                    <div class="tooltip-arrow" data-popper-arrow></div>
                                </div>
                            </li>
                        </ul>
                        <span
                            class="absolute top-2 right-2 px-2 py-1 bg-red-500 text-white text-sm before:content-['-']">${formatPercent(e.discountPercent)}</span>
                    </div>
                    <div class="p-3 flex-auto flex flex-col justify-between">
                        <a href="./product.html?productID=${e.id}" class="flex justify-center items-center text-xl font-semibold hover:text-lime-700">${e.name}</a>
                        <div class="flex text-sm">
                            <div class="w-[60%] h-8 bg-red-300 rounded-full dark:bg-gray-700">
                                <div class="h-full bg-red-500 text-sm font-bold text-white py-1 px-2 leading-none rounded-full flex items-center justify-center"
                                    style="width: ${formatPercent(1 - e.discountPercent)}">${formatMoney(e.getSellPrice())}</div>
                            </div>
                            <div class="w-[40%] flex items-center justify-end line-through">
                                ${formatMoney(e.price)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    if (!content)
        content = `<h6 class="h-[300px] text-center col-span-4 font-semibold">Không tìm thấy sản phẩm</h6>`;
    return content;
};
// Xử lý hiển thị modal xem nhanh sản phẩm
window.quickViewProduct = (id) => {
    // Xử lý ẩn hiển layout khi đang gọi API lấy thông tin sản phẩm
    const editLoadingLayout = (isLoading) => {
        getElements(".quick-view .quick-view__info").forEach(e => {
            e.classList.toggle("hidden", isLoading);
            e.classList.toggle("flex", !isLoading);
        });
        getElements(".quick-view .quick-view__loading").forEach(e => e.classList.toggle("hidden", !isLoading));
    };
    // Khai báo callback sẽ xử lý trước khi request đến API gửi đi
    const callback = {
        before: (config) => {
            //Ẩn thông tin và hiện layout loading
            editLoadingLayout(true);
            return config;
        }
    }
    // Gọi hàm lấy thông tin sản phẩm với ID và callback sẽ xử lý trước khi gửi request đến API 
    getProductById(id, callback).then(result => {
        getElements("#quickViewModal .quick-view, #btnAddToCart").forEach(e => {
            switch (e.getAttribute("name")) {
                case "id":
                    e.dataset.id = result.id;
                    break;
                case "image":
                    e.src = result.image;
                    break;
                case "sellprice":
                    e.innerHTML = formatMoney(result.getSellPrice());
                    break;
                case "price":
                    e.innerHTML = formatMoney(result.price);
                    break;
                case "link":
                    e.href = `./product.html?productID=${result.id}`
                    break;
                case "link-brand":
                    e.href = `./collections.html?brand=${result.brand}`;
                    break;
                default:
                    e.innerHTML = result[e.getAttribute("name")];
            }
        });
        getElement("#quickViewModal .qty-adjust__num").value = 1;
        //Ẩn layout loading và hiển thị thông tin sản phẩm
        editLoadingLayout(false);
    })
    //Cho button nhận sự kiện click để show modal
    getElement('#btnShowQuickView').click();
};
// Hàm xử lý thêm sản phẩm vào giỏ hàng
window.addItemToCart = (id, quaty, option) => {
    //Tạo callback mặc định khi gọi API lấy thông tin sản phẩm
    const callback = {
        before: (config) => config,
        success: () => { },
        error: (error) => error,
        ...option
    };
    //Gọi hàm lấy thông tin sản phẩm qua API
    getProductById(id, callback)
        .then(response => {
            //Kiểm tra ID sản phẩm có trong giỏ không
            let index = myCart.findIndexItem(+response.id);
            console.log(index);
            if (index === -1) {
                // Xử lý nếu không có trong giỏ
                let item = new CartItem(response.id, response.name, response.image, response.price, response.discountPercent, quaty);
                myCart.addItem(item);
                myCart.saveLocalStorage();
                callback.success();
            } else {
                //Xử lý nếu có trong giỏ
                let item = myCart.getItemAt(index);
                item.quaty += quaty;
                myCart.updateItemAt(index, item);
                myCart.saveLocalStorage();
                callback.success();
            }
        });
}
//Xử lý khi click nút thêm vào giỏ trong xem nhanh sản phẩm
getElement("#btnAddToCart").onclick = () => {
    // Xử lý ẩn/hiện layout khi đang tải thông tin sản phẩm
    const editLoadingLayout = (isLoading) => {
        getElements("#btnAddToCart").forEach(e => e.classList.toggle("hidden", isLoading));
        getElements(".quick-view__add-loading").forEach(e => e.classList.toggle("hidden", !isLoading));
        getElements(".quick-view__add-loading").forEach(e => e.classList.toggle("flex", isLoading));
    };
    let callback = {
        // Khai cáo callback cần xử lý những gì trước khi gọi API
        before: (config) => {
            editLoadingLayout(true);
            return config;
        },
        // Khai cáo callback cần xử lý những gì khi API xử lý xong
        success: () => {
            editLoadingLayout(false);
            renderMyCart(myCart.list);
            getElement("#quickViewModal button[data-modal-hide]").click();
        }
    };
    // Gọi hàm thêm sản phẩm vào giỏ
    addItemToCart(+getElement("#btnAddToCart").dataset.id, +getElement("#quickViewModal .qty-adjust__num").value, callback);
};
//Xử lý khi click nút thêm trên màn hình sản phẩm
window.addItemToMyCart = (target, id, quaty) => {
    let loading = [...target.parentElement.children].filter(e => e.classList.contains("product-item__loading"));
    let callback = {
        before: (config) => {
            target.classList.toggle("hidden", true);
            loading.forEach(e => e.classList.toggle("hidden", false));
            return config;
        },
        success: () => {
            target.classList.toggle("hidden", false);
            loading.forEach(e => e.classList.toggle("hidden", true));
            renderMyCart(myCart.list);
        }
    };
    addItemToCart(+id, quaty, callback);
}
// Xử lý nút xóa tất cả sản phẩm trong giỏ
getElement("#btnClearCart").onclick = () => {
    myCart.list.splice(0, myCart.list.length);
    myCart.saveLocalStorage();
    renderMyCart(myCart.list);
}
// Xử lý nút thanh toán sản phẩm trong giỏ
getElement("#btnPaymentCart").onclick = () => {
    myCart.list.splice(0, myCart.list.length);
    myCart.saveLocalStorage();
    renderMyCart(myCart.list);
}
export { renderHtmlProductItem };