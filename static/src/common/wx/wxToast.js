import { Toast } from 'mint-ui';

module.exports = {
    data() {
        return {

        }
    },
    methods: {

        toast(tosatStr) {
            Toast({
                message: tosatStr.text,
                position: tosatStr.place ? tosatStr.place : 'center',
                duration: tosatStr.time ? tosatStr.time : 2000,
                className: tosatStr.className ? tosatStr.className : 'toastTip'
            });
        }
    }

}