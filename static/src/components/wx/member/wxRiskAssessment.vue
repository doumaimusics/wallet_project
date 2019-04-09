<template>
	<div class="risk">
		<div v-title>风险测评</div>
		<div class="assessment_wrapper" :style="{height:screenHeight+'px'}">
			<div class="assessment_title" v-if="start">
				<div class="assessment_main">
					<div class="nothing"></div>
					<div class="risk_main">
						根据《网络借贷信息中介机构业务活动管理暂行办法》第四章第二十六条规定,从事网络借贷的机构须对出借人年龄、财务状况、出借经验、风险偏好、风险承受能力等进行尽职评估，根据评估结果实行分级管理。为了您的出借安全，请完成以下出借人风险承受能力问卷测评！
					</div>
					<div class="assessment_btn" @click="stastAssess"></div>
				</div>
			</div>
			<div v-else-if="end" :style="{height:screenHeight+'px'}"  class="has_result">
				<div class="result_wrapper">
					<div class="result">
						<img v-if="result.type == 1" :src="assessmentType[0]" alt="">
						<img v-if="result.type == 2" :src="assessmentType[1]" alt="">
						<img v-if="result.type == 3" :src="assessmentType[2]" alt="">
					</div>
					<div class="describe">
						<div class="text">
							{{result.desc}}
						</div>
						<div class="tips">
							{{result.tips}}
						</div>
					</div>
					<div class="control" v-if="result.limit">
						<p>{{result.limit}}</p>
					</div>
					<div class="btns">
						<div class="to_invest" @click="toInvest"><img src="https://aliyunsso.edspay.com/web/wx/account/riskAssessment/start_invest2.png?v1.1" alt=""></div>
						<div class="re_assess" @click="reAssess"><img src="https://aliyunsso.edspay.com/web/wx/account/riskAssessment/restart.png" alt=""></div>
					</div>
				</div>
			</div>
			
			<div v-if="begin" class="question_wrapper">
				<div class="assessment_contain">
					<ul>
						<li v-for="(item,index) in questionss" v-if="item.showItm">
							<div class="question_title">Q{{index+1}}：{{item.title}}</div>
							<div class="question_checkbox">
								<div class="box_list clear" v-for="items in checkList[index]" @click="checkChange(items,index)">
									<div class="list_check"><span>{{items.value}}、</span><p>{{items.test}}</p></div>
									<img class="isCheck" :src="isCheck[items.checkImg]" alt="">
								</div>
							</div>
							<div class="progress">
								<div class="progress_line">
									<div class="line_color" :style="{ width: lineWidth+'rem' }"></div>
								</div>
								<div class="num_show"><span class="span2" v-if="index > 0"  @click="pre(index)">上一题</span><span class="span1">{{upCheckShow}}/{{allNum}}</span></div>
							</div>
						</li>
					</ul>
				</div>
				
			</div>
		</div>
	</div>
