<template>
	<div class="earn">
		<title v-title>赚取积分</title>
		<!-- 新手成长记 -->
		<div class="none"></div>
		<div class="view1" :class="{showBox: tabShow.mainOne}">
			<int-child1 :newPeopleData="newPeopleData" :loginStatus="loginStatus"></int-child1>
		</div>
		<!-- 出借里程碑 -->
		<div class="view2" :class="{showBox: tabShow.mainTwo}">
			<int-child2 :investData="investData" :loginStatus="loginStatus"></int-child2>
		</div>
		<!-- 出借送积分 -->
		<div class="view3" :class="{showBox: tabShow.mainThree}">
			<int-child3></int-child3>
		</div>
		<div class="footBtn">
			<ul>
				<li @click="tabTag('mainOne')" :class="{active: tabShow.mainOne}">新手成长记<span v-if="tabShow.mainOne"></span></li>
				<li @click="tabTag('mainTwo')" :class="{active: tabShow.mainTwo}">出借里程牌<span v-if="tabShow.mainTwo"></span></li>
				<li @click="tabTag('mainThree')" :class="{active: tabShow.mainThree}">出借送积分<span v-if="tabShow.mainThree"></span></li>
			</ul>
		</div>
	</div>
</template>
<script>
	import intChild1 from './intEarnChild1'; //新手成长记
	import intChild2 from './intEarnChild2'; //出借里程碑
	import intChild3 from './intEarnChild3'; //出借送积分
	import wxToapp from '../../../../common/wx/wxToapp';
	export default {
		mixins:[wxToapp],
		data(){
			return{
				loginStatus:0,
				tabShow: { //tab切换
					mainOne: true,
					mainTwo: false,
					mainThree: false,
				},
				newPeopleData:[],//新手成长记
				investData:[],//出借里程碑
			}
		},
		methods:{
			tabTag(me) {
				for (var x in this.tabShow){
					this.tabShow[x] = false;
				}
				this.tabShow[me] = true;
				document.body.scrollTop = 0;
			},
			//赚积分
			getAddressData(){
				this.getNotlogData('/task/getScore',(data) => {
					if(data.resCode == 1){
						this.newPeopleData = data.resData.data.newList;
						this.investData = data.resData.data.lendList;
						this.loginStatus = data.resData.data.loginStatus;
						console.log(data)
					}
				},{})
			},
		},
		components:{
			intChild1,
			intChild2,
			intChild3
		},
		mounted() {
			//给app传值标题名
			this.PassValue('NavWhite_赚取积分');
	    },
		created(){
			this.getAddressData()

		}
	}
</script>
<style lang="scss" scoped>
	.earn{
		font-family: PingFangSC-Regular;
		.none{
			width: 100%;
			height: 1.066667rem;
		}
		.footBtn{
			width: 100%;
			height: 1.066667rem;
			background:#ffffff;
			position: fixed;
			left: 0;
			top: 0;
			ul{
				width: 100%;
				height: 100%;
				display: flex;
				justify-content: space-around;
				li{
					width: 2.666667rem;
					line-height: 1.066667rem;
					font-size: .4rem;
					color: #7A8898;
					text-align: center;
					position: relative;
					span{
						position: absolute;
						width: 0.666667rem;
						height:2px;
						left:50%;
						bottom: 1px;
						margin-left: -0.333333rem;
						background: #4C7DE9;
					}
				}
				li.active{
					color: #4C7DE9;
					// border-bottom: 2px solid #FF5B4C;
				}
				// .li1{
				// 	background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/tab1.png) 0.426667rem 0.373333rem no-repeat;
				// 	background-size: 0.586667rem;
				// }
				// .active1{
				// 	background: #FF5B4C url(https://aliyunsso.edspay.com/web/wx/integralStroe/tab1_2.png) 0.426667rem 0.373333rem no-repeat;
				// 	background-size: 0.586667rem;
				// 	color: #ffffff;
				// }
				// .li2{
				// 	background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/tab2.png) 0.426667rem 0.373333rem no-repeat;
				// 	background-size: 0.586667rem;
				// }
				// .active2{
				// 	background: #FF5B4C url(https://aliyunsso.edspay.com/web/wx/integralStroe/tab2_2.png) 0.426667rem 0.373333rem no-repeat;
				// 	background-size: 0.586667rem;
				// 	color: #ffffff;
				// }
				// .li3{
				// 	background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/tab3.png) 0.426667rem 0.373333rem no-repeat;
				// 	background-size: 0.586667rem;
				// }
				// .active3{
				// 	background: #FF5B4C url(https://aliyunsso.edspay.com/web/wx/integralStroe/tab3_3.png) 0.426667rem 0.373333rem no-repeat;
				// 	background-size: 0.586667rem;
				// 	color: #ffffff;
				// }
			}
		}
		.view1,.view2,.view3{
			display: none;
		}
		.showBox{
			display: block;
		}
	}
</style>