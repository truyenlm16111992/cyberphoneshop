import Product from "../model/product.js";
import { getProductById } from "../model/product.js";
import ProductList from "../model/productList.js";
import { getProductList } from "../model/productList.js"
import { myCart } from "../components/myCart.js";
const urlParams = new URLSearchParams(window.location.search);

const editLoadingLayout_Info = (isLoading) => {
    getElements(".product-info__content").forEach(e => {
        e.classList.toggle("hidden", isLoading);
        e.classList.toggle("flex", !isLoading);
    });
    getElements(".product-info__loading").forEach(e => e.classList.toggle("hidden", !isLoading));
};
if (urlParams.get("productID")) {
    const callback = {
        before: (config) => {
            //Ẩn thông tin và hiện layout loading
            editLoadingLayout_Info(true);
            return config;
        }
    }
    // Gọi hàm lấy thông tin sản phẩm với ID và callback sẽ xử lý trước khi gửi request đến API 
    getProductById(urlParams.get("productID"), callback).then(result => {
        getElements(".product-info__item, #btnAddProductToCart").forEach(e => {
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
                    break;
                default:
                    e.innerHTML = result[e.getAttribute("name")];
            }
        });
        getElement("#btnAddProductToCart").setAttribute("data-id",result.id);
        getElement("#linkToBrand").href=`./collections.html?brand=${result.brand}`;
        console.log("Set ID=>",getElement("#btnAddProductToCart").dataset.id)
        getElement("#product-info .qty-adjust__num").value = 1;
        //Ẩn layout loading và hiển thị thông tin sản phẩm
        getProductList().then(resultList=>{
            let contentList = "";
            const list = new ProductList(resultList);
            const productRelated=list.searchProductByAttribute({brand:result.brand}).sort((a,b)=>+b.createTime-a.createTime);
            console.log(productRelated);
            for(let i=0;i<productRelated.length&&i<4;i++){
                contentList+=`
                <li class="group/product px-3 py-3 hover:shadow-md">
                    <a href="./product.html?productID=${productRelated[i].id}" class="flex flex-row">
                        <img class="w-[80px] h-[80px]"
                            src="${productRelated[i].image}"
                            alt="">
                        <div class="flex flex-col">
                            <h6
                                class="font-bold group-hover/product:text-lime-600 group-hover/product:underline">${productRelated[i].name}</h6>
                            <span class="font-extrabold text-red-600">${formatMoney(productRelated[i].getSellPrice())}</span>
                        </div>
                    </a>
                </li>
                `;
            }
            getElement(".product-info__related").innerHTML=contentList;
        });
        editLoadingLayout_Info(false);
    })
}
getElement("#btnAddProductToCart").onclick = (event) => {
    // Xử lý ẩn/hiện layout khi đang tải thông tin sản phẩm
    const editLoadingLayout = (isLoading) => {
        getElements("#btnAddProductToCart").forEach(e => e.classList.toggle("hidden", isLoading));
        getElements(".product-info__add-loading").forEach(e => e.classList.toggle("hidden", !isLoading));
        getElements(".product-info__add-loading").forEach(e => e.classList.toggle("flex", isLoading));
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
        }
    };
    // Gọi hàm thêm sản phẩm vào giỏ
    addItemToCart(+event.currentTarget.dataset.id, +getElement(".product-info__content .qty-adjust__num").value, callback);
};