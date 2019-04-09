<template>
	<div id="cutHelp">
		<div v-title>砍红包</div>
		<div class="unBegin" v-if="unBegin" @click="ActivityPrompt"></div>
		<div class="head_name">
			<p>你的好友{{mainData.userName}}送你20元现金！</p>
		</div>
		
		<!-- 注册框 -->
		<div class="register_box">
			<cut-register :channel="'lbkhb01'" :inviterId="inviterId" :gouLists="gouList" :thisTiShow="thisTiShow" :thisFaShow="thisFaShow" :thisSuShow="thisSuShow" :failMsg="failMsg"></cut-register>
		</div>

		<div class="cut_num">{{mainData.count}}人已帮砍成功</div>
		<!-- 帮砍进度 -->
		<div class="cut_progress clear">
			<div class="red_list" v-for=" (item,index) in 4 ">
				<div class="has_list" :style="{background:'url('+ redBg[mainData.count] +') center center / 1.733333rem 2.8rem'}" v-if="index == mainData.count">
				</div>
				<div class="has_list" v-else></div>
				 
			</div>
			<div class="progress_line clear">
				<div class="squre fl"></div>
				<div class="color_line fl">
					<div class="yellow_line" :style="{width:colorLine[mainData.count]}"></div>
				</div>
			</div>
		</div>
		
		<!-- 帮砍失败 -->
		<div class="layer_box" v-if="thisFaShow.failTime">
			<div class="dialog_commom fail_dialog">
				<!-- <p>{{failMsg.failMessage}}</p> -->
				<div class="common_btn" @click="toActive(1)"></div>
			</div>
		</div>
		<!-- 帮砍结束 -->
		<div class="layer_box" v-if="thisTiShow.activeTime">
			<div class="dialog_commom over_dialog">
				<div class="common_btn" @click="toActive(3)"></div>
			</div>
		</div>
		<!-- 帮砍成功 -->
		<div class="layer_box" v-if="thisSuShow.cutSucess">
			<div class="dialog_commom cut_sucess">
				<div class="common_btn top1" @click="toActive(2)"></div>
			</div>
		</div>
	</div>
</template>
<script>
	import wxToapp from '../../../../common/wx/wxToapp';
	import cutRegister from './cutRegister';
	import wxShare from '../../../../common/wx/wxShare';
	import { MessageBox } from 'mint-ui';
	export default {
		mixins:[wxToapp,wxShare],
		data(){
			return{
				gouList:[
					'https://aliyunsso.edspay.com/web/wx/activity/invitation/isGou.png',
					'https://aliyunsso.edspay.com/web/wx/activity/invitation/notGou.png'
				],
				inviterId:'',	//获取邀请人ID
				userMobile:'',//用户手机号
				thisTiShow:{
					activeTime:false,//结束弹框
				},
				thisFaShow:{ // 帮砍失败
					failTime:false,
				},
				helpCutRult:false,
				mainData:{},//基本信息
				colorLine:['0.7rem','2.72rem','4.75rem','6.9rem'],
				redBg:[
					'https://aliyunsso.edspay.com/web/wx/activity/cutRedEnvelope/share_light0.png',
					'https://aliyunsso.edspay.com/web/wx/activity/cutRedEnvelope/share_light1.png',
					'https://aliyunsso.edspay.com/web/wx/activity/cutRedEnvelope/share_light2.png',
					'https://aliyunsso.edspay.com/web/wx/activity/cutRedEnvelope/share_light3.png',
				],
				thisSuShow:{//帮砍成功
					cutSucess:false,
				},
				failMsg:{
					failMessage:''
				},
				shareObj: { //分享标题内容配置
					title: "送你20元现金（可提现），帮忙砍个红包吧！", //标题
					desc: "我在E都市钱包参加砍红包活动，需要你的支持。去帮忙>", //内容
					link: global.host + "cutRedEnvelope/cutHelp", //链接
					imgUrl: "https://aliyunsso.edspay.com/web/icon.png" //图片链接
				},
				userId:'',//
				unBegin:false,//活动未开始或已结束
				activityStatus:'',
			}
		},
		methods:{
			getData(){
				this.getNotlogData('/cutRed/initHelpMes',(data) => {
					if( data.resCode == 1 ){
						this.mainData = data.resData;
						if(data.resData.status == 0){
							this.thisTiShow.activeTime = true
						}
					}

				},{activityId:'cut_red_activity',ui:this.inviterId},1)
			},

			//弹框状态跳转
			toActive(num){
				if( num == 1 ){//失败
					this.thisFaShow.failTime = false;
				}else if( num == 2 ){//成功
					this.thisSuShow.cutSucess = false;
				}else if( num == 3 ){//帮砍结束
					this.thisTiShow.activeTime = false;
				}
				window.location="http://android.myapp.com/myapp/detail.htm?apkName=com.rd.chux&ADTAG=mobile"
				// this.$router.replace({path:'/cutRedEnvelope/index'});
			},
			// 活动时间
			_getActivityTime(){// 获取活动时间状态
				this.notLogPost('/activity/two/getActivityTime',data => {
					if(data.resCode){
						this.activityStatus = data.resData.active;
						if(data.resData.active != 1){
							this.unBegin = true
						}
						this.ActivityPrompt()
					}
				},{activityId:'cut_red_activity'})
			},
			
			ActivityPrompt(type) { //显示弹框方法 type = 3 不判断活动结束
			  if (this.activityStatus == 2) {
			    MessageBox.alert('亲，活动尚未开始哦!', '提示', {
			      confirmButtonClass: 'confirmButtonClass'
			    })
			  } else if (this.activityStatus == 3 && type != 3) {
			    MessageBox.alert('亲，活动已经结束啦!', '提示', {
			      confirmButtonClass: 'confirmButtonClass'
			    })
			  } else if (this.activityStatus == 4) {
			    MessageBox.alert('亲，活动已经失效啦!', '提示', {
			      confirmButtonClass: 'confirmButtonClass'
			    })
			  }
			},
		},
		components:{
			cutRegister
		},
		mounted(){
			if(this.$route.query.ui){
				this.inviterId = this.$route.query.ui;	//获取邀请人id;
				this.userId = this.$route.query.ui;
				this.appShare = '1';
				this.getWxShareData(this.shareObj); //分享调用
			}
			this.getData();

			// 数据统计
			const script = document.createElement('script')
			script.src = 'https://s13.cnzz.com/z_stat.php?id=1275471491&web_id=1275471491 '
			script.language = 'JavaScript'
			document.body.appendChild(script)
		},
		created(){
			this._getActivityTime('cut_red_activity')
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
		}
	}
