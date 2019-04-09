<template>
	<div class="int_address" :style="fullHeight" id="newAddr">
		<title v-title>编辑地址</title>
		<div class="box clear">
			<div class="label fl">收货人</div>
			<div class="info fl bdr-b"><input type="text" v-model="addData.realName" placeholder="输入收货人姓名"><i v-if="addData.realName" @click="deleName"></i></div>
		</div>
		<div class="box clear">
			<div class="label fl">手机号</div>
			<div class="info fl bdr-b"><input type="text" v-model="addData.mobilePhone" placeholder="输入收货人手机号"><i v-if="addData.mobilePhone" @click="deleNum"></i></div>
		</div>
		<div class="box clear goIco">
			<div class="label labe2 fl">省、市、区</div>
			 <!-- <span v-if="tFlag">台湾省</span> -->
			<div class="fr someinfo" @click="openPop"><span v-if="areaPr"></span>{{addData.province}} {{addData.city}} {{addData.county}}</span></div>
		</div>
		<div class="nothing"></div>
		<div class="main_addr">
			<p>详细地址</p>
			<textarea v-model="addData.detailAddress" placeholder="请输入您的详细地址" class="addr"></textarea>
		</div>
		<div class="btn">
			<div class="save_btn" @click="saveAddress">保存地址</div>
		</div>

		<!-- <add-ress v-if="thisShow.show" :thisShow="thisShow" :values="addData"></add-ress> -->
		<div id="layer" v-if="thisShow.show">
			<div class="contain">
				<div class="complete bdr-b">
					<span class="close comp_btn" @click="close"></span>
					<!-- <span class="comp_btn" @click="complete">完成</span> -->
				</div>
				<div class="main_wrap">
					<v-distpicker type="mobile" :province="addData.province" :city="addData.city" :area="addData.county" @selected="onSelected" @province="onProvince"></v-distpicker>
				</div>
			</div>
		</div>
		
	</div>
