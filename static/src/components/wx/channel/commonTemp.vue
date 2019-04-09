<!-- 分享出去的注册页 -->
<template>
	<div id="inviteRegister">
		<div v-if="$route.params.id == 'wxfwhxsfl'" v-title>新手福利</div>
         <div class="down" ref="backgroundImg" v-if="info.bottomPic">
		    <invite-register  v-if="info.channelVersion == 0"
				id="box"
				:toLink="jumpUrl"
				:toMark="markUrl"
				:channel="channel"
				:inviterId="inviterId" 
				:btnColor="info.registerCodeColor"
				:channelData="cnannelData"
				:isCnzz="isCnzz"
				:isLoginPC="isLoginPC"
				@isoverflow="isflow=$event" 
				@getRegisteDiv="getRegisteDiv"
				@isShowBox="isShowBox"
			></invite-register>
			<channels-register v-else
				id="box"
				:info="info"
				:toLink="jumpUrl"
				:toMark="markUrl"
				:channel="channel"
				:inviterId="inviterId" 
				:btnColor="info.registerCodeColor"
				:channelData="cnannelData"
				:isCnzz="isCnzz"
				:registerCodeTimeColor="info.registerCodeTimeColor"
				:registerCodeConfirmColor="info.registerCodeConfirmColor"
				:isLoginPC="isLoginPC"
				@isoverflow="isflow=$event" 
				@getRegisteDiv="getRegisteDiv"
				@isShowBox="isShowBox"
			></channels-register>
        </div>
		<div class="jump-registe" @click="goRegiste" ref="jumpRegiste1" v-if="info.customHostHigh1"></div>
		<div class="jump-registe" @click="goRegiste" ref="jumpRegiste2" v-if="info.customHostHigh2"></div>
		<div class="jump-registe" @click="goRegiste" ref="jumpRegiste3" v-if="info.customHostHigh3"></div>
		<div class="rule" @click="isOpen=1" ref="rule" v-if="info.activityRulePic"></div>
		<div class="rule-mask" v-show = "isOpen" @click="isOpen=0" ref="ruleMask"></div>
		<div class="rule-div" v-if = "isOpen == 1" @click="isOpen=0" ref="ruleOpen"></div>
		<div class="buynow-btn" @click="goRegiste" ref="fixBtn" v-if="info.bottomButtonPic"></div>
		<!-- 已经注册弹框 -->
		<div class="logInBox" v-if="isOpen == 2">
			<div class="close_btn" @click="isOpen = 0"></div>
			<div class="go_login" @click="goApp"></div>
		</div>
	</div>
</template>

