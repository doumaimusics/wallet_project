<template>
	<div v-layer id="tips">
		<div class="content">
			<div @click="clickPop" class="close"></div>
			<p v-if="showTips.tips1" class="p1">恭喜你成功点亮美食</p>
			<p v-if="showTips.tips2" class="p2">邀请好友注册并单笔出借年化满1000即可点亮美食</p>
			<p v-if="showTips.tips3" class="p3">累计出借年化金额满5000或者邀请好友注册并单笔出借年化满1000即可点亮美食</p>
			<div @click="showTips.tips1 = false" v-if="showTips.tips1" class="bottom1"></div>
			<div @click="toInvite" v-if="showTips.tips2" class="bottom2"></div>
			<div v-if="showTips.tips3" class="bottom3 clear">
				<div @click="toInvest" class="btn fl btn1"></div>
				<div @click="toInvite" class="btn fl btn2"></div>
			</div>
		</div>
	</div>
</template>

<script>
	import wxShare from '../../../../../common/wx/wxShare';

    export default{
    	mixins:[wxShare],
    	data(){
    		return{
                yuanxiao: { //分享标题内容配置
                    title: "欢乐闹元宵", //标题
                    desc: "畅想美食宴，奖励叠加拿", // 内容
                    link: global.host+"wx/yxInvitation", //链接
                    imgUrl: "https://aliyunsso.edspay.com/web/icon.png" //图片链接
                }
    		}
    	},
    	props:['showTips','showPopup'],
    	methods:{
    		clickPop(){
    			for(var item in this.showTips){
    				this.showTips[item] = false;
    			}
    		},
    		toInvite(){
    			this.showTips.tips2 = false;
    			this.showTips.tips3 = false;
    			if (this.osType) {
    				this.PassValue(this.appShare)
    			} else {
    				this.showPopup.layer = true;
    			}
    		},
    		toInvest(){
    			this.showTips.tips3 = false;
    			this.toApp('WIP','/wxInvest');
    		}
    	},
    	created(){
    		
    	},
        mounted(){
            this.getWxShareData(this.yuanxiao);
        }
    }
</script>

<style lang="scss" scoped>
    #tips{
    	width: 9.466667rem!important;
    	.content{
    		background: url('https://aliyunsso.edspay.com/web/wx/activity/lanternFestival/catePop/catePop.png') no-repeat;
    		background-size: 100% 100%;
    		width: 8.0rem;
    		height: 4.8rem;
    		margin: 5.2rem auto;
    		position: relative;
    		p{
    			color: #fff;
    			font-size: 0.346667rem;
    			line-height: 0.426667rem;
    			padding: 1.333333rem 0.666667rem 0;
    			text-align: justify;
    		}
    		.p1{
    			font-size: 0.4rem;
    			line-height: 0.4rem;
    			padding-top: 1.466667rem;
                text-align: center;
    		}
    		.bottom1,.bottom2{
    			height: 1.173333rem;
    			width: 2.986667rem;
    			margin: 0 auto;
    			background: url('https://aliyunsso.edspay.com/web/wx/activity/lanternFestival/catePop/check.png') no-repeat;
    			background-size: 100% 100%!important;
    			margin-top: 0.666667rem;
    		}
    		.bottom2{
    			background: url(https://aliyunsso.edspay.com/web/wx/activity/lanternFestival/catePop/invite-btn.png) no-repeat;
    		}
    		.bottom3{
    			padding: 0.533333rem 0.213rem;
				.btn{
					height: 1.173333rem;
    				width: 2.986667rem;
    				background-size: 100% 100%!important;
    				margin: 0 0.4rem;
				}
				.btn1{
					background: url('https://aliyunsso.edspay.com/web/wx/activity/lanternFestival/catePop/lend-btn.png') no-repeat;
				}
				.btn2{
					background: url(https://aliyunsso.edspay.com/web/wx/activity/lanternFestival/catePop/invite-btn.png) no-repeat;
				}
    		}
    		.close{
    			position: absolute;
    			height: 0.666667rem;
    			width: 0.666667rem;
    			background: url(https://aliyunsso.edspay.com/web/wx/activity/lanternFestival/catePop/close.png) no-repeat;
    			background-size: 100% 100%;
    			right: 0;
    			top: -0.933333rem;
    		}
    	}
    }
</style>