<!-- 分享出去的注册页 -->
<template>
	<div id="inviteRegister">
         <div class="down" ref="backgroundImg" v-if="info.bottomPic">
		    <invite-register 
			id="box"
			:toLink="jumpUrl"
			:toMark="markUrl"
			:channel="channel"
			:inviterId="inviterId" 
			:btnColor="info.registerCodeColor"
			:channelData="cnannelData"
			:isCnzz="isCnzz"
			@isoverflow="isflow=$event" 
			@getRegisteDiv="getRegisteDiv"
			@isShowBox="isShowBox"></invite-register>

            <!-- 平台数据统计 -->
			<div class="number_box">
                 <div class="muber_left" v-html="$options.filters.changeBillion(userRegister)"></div>
                 <div class="muber_right" v-html="$options.filters.changeBillion(tradeAmount)"></div>
			</div>
        </div>
		<div class="jump-registe" @click="goRegiste" ref="jumpRegiste1" v-if="info.customHostHigh1"></div>
		<div class="jump-registe" @click="goRegiste" ref="jumpRegiste2" v-if="info.customHostHigh2"></div>
		<div class="jump-registe" @click="goRegiste" ref="jumpRegiste3" v-if="info.customHostHigh3"></div>
		<!-- 规则按钮 -->
		<div class="rule" @click="isOpen=1" ref="rule" v-if="info.activityRulePic"></div>
		<!-- 遮罩 -->
		<div class="rule-mask" v-if = "isOpen" @click="isOpen=0" ref="ruleMask"></div>
		<!-- 规则弹框 -->
		<div class="rule-div" v-if = "isOpen == 1" @click="isOpen=0" ref="ruleOpen"></div>
		<!-- 返回顶部按钮 -->
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
	import getData from '../../../common/router/getData';		//引入发送请求
	import verify from '../../../common/wx/verification';	//引入表单验证
	import inviteRegister from '../activity/wxActivityRegister';	//引入表单验证
	export default{
		mixins:[getData,verify],
		data(){ 
			return{
				timer:null,
                isflow:false,
                channel: '',
				isOpen: 0, // 1、 规则弹框  2、已注册用户弹框
				info: {},
				channelType: 2,
				ifSamePic: '', // 移动端pc通用图片（为了通过审核）
				jumpUrl: '',
				markUrl: '',
				registeRef: {}, // 注册框dom
				inviterId:'',
				cnannelData:{},//返利网数据
				userRegister:'',  // 注册人数
				tradeAmount:'',   // 交易金额
				isCnzz: '',   // 是否添加友盟统计
			}
		},
		components:{
			inviteRegister,
		},
		props: {
			wxInfo: Object
		},
        methods : {
			getInfo () {
				this.notLogPost('/modules/channelManage/getChannel',(data) =>{
					console.log(data);
					if(data.resCode){
						if (data.resData.data.channel == null || data.resData.data.channel.status == 2 || data.resData.data.channel.status == 3) {
							this.$router.push('/404')
							return
						}
						this.info = data.resData.data.channel
						this.getDom ()
						this.checkUrl ()
						if(data.resData.data.channel.youmengId){
							this.isCnzz = data.resData.data.channel.youmengId;
							this.init(this.isCnzz);
						};
						this.userRegister = data.resData.data.userRegister;
						this.tradeAmount = data.resData.data.tradeAmount;
					}
				},{
					channelUrl:"toutiao",
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
			goApp(){
               window.location="http://android.myapp.com/myapp/detail.htm?apkName=com.rd.chux&ADTAG=mobile"
			},
			// 判断dom
			getDom () {
				this.$nextTick(function () {
					if (this.info.bottomPic) this.$refs.backgroundImg.style.backgroundImage = "url("+"'"+this.info.bottomPic+"'"+")"
					if (this.info.bottomPicHigh) this.$refs.backgroundImg.style.height = this.changeRem(parseInt(this.info.bottomPicHigh))
					if (this.info.registerFrameHigh) this.registeRef.style.top = this.changeRem(parseInt(this.info.registerFrameHigh) - 158)
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
			// 判断注册成功后的跳转地址
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
			}
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
			}
			if(this.$route.query.tc){
				this.cnannelData = this.$route.query;
			}
		},
		mounted(){
            // 数据统计
            let imgUrl = window.location.href
			let _channel
            _channel = imgUrl.substring(imgUrl.lastIndexOf("/") + 1);
			this.channel = _channel.split('?')[0]
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

	 .muber_left span,
	.muber_right span{
		font-size: .293333rem;
		letter-spacing: .16rem;
		color: #fff;
		
	}
/*	.muber_left span{
		margin-left: .08rem;
		margin-right: .08rem;
	}
	.muber_right span:nth-child(1){
		margin-left: .08rem;
		margin-right: .08rem;
	}
	.muber_right span:nth-child(2){
		margin-left: .1rem;
		margin-right: .05rem;
	} */
</style>
<style lang="scss" scoped>
	.top{}
    .down {
        background: url('https://aliyunsso.edspay.com/channel/cgsxapp.png') no-repeat;
		background-size: 100%;
		height: 46.6rem;
		position: relative;
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
	/* 数据展示 */
	.number_box{
		width: 100%;
		height: .653333rem;
		position: absolute;
		bottom: 4.46rem;
		left: 0;
		padding-left: .413333rem;
		line-height: .653333rem;
		font-size: .506667rem;
		color: #ff0000;	
		.muber_left{
			width: 4rem;
			float: left;
			letter-spacing: .145rem;
			text-indent: .02rem;
		}
		.muber_right{
			width: 5.55rem;
			float: right;
			letter-spacing: .15rem;
			text-indent: .066667rem;
		}
	}
</style>