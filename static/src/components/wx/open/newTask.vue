<template>
	<div class="task"  :style="{background:'url(' + backgd + ') center center / 10rem 28.426667rem'}">
		<div v-title>新手任务福利</div>
		<div class="ruleBtn" @click="openRule"></div>
		<ul>
			<li v-for="(item,index) in getDataList">
				<!-- 已失效 -->
				<div class="btn bg1" v-if="item.status == 1"></div>
				<!-- 已领取 -->
				<div class="btn bg4" v-else-if="item.status == 4"></div>
				<!-- 领取 -->
				<div class="btn bg3" v-else-if="item.status == 3" @click="getCoupon(item,index)"></div>
				<!-- 去完成 -->
				<div class="btn bg2" v-else-if="item.status == 2 || !userInfo" @click="toFinish(item,index)"></div>
				<div v-if="item.status == 2 && index == 4" class="process_box">
					<div class="process_line">
						<div class="process_inner" :style="{width:processing+'%'}"></div>
					</div>
					<span>5万元</span>
					<p>当前待收金额：{{item.realTotalCollection ? item.realTotalCollection : '0.00'}}(元)</p>
				</div>
			</li>
		</ul>
		<!-- <p>活动未上线前完成新手任务，则任务奖励失效！</p> -->
		<div class="layer" v-if="layerBox"></div>
		<!-- 打开微信弹框 -->
		<div class="dialog award_dialog" v-if="rewardDialog">
			<img class="img1" :src="dialogData.img" alt="">
			<img class="img2" :src="dialogData.award" alt="">
			<div class="comfirm" @click="comfirm"></div>
		</div>
		<!-- 规则弹框 -->
		<div class="dialog ruleBox" v-if="closeRule">
			<div class="close_btn" @click="closeBtn"></div>
			<a href="tel:400-135-3388"></a>
			<p v-if="osType == 'IOS'">本活动奖品与苹果公司无关！</p>
		</div>
	</div>
