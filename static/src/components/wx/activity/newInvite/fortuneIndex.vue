<template>
    <div id="fortuneIndex">
    	<div v-title>发财计划2.0</div>
    	<div @click="showRult = true" class="rult">规则</div>
    	<div class="content">
    		<div v-if="hasLogin" class="detail">
    			<div class="nums clear">
    				<div class="fl data people">
    					<div class="num">{{userData.count}}<span>人</span></div>
    					<div class="text">成功邀请</div>
    				</div>
    				<div class="fl shu bdr-l"></div>
    				<div class="fl data money">
    					<div class="num">{{userData.moneyTotal ? userData.moneyTotal:0 | returnFloat}}<span>元</span></div>
    					<div class="text">累计奖励</div>
    				</div>
    			</div>
    			<div @click="toDetail" class="toDetail"></div>
    		</div>
    		<div v-else @click="toLogin" class="toLogin"></div>
    	</div>
        <div @click="toStrategy" class="toStrategy"></div>
    	<div class="bottomNum">
    		<div class="num num1 fl">{{terraceData.inviteUserSum}}</div>
    		<div class="num fl">{{terraceData.moneySum | returnFloat}}</div>
    	</div>
    	<!-- <div class="bottomBtn">
    		<div class="btn toShare fl"></div>
    		<div class="btn showQcode fl"></div>
    	</div> -->
		<div v-if="showRult" v-layer class="rultBox">
			<div class="img">
				<a href="tel:400-135-3388"></a>
                <p v-if="osType == 'IOS'">本活动奖品与苹果公司无关</p>
				<div @click="showRult = false" class="close"></div>
			</div>
		</div>
		<div v-if="showOver" v-layer class="overBox">
			<div class="img">
				<div @click="showOver = false" class="close"></div>
			</div>
		</div>
		<div v-if="invite_suspend_app.picUrl" class="floating"><div @click="appRouter(invite_suspend_app.url)"><img :src="invite_suspend_app.picUrl" alt=""></div></div>
    	<share-bottom :entrance="'邀请升级首页'" :showText="1"></share-bottom>
    </div>
</template>

<script>
    import wxToapp from '../../../../common/wx/wxToapp';
    import shareBottom from './shareBottom.vue';
    import getActivityData from '../publicJS/getActivityData';
    export default{
        mixins:[wxToapp,getActivityData],
    	data(){
    		return{
    			terraceData:{},
    			userData:{},
    			showRult:false,
    			showOver:false,
    			invite_suspend_app:{
    				picUrl:null,
    				url:null
    			}
    		}
    	},
    	methods:{
            toStrategy(){
                window._czc.push(﻿["_trackEvent",'发财计划2.0首页','二维码按钮']);
                this.appRouter('invite/inviteStrategy');
            },
    		toDetail(){
    			this.appRouter('/invite/newAward');
    		},
    		toLogin(){
    			if(this.osType){
    				this.PassValue('LG');
    			}else{
    				this.$router.replace({ path: '/wxLogin', query: { thisUrl: this.$route.fullPath } });	//路由
    			}
    		},
    		getUserData(){
    			this.getAppData('/activity/inviteNew/getInviteDetails',(data)=>{
    				if(data.resCode){
    					this.userData = data.resData;
    					
    				}
    			},{type:'detail'})
    		},
    		getSuspend(){
    			this.notLogPost('/activity/inviteNew/suspend',(data) =>{
                    if(data.resData.invite_suspend_app){
						this.invite_suspend_app = data.resData.invite_suspend_app;
					}
                },{})
    		},
    		getmyInviteSum(){   //获取平台数据
                this.notLogPost('/activity/inviteNew/myInviteSum',(data) =>{
                    this.terraceData = data.resData;
                },{})
            },
    	},
    	components:{
            shareBottom
        },
    	created(){
    		if(this.hasLogin){
    			this.getUserData();
    		}
    		this.getSuspend();
    		this._getActivityTime('invite_activity_2_0_id');
    		this.getmyInviteSum();
    	},
    	mounted(){

    		this.PassValue('NavWhite_发财计划2.0');
    		setTimeout(()=>{
    			this.ActivityPrompt();
    		},360)
    		// 数据统计
    		const script = document.createElement('script')
    		script.src = 'https://s13.cnzz.com/z_stat.php?id=1275517480&web_id=1275517480'
    		script.language = 'JavaScript'
    		document.body.appendChild(script);
    	}
    }
</script>

