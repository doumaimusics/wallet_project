<template>
	<div id="wxTradePwdNew">
		<div v-title>设置交易密码</div>
        <div class="title_box">
            <h3>请再次输入</h3>
		</div>
		<form action="" class="clear">
			<!-- @keyup="getNum()" @keydown="delNum()" -->
			<input type="number" maxlength="6" class="realInput" @keyup="getNum(confirmPwd.length)" @keydown="delNum()"  v-model="confirmPwd" id="realInput" oninput="if(value.length>6)value=value.slice(0,6)" >
			<ul class="fakeInput-box">
				<li v-for="disInp in disInputs">
					<input type="password" maxlength="1" class="pass"  v-model="disInp.value">
				</li>
			</ul>
			<!-- onkeypress='return( /[\d]/.test(String.fromCharCode(event.keyCode) ) )' -->
		</form>
        <!-- :class="{isGray:(oldPwd && newPwd && pwdAgain)}" -->
		<div class="loginBtn" :class="{isGray:(confirmPwd.length==6)}" @click="emergencysub">确认</div>
	</div>
</template> 
<script>
	import verify from '../../../../common/wx/verification';	//引入表单验证
	import wxToapp from '../../../../common/wx/wxToapp';
	import wxToast from '../../../../common/wx/wxToast'; //引入toast提示
	export default {
		mixins: [verify,wxToapp,wxToast],
		data(){
			return {
				hasPwd: '',//1为修改密码，0为设置密码
				confirmPwd:'', // 实际输入的input值
				typeValue:'number',
				disInputs:[   // 假input
					{value:''},
					{value:''},
					{value:''},
					{value:''},
					{value:''},
                    {value:''}],
                affirmInput:null    
			}
			
		},
		methods:{
            getNum(value){
				for(var i=0;i<value;i++){
					this.disInputs[i].value=this.confirmPwd.charAt(i);// 表示字符串中某个位置的数字，即字符在字符串中的下标。
				}
			},
			delNum(){
				var oEvent = window.event; 
				if (oEvent.keyCode == 8) { 
					if(this.confirmPwd.length>0){
					this.disInputs[this.confirmPwd.length-1].value=''
					}
				}
            },
            goPwdIndex(){
                this.$router.replace('/wxMyAccount/wxPwdIndex')
            },
			emergencysub(){   // 验证密码
				    let that = this
                    this.postData('/user/updateTradePwd',function(res){
						console.log(res)
						if(res.body.resCode == 1){
                            that.toast({text:res.body.resMsg,time:2000,place:'center'});
                            setTimeout(that.goPwdIndex,1500);
                            
						} else {
							that.toast({text:res.body.resMsg,time:2000,place:'center'});
							that.confirmPwd = '';
							that.getNum(6);
						}
					},{newPwd:this.affirmInput,confirmPwd:this.confirmPwd})
			}
		},
		components:{
			
		},
		created() {
            this.affirmInput = localStorage.getItem('realInputData');  // 获取上一页localStorage存储新的密码
		},
		mounted(){
			var height = document.documentElement.clientHeight; //获取设备的宽度
			$('#wxTradePwdNew').height(height);
		    var idObj = document.getElementById('realInput');
			idObj.focus(); // 进来自动获取焦点
		},
		watch:{
			'confirmPwd'(){
				if(this.confirmPwd.length == 6){
					
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
 #wxTradePwdNew{
	 position: relative;
	 width: 100%;
	 overflow: hidden;
	 font-family: PingFangSC-Medium;
	 background: #f8f8f8;
	 .title_box{
		 margin: 1.013333rem 0 1.4rem 0;
		 text-align: center;
		 h3{
			font-size: .453333rem;
			color: #333;
		 }
	 }
	 form{
		 position: relative;
		 height: 1.333333rem;
		 margin-bottom: .4rem;
		 .realInput{
			 width: 9.2rem;
			 height: 1.333333rem;
			 margin: 0 auto;
			 position: absolute;
			 left:0;right: 0;
			 margin: auto;
			 z-index: 1;
			 font-size: .48rem;
			 color: #333;
			  overflow: hidden;
			-webkit-appearance: none;
			resize: none;
			outline: none;
			opacity: 0;
		 }
		 .fakeInput-box{
			 width: 9.2rem;
			 height: 1.333333rem;
			 margin: 0 auto;
			 background: url('https://aliyunsso.edspay.com/web/wx/pointToPoint/setPawBg.png?v=1.0') no-repeat;
			 background-size: 9.2rem 1.333333rem; 
			 position: absolute;
			 left:0;right: 0;
			 margin: auto;
			 li{
				 width: 1.53rem;
				 height: 1.306667rem;
				//  background: #f90;
				 float: left;
				 input{
					 width: 100%;
					 height: 100%;
					 text-align: center;
					 font-size: .48rem;
					  color: #333;
					  
				 }
			 }
		 }
	 }
	 .loginBtn{
				width:8.773333rem;
				display:block;
				margin:0 auto;
				background:url('https://aliyunsso.edspay.com/web/wx/account/btn_bg1.png?v=1.0') no-repeat;
				background-size: 8.773333rem 1.066667rem;
				font-size: 0.426667rem;
				height:1.066667rem;
				text-align: center;
				line-height:1.066667rem;
				border-radius:4px;
				color:#fff;
				margin-top:.933333rem;
			}
			.isGray{
				background:url('https://aliyunsso.edspay.com/web/wx/account/btn_bg2.png?v=1.0') no-repeat;
				background-size: 8.773333rem 1.066667rem;
			}
 }
</style>

