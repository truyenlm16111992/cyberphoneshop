function checkStringLength(_string, _min, _max, _selector, _msgError) {
    let len = _string.trim().length;
    if (len < _min || len > Number(_max)) {
        showMessage(_selector, _msgError);
        return 0;
    }
    return 1;
}
function checkRegex(_string, _regex, _selector, _msgError) {
    if (!_regex.test(_string)) {
        showMessage(_selector, _msgError);
        return 0;
    }
    showMessage(_selector, "");
    return 1;
}
function checkVietnameseLetters(_string, _selector, _msgError) {
    regex = /^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$/;
    return checkRegex(_string, regex, _selector, _msgError);
}
function checkEmail(_string, _selector, _msgError) {
    regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return checkRegex(_string, regex, _selector, _msgError);
}
function checkPassword(_string, _selector, _msgError) {
    //Gồm số, chữ thường, chữ in hoa, kí tự đặc biệt
    //regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;
    //Tương tự không ràng buộc phải có chữ thường
    regex = /^(?=.*\d)(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;
    return checkRegex(_string, regex, _selector, _msgError);
}
function checkDateFormat(_string, _selector, _msgError) {
    regex = /^(0?[1-9]|1[012])[\/](0?[1-9]|[12][0-9]|3[01])[\/]\d{4}$/;
    return checkRegex(_string, regex, _selector, _msgError);
}
function checkRangeNumber(_number, _min, _max, _selector, _msgError) {
    if(Number.isNaN(_number)||_number<Number(_min)||_number>Number(_max)){
        showMessage(_selector, _msgError);
        return 0;
    }
    showMessage(_selector, "");
    return 1;
}