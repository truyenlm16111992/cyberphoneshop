import Food from '../../models/v1/Food.js'

const getElement = (selector) => document.querySelector(selector)

const layThongTinMonAn = () => {
    // C1:
    // Lấy thông tin từ user nhập
    // const maMon = getElement('#foodID').value
    // const tenMon = getElement('#tenMon').value
    // const loaiMon = getElement('#loai').value
    // const giaMon = getElement('#giaMon').value
    // const khuyenMai = getElement('#khuyenMai').value
    // const tinhTrang = getElement('#tinhTrang').value
    // const hinhAnh = getElement('#hinhMon').value
    // const moTa = getElement('#moTa').value

    // // Object literal
    // console.log({
    //     maMon,
    //     tenMon,
    //     loaiMon,
    //     giaMon,
    //     khuyenMai,
    //     tinhTrang,
    //     hinhAnh,
    //     moTa,
    // })

    // // tạo 1 lớp đối tượng food từ class Food
    // return new Food(maMon, tenMon, loaiMon, giaMon, khuyenMai, tinhTrang, hinhAnh, moTa)

    //C2:
    let food = {}
    const elements = document.querySelectorAll(
        '#foodForm input, #foodForm select, #foodForm textarea'
    )
    elements.forEach((ele) => {
        // destructuring
        const { name, value } = ele
        food[name] = value //dynamic key
    })

    // tạo đối tượng món ăn từ class Food
    const { maMon, tenMon, loaiMon, giaMon, hinhAnh, moTa, khuyenMai, tinhTrang } = food

    return new Food(maMon, tenMon, loaiMon, giaMon, khuyenMai, tinhTrang, hinhAnh, moTa)
}

getElement('#btnThemMon').onclick = () => {
    // C1:
    // const food = layThongTinMonAn()

    // getElement('#imgMonAn').src = food.hinhAnh
    // getElement('#spMa').innerHTML = food.maMon
    // getElement('#spTenMon').innerHTML = food.tenMon
    // getElement('#spLoaiMon').innerHTML = food.loaiMon
    // getElement('#spGia').innerHTML = food.giaMon
    // getElement('#spKM').innerHTML = food.khuyenMai
    // getElement('#spGiaKM').innerHTML = 10
    // getElement('#spTT').innerHTML = food.tinhTrang
    // getElement('#pMoTa').innerHTML = food.moTa

    // C2:
    const food = layThongTinMonAn()

    const elements = document.querySelectorAll(
        '.foodDetail li span,.foodDetail li img, .foodDetail li p'
    )

    elements.forEach((item) => {
        const name = item.getAttribute('name')
        if (name === 'hinhAnh') {
            item.src = food[name]
        } else if (name === 'loaiMon') {
            item.innerHTML = food.mapLoaiMon()
        } else if (name === 'giaKM') {
            item.innerHTML = food.tinhGiaKM()
        } else if (name === 'tinhTrang') {
            item.innerHTML = food.mapTinhTrang()
        } else {
            item.innerHTML = food[name]
        }
    })
}
