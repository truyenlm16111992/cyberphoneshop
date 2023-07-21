import Phone from '../models/phone.js'
import PhoneList from '../models/phoneList.js'
import { DOMAIN } from '../constants/api.js'

const getElement = (selector) => document.querySelector(selector)
const phones = new PhoneList();
const getPhoneList = () => {
    const promise = axios({
        url: DOMAIN,
        method: 'GET',
    })

    promise
        //get data thành công
        .then((result) => {
            // console.log('result: ', result)
            phones.list = result.data.map(e => {
                const { id, name, image, description, brand, price, discountPercent, createTime } = e;
                return new Phone(id, name, image, description, brand, price, discountPercent, createTime);
            });
            renderTable(phones.list)
        })
        .catch((err) => {
            console.log(err)
        })
}

window.eventFocusOut = (event) => {
    checkValidation(event.target);
}
const checkValidation = (obj) => {
    const nameObj = obj.getAttribute("name");
    const idErrorMsg = obj.dataset.error;
    let isValid = true;
    switch (nameObj) {
        case "id":
            isValid = checkStringLength(obj.value, 1, 5, idErrorMsg, "ID sản phẩm là số nguyên dương không quá 5 chữ số") && checkRegex(obj.value, /^\d+$/, idErrorMsg, "ID sản phẩm là số nguyên dương không quá 5 chữ số")&&(!getElement('#btnCapNhat').dataset.id&&phones.checkExistID(obj.value)>-1?false&showMessage(idErrorMsg, `ID sản phẩm '${obj.value}' đã tồn tại.`):showMessage(idErrorMsg, ""));
            break;
        case "price":
            isValid = checkStringLength(obj.value, 1, undefined, idErrorMsg, "Đây là trường bắt buộc không được bỏ trống") && checkRegex(obj.value, /^\d+$/, idErrorMsg, "Giá sản phẩm là một số nguyên dương");
            break;
        case "image":
            isValid = checkStringLength(obj.value, 1, undefined, idErrorMsg, "Đây là trường bắt buộc không được bỏ trống") && checkRegex(obj.value, /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&=]*)/g, idErrorMsg, "Link ảnh sản phẩm không hợp lệ");
            break;
        case "brand":
        case "name":
        case "image":
            isValid = checkStringLength(obj.value, 1, undefined, idErrorMsg, "Đây là trường bắt buộc không được bỏ trống");
            break;
    }
    return isValid;
}
getPhoneList()
let listPercent = "";
for (let i = 0; i <= 1; i = Math.floor((i + 0.05) * 100) / 100)
    listPercent += `<option value="${!i ? "" : i}" ${!i ? " selected" : ""}>${formatPercent(i)}</option>`;
getElement("#discountPercent").innerHTML = listPercent;
const renderTable = (arrPhone) => {
    let htmlContent = ''
    arrPhone.forEach((item) => {
        htmlContent += `
        <tr>
            <td>${item.id}</td>
            <td class="text-justify">${item.name}</td>
            <td>${item.brand}</td>
            <td class="text-justify">${item.description}</td>
            <td><img src="${item.image}" class="img-fluid" alt=""></td>
            <td>${formatMoney(item.price)}</td>
            <td>${formatPercent(item.discountPercent)}</td>
            <td>${formatDate(convertStringToDate(item.createTime.toString()))}</td>
            <td>
                <div class="d-flex justify-content-center">
                    <button class='btn btn-danger btn-sm' onclick="deletePhone(${item.id})">
                        <i class="fa fa-trash-alt"></i>
                    </button>
                    <button class='btn btn-success btn-sm ml-3' data-toggle="modal"
                        data-target="#exampleModal" onclick="editPhone(${item.id})">
                        <i class="fa fa-edit"></i>
                    </button>
                </div>
            </td>
        </tr>
        `
    })
    getElement('#tbodyPhone').innerHTML = htmlContent
}

const layThongTinDienThoai = () => {
    const elements = document.querySelectorAll(
        '#phoneForm input, #phoneForm select, #phoneForm textarea'
    )
    let phone = {};
    let isValue = true;
    elements.forEach((ele) => {
        const { name, value } = ele
        phone[name] = value;
        isValue &= checkValidation(ele);
    })
    const { id, name, image, description, brand, price, discountPercent, createTime } = phone
    return isValue ? new Phone(id, name, image, description, brand, price, discountPercent, createTime) : null
}


