import { Notification } from 'element-ui';
export default{
    install(Vue,options){
        Vue.prototype.notify = (text, n) => {  // 状态n  不传为警告 1 成功 2错误 3提示消息
            let type = 'warning'
            n == 1 ? type = 'success' : n == 2 ? type = 'error' : n == 3 ? type = 'info' : type = 'warning'
            Notification({
                title: '提示',
                message: text,
                type: type,
                duration:4000,
                offset: 150
            });
        },
        Vue.prototype.regCheck = (str, tips, regName) => {
            let regBox = {
                // 手机号
                mobileReg: /^1\d{10}$/,
                // 图片验证码
                imageCodeReg: /^[A-Za-z0-9]{6}$/,
                // 短信验证码
                mobcodeReg: /^[0-9]{6}$/,
                // 密码 减号/下划线/字母/数字 8-16
                passwordReg: /^(?=.*[a-zA-Z])(?=.*\d)[^]{8,16}$/,
                // 银行卡
                cardnoReg: /^\d{15,19}$/,
                
                idcardReg:/^\d{17}\w$/,
                // 正整数
                positiveReg: /^[1-9]\d*$/,
                //最多两位小数
                hasDecimals: /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/,
                //借款人姓名
                other_user_nameReg: /^([\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*)$/,
                //身份证号
                other_id_cardReg:/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
                //QQ号码
                qqtestReg:/^[1-9]\d{4,20}$/
            };
            let reg = regBox[regName];
            if(!reg.test(str)) {
                Notification({
                    title: '提示',
                    message: tips,
                    type: 'warning',
                    duration:4000,
                    offset: 150
                });
                return true 
            }
        },
        Vue.prototype.checkEmpty = (str, tips) => {
            if (str === null || str === undefined || str === '') {
                Notification({
                    title: '提示',
                    message: tips,
                    type: 'warning',
                    duration:4000,
                    offset: 150
                });
                return true;
            }
            return false;
        }
    }
}