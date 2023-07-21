class PhoneList {
    constructor(list = []) {
        this.list = list;
    }
    checkExistID(id) {
        return this.list.findIndex(e => e.id === id);
    }
    searchPhone(keySearch) {
        return this.list.filter(e => {
            const { name, brand } = e;
            return convertStringSearch(name + brand).indexOf(convertStringSearch(keySearch)) > -1;
        });
    }
    searchPhoneByAttribute(keySearch) {
        const keys = {
            "brand": "",
            "price": {
                "min": 0
            },
            ...keySearch
        }
        return this.list.filter(e => {
            let flag = true;
            Object.keys(keys).forEach(x => {
                switch (x) {
                    case "price":
                        flag &&= !(e.tinhGiaKM() < Number(keys[x]["min"]) || e.tinhGiaKM() > Number(keys[x]["max"]));
                        break;
                    default:
                        flag &&= (!keys[x] || e[x] === keys[x]);
                }
            });
            return flag;
        });
    }
}
export default PhoneList;