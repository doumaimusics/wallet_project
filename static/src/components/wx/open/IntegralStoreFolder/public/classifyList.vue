<template>
	<div class="classfy">
		<div class="menu_list">
			<ul class="content clear">
				<li v-for="(item,index) in goodsCategoryModels" @click="checkMenu(item,index)" :class="{noMar:index==4 || index==9}">
					<div class="img"><img :src="item.iconCls" alt=""></div>
					<p :class="{activeTxt:activeShow[index]}">{{item.categoryName}}</p>
				</li>
				<li @click="allGoods" :class="{noMar:goodsCategoryModels.length == 4 || goodsCategoryModels.length==9}">
					<div class="img"><img src="https://aliyunsso.edspay.com/web/wx/integralStroe/quanbuhui.png" alt=""></div>
					<p :class="{activeTxt:total}">全部分类</p>
				</li>
			</ul>
			<div class="icon_btn bdr-t" @click="classify.isShow = false">取消</div>
		</div>
	</div>
</template>
<script>
	export default{
		props:['classify','checkTitle','intData','cheak','getData','checkId','activeShow','goodsCategoryModels','pageNum','allLoaded','listData'],
		data(){
			return{
				// goodsCategoryModels:[],
				total:true,
				// activeShow:[],//列表样式控制
			}
		},
		methods:{
			// 类别接口
			// getMenuData(){
			// 	this.notLogPost('/goods/classList',(data)=>{
			// 		if(data.resCode){
			// 			this.goodsCategoryModels = data.resData.data.list;
			// 			for (var i=0; i < data.resData.data.list.length; i++){
			// 				this.activeShow[i] = false;
			// 			}
			// 		}
			// 	},{categoryType:1},1)

			// },

			//切换类别
			checkMenu(item,index){
				this.pageNum = 1;
				this.allLoaded = false;
				this.listData = [];//初始化数据
				// this.intData();
				// console.log(this.pageNum+'.....,...,')

				for (var i=0; i < this.goodsCategoryModels.length; i++){
					this.$set(this.activeShow, i, false);
				}
				this.$set(this.activeShow, index, true);
				this.total = false;
				this.checkTitle.title = item.categoryName;
				this.checkId.calssifyId = item.categoryId;
				this.classify.isShow = false;
				console.log(this.total)
				if(this.cheak.isCheak){
					this.getData(item.categoryId,1,this.pageNum)
				}else{
					this.getData(item.categoryId,2,this.pageNum)
				}
			},

			//选择全部分类
			allGoods(){
				this.pageNum = 1;
				this.allLoaded = false;
				this.listData = [];//初始化数据
				// this.intData();

				for (var i=0; i < this.goodsCategoryModels.length; i++){
					this.$set(this.activeShow, i, false);
				}
				this.total = true;
				this.checkTitle.title = '全部分类';
				this.checkId.calssifyId = 0;
				this.classify.isShow = false;
				if(this.cheak.isCheak){
					this.getData(0,1,this.pageNum)
				}else{
					this.getData(0,2,this.pageNum)
				}
			},

		},
		mounted(){

		},
		created(){
			// this.getMenuData()
		}
	}
</script>
<style lang="scss" scoped>
	.classfy{
		.menu_list{
			height: auto;
			width: 100%;
			background: #ffffff;
			position: fixed;
			left: 0;
			bottom: 0;
			z-index: 999;
			box-shadow: 0 0 12px 0 rgba(0,0,0,0.12);
			-moz-box-shadow:0 0 12px 0 rgba(0,0,0,0.12);
			-webkit-box-shadow: 0 0 12px 0 rgba(0,0,0,0.12);
			.content{
				padding: 0.666667rem 0.8rem 0.266667rem;
				
				li{
					width: 1.3rem;
				    margin-right: 0.47rem;
					margin-bottom: 0.4rem;
					float: left;
					.img{
						width: 1.2rem;
						height: 1.2rem;
						border-radius: .6rem;
						overflow: hidden;
						margin-bottom: 0.186667rem;
						img{
							width: 100%;
							height: 100%;
						}
					}
					p{
						text-align: center;
						font-size: 0.32rem;
						color: #808080;
					}
					p.activeTxt{
						color: #333333;
					}
				}
				li.noMar{
					margin-right: 0;
				}
			}
			.icon_btn{
				width: 8.933333rem;
				height: 1.333333rem;
				position: relative;
				line-height: 1.32rem;
				text-align: center;
				font-size: 0.533333rem;
				color: #333333;
				margin: 0 auto;
			}
		}
	}
</style>