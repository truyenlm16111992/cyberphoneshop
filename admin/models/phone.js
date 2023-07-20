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
    tinhGiaKM() {
        return this.price * (1 - Number(this.discountPercent))
    }
}
export default Phone