</template>
<script>
	import wxToapp from '../../../common/wx/wxToapp';
	import { Popup } from 'mint-ui';
	import { MessageBox } from 'mint-ui';
	export default {
		mixins:[wxToapp],
		data() {
			return {
				start: true,
				begin:false,
				end:false,
				result:{},//接口返回答案
				lineWidth:0,
				isCheck: [
					'https://aliyunsso.edspay.com/web/wx/account/riskAssessment/circle.png',
					'https://aliyunsso.edspay.com/web/wx/account/riskAssessment/check.png'
				],
				assessmentType:[
					'https://aliyunsso.edspay.com/web/wx/account/riskAssessment/baoshou.png',
					'https://aliyunsso.edspay.com/web/wx/account/riskAssessment/wenjian.png',
					'https://aliyunsso.edspay.com/web/wx/account/riskAssessment/jijin.png',
				],
				ansower: [],    //选择的选项
				hasCheck: {},   //被点中的题目
				upCheckShow:1, //已选题目数量
				screenHeight:0,        //屏幕高度
				allNum:0,  //总数量 
				showItem:[],//每道题的显示隐藏
				showOptions:[],//选中和未选中
				questionss:[],//所有题目
				checkList:[],//选项
				averageWidth:0,//平均宽度
				ansowerStr:'',//答案传值
				moreClick:false,//阻止多次点击
				arr:{},
				flag:true,
			}
		},
		methods: {
			stastAssess() {  //答题与主页标题的展示隐藏
				if( !this.userId && !this.getCookie('userToken') ){
					MessageBox.confirm('您尚未登录，快去登录！').then(action => {
					  this.toApp('LG',{path:'/wxLogin',query:{thisUrl:this.$route.fullPath}})
					},action =>{});
					return
				}else if( this.userId || this.getCookie('userToken') ) {
					this.start = false;
					this.begin = true;
					document.body.scrollTop = 0;
					this.getData();
				}
			},
			toInvest() { //去出借
				this.toApp('WIP', {
					path: '/wxInvest',
					query: {
						thisUrl: this.$route.fullPath
					}
				})
			},
			reAssess() { //重新测评
				this.end = false;
				this.begin = true;
				this.getData();
				this.upCheckShow = 1;
				this.ansower=[];
				this.ansowerStr = '';
				document.body.scrollTop = 0;
			},
			startAssess() { //是否已测评
				this.getAppData('/app/risk/riskResult', (res) => { // 是否已测评
					if(res.resCode){
						if ( res.resData.type == 0 ) {
							this.start = true;
							this.end = false;
							this.begin = false;
						}else{
							this.start = false;
							this.end = true;
							this.begin = false;
							this.result = res.resData
						}
					}
				}, (this.osType ? { oauthToken: this.token } : {}), 1);
			},
			getData(){ //题目
				this.getAppData('/app/risk/titleList',(data) =>{
					if(data.resCode){
						var that = this
						var listLength = data.resData.titleList;
						this.questionss = data.resData.titleList;
						for(var x=0; x<data.resData.titleList.length; x++){
							if(x==0){
								data.resData.titleList[x].showItm = true
							}else{
								data.resData.titleList[x].showItm = false
							}
						}
						for(var i=0; i<listLength.length; i++){
							this.checkList[i] = listLength[i].list;
						}
						for(var j=0; j<this.questionss[0].list.length;j++){
							this.questionss[0].list[j].checkImg = 0
						}
						//进度条
						this.allNum = data.resData.titleList.length;
						console.log(this.allNum);
						this.averageWidth = 8.133333/this.allNum
						this.lineWidth = (8.133333/this.allNum)*1
						
						
					}
				},(this.osType ? {oauthToken:this.token}:{}),1);
			},
			checkChange(item,index) { //选择选项
				
				if(this.upCheckShow < this.allNum){
					this.moreClick = true;
					for(var i=0; i < this.questionss[index+1].list.length; i++){
						this.questionss[index+1].list[i].checkImg = 0
					}
					if( this.hasCheck != item ) {
						this.hasCheck.checkImg = 0;
						item.checkImg = 1;
					}
					else{
						if(this.hasCheck.checkImg){
							this.hasCheck.checkImg = 0;
							item.checkImg = 1;
						}else{
							item.checkImg = 1;
						}
					}
					this.hasCheck = item;
					this.ansower.push(item.value);
					var that = this;
					this.questionss[index].showItm =false;
					this.questionss[index+1].showItm =true;
					this.upCheckShow++;
					this.lineWidth =this.upCheckShow*this.averageWidth;
					console.log(this.upCheckShow+'eee');
					console.log('width--'+this.width)
					console.log(this.upCheckShow + '--');
					console.log(item.value +'...');
					console.log(this.ansower);
				}else if(this.upCheckShow == this.allNum){
					if( this.hasCheck != item ) {
						this.hasCheck.checkImg = 0;
						item.checkImg = 1;
					}
					else{
						if(this.hasCheck.checkImg){
							this.hasCheck.checkImg = 0;
							item.checkImg = 1;
						}else{
							item.checkImg = 1;
						}
					}
					this.hasCheck = item;
					this.ansower.push(item.value);
					console.log(this.ansower);
					var that = this;
					this.questionss[index].showItm =false;
					this.begin = false;
					this.end = true;
					this.resultStr();
					console.log(this.ansowerStr+'+最终答案+')
					//传给接口值
					if(this.osType) this.arr.oauthToken = this.token;
					this.arr.str = this.ansowerStr

					console.log(this.arr);
					this.notLogPost('/app/risk/calculateRiskResult',(reg) =>{
						if(reg.resCode){
							this.result = reg.resData;
							this.ansower=[];
							this.ansowerStr = '';
						}else{
							this.ansower=[];
							this.ansowerStr = '';
						}
					},this.arr,1)
				}
				this.moreClick = false;
			},
			resultStr() { //结果遍历
				this.ansowerStr = '';
				for(var i = 0;i<this.ansower.length;i++){
					var lastOne = this.ansower.length-1;
					if( i == lastOne){
						this.ansowerStr = this.ansowerStr + this.ansower[i]
					}else{
						this.ansowerStr = this.ansowerStr + this.ansower[i] + ','
					}
				}
			},
			pre(index) { //上一题
				for(var i=0; i<this.questionss[index-1].list.length; i++) {
					this.questionss[index-1].list[i].checkImg = 0;
					console.log(this.questionss[index-1].list[i]);
					var ind = null;
					if(this.ansower[index-1] == "A") ind = 0;
					else if(this.ansower[index-1] == "B") ind = 1;
					else if(this.ansower[index-1] == "C") ind = 2;
					else if(this.ansower[index-1] == "D") ind = 3;
					else if(this.ansower[index-1] == "E") ind = 4;
					console.log(ind);
					this.questionss[index-1].list[ind].checkImg = 1;
				}
				this.questionss[index].showItm =false;
				this.questionss[index-1].showItm =true;
				this.ansower.pop();
				this.upCheckShow--;
				this.lineWidth =this.upCheckShow*.8;
			},
			
		},
		created() {
			this.screenHeight = $(window).height();
			this.startAssess();
		}
	}
