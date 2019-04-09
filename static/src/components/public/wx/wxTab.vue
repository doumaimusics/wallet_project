<template>
	<div class="tab">
		<div @click="toTop" id="navBar">
			<mt-navbar v-model="tabList.selected">
			  <mt-tab-item v-for="item in tabList.list" :id="item.tabId"><span>{{item.text}}<i v-if="tabList.selected == item.tabId"></i></span></mt-tab-item>
			</mt-navbar>
		</div>
		<div class="tabTi"></div>
	</div>
	
</template>

<script>
import { Navbar, TabItem } from 'mint-ui'; // 引入teb选项卡组件

	export default {
		data(){
			return {
				isFixed:true
			}
		},
		props:['tabList'],
		methods:{
			toTop(){
				document.body.scrollTop = 0;
			}
		},
		mounted(){
			console.log(this.tabList)

		}
	}
	
</script>

<style lang="scss">
	#navBar{
		position:fixed;
		z-index:99;
		width:100%;
		height:1.093333rem;
		background:#E5E5E5;
		.mint-navbar{
			background:#fff;
			width:100%;
			height:1.066667rem;
			.mint-tab-item{
				padding: 0;
				position: relative;
				.mint-tab-item-label{
					line-height: 1.066667rem;
				}
				i{
					position: absolute;
					z-index:999;
					left: 50%;
					margin-left: -0.3rem;
					bottom: 0;
					height: 0.053333rem;
					width:0.666667rem;
					background:#4C7DE9;
				}
			}
			.is-selected{
				font-size:0.373333rem;
				color:#ff5a4a;
				margin-bottom:0;
				border-bottom: 0;
				span{
					color: #4C7DE9;
					
				}
			}
			.is-selected:after{
				height:0.026667rem;
				width:2.666667rem;
				margin: 0 auto;
				background:#ff5a4a;
			}
			span{
				display: inline-block;
				width:2.666667rem;
				position: relative;
				color:#7A8898;
			}
		}
	}
	.tabTi{
		height:1.066667rem;
	}
	
</style>