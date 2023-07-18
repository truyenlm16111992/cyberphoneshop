class Food {
    constructor(_maMon, _tenMon, _loaiMon, _giaMon, _khuyenMai, _tinhTrang, _hinhAnh, _moTa) {
        this.maMon = _maMon
        this.tenMon = _tenMon
        this.loaiMon = _loaiMon
        this.giaMon = _giaMon
        this.khuyenMai = _khuyenMai
        this.tinhTrang = _tinhTrang
        this.hinhAnh = _hinhAnh
        this.moTa = _moTa
    }

    mapLoaiMon() {
        // if (this.loaiMon === 'loai1') return 'Chay'
        // if (this.loaiMon === 'loai2') return 'Mặn'

        return this.loaiMon === 'loai1' ? 'Chay' : 'Mặn'
    }

    mapTinhTrang() {
        return this.tinhTrang === '1' ? 'Còn' : 'Hết'
    }

    tinhGiaKM() {
        return this.giaMon * (1 - Number(this.khuyenMai) / 100)
    }
}
export default Food