</script>
<style lang="scss" scoped>
	.risk{
		width: 100%;
		.assessment_wrapper{
			width: 100%;
			.assessment_title{
				width: 100%;
				height: 100%;
				background: #1a32b6;
				position: relative;
				.assessment_main{
					height: 16.08rem;
					background: url(https://aliyunsso.edspay.com/web/wx/account/riskAssessment/first_page.png) no-repeat;
					background-size: 100%;
					font-size: 0.373333rem;
					position: absolute;
					z-index: 9;
    				width: 100%;
					.nothing{
						height: 7.426667rem;
						width: 100%;
						clear: both;
					}
					.risk_main{
						width: 7.36rem;
						height: 4.7rem;
						margin: 0 auto;
						font-family: PingFangSC-Regular;
						font-size: 0.346667rem;
						color: #FFFFFF;
					    line-height: .68rem;
					    text-align: justify;
					    margin-bottom: 1.466667rem;
					}
					h3{
						text-align: center;
					}
					.assessment_btn{
						width: 8.386667rem;
						height: 1.253333rem;
						line-height: 1.253333rem;
						margin: 0 auto;
						background: url(https://aliyunsso.edspay.com/web/wx/account/riskAssessment/start_test.png) no-repeat;
						background-size: 100%;
					}
				}
			}
			.has_result{
				width: 100%;
				height: 100%;
				background: #1a32b6;
				position: relative;
				.result_wrapper{
					height: 16.08rem;
					background: url(https://aliyunsso.edspay.com/web/wx/account/riskAssessment/last_page.png) no-repeat;
					background-size: 100%;
					position: absolute;
					z-index: 9;
    				width: 100%;
					.result{
						height: 4.866667rem;
						img{
							width: 4.76rem;
							height: 1.6rem;
							position: relative;
						    top: 1.866667rem;
						    left: 1.026667rem;
						}
					}
					.describe{
						width: 8.4rem;
						height: 5.56rem;
						margin: 0 auto;
						font-family: PingFangSC-Regular;
						font-size: 0.346667rem;
						color: #FFFFFF;
						padding: 0.773333rem 0.506667rem 0 0.506667rem;
						text-align: justify; 
						line-height: .6rem;
						margin-bottom: 0.813333rem;
						.text{
							height: auto;
							margin-bottom: .3rem;
						}
						.tips{
							height: auto;
						}
					}
					.btns{
						padding-bottom: 1rem;
						background: #1a32b6;
						.to_invest,.re_assess{
							width: 8.346667rem;
							height: 1.253333rem;
							margin: 0 auto;
							img{
								width: 8.346667rem;
								height: 1.253333rem;
							}
						}
						.to_invest{
							margin-bottom: 0.573333rem;
						}
					}
				}
			}
			.question_wrapper{
				width: 100%;
				height: 100%;
				background: #ffffff;
				.assessment_contain{
					background: #fff;
					overflow: hidden;
					position: relative;
					ul{
						height: auto;
						z-index: 99;
						font-size: 0.346667rem;
						li{
							height: auto;
						    background: #fff;
							.isCheck{
								height:0.4rem;
								width:0.4rem;
								margin-right:0.133333rem; 
							}
							.question_title{
								width: 100%;
								padding: 0.613333rem 0.933333rem;
								font-family: PingFangSC-Medium;
								font-size: 0.453333rem;
								color: #333333;
								font-weight: 600;
								border-bottom: 1px solid #e5e5e5;
							}
							.question_checkbox{
								margin-left: 0.933333rem;
								margin-right: 0.933333rem;
								margin-bottom: 1.2rem;
								.box_list{
									border-bottom: 1px solid #e5e5e5;
									// height: 1.92rem;
									font-family: PingFangSC-Regular;
									font-size: 0.346667rem;
									color: #333333;
									position: relative;
								    -webkit-tap-highlight-color: #e5e5e5 !important;
									.list_check{
										width: 7.053333rem;
										float: left;
										// height: .7rem;
										margin: auto 0;  
										padding: 0.506667rem 0;
							            // position: absolute;  
							            // top: 0; left: 0; bottom: 0; right: 0; 
										span{
											display: inline-block;
											float: left;
											width: 0.626667rem;
										}
										p{
											display: inline-block;
											width: 6.293333rem;
										}
									}
									img{
										float: right;
										margin-top: 0.346667rem;
										width: 0.693333rem;
										height: 0.693333rem;
									}
								}
							}
							.progress{
								.progress_line{
									width: 8.133333rem;
									height: 0.266667rem;
									border-radius: 0.133333rem;
									background: #eaeaea;
									margin: 0 auto;
									margin-bottom: 0.493333rem;
									.line_color{
										height: 0.266667rem;
										width: 0;
										border-radius: 0.133333rem;
										background: #ff5b4c;
									}
								}
								.num_show{
									padding: 0 0.933333rem;
									font-family: PingFangSC-Regular;
									.span1{
										float: right;
										font-size: 0.4rem;
										color: #333333;
									}
									.span2{
										font-size: 0.4rem;
										color: #FF5B4C;
									}
								}
							}
						}
					}
				}
				
			}
			.control{
				width: 7.866667rem;
				height: auto;
				margin: 0 auto;
				padding: 0rem 0 0.653333rem 0;
				p{
					font-size: 0.4rem;
					color: #FFFFFF;
					font-weight: 600;
					text-align: justify;
					line-height: 22px;
				}
			}
		}
	}
</style>