<template>
    <div class="signDialog-root" >
        <div class="signDialog-mask" :style="fullHeight" @click="closeDialog"></div>
        <div class="signDialog-div" ref="signDialog">
            <div class="signDialog-btn" ref = "signBtn"@click="closeDialog"></div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            fullHeight:{
                height: document.documentElement.clientHeight+5+"px"  //获取手机可视区域的的高度
            },
        }
    },
    props:['info'],
    methods :{
        closeDialog () {
            this.$emit('closeDialog',false)
        }
    },
    created () {

    },
    mounted () {
        this.$refs.signDialog.style.background = "url("+"'"+this.info.background+"'"+") no-repeat "
        this.$refs.signBtn.style.bottom = this.info.bottom
        this.$refs.signDialog.style.backgroundSize = "7.733333rem 7.733333rem"
    }
}
</script>
<style lang="scss" scoped>
    .signDialog-mask {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        background-color:#000; 
        filter:alpha(opacity=70); 
        -moz-opacity:0.7; 
        opacity:0.7; 
        z-index: 1;
    }
	.signDialog-div {
        background: url('https://aliyunsso.edspay.com/web/wx/activity/sign/tanc_guize.png') no-repeat;
        height:7.733333rem;
        width:7.733333rem;
        position: fixed;
        z-index: 10;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
            .signDialog-btn {
                position: absolute;
                bottom: 1.15rem;
                display: inline-block;
                width: 2.986667rem;
                height: 1.306667rem;
                margin: .253333rem 0 0 2.45rem;
            }
        }
</style>

