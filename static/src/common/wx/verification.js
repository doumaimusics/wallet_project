import { Toast } from 'mint-ui';
module.exports = {
    data() {
        return {

        }
    },
    methods: {
        isEmpty(value, tips, num) { // 输入框空状态判断
            var that = this;
            if (tool.isEmptyString(value)) {
                if (num == 1) {
                    that.toast({ text: tips })
                } else {
                    that.popModal({ str: tips });
                }
                return true;
            }
        },
        isFormat(value, tips, Reg, num) { //输入格式错误判断
            var that = this;
            if (!tool.regCheck(value, Reg)) {
                if (num == 1) {
                    that.toast({ text: tips })
                } else {
                    that.popModal({ str: tips });
                }
                return true;
            }
        },
        popModal(param, time) { // 红色提示框
            var that = this;
            that.tipShow = true;
            that.errorMsg = param.str;
            setTimeout(function() {
                that.tipShow = false;
                that.errorMsg = '';
            }, time ? time : 2000);
        },
        toast(tosatStr) { // 黑色提示框
            Toast({
                message: tosatStr.text,
                position: tosatStr.place ? tosatStr.place : 'center',
                duration: (tosatStr.time ? tosatStr.time : 2000),
                className: tosatStr.className ? tosatStr.className : 'toastTip'
            });
        }
    }

}