<template>
	<div id="risk">
		<div class="wrapper">
			<div class="risk_head">
				<a href="">首页</a> > <a href="">我的账户</a> > <a href="">风险测评</a>
			</div>
			<div class="risk_main">
				<div class="questions" v-if="isRisk">
					<div class="risk_title">
						<h3>出借人风险承受能力调查问卷</h3>
						<p>根据《网络借贷信息中介机构业务活动管理暂行办法》第四章第二十六条规定,从事网络借贷的机构须对出借人年龄、财务状况、出借经验、风险偏好、风险承受能力等进行尽职评估，根据评估结果实行分级管理。为了您的出借安全，请完成以下出借人风险承受能力问卷测评！</p>
					</div>
					<div class="question_list" v-for="(item,index) in questionsList">
						<div class="check_title" :class="{miss:ansowers[index].styleErr}">{{index+1}}.{{item.title}}</div>
						<div class="list clear">
							<div v-if="index != 3 && index != 5">
								<div class="check_list" v-for="(items,ind) in item.list" @click="checkChange(item.list,ind,index)">
									<img class="check_img" :src="isCheck[items.checkImg]" alt="">
									<div class="checkBox">{{items.test}}</div>
								</div>
							</div>
							<div v-else>
								<div class="check_list check_list2" v-for="(items,ind) in item.list" @click="checkChange(item.list,ind,index)">
									<img class="check_img" :src="isCheck[items.checkImg]" alt="">
									<div class="checkBox">{{items.test}}</div>
								</div>
							</div>
						</div>
					</div>
					<div class="confirmBtn">
						<div v-if="riskTest" class="btn active" @click="confrim">完成测评</div>
						<div v-else class="btn">完成测评</div>
					</div>
				</div>
				<!-- <div v-if="!isRisk && !noRisk" class="nothing">数据加载中...</div> -->
				<div class="result" v-if="noRisk">
					<div class="result_info">
						<h3>您的风险测评结果为:</h3>
						<h2 v-if="resultIfo.type == 1">保守型</h2>
						<h2 v-if="resultIfo.type == 2">稳健型</h2>
						<h2 v-if="resultIfo.type == 3">激进型</h2>
						<p class="p3">{{resultIfo.limit}}</p>
						<p class="p1">{{resultIfo.desc}}</p>
						<p class="p2">{{resultIfo.tips}}</p>
						
					</div>
					<div class="result_btn clear">
						<div class="reTest" @click="reTest">重新测评</div>
						<div class="invest" @click="invest">立即出借</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
 import getUrl from '../../../../common/router/getUrl'   // 获取登录信息验证
  export default {
  	mixins:[getUrl],
	data(){
      return {
         isCheck: [  //勾选按钮
         	'https://aliyunsso.edspay.com/web/activity/riskAssessment/unCheck.png',
         	'https://aliyunsso.edspay.com/web/activity/riskAssessment/isCheck.png'
         ],
         isRisk:true,
         noRisk:false,
         resultIfo:{}, //结果
         questionsList:[], //题目
         hasCheck: {},   //被点中的题目
         riskTest:false, //提交按钮
         checkAns:'',  //答案组
         flag:false, //重复提交
         noCheck:[],//没被选中的选项
         ansowers:[
         	{
         		key:0,
         		val:'',
         		styleErr:false
         	},
         	{
         		key:1,
         		val:'',
         		styleErr:false
         	},
         	{
         		key:2,
         		val:'',
         		styleErr:false
         	},
         	{
         		key:3,
         		val:'',
         		styleErr:false
         	},
         	{
         		key:4,
         		val:'',
         		styleErr:false
         	},
         	{
         		key:5,
         		val:'',
         		styleErr:false
         	},
         	{
         		key:6,
         		val:'',
         		styleErr:false
         	},
         	{
         		key:7,
         		val:'',
         		styleErr:false
         	}
         ]
      }
    },
    methods: {
    	getIsRiskStatus() {   //评测结果
    		global.http.post(this, "/app/risk/riskResult", {}, data => {
    			if(data.body.resCode == 1){
    				if ( data.body.resData.type == 0 ) {
    					this.isRisk = true;
    					this.noRisk = false;
    				}else{
    					this.isRisk = false;
    					this.noRisk = true;
    					this.resultIfo = data.body.resData
    				}
    			}
            })
    	},
    	getQuestions() {  //获取题目
			global.http._post(this, "/app/risk/titleList", {}, res => {
				if(res.body.resCode == 1){
					this.questionsList = res.body.resData.titleList;
					for(var i=0; i<this.questionsList.length; i++){
						for(var j=0; j<this.questionsList[i].list.length;j++){
							this.questionsList[i].list[j].checkImg = 0
						}
					}

					for (var i = 0; i < this.ansowers.length; i++) { //红色字显示
						this.ansowers[i].styleErr = false;
						this.ansowers[i].val = '';
					}
				}
	        })
    	},

    	checkChange(item,ind,index) { //选中答案
    		for(let i=0;i<this.questionsList[index].list.length;i++){
    			this.$set(this.questionsList[index].list[i],'checkImg', 0);
    		}
    		this.$set(item,ind,{checkImg:1,test:item[ind].test,value:item[ind].value})
    		this.riskTest = true;
    		this.flag = true;
    		this.ansowers[index].val = item[ind].value;

    		console.log(this.ansowers[index].val)
    	},
    	confrim(){//提交选项
    		if(this.flag){
    			this.flag = false;
				this.checkAns = '';
				for(var i=0; i<this.ansowers.length; i++){  //答案遍历
					var lastOne = this.ansowers.length-1;
					if( i == lastOne){
						this.checkAns = this.checkAns + this.ansowers[i].val
					}else{
						this.checkAns = this.checkAns + this.ansowers[i].val + ','
					}
				}

				if(this.checkAns.length == 15) { //满足条件请求接口
					global.http.post(this, "/app/risk/calculateRiskResult", {str:this.checkAns}, res => {
						if(res.body.resCode == 1){
							this.resultIfo = res.body.resData;
							this.isRisk = false;
							this.noRisk = true;
							this.flag = true;
						}else{
							this.flag = true;
						}
			        })
				} else {
					this.flag = true;
					this.noCheck = [];
					for(var i=0; i<this.ansowers.length; i++) {  //不满足条件报红且滚动条滚动到对应位置
						if(this.ansowers[i].val == ''){
							this.ansowers[i].styleErr = true;
							console.log(this.ansowers[i].key+'====noValue')
							this.noCheck.push(this.ansowers[i].key);
						}else{
							this.ansowers[i].styleErr = false
						}
					}
					console.log(this.noCheck);

					var that = this;
					var index = that.noCheck[0];
					var _height = $(".question_list").eq(index).offset().top;
					document.body.scrollTop = _height;
					
				}
    		}
    	},
    	reTest(){ //重新测评
    		this.isRisk = true;
    		this.noRisk = false,
    		this.riskTest = false;
    		for (var i = 0; i < this.ansowers.length; i++) {
				this.ansowers[i].styleErr = false;
				this.ansowers[i].val = '';
			}
    		this.getQuestions()
    	},
    	invest() { //去出借
    		this.$router.push('/invest')
    	}

    },
    mounted() {
        this.inspectCookin(2)
    },
    created(){
    	this.getIsRiskStatus();
    	this.getQuestions()
    }
  }  