</template>
<script>
	// import addRess from '../../../public/wx/address';  //省市区组件
	import wxToapp from '../../../../common/wx/wxToapp';
	import verify from '../../../../common/wx/verification';	//引入表单验证
	import { Toast } from 'mint-ui';
	import VDistpicker from 'v-distpicker';//省市区组件
	export default {
		mixins:[wxToapp,verify],
		data(){
			return{
				thisShow:{//地址组件显示
					show:false
				},
				areaPr:true,//省市区在页面的显示
				addData:{
					province:'',
					city:'',//市
					county:'',//区
					detailAddress:'',//详细地址
					mobilePhone:'',//手机号码
					realName:'',
					type:'', //地址来源
					editType:3 //调接口方式 3 为编辑

				},
				queryArmg:{
					province:'',
					city:'',//市
					county:'',//区
					detailAddress:'',//详细地址
					mobilePhone:'',//手机号码
					realName:'',
					type:'',
					editType:3
				},
				fullHeight:{  //可视高度
					height: ''
				},
				preUrl:'',//来源页地址
				addressId:'',  //地址Id
				thisUrl:'', //上个页面地址
				loginStatus:0, //登陆状态
				idData:{ //给后台传值 地址id
					addressId:''
				},
				checkValue:{
					province: '',
					city:'',
					area:''
				},//选择省市区value
				tFlag:false,

			}
		},
		mounted() {
			//给app传值标题名
			this.PassValue('NavWhite_编辑地址');
			
	    	var that = this;
			if(that.osType == "Android"){
				that.fullHeight.height = (document.documentElement.clientHeight+10)+"px"  //获取手机可视区域的的高度
			}else{
				that.fullHeight.height =  document.documentElement.clientHeight+"px"  //获取手机可视区域的的高度	
			}
	    },
		methods:{
			//隐藏添加省市区
			close(){
				this.thisShow.show = false;
				if(this.tFlag){
					this.addData.province = '台湾省';
					this.tFlag = false;
				}
				// this.areaPr = false;
				// this.getAddrData();
			},
			//显示添加省市区
			openPop(){
				this.thisShow.show = true;
				if(this.addData.province == '台湾省'){
					this.tFlag = true;
					this.addData.province = '';
				}
			},

			//删除名称
			deleName(){
				this.addData.realName = ''
			},

			//删除手机号
			deleNum(){
				this.addData.mobilePhone = ''
			},
			
			//完成选择
			complete(){
				this.thisShow.show = false;
			},

			//选择台湾省特殊处理，台湾没有市、区 
			onProvince(data){
				if(data.value == '台湾省'){
					this.addData.province = data.value;
					this.thisShow.show = false
					this.addData.city = ''
					this.addData.county = '';
					this.tFlag = false;
				}
			},

			//选择地址
			onSelected(data){
				if(data){
					this.checkValue = data
					this.addData.province = this.checkValue.province.value;
					this.addData.city =this.checkValue.city.value;
					this.addData.county =this.checkValue.area.value;
					console.log(data.province.value+'--'+data.city.value+'--'+data.area.value)
				}
				this.thisShow.show = false
				this.tFlag = false;
			},

		    //获取地址
		    getAddrData(){
		    	this.getAppData('/address/address',(data) =>{
		    		if(data.resCode){
		    			this.addData = data.resData.userAddressModel

		    		}
		    	},this.idData)
		    },

		    //保存地址
			saveAddress(){
				if(this.isEmpty(this.addData.realName,'请输入收货人姓名！',1))	return;
				if(this.isEmpty(this.addData.mobilePhone,'请输入手机号！',1)) return
			    if(this.isFormat(this.addData.mobilePhone,'请输入正确手机号！','mobileReg',1)) return
				if(this.addData.province == ''){
					Toast({
					  message: '请选择您所在省市区域！',
					  duration: 2000
					});
					return
				};
				if(this.isEmpty(this.addData.detailAddress,'请输入您详细收货地址！',1)) return
				if(this.addData.detailAddress.length > 50){
					Toast({
					  message: '地址的长度小于50个字符',
					  duration: 2000
					});
					return
				};
				this.queryArmg.province = this.addData.province;
				this.queryArmg.city = this.addData.city;
				this.queryArmg.county = this.addData.county;
				this.queryArmg.detailAddress = this.addData.detailAddress;
				this.queryArmg.mobilePhone = this.addData.mobilePhone;
				this.queryArmg.realName = this.addData.realName;
				this.getAppData('/address/edit',(data) =>{
					if(data.resCode){
						if(data.resData.loginStatus==0){
							this.toApp('LG',{path:'/wxLogin',query:{thisUrl:this.$route.fullPath}})
							return
						}
						this.addressId = data.resData.addressId;
						this.$router.go(-1)
					}
				},this.queryArmg,1)
				
			},
		},
		components:{
			VDistpicker
			// addRess
		},
		beforeRouteEnter: (to, from, next) => { //获取当前页面路由
	        next(vm => {                 // vm相当于this
		        vm.preUrl = from.fullPath
	        }
	        )
	        
        },
		created(){
			this.queryArmg.type = this.$route.query._type;
			this.thisUrl = this.$route.query.thisUrl;
			this.queryArmg.addressId = this.$route.query.addressId;
			this.idData.addressId = this.$route.query.addressId
			this.getAddrData();

		},
	}
