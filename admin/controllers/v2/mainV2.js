import Food from '../../models/v2/FoodV2.js'
import { DOMAIN } from '../../constants/api.js'

const getElement = (selector) => document.querySelector(selector)

const getFoodList = () => {
    const promise = axios({
        url: DOMAIN,
        method: 'GET',
    })

    promise
        //get data thành công
        .then((result) => {
            // console.log('result: ', result)
            renderTable(result.data)
        })
        .catch((err) => {
            console.log(err)
        })
}
getFoodList()

const renderTable = (arrFoods) => {
    let htmlContent = ''
    arrFoods.forEach((item) => {
        htmlContent += `
            <tr>
                <td>${item.maMon}</td>
                <td>${item.tenMon}</td>
                <td>${item.loaiMon}</td>
                <td>${Number(item.giaMon).toLocaleString()}</td>
                <td>${item.khuyenMai}</td>
                <td>${Number(item.giaMon * (1 - item.khuyenMai / 100)).toLocaleString()}</td>
                <td>${item.tinhTrang}</td>
                <td>
                    <div style='max-width: 200px'>
                        <button 
                            class='btn btn-danger' 
                            onclick="deleteFood(${item.id})"
                        >
                            Delete
                        </button>
                        <button 
                            class='btn btn-success ml-3' 
                            data-toggle="modal" 
                            data-target="#exampleModal"
                            onclick="editFood(${item.id})"
                        >
                            Edit
                        </button>
                    </div>
                </td>
            </tr>
        `
    })

    getElement('#tbodyFood').innerHTML = htmlContent
}

const layThongTinMonAn = () => {
    const elements = document.querySelectorAll(
        '#foodForm input, #foodForm select, #foodForm textarea'
    )

    let food = {}
    elements.forEach((ele) => {
        const { name, value } = ele
        food[name] = value
    })

    const { maMon, tenMon, loaiMon, giaMon, khuyenMai, tinhTrang, hinhAnh, moTa } = food

    return new Food(maMon, tenMon, loaiMon, giaMon, khuyenMai, tinhTrang, hinhAnh, moTa)
}

// ẩn btn cập nhật khi click vào btn thêm món ăn
getElement('#btnThem').onclick = () => {
    // ẩn btn cập nhật
    getElement('#btnCapNhat').style.display = 'none'

    // show lại btn thêm món ăn
    getElement('#btnThemMon').style.display = 'inline-block'
}

//gọi API thêm món ăn vào DB
getElement('#btnThemMon').onclick = () => {
    // lấy thông tin món ăn từ input
    const food = layThongTinMonAn()
    console.log('food: ', food)

    // call API thêm món ăn
    const promise = axios({
        url: DOMAIN,
        method: 'POST',
        data: {
            ...food,
            loaiMon: food.mapLoaiMon(),
            tinhTrang: food.mapTinhTrang(),
        },
    })

    promise
        // thêm mới thành công
        .then((result) => {
            // get lại danh sách món ăn
            getFoodList()

            // đóng modal sau khi thêm thành công
            getElement('.btn.btn-secondary').click()
        })

        // thêm mới thất bại
        .catch((err) => {
            console.log('err: ', err)
        })
}

// Xóa món ăn
window.deleteFood = (id) => {
    console.log({ id })
    // call API xóa food
    const promise = axios({
        url: `${DOMAIN}/${id}`,
        method: 'DELETE',
    })

    promise
        // Xóa thành công
        .then(() => {
            // get lại danh sách food sau khi xóa thành công
            getFoodList()
        })
        // Xóa thất bại
        .catch((err) => {
            console.log(err)
        })
}

// EDIT FOOD
window.editFood = (id) => {
    // ẩn btn thêm món
    getElement('#btnThemMon').style.display = 'none'

    // show lại btn cập nhật
    getElement('#btnCapNhat').style.display = 'inline-block'

    //set data-id vào btn cập nhật
    getElement('#btnCapNhat').setAttribute('data-id', id)

    // console.log(id)
    // call API lấy thông tin món ăn
    const promise = axios({
        url: `${DOMAIN}/${id}`,
        method: 'GET',
    })

    promise
        .then((result) => {
            console.log(result.data)
            const elements = document.querySelectorAll(
                '#foodForm input, #foodForm select, #foodForm textarea'
            )
            elements.forEach((ele) => {
                const { name } = ele // maMon
                ele.value = result.data[name] //dynamic key
            })
        })
        .catch((err) => {
            console.log(err)
        })
}

getElement('#btnCapNhat').onclick = () => {
    // Lấy thông tin món ăn từ input
    const food = layThongTinMonAn()

    // lấy id thông qua attribute data-id đã set ở hàm editFood
    const id = getElement('#btnCapNhat').getAttribute('data-id')

    // call API cập nhật DB
    const promise = axios({
        url: `${DOMAIN}/${id}`, // id từ đâu chưa biết
        method: 'PUT',
        data: {
            ...food,
            loaiMon: food.mapLoaiMon(),
            tinhTrang: food.mapTinhTrang(),
        },
    })

    promise
        .then(() => {
            //get lại danh sách món ăn sau khi cập nhật thành công
            getFoodList()

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