// ẩn btn cập nhật khi click vào btn thêm
getElement('#btnThem').onclick = () => {
    // ẩn btn cập nhật
    getElement('#btnCapNhat').style.display = 'none'

    // show lại btn thêm 
    getElement('#btnThemPhone').style.display = 'inline-block'

    getElement("#id").toggleAttribute("disabled",false);

    getElements("#phoneForm input, #phoneForm select, #phoneForm textarea").forEach(e => {
        e.value = "";
    });
    getElement('#btnCapNhat').toggleAttribute('data-id', false);
    getElements(".invalid-feedback").forEach(e=>e.innerHTML="");
}

//gọi API thêm vào DB
getElement('#btnThemPhone').onclick = () => {
    // lấy thông tin từ input
    const phone = layThongTinDienThoai()
    if (phone) {

        // call API thêm điện thoại
        const promise = axios({
            url: DOMAIN,
            method: 'POST',
            // add cross-origin header 
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            data: {
                ...phone,
                createTime:convertDateToString(new Date())
            },
        })
        console.log({
            ...phone,
            createTime:convertDateToString(new Date())
        });
        promise
            // thêm mới thành công
            .then((result) => {
                // get lại danh sách 
                getPhoneList()

                // đóng modal sau khi thêm thành công
                getElement('.btn.btn-secondary').click()
            })

            // thêm mới thất bại
            .catch((err) => {
                console.log('err: ', err)
            })
    }
}

// Xóa 
window.deletePhone = (id) => {
    // call API xóa phone
    const promise = axios({
        url: `${DOMAIN}/${id}`,
        method: 'DELETE',
    })
    promise
        // Xóa thành công
        .then(() => {
            // get lại danh sách phone sau khi xóa thành công
            getPhoneList()
        })
        // Xóa thất bại
        .catch((err) => {
            console.log(err)
        })
}

// EDIT 
window.editPhone = (id) => {
    // ẩn btn 
    getElement('#btnThemPhone').style.display = 'none'

    // show lại btn cập nhật
    getElement('#btnCapNhat').style.display = 'inline-block'

    getElement("#id").toggleAttribute("disabled",true);

    //set data-id vào btn cập nhật
    getElement('#btnCapNhat').setAttribute('data-id', id)

    // console.log(id)
    // call API lấy thông tin 
    const promise = axios({
        url: `${DOMAIN}/${id}`,
        method: 'GET',
    })
    promise
        .then((result) => {
            const elements = document.querySelectorAll(
                '#phoneForm input, #phoneForm select, #phoneForm textarea'
            )
            elements.forEach((ele) => {
                const { name } = ele // maPhone
                ele.value = result.data[name] //dynamic key
            })
        })
        .catch((err) => {
            console.log(err)
        })
}

getElement('#btnCapNhat').onclick = () => {
    // Lấy thông tin  từ input
    const phone = layThongTinDienThoai()
    if (phone) {

        // lấy id thông qua attribute data-id đã set ở hàm editFood
        const id = getElement('#btnCapNhat').dataset.id

        // call API cập nhật DB
        const promise = axios({
            url: `${DOMAIN}/${id}`,
            method: 'PUT',
            data: {
                ...phone
            },
        })

        promise
            .then(() => {
                //get lại danh sách món ăn sau khi cập nhật thành công
                getPhoneList()

                // đóng modal sau khi thêm thành công
                getElement('.btn.btn-secondary').click()

                // xóa attribute data-id
                getElement('#btnCapNhat').toggleAttribute('data-id', false)
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

getElement("#selLoai").onchange=(event)=>{
    const value = event.currentTarget.value;
    renderTable(phones.searchPhoneByAttribute({brand:value}));
}
let timer;
getElement("#tbSearch").onkeyup=(event)=>{
    clearTimeout(timer);
    timer=setTimeout(()=>renderTable(phones.searchPhone(event.target.value)),500);
}