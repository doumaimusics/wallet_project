<template>
    <div class="approval-div">
        <div class="approval-banner"></div>
        <div class="approval-main">
            <!-- 导航 -->
            <ul class="approval-list clear">
                <li v-for="(val,index) in list" @click="change(index)" :class="{active:num == index}">{{val}}</li>
            </ul>
            <!-- 内容 -->
            <process v-if="num == 0" @toJump="change"></process>
            <ICP v-if="num == 1"></ICP>
            <signatures v-if="num == 2"></signatures>
            <bankDeposit v-if="num == 3"></bankDeposit>
            <threeLevel v-if="num == 4"></threeLevel>
        </div>
    </div>
</template>
<script>
import process from './process'; // 备案进程
import ICP from './ICP'; // ICP
import bankDeposit from './bankDeposit'; // 银行存管
import signatures from './signatures'; // 电子签章
import threeLevel from './threeLevel'; // 三级等保
export default {
    data () {
        return {
            list:['备案进程','ICP经营许可证','电子签章','银行存管','三级等保'],    
            num:0,
        }
    },
    components: {
        'process': process,
        'ICP': ICP,
        'bankDeposit': bankDeposit,
        'signatures': signatures,
        'threeLevel': threeLevel,
    },
    methods: {
        change (num) {
            this.num = num
        },
    },
    created () {
        this.$route.query.num ? this.num = this.$route.query.num : '';
    }
}
</script>
<style lang="scss" scoped>
    .approval-div {
        background: #F8F8F8;
        overflow: hidden;
        .approval-main {
            width: 1200px;
            margin: 0 auto 30px auto;
            background:white;
            overflow: hidden;
        }
        .approval-banner {
            width: 100%;
            height: 260px;
            background: url(https://aliyunsso.edspay.com/web/approval/banner.png) no-repeat center center/1920px 260px;
            margin-bottom: 20px;
        }
        .approval-list{
			width: 1200px;
            margin: 20px auto 0 auto;
            padding: 0 40px;
			border-bottom:1px solid #f5f5f5;
			li{
				float: left;
				margin-right: 60px;
				cursor: pointer;
				font-size: 16px;
				color: #333333;
				padding-bottom: 20px;
				
			}
			li.active{
				font-size: 16px;
				color: #FF5B4C;
				border-bottom: 2px solid #FF5B4C;
			}
		}
    }
</style>


