<template>
    <div>
        <invest-option :type=1 title="恭喜您，转移申请提交成功" :btnNumber=1 btnOne="完成" clickOne="/moneyTransfer" :sucReason="result" >
        </invest-option>
    </div>
</template>

<script>
import option from '../../../components/public/account-option.vue'
export default {
    data() {
        return {
            result:''
        }
    },
    methods: {
        initData(){
            let _this = this
            global.http.post(_this,"/account/toBalanceRemove",{source:'h5'},data => {
                if (data.body.resCode == 1) {
                        _this.result = data.body.resData.waitTime
                }else{
                    _this.$message({ message: data.body.resMsg, type: "warning" });
                }
            })
        },
    },
    created: function() {
        this.initData()
    },
    mounted: function() {
        
    },
    components: {
        "invest-option": option
    }
}
</script>

<style lang="scss" scoped></style>