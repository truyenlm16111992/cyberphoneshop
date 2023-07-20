import Phone from '../../models/v2/FoodV2.js'
import PhoneList from '../../models/v2/phoneList.js'
import { DOMAIN } from '../../constants/api.js'
 



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
                return new Phone(id,name, image,description,brand,price,discountPercent,createTime);
            });
            console.log(phones.list);
            renderTable(phones.list)
        })
        .catch((err) => {
            console.log(err)
        })
}
getPhoneList()

const renderTable = (arrPhone) => {
    console.log(arrPhone);
    let htmlContent = ''
    arrPhone.forEach((item) => {
        htmlContent += `
            <tr>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.brand}</td>
                <td>${item.description}</td>
                <td><img id="img" src="../../assets/img/imac.png" alt=""></td>
                <td>${Number(item.price).toLocaleString()}</td>
                <td>${item.discountPercent}</td>
                <td>${Number(item.price * (1 - (item.discountPercent).toLocaleString()))}</td>
                <td>${item.createTime}</td>
                <td>
                    <div style='max-width: 200px'>
                        <button 
                            class='btn btn-danger' 
                            onclick="deletePhone(${item.id})"
                        >
                            Delete
                        </button>
                        <button 
                            class='btn btn-success ml-3' 
                            data-toggle="modal" 
                            data-target="#exampleModal"
                            onclick="editPhone(${item.id})"
                        >
                            Edit
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

    let phone = {}
    elements.forEach((ele) => {
        const { name, value } = ele
        phone[name] = value
    })

    const { id, name, image, description, brand, price, discountPercent, createTime } = phone

    return new Phone(id, name, image, description, brand, price, discountPercent, createTime)
}



// ẩn btn cập nhật khi click vào btn thêm
getElement('#btnThem').onclick = () => {
    // ẩn btn cập nhật
    getElement('#btnCapNhat').style.display = 'none'

    // show lại btn thêm 
    getElement('#btnThemPhone').style.display = 'inline-block'
}

//gọi API thêm vào DB
getElement('#btnThemPhone').onclick = () => {
    // lấy thông tin từ input
    const phone = layThongTinDienThoai()
    console.log('phone: ', phone)

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
            brand: phone.mapLoaiPhone(),
            // createTime: phone.CreateTime(),
        },
    })

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

// Xóa 
window.deletePhone = (id) => {
    console.log({ id })
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
    console.log(id);
    // ẩn btn 
    getElement('#btnThemPhone').style.display = 'none'

    // show lại btn cập nhật
    getElement('#btnCapNhat').style.display = 'inline-block'

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
            console.log(result.data)
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

    // lấy id thông qua attribute data-id đã set ở hàm editFood
    const id = getElement('#btnCapNhat').dataset.id

    // call API cập nhật DB
    const promise = axios({
        url: `${DOMAIN}/${id}`, // id từ đâu chưa biết
        method: 'PUT',
        data: {
            ...phone,
            brand: phone.mapLoaiPhone(),
            // createTime: phone.CreateTime(),
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

// mutation: Create, edit, delete => grapQL, react-query
