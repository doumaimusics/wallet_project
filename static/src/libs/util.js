/**
 * 空字符串检测
 */
var isEmptyString = function (str) {
    if (str === null || str === undefined || str === '') {
        return true;
    }
    return false;
}

/**
 * 非空字符串检测
 */
var isNotEmptyString = function (str) {
    return !isEmptyString(str);
}

/**
 * 正则验证
 */
var regCheck = function (str, regName) {
    if (isEmptyString(str) || isEmptyString(regName)) {
        return false;
    }

    var regBox = {
        // 手机号
        mobileReg: /^1\d{10}$/,
        // 图片验证码
        imageCodeReg: /^[A-Za-z0-9]{6}$/,
        // 短信验证码
        mobcodeReg: /^[0-9]{6}$/,
        // 短信验证码
        fourCodeReg: /^[0-9]{4}$/,
        // 密码 减号/下划线/字母/数字 6-20
        passwordReg: /^(?=.*[a-zA-Z])(?=.*\d)[^]{8,16}$/,
        // 银行卡
        cardnoReg: /^\d{15,19}$/,
        
        idcardReg:/^\d{17}\w$/,
        // 正整数
        positiveReg: /^[1-9]\d*$/,
        //非负数
        nonnegativeReg: /^[0-9]\d*$/,
        //最多两位小数
        hasDecimals: /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/,
        //借款人姓名
        other_user_nameReg: /^([\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*)$/,
        //身份证号
        other_id_cardReg:/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
        //QQ号码
        qqtestReg:/^[1-9]\d{4,20}$/
    };

    var reg = regBox[regName];

    return reg.test(str);
}

/**
 * 挂载全局工具
 */
window.tool = {
    isEmptyString: isEmptyString,
    isNotEmptyString: isNotEmptyString,
    regCheck: regCheck
};
