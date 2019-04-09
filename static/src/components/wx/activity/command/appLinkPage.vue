<template>
    <div class="linkPage-root">
        <span v-title>输口令 拿豪礼</span>
        <div class="linkPage-btn"  @click="isOpen = true"></div>
        <!-- 规则弹窗 -->
        <div class="rule-mask" v-if = "isOpen"></div>
		<div class="rule-div" v-if = "isOpen"><i @click="isOpen=false"></i>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            isOpen:false,
        }
    },
    methods : {
    }
    
}
</script>
<style lang="scss" scoped>
    .linkPage-root {
        width: 100%;
        height: 37.84rem;
        background: url(https://aliyunsso.edspay.com/web/activity/command/yindaoapp.png) no-repeat left top;
        background-size: cover;
        position: relative;
        .linkPage-btn {
            width: 6.4rem;
            height: 1.333333rem;
            position: absolute;
            bottom: 1.79333rem;
            left: 1.8rem;
        }
        .rule-mask {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background-color:#000; 
            filter:alpha(opacity=70); 
            -moz-opacity:0.7; 
            opacity:0.7; 
            z-index: 1;
        }
	    .rule-div {
            background: url('https://aliyunsso.edspay.com/web/activity/command/erweima.png') no-repeat;
            background-size: 100%;
            width: 7.733333rem;
            height: 7.733333rem;
            position: fixed;
            z-index: 10;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            i {
                display: inline-block;
                width: .966667rem;
                height: .966667rem;
                margin: 6.903333rem 0 0 3.4rem;
            }
            div {
                width: 3.066667rem;
                height: .96rem;
                position: absolute;
                top: 3.233333rem;
            }
            div:nth-of-type(1) {
                left: 0.533333rem;
            }
            div:nth-of-type(2) {
                left: 4.233333rem;
            }
        }
    }
</style>