</template>
<script>
	import wxToapp from '../../../common/wx/wxToapp';	//适配app
	import wxShare from '../../../common/wx/wxShare';
	export default {
		mixins:[wxToapp,wxShare],
		data(){
			return{
				layerBox:false,//弹框
				flag:true,//领取福利控制多次点击
				userInfo:false,//用户登陆状态
				rewardDialog:false,
				closeRule:false,//关闭规则弹框
				dialogData:{//领取奖励弹框内容
					award:'',
					img:'',
				},
				processing:0,//进度
				taskName:['开通存管奖','小试牛刀奖','再次出击奖','回款复投奖','待收达标奖'],//埋点名字
				awardImg:[//领取奖励红包图片
					'https://aliyunsso.edspay.com/web/wx/newTask/award1.png',
					'https://aliyunsso.edspay.com/web/wx/newTask/award2.png',
					'https://aliyunsso.edspay.com/web/wx/newTask/award3.png',
					'https://aliyunsso.edspay.com/web/wx/newTask/award4.png',
					'https://aliyunsso.edspay.com/web/wx/newTask/award5.png'
				],
				awardText:[//领取奖励的名字
					'https://aliyunsso.edspay.com/web/wx/newTask/text1.png',
					'https://aliyunsso.edspay.com/web/wx/newTask/text2.png',
					'https://aliyunsso.edspay.com/web/wx/newTask/text3.png',
					'https://aliyunsso.edspay.com/web/wx/newTask/text4.png',
					'https://aliyunsso.edspay.com/web/wx/newTask/text5.png'
				],
				backgd:'',//背景图切换
				getDataList:[//初始化数据
					{
					    "uprate": 1,

					},
					{
						"uprate": 0
					},
					{
					    "uprate": 0
					},
					{
						"uprate": 0
					},
					{
						"uprate": 0
					}
				],
				shareObj: { //分享标题内容配置
                    title: "做新手任务，赢68元现金！", //标题
                    desc: "超级简单新手5重任务，就等你来一一领取，赢取68元现金奖励！", //内容
                    link: global.host + "newTask", //链接
                    imgUrl: "https://aliyunsso.edspay.com/web/icon.jpg" //图片链接
				},
			}
		},
		methods:{
			getData(){
				this.getAppData('/activity/newHandTask',(data) =>{
					if(data.resCode == 1){
						this.getDataList = data.resData.list;
						if(data.resData.scrollBar == 1){
							this.backgd = 'https://aliyunsso.edspay.com/web/wx/newTask/bg1_2.png?v1.3'
						}else{
							this.backgd = 'https://aliyunsso.edspay.com/web/wx/newTask/bg1_1.png?v1.3'
						}
						for(var i=0; i<data.resData.list.length; i++){
							this.processing = ((Number(data.resData.list[4].realTotalCollection)/parseInt(50000))*100).toFixed(2);
							// data.resData.list[i].bgImg = this.liImg[i]
						}
					}
				},{})
			},
			//关闭领取奖励弹框
			comfirm(){
				this.layerBox = false;
				this.rewardDialog = false;
			},
			closeBtn(){
				this.layerBox = false;
				this.closeRule = false;
			},
			openRule(){
				this.layerBox = true;
				this.closeRule = true;
			},
			//领取福利
			getCoupon(item,index){
				if(this.getCookie('userToken') || this.userId){
					if(this.flag){
						this.flag = false;
						this.getAppData('/activity/newHandReward',(res) =>{
							if(res.resCode == 1){
								this.flag = true;
								this.dialogData.award = this.awardText[index];
								this.dialogData.img = this.awardImg[index];
								this.layerBox = true;
								this.rewardDialog = true;
								this.getData();
							}

						},{rewardId:item.rewardId})
					}
				}else{
					this.toApp('LG',{path:'/wxLogin',query:{thisUrl:this.$route.fullPath}})
				}
			},

			//去完成
			toFinish(item,index){
				if(this.getCookie('userToken') || this.userId){
					_czc.push(﻿["_trackEvent", "做任务", this.taskName[index]]);
					if(item.uprate == 1){
						//开通存管
						this.toApp('OpenDeposit',{path:'/wxDepository/wxOpenDepository',query:{thisUrl:this.$route.fullPath}})
					}else if(item.uprate == 0){
						//去投资列表页
						this.toApp('WIP',{path:'/wxInvest',query:{thisUrl:this.$route.fullPath}})
					}
				}else{
					this.toApp('LG',{path:'/wxLogin',query:{thisUrl:this.$route.fullPath}})
				}
				
			}
		},
		mounted(){
			this.PassValue('NavWhite_新手任务福利');
			this.getWxShareData(this.shareObj);
			//友盟数据
			const script = document.createElement('script')
			script.src = 'https://s13.cnzz.com/z_stat.php?id=1275138571&web_id=1275138571'
			script.language = 'JavaScript'
			document.body.appendChild(script)
		},
	    watch: {
	    	'$route'() {
	    		if (window._czc) {
	    			let location = window.location
	    			let contentUrl = location.pathname + location.hash
	    			let refererUrl = '/'
	    			window._czc.push(['_trackPageview', contentUrl, refererUrl])
	    		}
	    	}
	    },
		created(){
			if(this.userId || this.getCookie('userToken')){
				this.userInfo = true
				this.getData();
			}else{
				this.userInfo = false;
				this.backgd = 'https://aliyunsso.edspay.com/web/wx/newTask/bg1_1.png?v1.3'
			}
		}
	}
