<template>
	<div id="wxTradePwdNew">
		<div v-title>设置交易密码</div>
        <div class="title_box">
            <h3>设置6位数字交易密码</h3>
		</div>
		<form action="" class="clear">
			<!-- @keyup="getNum()" @keydown="delNum()" -->
			<input type="number" maxlength="6" class="realInput" @keyup="getNum(realInput.length)" @keydown="delNum()"  v-model="realInput" id="realInput" oninput="if(value.length>6)value=value.slice(0,6)" >
			<ul class="fakeInput-box">
				<li v-for="disInp in disInputs">
					<input type="password" maxlength="1" class="pass"  v-model="disInp.value">
				</li>
			</ul>
		</form>
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
				realInput:'', // 实际输入的input值
				typeValue:'number',
				disInputs:[   // 假input
					{value:''},
					{value:''},
					{value:''},
					{value:''},
					{value:''},
					{value:''}]
			}
			
		},
		methods:{
            getNum(value){
				for(var i=0;i<value;i++){
					this.disInputs[i].value=this.realInput.charAt(i);// 表示字符串中某个位置的数字，即字符在字符串中的下标。
				}
			},
			delNum(){
				var oEvent = window.event; 
				if (oEvent.keyCode == 8) { 
					if(this.realInput.length>0){
					this.disInputs[this.realInput.length-1].value=''
					}
				}
            },
            goStePwasTow(){
                this.$router.push({path:'/wxMyAccount/wxTradeSetPwdNewTow'})
            }
		},
		components:{
			
		},
		created() {
			
		},
		mounted(){
			var height = document.documentElement.clientHeight; //获取设备的宽度
			$('#wxTradePwdNew').height(height);
		    var idObj = document.getElementById('realInput');
			idObj.focus(); // 进来自动获取焦点
		},
		watch:{
			'realInput'(){
				if(this.realInput.length == 6){
                    setTimeout(this.goStePwasTow,500);
                    localStorage.setItem('realInputData',this.realInput);   // 设置localStorage存储新的设置密码传给下一页
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
	 .forgetPasw{
		 padding: 0 .373333rem;
		 text-align: right;
		 color: #508CEE;
		 font-size: .32rem;
		 line-height: .533333rem;
	 }
 }
</style>

