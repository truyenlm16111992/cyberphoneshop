class PhoneList{
    constructor(list=[]){
        this.list=list;
    }
    checkExistID(id){
        return this.list.findIndex(e=>e.id===id);
    }
}
export default PhoneList;