</script>
<style lang="scss" scoped>
	#risk{
		width: 100%;
		height: 100%;
		background: #f5f5f5;
		font-family: PingFangSC-Regular;
		padding-bottom: 80px;
		.wrapper{
			width: 1200px;
			height: auto;
			margin: 0 auto;
			.risk_head{
				height: 60px;
				width: 100%;
				font-size: 14px;
				color: #999999;
				line-height: 60px;
				a{
					color: #999999;
				}
			}
			.risk_main{
				width: 100%;
				height: auto;
				min-height: 279px;
				background: #ffffff;
				// margin-bottom: 80px;
				.questions{
					width: 100%;
					height: auto;
					.risk_title{
						width: 1046px;
						height: 168px;
						border-bottom: 1px dashed #e7e7e7;
						margin: 0 auto;
						h3{
							font-size: 22px;
							color: #333333;
							text-align: center;
							padding-top: 55px;
							padding-bottom: 15px;
						}
						p{
							font-size: 12px;
							color: #999999;
							width: 955px;
							margin: 0 auto;
							line-height: 28px;
						}
					}
					.question_list{
						width: 738px;
						height: auto;
						margin: 0 auto;
						padding-top: 42px;
						font-size: 14px;
						color: #333333;
						.list{
							width: 100%;
							margin-bottom: 30px;
						}
						.check_title{
							margin-bottom: 28px;
						}
						.check_title.miss{
							color: #FF3E41;
						}
						.check_list{
							width: 50%;
							float: left;
							margin-bottom: 25px;
							cursor: pointer;
							.check_img{
								width: 16px;
								height: 16px;
								float: left;
								margin-right:15px; 
							}
						}
						.check_list2{
							width: 100%;
						}
					}
				}
				.result_info{
					height: 352px;
					width: 1096px;
					margin: 0 auto;
					border-bottom: 1px dashed #e7e7e7;
					margin-bottom: 71px;
					text-align: center;
					h3{
						font-size: 22px;
						color: #333333;
						padding-top: 120px;
						margin-bottom: 26px;
					}
					h2{
						font-size: 26px;
						color: #409AF8;
						margin-bottom: 18px;
						font-weight: 600;
					}
					.p1{
						font-size: 14px;
						color: #333333;
						margin-bottom: 23px;
					}
					.p2{
						font-size: 14px;
						color: #999999;
						margin-bottom: 10px;
					}
					.p3{
						font-size: 14px;
						color: #F5343B;
						margin-bottom: 29px;
					}
				}
				.result_btn{
					height: 50px;
					padding-bottom: 114px;
					width: 360px;
					margin: 0 auto;
					.reTest,.invest{
						width: 165px;
						height: 50px;
						border-radius: 3px;
						color: #FFFFFF;
						text-align: center;
						line-height: 50px;
						cursor: pointer;
					}
					.reTest{
						float: left;
						background: #B9B9B9;
					}
					.invest{
						float: right;
						background: #FF3E41;
					}
				}
			}
			.confirmBtn{
				width: 100%;
				padding-top: 52px;
				padding-bottom: 71px;
				.btn{
					width: 350px;
					height: 50px;
					margin: 0 auto;
					font-size: 18px;
					color: #FFFFFF;
					line-height: 50px;
					background: #B9B9B9;
					border-radius: 4px;
					text-align: center;
					cursor: pointer;
				}
				.btn.active{
					background: #FF3E41;
				}
			}
		}
	}
</style>