</script>
<style lang="scss" scoped>
	.int_address{
		font-family: PingFangSC-Regular;
		background: #ffffff;
		position: relative;
		.box{
			height: 1.466667rem;
			background: #ffffff;
			.label{
				font-size: 0.346667rem;
				color: #333333;
				line-height: 1.466667rem;
				width: 1.866667rem;
				padding-left: 0.4rem;
			}
			.labe2{
				width: 2.173333rem;
			}
			.info{
				width: 8.133333rem;
				height: 1.466667rem;
				position: relative;
				input{
					height: 0.666667rem;
				    position: relative;
				    width: 6.8rem;
				    line-height: 0.666667rem;
				    font-size: 0.4rem;
				    color: #333333;
				    top: .34rem;
				}
				i{
					display: inline-block;
					width: 0.4rem;
					height: 0.4rem;
					background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/delete.png) no-repeat;
					background-size: 0.4rem 0.4rem;
					float: right;
					margin-right:0.6rem;
					position: relative;
					top: 0.546667rem;
				}
			}
			.someinfo{
				width: 7.666667rem;
				height: 1.466667rem;
				font-size: 0.346667rem;
				color: #808080;
				line-height: 1.466667rem;
				padding-right: 0.746667rem;
				text-align: right;
			}
		}
		.goIco{
			background:url(https://aliyunsso.edspay.com/web/wx/integralStroe/signIn/back.png) no-repeat  9.27rem center;
			background-size: 0.4rem 0.4rem;
		}
		.main_addr{
			background: #ffffff;
			padding: 0.4rem 0.533333rem 0; 
			overflow: hidden;
			height: 4.3rem;
			p{
				font-size: 0.4rem;
				color: #333333;
				margin-bottom: 0.4rem;
			}
			.addr{
				width: 17.866667rem;
				height: 4.8rem;
				border:1px solid #D0D0D0;
				padding: 0.266667rem;
				font-size: 0.746667rem;
				color: #808080;
				margin-left: -4.466667rem;
				top: -1.2rem;
				position: relative;
				-webkit-appearance: none;
				appearance: none;
				transform: scale(0.5);
			    -webkit-transform: scale(0.5);
			}
		}
		.nothing{
			width: 100%;
			height: 0.4rem;
			background: #f5f5f5;
		}
		.btn{
			width: 100%;
			height: 1.6rem;
			padding-top: 0.266667rem;
			.save_btn{
				background-image: linear-gradient(-45deg, #FF5E4C 0%, #FF4640 100%);
				border-radius: 4px;
				font-size: 0.426667rem;
				color: #FFFFFF;
				width: 8.933333rem;
				height: 1.066667rem;
				line-height: 1.066667rem;
				text-align: center;
				margin: 0 auto;
			}
		}
		#layer{
			width:100%;
			height:100%;
			background:rgba(0,0,0,.5);
			position:fixed;
			top:0;
			z-index:888;
			.contain{
				width: 100%;
			    height: 9.453333rem;
				position: absolute;
				left: 0;
				bottom: 0;
				background:#ffffff;
				z-index: 999;
			}
			.complete{
				height: 1.2rem;
				background:#ffffff;
				position: relative;
				padding-left: 0.4rem;
				padding-right: 0.4rem;
				.close{
					display: inline-block;
					width: 0.426667rem;
					height: 0.466667rem;
					background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/addr_close.png) no-repeat;
					background-size: 100%;
					position: relative;
					top: 0.4rem;
				}
				.comp_btn{
					font-family: PingFangSC-Medium;
					font-size: 0.453333rem;
					color: #508CEE;
					display: inline-block;
					float: right;
					line-height: 1.2rem;
				}
			}
			.main_wrap{
				height: 8.3rem;
				overflow: auto;
			}
		}
		

	}
</style>
<style lang="scss">
	#newAddr{
		.distpicker-address-wrapper .address-header{
			position: absolute;
		    top: 0;
		    left: 0.533333rem;
		    font-size: 0.426667rem;
		    color: #333333;
		}
		.distpicker-address-wrapper .address-header ul li.active{
			font-size: 0.426667rem;
			color: #333333;
			border-bottom: #FF5B4C solid 2px;
		}
		.distpicker-address-wrapper .address-header ul li{
			padding: 0;
		    height: 1.2rem;
		    line-height: 1.2rem;
		    z-index: 99;
		    margin-right: 0.4rem;
			
		}
		.distpicker-address-wrapper .address-container ul li{
			border-bottom: 1px solid #f6f6f6;
			border-top: none;
			font-size: 0.373333rem;
			color: #333333;
			padding: 8px 20px;
		}
	}
</style>