</script>
<style lang="scss" scoped>
	.task{
		position: relative;
		width: 100%;
		height: 28.426667rem;
		padding-top:8.88rem;
		.ruleBtn{
			position: fixed;
			width: 1.12rem;
			height: 0.546667rem;
			right: 0;
			top: 0.84rem;
			background:url(https://aliyunsso.edspay.com/web/wx/newTask/ruleBtn.png) no-repeat;
			background-size: cover;
			z-index: 98; 
		}
		ul{
			li{
				width: 9.333333rem;
				height: 3.266667rem;
				position: relative;
				margin:0 auto 0.24rem;
				.btn{
					position: absolute;
					top: 1.413333rem;
					width: 2.253333rem;
					height: 0.826667rem;
					right: 0.426667rem;
					color: #fff;
					z-index: 96;
				}
				.btn.bg1{
					background: url(https://aliyunsso.edspay.com/web/wx/newTask/off.png) no-repeat;
					background-size:cover; 
				}
				.btn.bg2{
					background: url(https://aliyunsso.edspay.com/web/wx/newTask/complete.png) no-repeat;
					background-size:cover; 
				}
				.btn.bg3{
					background: url(https://aliyunsso.edspay.com/web/wx/newTask/take.png) no-repeat;
					background-size:cover; 
				}
				.btn.bg4{
					background: url(https://aliyunsso.edspay.com/web/wx/newTask/taked.png) no-repeat;
					background-size:cover; 
				}
			}
			.process_box{
				width: 100%;
				padding-top: 3.226667rem;
				position: relative;
				span{
					position: absolute;
					top: 3.1rem;
					left: 7.546667rem;
					font-size: 0.346667rem;
					color: #f32263;
				}
				.process_line{
					width: 6.373333rem;
					height: 0.24rem;
					border-radius: 0.12rem;
					background: #efeeed;
					position: relative;
					margin-left: 0.613333rem;
					margin-bottom: 0.226667rem;
					overflow: hidden;
					.process_inner{
						position: absolute;
						height: 0.24rem;
						width: 0%;
						border-radius: 0.12rem;
						background-color: transparent;
						background-image: linear-gradient(90deg, #e3505c 0%, #ed7a86 100%);
						background-image: -webkit-linear-gradient(90deg, #e3505c 0%, #ed7a86 100%);
						background-image: -moz-linear-gradient(90deg, #e3505c 0%, #ed7a86 100%);
						background-image: -o-linear-gradient(90deg, #e3505c 0%, #ed7a86 100%);
						background-image: -ms-linear-gradient(90deg, #e3505c 0%, #ed7a86 100%);
					}
				}
				p{
					font-size: 0.32rem;
					color: #b1c3c5;
					padding-left: 0.613333rem;
				}

			}	
		}
		.layer{
			position: fixed;
			width: 100%;
			height: 100%;
			left: 0;
			top: 0;
			bottom: 0;
			right: 0;
			margin: auto;
			background: rgba(0,0,0,.6);
			z-index: 99;
		}
		.dialog{
			position: fixed;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			margin: auto;
            z-index: 100;
            text-align: center;
            .comfirm{
            	width: 70%;
        	    height: 1.333333rem;
        	    color: #fff;
        	    margin: 0 auto;
            }
            .close_btn{
            	width: 1.5rem;
        	    height: 1.333333rem;
        	    position: relative;
        	    left: 6rem;
            }
        }
        .dialog.award_dialog{
        	width: 7.733333rem;
        	height: 9.066667rem;
        	background:url(https://aliyunsso.edspay.com/web/wx/newTask/award_dialog_bg.png) no-repeat;
        	background-size: cover;
        	text-align: center;
        	padding-top: 1.92rem;
        	.img1{
        		width: 2.933333rem;
        		height: 3.306667rem;
        		position: relative;
        		margin-bottom: 0.333333rem;
        	}
        	.img2{
        		width: 5.44rem;
        		height: 0.773333rem;
        		position: relative;
        		margin-bottom: 0.426667rem;
        	}
        }
        .dialog.ruleBox{
			width: 7.733333rem;
			height: 10.666667rem;
			background:#fff;
			background: url(https://aliyunsso.edspay.com/web/wx/newTask/rule_dialog.png?v1.1) no-repeat;
			background-size: cover;
			a{
				display: inline-block;
				width: 3rem;
				height: 0.666667rem;
				position: relative;
				top: 7.1rem;
			    left: 2.1rem;
			}
			p{
				font-size: 0.266667rem;
				color: #fea9af;
				position: relative;
			    top: 7.1rem;
			    text-align: left;
			    padding-left: 1.28rem;
			}
        }
	}
</style>