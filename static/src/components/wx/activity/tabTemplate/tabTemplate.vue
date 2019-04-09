<template>
	<div id="tabTemplateBox">
		<div v-title>平台介绍</div>
		<ul class="tab-title">
			<swiper :options="swiperOption" class="tab-title" :class="{isMedia:num == 4}">
				<swiper-slide v-for="(item,index) in  titleList" :class="{activeLi:index==num}">
					<p @click="num=index">{{item}}</p>
					<span v-if="index == num"></span>
				</swiper-slide>
			</swiper>
		</ul>
		
		<div class="tabContent">
			<tabTemplate1 v-if="num==0"></tabTemplate1>
			<tabTemplate2 v-else-if="num==1"></tabTemplate2>
			<tabTemplate3 v-else-if="num==2"></tabTemplate3>
			<tabTemplate4 v-else-if="num==3"></tabTemplate4>			
			<tabTemplate5 v-else-if="num==4"></tabTemplate5>						
		</div>
		
	</div>
</template>

<script>
	import wxToapp from '../../../../common/wx/wxToapp';
	import tabTemplate1 from '../../template/tabTemplate1.vue'   //  引入tab1
	import tabTemplate2 from '../../template/tabTemplate2.vue'   //  引入tab2
	import tabTemplate3 from '../../template/tabTemplate3.vue'   //  引入tab3
	import tabTemplate4 from '../../template/tabTemplate4.vue'   //  引入tab4
	import tabTemplate5 from '../../template/tabTemplate5.vue'   //  引入tab5

	export default {
		mixins: [wxToapp],
		data() {  
			return {
				titleList: ['关于我们', '产品介绍', '安全保障','风险管理','媒体报道'],      // 标题内容
				num: 0,
				swiperOption: {
					pagination: '.swiper-pagination',
					slidesPerView: 'auto',
					paginationClickable: true,
				},
			}
		},
		methods: {
			getQuert() {     //  从首页点击进来跳到对应的页面
				if(this.$route.query.num) this.num = this.$route.query.num;
			}
		},
		components: {    //  调用组件
			"tabTemplate1" : tabTemplate1,
			"tabTemplate2" : tabTemplate2,
			"tabTemplate3" : tabTemplate3,
			"tabTemplate4" : tabTemplate4,
			"tabTemplate5" : tabTemplate5,
		},
		created() { // 调用函数
             this.getQuert();
		},
        watch: {      //  监听
			'num'() {
			   $(document).scrollTop(0);
			}
		}

	}
</script>

<style lang="scss" scoped>
	#tabTemplateBox {
		overflow: hidden;
		width: 100%;
		.swiper-slide{
			padding: .266667rem .32rem;
			width: auto;
			font-size: .373333rem;
			color:#7A8898;
			p{
				line-height: .533333rem;
				letter-spacing: .013333rem;
			}
			span{
				height:0.053333rem;
				width:0.666667rem;
				position: absolute;
				bottom: 0;
				left: 50%;
				margin-left: -0.306667rem;
				background: #4C7DE9;
			}
		}
		.tab-title {
			position: fixed;
			border-bottom: 1px solid #e5e5e5;
			background: #fff;
			padding: 0;
			height: 1.066667rem;
			width: 100%;
			z-index:10;
			margin:0 auto;
			li {
				color: #333;
				font-size: 0.373333rem;
				line-height: 1.066666rem;
				width: 25%;
				height: 1.053333rem;
				text-align: center;
				float: left;
			}
			.activeLi {
				// border-bottom: 1px solid #FF5B4C;
				color: #4C7DE9;
			}
		}
		.tabContent{
			margin-top: 1.066666rem;	
		}
	}
</style>