<script>
	import jiami from 'js-base64';	
    import wxShare from '../../../common/wx/wxShare';
	import getData from '../../../common/router/getData';		//引入发送请求
	import verify from '../../../common/wx/verification';	//引入表单验证
	import inviteRegister from '../activity/wxActivityRegister';	//渠道注册模板
	import channelsRegister from '../activity/wxChannelsRegister';	//新的渠道注册模板
	export default{
		mixins:[getData,verify,wxShare],
		data(){ 
			return{
				timer:null,
                isflow:false,
                channel: '',
				isOpen: 0,   // 1、 规则弹框  2、已注册用户弹框
				info: {},
				channelType: 2,
				ifSamePic: '', // 移动端pc通用图片（为了通过审核）
				jumpUrl: '',
				markUrl: '',
				registeRef: {}, // 注册框dom
				inviterId:'',
				cnannelData:{},//返利网数据
				buryId:0,
				shareObj: {}, //分享标题内容配置
				isCnzz: '',   // 是否添加友盟统计
			}
		},
		components:{
			inviteRegister,
			channelsRegister
		},
		props: {
			wxInfo: Object,
			isLoginPC: Boolean
		},
        methods : {
			//借呗的uv统计
			countUv(){
				let isUv = this.channel+"Uv";
				if(this.getNowFormatDate() === localStorage.getItem(isUv)){
					return;
				};
				this.$http.post( this.ajaxUrl.getUrl(6) +'/app/open/channelUser/uv', {mobileType:3,channelCode: this.$route.query.channelCode}, {emulateJSON: false})
				.then((res) => {	
					let date = this.getNowFormatDate();
					localStorage.setItem(isUv,date);
				}, (response) => {
					
				});
			},
			getInfo () {
				// channelCategory  0:赚吧  1：借吧
				this.notLogPost('/modules/channelManage/getChannel',(data) =>{
					if(data.resCode){
						if (data.resData.data.channel == null || data.resData.data.channel.status == 2 || data.resData.data.channel.status == 3) {
							this.$router.push('/404');
							return;
						}
						this.info = data.resData.data.channel;
						this.getDom ();
						this.checkUrl ();
						if(data.resData.data.channel.youmengId){
							this.isCnzz = data.resData.data.channel.youmengId;
							this.init(this.isCnzz);
						};
					};
					if(this.info.channelCategory == 1){
						this.countUv();
					}	
				},{
					channelUrl:this.$route.params.id,
					place: this.channelType
				})
			},
			// 加入友盟
            init(id) {
                const script = document.createElement('script')
                script.src = 'https://s13.cnzz.com/z_stat.php?id=' + id + '&web_id=' + id
                script.language = 'JavaScript'
                document.body.appendChild(script)
			},
			// 滚动到注册框
			goRegiste () {
                var element = document.getElementById("box");
                element.scrollIntoView({block: "start", behavior: "smooth"});
            },
			// px转换成带单位的rem
			changeRem (num) {
				let last = parseInt(num) / 75;
				return last+'rem'
			},
			// 获取注册框dom
			getRegisteDiv (val) {
				this.registeRef = val
			},
			isShowBox (toggle){  
				this.isOpen = toggle;
			},
			// 判断dom
			getDom () {
				this.$nextTick(function () {
					if (this.info.bottomPic) this.$refs.backgroundImg.style.backgroundImage = "url("+"'"+this.info.bottomPic+"'"+")"
					if (this.info.bottomPicHigh) this.$refs.backgroundImg.style.height = this.changeRem(parseInt(this.info.bottomPicHigh))
					if (this.info.registerFrameHigh) this.registeRef.style.top = this.changeRem(parseInt(this.info.registerFrameHigh) - 158)

					if(this.info.channelVersion == 1){
						 this.registeRef.style.top = this.changeRem(parseInt(this.info.registerFrameHigh));
					}	
					if (this.info.customHostHigh1) this.$refs.jumpRegiste1.style.top = this.changeRem(parseInt(this.info.customHostHigh1))
					if (this.info.hostHigh1) this.$refs.jumpRegiste1.style.height = this.changeRem(parseInt(this.info.hostHigh1))
					if (this.info.customHostHigh2) this.$refs.jumpRegiste2.style.top = this.changeRem(parseInt(this.info.customHostHigh2))
					if (this.info.hostHigh2) this.$refs.jumpRegiste2.style.height = this.changeRem(parseInt(this.info.hostHigh2))
					if (this.info.customHostHigh3) this.$refs.jumpRegiste3.style.top = this.changeRem(parseInt(this.info.customHostHigh3))
					if (this.info.hostHigh3) this.$refs.jumpRegiste3.style.height = this.changeRem(parseInt(this.info.hostHigh3))
					if (this.info.place ==2) {
						if (this.info.activityRulePic) this.$refs.rule.style.backgroundImage = "url("+"'"+this.info.activityRulePic+"'"+")"
						if (this.info.bottomButtonPic) this.$refs.fixBtn.style.backgroundImage = "url("+"'"+this.info.bottomButtonPic+"'"+")"
					} else if (this.info.place == 3 ){
						if (this.info.activityRulePic) {
							this.$refs.rule.style.backgroundImage = "url("+"'"+this.info.activityRulePic+"'"+")" ;
							this.$refs.rule.style.right =' calc( (100vw - 770px) / 2)'
						}
						if (this.info.bottomButtonPic) this.$refs.fixBtn.style.backgroundImage = "url()"
					}
				})
			},
			// 判断注册成功后的跳转地址 1.应用市场 2.首页 3.项目列表页 4.登录页
			checkUrl () {
				switch (this.info.registerRedirect) {
					case 1:
						this.markUrl = 'yes'
						break;
					case 2:
						this.jumpUrl = '/wxIndex'
						break;
					case 3:
						this.jumpUrl = '/wxInvest'
						break;
					case 4:
						this.jumpUrl = '/wxLogin'
						break;
				}
			},
			goApp(){
               window.location="http://android.myapp.com/myapp/detail.htm?apkName=com.rd.chux&ADTAG=mobile"
			},
			// 后台埋点
			// buryPoint (ip) {
			// 	this.$http.post('https://buriedpoint.edspay.com/accessRecord/insetAccessRecord', {
			// 		accessType: 2,
			// 		channel: this.$route.params.id,
			// 		ip:ip,
			// 	}).then(function (data) {
			// 		console.log(data)
			// 		this.buryId = data.data.resData.id
			// 	})
			// },
			// // 销毁埋点
			// destroyPoint() {
			// 	this.$http.post('https://buriedpoint.edspay.com/accessRecord/updateAccessRecord', {
			// 		id: this.buryId,
			// 	}).then(function (data) {})
			// }
		},
		created () {
			this.getRegisteDiv()
			// 判断是否是二合一
			if (this.wxInfo) {
				this.info = this.wxInfo
				this.markUrl = 'yes'
				this.getDom ()
			} else {
				this.getInfo ()
				// this.getUserIP((ip)=>{
				// 	this.buryPoint(ip)
				// });
			}
			if(this.$route.query.tc){
				this.cnannelData = this.$route.query;
			};
			if(this.$route.params.id == "wxfwhxsfl"){
				this.shareObj = {      //分享标题内容配置
					title: "我刚刚在E都市钱包赚了一笔钱，送给你，赶紧领走1118元！", //标题
				    desc: "这种好事，我只分享给真爱哦~", // 内容
					link: global.host + "channels/" + this.$route.params.id, //链接
					imgUrl: "https://aliyunsso.edspay.com/web/shareLogo.png" //图片链接
				};
				this.getWxShareData(this.shareObj); //分享调用
			}
		},
		mounted(){
            // 数据统计
            let imgUrl = window.location.href
			let _channel
            _channel = imgUrl.substring(imgUrl.lastIndexOf("/") + 1);
			this.channel = _channel.split('?')[0]
		},
		destroyed () {
			// if (this.info.place == 2) {
			// 	this.destroyPoint()
			// }
		},
        watch: {
			'$route'() {
			if (window._czc) {
				let location = window.location
				let contentUrl = location.pathname + location.hash
				let refererUrl = '/'
				window._czc.push(['_trackPageview', contentUrl, refererUrl])
			}
			},
			'isflow'(val) {
				if (val) {
					document.body.setAttribute("class","bodychannel");
				} else {
					document.body.removeAttribute("class","bodychannel");
				}
			},
			'isOpen' (val) {
				if (val) {
					 this.$nextTick(function () {
						this.$refs.ruleOpen.style.backgroundImage ="url("+"'"+this.info.activityRuleFramePic+"'"+")"
						//  如果是二合一的链接 最高不超过90vh 位置居中；如果是移动端的链接
						if (this.wxInfo) {
							this.$refs.ruleOpen.style.maxHeight ="90vh"
							this.$refs.ruleOpen.style.backgroundSize ="contain"
							this.$refs.ruleOpen.style.backgroundPosition ="center center"
						} else {
							this.$refs.ruleOpen.style.height = this.changeRem(parseInt(this.info.activityRuleFramePicHigh))
						}
					 })
				}
			}
		}
	}
