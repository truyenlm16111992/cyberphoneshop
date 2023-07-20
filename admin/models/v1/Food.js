class Phone {
    constructor(_id , _name, _image, _description, _brand, _price, _discountPercent,_createTime) {
        this.id = _id
        this.name = _name
        this.image = _image
        this.description = _description
        this.brand = _brand
        this.price = _price
        this.discountPercent = _discountPercent
        this.createTime=_createTime
    }

    mapLoaiPhone() {
        // if (this.loaiMon === 'loai1') return 'Chay'
        // if (this.loaiMon === 'loai2') return 'Mặn'

        //  return this.brand === 'loai1' ? 'Apple' : 'Samsung' ? 'Oppo' : 'Xiaomi' ? 'Vivo' : 'Honor'
        if (this.brand === 'loai1') return 'Apple';
        if (this.brand === 'loai2') return 'Samsung';
        if (this.brand === 'loai3') return 'Oppo';
        if (this.brand === 'loai4') return 'Xiaomi';
        if (this.brand === 'loai5') return 'Vivo';
        if (this.brand === 'loai6') return 'Honor';

        return 'Unknown';
    }

    
    // mapTinhTrang() {
    //     return this.tinhTrang === '1' ? 'Còn' : 'Hết'
    // }

    tinhGiaKM() {
        return this.price * (1 - Number(this.discountPercent))
    }
}
export default Phone