</script>
<style lang="scss" scoped>
	#cutHelp{
		width: 100%;
		height: 27.066667rem;
		position: relative;
		background: url(https://aliyunsso.edspay.com/web/wx/activity/cutRedEnvelope/share_h5_again.png) no-repeat;
		background-size: 100% 100%;
		.unBegin{
			position: fixed;
			width: 100%;
			height: 100%;
			z-index: 999;
		}
		.head_name{
			width: 100%;
		    height: 10.03rem;
			padding-top: 4.5rem;
			p{
				width: 100%;
				height: 1rem;
				text-align: center;
				font-family: PingFang-SC-Regular;
				font-size: 0.373333rem;
				color: #670920;
			}
		}
		.cut_num{
			width: 100%;
			height: 0.87rem;
		    line-height: 0.89rem;
			font-family: PingFangSC-Semibold;
			font-size: 0.373333rem;
			color: #FFFFFF;
			text-align: center;
		}
		.cut_progress{
			width: 100%;
			height: 4.79rem;
		    margin-bottom: .61rem;
		    position: relative;
		    padding-left: 1.25rem;
		    .red_list{
		    	width: 1.733333rem;
	    	    height: 2.8rem;
	    	    position: relative;
	    	    float: left;
    	        margin-right: 0.32rem;
    	        .has_list{
    		    	width: 1.733333rem;
    	    	    height: 2.8rem;
    	    	    padding-top: 1.55rem;
    	    	    p{
    	    	    	font-size: 0.266667rem;
    	    	    	color: #E81C38;
    	    	    	text-align: center;
    	    	    	position: relative;
    	    	    	top: 4.05rem;
    	    	    }
    	        }
	    	    .get_btn{
	    	    	width: 1.4rem;
    	    	    height: 1rem;
    	    	    margin: 0 auto;
	    	        margin-bottom: 0.7rem;
	    	    }
		    }
		    .progress_line{
		    	width: 8.0rem;
		    	height: 1.04rem;
		    	position: absolute;
	    	    top: 2.28rem;
	    	    margin-left: -0.613333rem;
	    	    overflow: hidden;
	    	    .squre{
	    	    	width: 1.013333rem;
	    	    	height: 1.04rem;
	    	    	background:url(https://aliyunsso.edspay.com/web/wx/activity/cutRedEnvelope/progress_btn.png) no-repeat; 
	    	    	background-size: 1.013333rem 1.04rem;
	    	    	position: relative;
	    	    	z-index: 96;
	    	    }
	    	    .color_line{
	    	    	width: 6.96rem;
	    	    	height: 0.266667rem;
	    	    	background:url(https://aliyunsso.edspay.com/web/wx/activity/cutRedEnvelope/progress_line.png) no-repeat; 
	    	    	background-size: 6.96rem 0.266667rem;
	    	    	position: relative;
	    	    	padding-top: 0.04rem;
	    	    	margin-top: 0.386667rem;
	    	    	left: -0.15rem;
	    	    	overflow: hidden;
	    	    	border-radius: 0.133333rem;
	    	    	.yellow_line{
	    	    		width: 0.7rem;//2.72rem,4.75rem,6.9rem
	    	    		height: 0.186667rem;
	    	    		border-radius: 0.093333rem;
						background:url(https://aliyunsso.edspay.com/web/wx/activity/cutRedEnvelope/yellow_line.png); 
	    	    	}
	    	    }
		    }
		}
		.register_box{
			width: 100%;
			position: relative;
		}
		.layer_box{
			position: fixed;
			width: 100%;
			height: 100%;
			left: 0;
			top: 0;
			background: rgba(0,0,0,.6);
			z-index: 99;
		}
		.dialog_commom{
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			top: 0;
			margin: auto;
			text-align: center;
			z-index: 100;
		}
		.fail_dialog{
			width: 9.466667rem;
			height: 6.853333rem;
			background: url(https://aliyunsso.edspay.com/web/wx/activity/cutRedEnvelope/cut_dialog_fail.png?v1.2) no-repeat;
			background-size: 100% 100%;
		}
		.common_btn{
			width: 5.333333rem;
			height: 1.333333rem;
			margin:0 auto;
			position: relative;
			top: 5.7rem;
		}
		.over_dialog{
			width: 9.466667rem;
			height: 6.853333rem;
			background: url(https://aliyunsso.edspay.com/web/wx/activity/cutRedEnvelope/cut_dialog_over.png?v1.2) no-repeat;
			background-size: 100% 100%;
		}
		.cut_sucess{
			width: 9.466667rem;
			height: 8.4rem;
			background: url(https://aliyunsso.edspay.com/web/wx/activity/cutRedEnvelope/introdution.png?v1.3) no-repeat;
			background-size: 100% 100%;
			.common_btn.top1{
				top: 7.2rem;
			}
		}
	}
</style>