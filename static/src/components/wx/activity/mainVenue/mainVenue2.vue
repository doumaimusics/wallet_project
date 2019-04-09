<template>
	<div class="mainVenue">
		<wx-header v-if="!osType" :logo="'主会场'"></wx-header>
		<div class="main-wrap">
			<div class="main-menu clear" :style="(osType ? {top:'0'}:{top:'1.333333rem;'})">
				<div @click="tabTag('mainOne')" class="div1 active" :class="{actives: tabShow.mainOne}">
					<p class="p2">11.1-11.10</p>
					<p class="p1">红包任你拿</p>
				</div>
				<div @click="tabTag('mainTwo')" class="active" :class="{actives: tabShow.mainTwo}">
					<p class="p2">11.11-11.22</p>
					<p class="p1">冲榜拿大奖</p>
				</div>
				<div>
					<p class="p2">11.23-11.30</p>
					<p class="p1">敬请期待</p>
				</div>
				<!-- <div @click="tabTag('mainTwo')" :class="{active: tabShow.mainTwo}">tab2</div>
				<div @click="tabTag('mainThree')" :class="{active: tabShow.mainThree}">tab3</div> -->
			</div>
			<div class="main-contain">
				<div class="venue1" :class="{showBox: tabShow.mainOne}">
					<div class="nothing"></div>
					<ul>
						<li class="place1" @click="toWxUrl('/customRedEnvelope')"></li>
						<li class="place2" @click="toWxUrl('wxAnnouncement','id',841)"></li>
						<li class="place3" @click="toWxUrl('storeIndex')"></li>
						<li class="place4" @click="toWxUrl('wxInvitationIndex')"></li>
					</ul>
				</div>
				<div class="venue2" :class="{showBox: tabShow.mainTwo}">
					<div class="nothing2"></div>
					<ul>
						<li class="place5" @click="toWxUrl('/ranking/pickWelfare')"></li>
						<li class="place6" @click="toWxUrl('/interestRaiseStandard')"></li>
						<li class="place7" @click="toWxUrl('/bainaEleven')"></li>
					</ul>
				</div>
				<div class="venue3" :class="{showBox: tabShow.mainThree}">分会场6</div>
			</div>
			
		</div>
	</div>
</template>
<script>
	import wxHeader from '../../../wxHeader';	//引入头部
	import wxToapp from '../../../../common/wx/wxToapp'
	export default {
		mixins:[wxToapp],
		data() {
			return {
				tabShow: {
					mainOne: false,
					mainTwo: true,
					mainThree: false,
				},
			}
		},
		methods: {
			tabTag(me) {
				for (var x in this.tabShow){
					this.tabShow[x] = false;
				}
				this.tabShow[me] = true;
				document.body.scrollTop = 0;
			},
		},
		components: {
			wxHeader,
		},
	}
</script>
<style lang="scss" scoped>
	.mainVenue{
		.main-wrap{
			width: 100%;
			position: relative;
			.main-menu{
				width: 100%;
				height: 1.28rem;
				position: fixed;
				left: 0;
				z-index: 95;
				top: 1.3rem;
				background: url(https://aliyunsso.edspay.com/web/wx/activity/mainVenue/tab.png) no-repeat;
				background-size: 100% 100%;
				font-size: 0.373333rem;
				font-family: PingFang-SC;
				.p1{
					font-size: 0.293333rem;
				}
				.p2{
					padding:.15rem 0 0 0;
				}
				div{
					float: left;
					width: 2.666667rem;
					text-align: center;
					height: 1.28rem;
					color: rgba(255,255,255,.5);
				}
				.div1{
					margin-left:1.413333rem; 
				}
				.active{
					color: #ffffff;
				}
				.actives{
					font-weight: 600;
				}
			}
			.main-contain{
				position: relative;
				top: 1.0rem;
				z-index: 89;
				font-size: 0;
				.venue1,.venue2,.venue3{
					display: none;
				}
				.venue1{
					height: 44.52rem;
					background: url(https://aliyunsso.edspay.com/web/wx/activity/mainVenue/contain.png) no-repeat;
					background-size: 100%;
					.nothing{
						height: 10.5rem;
					}
					.place1{
						width: 4.0rem;
						height: 2.5rem;
						margin-left: 5.4rem;
						margin-bottom: 4.1rem;
					}
					.place2{
						width: 4.0rem;
						height: 2.4rem;
						margin-left: .4rem;
						margin-bottom: 7.5rem;
					}
					.place3{
						width: 4.0rem;
						height: 2.5rem;
						margin-left:4.5rem;
						margin-bottom: 5.8rem;
					}
					.place4{
						width: 4.0rem;
						height: 2.4rem;
						margin-left: 0.773333rem;
					}

				}
				.venue2{
					height: 63.093333rem;
					background: url(https://aliyunsso.edspay.com/web/wx/activity/mainVenue/contain2.png) no-repeat;
					background-size: 100% 100%;
					.nothing2{
						height: 16.44rem;
					}
					.place5{
						height: 2.533333rem;
						width: 100%;
						margin-bottom: 12.0rem;
					}
					.place6{
						height: 2.533333rem;
						width: 100%;
						margin-bottom: 11.466667rem;
					}
					.place7{
						height: 2.733333rem;
						width: 100%;
					}
				}
				.showBox{
					display: block;
				}
			}
		}
	}
</style>