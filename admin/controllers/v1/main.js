import Phone from '../../models/v1/Food.js'



const getElement = (selector) => document.querySelector(selector)

const layThongTinDienThoai = () => {
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
    let phone = {}
    const elements = document.querySelectorAll(
        '#phoneForm input, #phoneForm select, #phoneForm textarea'
    )
    elements.forEach((ele) => {
        // destructuring
        const { name, value } = ele
        // phone[name] = value //dynamic key
        if (name === 'brand' && !value) {
            phone[name] = 'loai1'; // Gán giá trị mặc định nếu không có giá trị "brand"
        } else {
            phone[name] = value;
        }
    })

    // tạo đối tượng món ăn từ class Phone
    const { id, name, brand, price, image, description, discountPercent, createTime } = phone

    return new Phone(id, name, brand, price, image, description, discountPercent, createTime )
}

getElement('#btnThemPhone').onclick = () => {

     // C2:
     const phone = layThongTinDienThoai()
     const elements = document.querySelectorAll(
         '.phoneDetail li span,.phoneDetail li img, .phoneDetail li p')
     
     elements.forEach((item) => {
         const name = item.getAttribute('name')
         if (name === 'image') {
             item.src = phone[name]
         } else if (name === 'brand') {
             item.innerHTML = phone.mapLoaiPhone()
         } else if (name === 'discountPercent') {
             item.innerHTML = phone.tinhGiaKM()
         // } else if (name === 'createTime') {
         //     item.innerHTML = phone.mapTinhTrang()
         } else {
             item.innerHTML = phone[name]
         }
     })
 }