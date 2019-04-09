<template>
	<div id="wxSearch">
		<div class="top clear">
			<div class="search clear fl">
				<i></i>
				<input type="text" v-model="searchStr" @input="toSearch">
				<img v-if="searchStr" @click="searchStr = ''" src="https://aliyunsso.edspay.com/web/wx/depository/clear.png" alt="">
			</div>
			<span @click="abolish">取消</span>
		</div>
		<ul v-if="showList">
			<li v-for="item in showList" @click="getBank(item)" >{{item.bankName}}</li>
		</ul>
		<p v-if="showList.length == 0" class="tips">{{tips}}</p>
	</div>
</template>

<script>
	import wxToapp from '../../../../common/wx/wxToapp';    
	export default {
		mixins:[wxToapp],
		data(){
			return {
				searchStr:'',	//搜索文本
				searchList:[],
				bankCode:'',
				gbAreaId:'',
				timer:null,
				searchFalg:true,
				tips:'',
				showList:[], //显示列表
				screenList:[],
				entrance:'',
				toUrl:'',

			}
		},
		methods:{
			toSearch(){
				var that = this;
				this.screenList = [];
				if(!this.searchFalg) return;
				this.searchFalg = false;
				this.timer = setTimeout(function(){
					for(var i=0;i<that.searchList.length;i++){
						if(that.searchList[i].bankName.indexOf(that.searchStr)>-1){
							that.screenList.push(that.searchList[i])
						}
					}
					that.showList = that.screenList;
					that.searchFalg = true;
					clearTimeout(that.timer)
				},700)	
			},
			/*toSearch(){		//调用接口搜索
				var that = this;
				if(!this.searchFalg) return;
				this.searchFalg = false;
				this.timer = setTimeout(function(){
					that.postData('/zsbank/branch',function(res){
						if(res.body.resCode){
							if(res.body.resData){
								that.searchList = res.body.resData.branchList;
							}else{
								that.searchList = [];
								that.tips = '请重新输入关键词'
							}
						}
					},{bankCode:that.bankCode,gbAreaId:that.gbAreaId,name:that.searchStr})
					that.searchFalg = true;
					clearTimeout(this.timer)
				},700)	
			},*/
			getData(){
				this.notLogPost('/zsbank/branch',(res,data) =>{
					if(res.resCode){
						if(res.resData){
							this.searchList = res.resData.branchList;
							this.showList = this.searchList;
						}else{
							this.searchList = [];
							this.tips = '请重新输入关键词'
						}
					}
				},{bankCode:this.bankCode,gbAreaId:this.gbAreaId,name:this.searchStr})
			},
			getBank(item){
				this.appRouter(this.toUrl,{subbranch:item.bankName,unionLineNo:item.unionLineNo},1)
			},
			abolish(){
				 this.appRouter(this.toUrl,{},1);
			},
		},
		activated(){
			document.title = ''
			document.title = '开户支行'
			this.entrance = this.$route.query.entrance;
			this.bankCode = this.$route.query.bankCode;
			this.gbAreaId = this.$route.query.gbAreaId;
			this.searchStr = '';
			this.searchList = [];
			this.getData();
			if(this.entrance == 'zsAmendCard'){this.toUrl = '/wxMyAccount/wxAmendCard'}
			else{this.toUrl = '/wxDepository'}
		}
	}
</script>

<style lang="scss" scoped>
	#wxSearch{
		color:#333;
		.top{
			height:1.173333rem;
			background: #fff;
			.search{
				margin: 0.186667rem 0 0 0.4rem;
				border-radius:0.4rem;
				width:8.0rem;
				background:#f2f2f2;
				i{
					float:left;
					margin:0.053333rem 0.133333rem 0 0.186667rem;
					height:0.426667rem;
					width:0.426667rem;
				}
				input{
					line-height:0.8rem;
					font-size:0.373333rem;
					float:left;
					width:80%;
					background:#f2f2f2;
				}
				img{
					float:right;
					margin:0.2rem 0.266667rem 0 0;
					height:0.4rem;
					width:0.4rem;
				}
			}
			span{
				float:left;
				font-size:0.426667rem;
				line-height:1.173333rem;
				padding-left:0.333333rem;
			}
		}
		ul{
			background:#fff;
			padding-left:0.4rem;
			li{
				height:1.2rem;
				line-height: 1.2rem;
				font-size:0.4rem;
				border-bottom:1px solid #e5e5e5;
			}
			li:last-child{
				border:0;
			}
		}
		.tips{
			text-align:center;
			font-size:0.346667rem;
			line-height:0.506667rem;
		}
	}
</style>