</script>
<style>
	body.bodychannel {
			overflow: hidden;
	}
</style>
<style lang="scss" scoped>
	.top{}
    .down {
        background: url('https://aliyunsso.edspay.com/channel/cgsxapp.png') no-repeat;
		background-size: 100%;
		height: 46.6rem;
    }
	.from{
        position: absolute !important;
		top:11.606667rem;
	}
	.footer{
        background: url('https://aliyunsso.edspay.com/web/channel/footer.png') no-repeat;
        background-size: 100%;
        height: 3.173333rem;
    }
	.jump-registe {
        position: absolute;
        width: 100%;
        height: 1.033333rem;
    }
	.buynow-btn {
		background-size: 100%;
		width:100%;
		height:1.333333rem;
		position: fixed;
		bottom: 0rem;
	}
		/* 已经注册弹框 */
	.logInBox{  
		 width: 7.96rem;
		 height: 7.053333rem;
		 background: url('https://aliyunsso.edspay.com/web/wx/activity/channel/logInBox.png') no-repeat;
		background-size: 100%;
		position: fixed;
		z-index: 10;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
		.close_btn{
			width: .8rem;
			height: .8rem;
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			margin: auto;
		}
		.go_login{
			width: 6.986667rem;
			height: 1.093333rem;
			position: absolute;
			left: 0;right: 0;
			top: 3.866667rem;
			margin: auto;
		}
	} 
	/*规则*/
	 .rule {
		background: url('https://aliyunsso.edspay.com/web/channel/flwfix.png') no-repeat;
        background-size: 100%;
		width: .853333rem;
		height: 1.973333rem;
		position: fixed;
		right: 0;
		top:4rem;
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
		background: url('https://aliyunsso.edspay.com/web/channel/flwRule.png') no-repeat;
        background-size: 100%;
		width: 8.266667rem;
		height: 13.68rem;
		position: fixed;
		z-index: 10;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
	}
</style>