<style lang="scss" scoped>
    #fortuneIndex{
    	height:38.853333rem;
    	background: url('https://aliyunsso.edspay.com/web/wx/activity/newInvite/fortune/fortuneBg.png') no-repeat;
    	background-size:100%;
    	position: relative;
    	/*底部图片*/
		.floating{
			width: 1.48rem;
			height: 1.6rem;
			position: fixed;
			right: .2rem;
			top: 11rem;
			z-index: 100;
			img{
				width:100%;
			}
		}
    	.rult{
    		height:0.533333rem;
    		width:0.933333rem;
    		position: fixed;
    		top:0.466667rem;
    		right: 0;
    		border-top-left-radius: 0.266667rem;
    		border-bottom-left-radius: 0.266667rem;
    		background:#FA5F2F;
    		color: #fff;
    		font-size: 0.346667rem;
    		line-height:0.533333rem;
    		text-align: center;
    	}
    	.rultBox{
    		padding-top: 2.0rem;
    		.img{
    			height:11.2rem;
    			width: 8.133333rem;
    			margin: 0 auto;
    			background: url('https://aliyunsso.edspay.com/web/wx/activity/newInvite/fortune/rult.png') no-repeat;
    			background-size: 100% 100%;
    			padding-top: 3rem;
    			position: relative;
    			a{
    				display:block;
    				height:0.613333rem;
    				width:2.8rem;
					position: absolute;
					bottom: 1rem;
					right: 0.6rem;

    			}
    			p{
    				width:100%;
    				text-align: center;
    				font-size: 0.32rem;
    				line-height: 0.346667rem;
    				color: #aaa;
    				position: absolute;
    				bottom: 0.56rem;
    				left: 0;

    			}
    			.close{
    				height:1rem;
    				width:1rem;
					position: absolute;
					top: 0;
					right: 0;
    			}
    		}
    	}
    	.overBox{
    		padding-top: 5.066667rem;
    		.img{
    			margin: 0 auto;
    			height:5.066667rem;
    			width:8.133333rem;
    			background: url('https://aliyunsso.edspay.com/web/wx/activity/newInvite/fortune/activityOver.png') no-repeat;
    			background-size: 100% 100%;
    			padding-top: 3.333333rem;
    			.close{
    				height:1.6rem;
    				width:5.8rem;
    				margin: 0 auto;
    			}
    		}
    	}
    	.content{
    		padding-top: 7.92rem;
    		.detail{
    			.nums{
    				padding: 0.25rem 0.453333rem 0;
    				height:1.613333rem;
    				.data{
    					width:4.45rem;
    					text-align:center;
    					color:#454545;
    					.num{
    						font-size:0.613333rem;
    						font-family: DIN-Bold;
    						line-height:0.613333rem;
    						padding-bottom: 0.1rem;
    						span{
    							font-size: 0.32rem;
    						}

    					}
    					.text{
    						font-size: 0.32rem;
    						line-height: 0.32rem;
    					}
    				}
    				.shu{
    					position: relative;
    					top: -0.2rem;
    					height:1.413333rem;
    					width: 1px;
    				}
    			}
    			.toDetail{
    				height:1.12rem;
    				width:9.08rem;
    				margin: 0 auto;
    				background: url('https://aliyunsso.edspay.com/web/wx/activity/newInvite/fortune/toDetail.png') no-repeat;
    				background-size: 100% 100%;
    			}
    		}
    		.toLogin{
    			height:0.986667rem;
    			width:3.173333rem;
    			background:url('https://aliyunsso.edspay.com/web/wx/activity/newInvite/fortune/toLogin.png') no-repeat;
    			background-size: 100% 100%;
    			margin: 0.746667rem auto;
    		}
    	}
        .toStrategy{
            position: absolute;
            height:1.5rem;
            width: 100%;
            top:33.5rem;
            left: 0;
        }
    	.bottomNum{
    		position: absolute;
    		bottom:1.866667rem;
    		width:100%;
    		padding: 0 0.96rem;
    		font-size:0.533333rem;
    		color: #b52114;
    		.num{
    			text-align: center;
    			line-height: 0.693333rem;
    			width:3.306667rem;
    			font-family: DIN-Medium;
    		}
    		.num1{
    			margin-right: 1.44rem;
    		}
    	}
    	.bottomBtn{
    		position: fixed;
    		bottom: 0;
    		.btn{
    			height:1.253333rem;
    			width:5.0rem;
    		}
    		.toShare{
    			background: url('https://aliyunsso.edspay.com/web/wx/activity/newInvite/fortune/toShare.png') no-repeat;
    			background-size: 100% 100%;
    		}
    		.showQcode{
    			background: url('https://aliyunsso.edspay.com/web/wx/activity/newInvite/fortune/showQcode.png') no-repeat;
    			background-size: 100% 100%;
    		}
    	}
    }
</style>