<template>
    <div class="aboutUs_box">
		<div class="banner_box"></div>
		<div class="aboutUs">
			<!-- 左边 -->
			<div class="aboutLeft">
				<ul class="">
					<li v-for="v in tableList" :class="{active:v.status}">
						<router-link :to="v.links" active-class="table">
							{{v.title}}
						</router-link>
					</li>
				</ul>
			</div>
			<!-- 公用组件 -->
			<div class="aboutRight">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'aboutUs',
	data() {
		return {
			tableList: [
				{
					links: '/info/registrationProcess',
					title: '备案进程',
					status: true
				},
				{
					links: "/info/riskEducation",
					title: '风险教育',
					status: true
				},
				{
					links: '/info/disclosure',
					title: '信息披露',
					status: true
				},
				{
					links: "/info/about",
					title: '关于我们',
					status: true
				},
				// {
				// 	links: '/info/about/commitment',
				// 	title: '法人承诺函'
				// },
				// {
				// 	links: '/info/about/abstract',
				// 	title: '平台简介'
				// },
				// {
				// 	links: '/info/about/information',
				// 	title: '机构信息'
				// },
				// {
				// 	links: '/info/about/team',
				// 	title: '管理团队'
				// },
				// // {
				// // 	links: '/info/about/teamMien',
				// // 	title: '团队风采'
				// // },
				// {
				// 	links: '/info/about/certificate',
				// 	title: '资质证书'
				// },
				{
					links: '/info/dynamic',
					title: '公司动态',
					status: true
				},
				// {
				// 	links: '/info/dynamic/coverage',
				// 	title: '媒体报道'
				// },
				// {
				// 	links: '/info/dynamic/history',
				// 	title: '发展历程'
				// },
				// {
				// 	links: '/info/dynamic/Emeeting',
				// 	title: 'E友见面会'
				// },
				// {
				// 	links: '/info/dynamic/matter',
				// 	title: '重大事项'
				// },
				{
					links: '/info/notice',
					title: '对外公告',
					status: true
				},
				// {
				// 	links: '/info/notice/announcement',
				// 	title: '平台公告'
				// },
				// {
				// 	links: '/info/notice/laws',
				// 	title: '法律法规'
				// },
				{
					links: '/info/data',
					title: '运营数据',
					status: true
				},
				{
					links: '/info/security',
					title: '安全保障',
					status: true
				},
				// {
				// 	links: '/info/security/custody',
				// 	title: '银行存管'
				// },
				// {
				// 	links: '/info/security/control',
				// 	title: '保障措施'
				// },
				{
					links: '/info/contactUs',
					title: '联系我们',
					status: true
				},
				// {
				// 	links: '/info/contactUs',
				// 	title: '联系我们'
				// }
			],
			topNavList:{
				list1:['法人承诺函','平台简介','机构信息','管理团队','资质证书'],    // 关于我们
				list2:['媒体报道','发展历程','E友见面会'],    // 公司动态
				list3:['平台公告'],    // 对外公告
				list4:['数据披露','运营报告'],    // 运营数据
				list5:['银行存管','保障措施'],    // 安全保障
				list6:['联系我们']    // 联系我们
			}
		}
	},
	methods: {

	}
}  
</script>

<style lang="scss">
.aboutUs_box{
	background: #f8f8f8;
}
.banner_box{
	width: 100%;
    height: 260px;
    background: url(https://aliyunsso.edspay.com/web/about/pcPageRevision/disclosure_banner.png) no-repeat center center;
	background-size: cover;
	margin-bottom: 20px;
}
.aboutUs {
	width: 1200px;
	height: auto;
	margin: 0 auto;
	padding: 0px 0 45px;
	overflow: hidden;
	.aboutLeft {
		width: 250px;
		height: auto;
		background-color: #ffffff;
        // box-shadow: 0 6px 20px 0 rgba(204, 204, 204, 0.26);
		float: left;
		ul {
			background-color: #ffffff;
			padding: 0 30px;
			li {
				padding: 28px 0;
				font-size: 20px;
			color: #333333;
                border-bottom: 1px solid #e5e5e5;
				i {
					margin-left: 72px;
					transform: rotate(90deg);
					font-size: 12px;
				}
				a {
					display: block;
					width: 100%;
					height: 100%;
					font-size: 14px;
					color: #666;
					padding-left: 40px !important;
				}
			}
			li:last-child{
				border-bottom: none;
			}
			li.active{
				a {
					font-family: PingFangSC;
					display: block;
					width: 100%;
					height: 100%;
					font-size: 20px;
					color: #333;
					padding-left: 40px !important;
					font-weight: normal;
				}
			} 
			li.active:nth-child(1){
				border-top: 0px solid #e7e7e7;
			}
			li a.table {
				font-size: 20px;
				color: #FF5B4C;
			}
			li:hover {
				background-color: #ffffff;
			}
			li:hover a {
				color: #FF5B4C;
			}
		}
	}
	.aboutRight {
		width: 930px;
		height: auto;
		float: right;
		padding: 0px 38px 0 0px;
		background-color: #ffffff;
		
  .nva_box{
			width: 100%;
			border-bottom:1px solid #f5f5f5;
			padding-left: 45px;
			padding: 30px 0 0px 45px;
			li{
				float: left;
				margin-right: 60px;
				cursor: pointer;
				font-size: 16px;
				color: #333333;
				padding-bottom: 20px;
				
			}
			li.active{
				font-size: 16px;
				color: #FF5B4C;
				border-bottom: 2px solid #FF5B4C;
			}
		}
	}
}
</style>