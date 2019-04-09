<template>
	<div class="landPage" :style="fullHeight">
		<div :style="[{background: 'url(https://aliyunsso.edspay.com/web/wx/activity/vipLandPage/bg.png?v1.1) center center'},imgBox]">
			<div class="contain">
				<div class="first_page clear" v-if="firstPage">
					<div class="left">
						<div class="sun"><img src="https://aliyunsso.edspay.com/web/wx/activity/vipLandPage/sun.gif?v1.1" alt=""></div>
						<div class="text"><img src="https://aliyunsso.edspay.com/web/wx/activity/vipLandPage/text.png" alt=""></div>
					</div>
					<div class="right">
						<div class="box"><img class="img1" src="https://aliyunsso.edspay.com/web/wx/activity/vipLandPage/p1.png" alt=""></div>
						<div class="box"><img class="img2" src="https://aliyunsso.edspay.com/web/wx/activity/vipLandPage/p2.png" alt=""></div>
						<div class="box"><img class="img3" src="https://aliyunsso.edspay.com/web/wx/activity/vipLandPage/p3.png" alt=""></div>
						<div class="box"><img class="img4" src="https://aliyunsso.edspay.com/web/wx/activity/vipLandPage/p4.png" alt=""></div>
						<div class="box"><img class="img5" src="https://aliyunsso.edspay.com/web/wx/activity/vipLandPage/p5.png" alt=""></div>
					</div>
					
				</div>
				<div class="second_page" v-else>
					<div class="box"><img class="img6" src="https://aliyunsso.edspay.com/web/wx/activity/vipLandPage/p6.png" alt=""></div>
					<div class="box"><img class="img7" src="https://aliyunsso.edspay.com/web/wx/activity/vipLandPage/p7.png?v1.2" alt=""></div>
					<div class="box"><img class="img8" src="https://aliyunsso.edspay.com/web/wx/activity/vipLandPage/p8.png" alt=""></div>
					<div class="box"><img class="img9" src="https://aliyunsso.edspay.com/web/wx/activity/vipLandPage/p9.png" alt=""></div>
					<div class="btn" @click="toVipPage"><img src="https://aliyunsso.edspay.com/web/wx/activity/vipLandPage/btn1.png?v1.4" alt=""></div>
				</div>
			</div>
		</div>
		
	</div>
</template>
<script>
	import wxHeader from '../../../wxHeader'; //头部引入
	import wxToapp from '../../../../common/wx/wxToapp';
	export default {
		mixins: [wxToapp],
		data() {
			return {
				firstPage:true,
				secondPage:false,
				fullHeight:{
					height: ''
				},
				imgBox: {
					width: "100%",
					height: "100%",
					backgroundSize: "10rem 20.56rem"   // 背景图片的大小以iPhoneX适配的尺寸为准  
				}
			}
		},
		components: {
			wxHeader,
		},
		methods:{
			toVipPage() {
				this.toApp('VIP',{path:'/wxMyAccount/vipUser'})
			},

		},
		mounted() {
			var that = this;
			// 数据统计
			const script = document.createElement('script')
			script.src = 'https://s13.cnzz.com/z_stat.php?id=1272969369&web_id=1272969369'
			script.language = 'JavaScript'
			document.body.appendChild(script)

			if(that.osType == "Android"){
				that.fullHeight.height = (document.documentElement.clientHeight+10)+"px"  //获取手机可视区域的的高度
			}else{
				that.fullHeight.height =  document.documentElement.clientHeight+"px"  //获取手机可视区域的的高度	
			}

			$(document).ready(function () {
				for (var i=0; i<6; i++){
					(function(j){
						setTimeout(function() {
							console.log(j)
							$(".first_page .box").eq(j).addClass('opacty')
						}, 1200*(j+1));
					})(i) 
				}
				// setTimeout(function() {
				// 	$(".first_page").addClass('unopacty');
				// 	setTimeout(function() {
				// 		that.firstPage = false;
				// 		$(".second_page").addClass('opacty')
				// 	},500)
					
				// },9200)
				setTimeout(function() {
					$(".first_page").addClass('unopacty');
						setTimeout(function() {
						that.firstPage = false;
						$(".second_page").addClass('opacty')
					},500)
					setTimeout(function() {$(".second_page .btn").addClass('opacty')},500)
					for (var i=0; i<5; i++){
						(function(j){
							setTimeout(function() {
								console.log(j)
								$(".second_page .box").eq(j).addClass('opacty')
							}, 1200*(j+1));
						})(i) 
					}
				},8001)
			})
		},
		watch: {
			'$route'() {
				if (window._czc) {
					let location = window.location
					let contentUrl = location.pathname + location.hash
					let refererUrl = '/'
					window._czc.push(['_trackPageview', contentUrl, refererUrl])
				}
			}
		}

	}
</script>
<style lang="scss" scoped>
	.landPage {
		width: 100%;
		height: 100%;
		position: relative;
		.first_page{
			padding-top: 1rem;
			opacity: 1;
			transition:.8s all; 
			-webkit-transition:.8s all;
			.left{
				width: 2.32rem;
				height: 9.093333rem;
				position: fixed;
				left: 1.253333rem;
				top: 0.6rem;
				.sun{
					margin-bottom: 0.44rem;
					img{
						width: 1.066667rem;
						height: 1.066667rem;
					}

				}
				.text{
					position: relative;
					left: 0.24rem;
					img{
						width: 0.613333rem;
						height: 7.56rem;
					}
				}
			}
			.right{
				padding-right:1.173333rem;
				text-align: right;
				.box{
					margin-bottom: 0.8rem;
				}
				.img1{
					width: 4.68rem;height: 1.733333rem;
				}
				.img2{
					width: 4.946667rem;height: 1.733333rem;
				}
				.img3{
					width: 4.533333rem;height: 1.173333rem;
				}
				.img4{
					width: 3.12rem;height: 1.733333rem;
				}
				.img5{
					width: 4.453333rem;height: 2.28rem;left: -2.6rem;position: relative;
				}
			}
			
		}
		.box{
			font-size: 0.4rem;
		    padding: 0.133333rem 0.4rem;
		    line-height: 0.6rem;
		    opacity: 0;
		    transition:.8s all; 
		    -webkit-transition:.8s all;
		}
		.second_page{
			padding-top: 0.733333rem;
			opacity: 1;
			transition:.8s all; 
			-webkit-transition:.8s all;
			.img6{width:1.413333rem;height: 0.586667rem;margin-left: 1.1rem;margin-bottom: 0.8rem}
			.img7{width:6.813333rem;height: 2.106667rem;margin-left: 1.1rem;margin-bottom: 0.933333rem}
			.img8{width: 6.906667rem;height: 1.573333rem;margin-left: 1.1rem;margin-bottom: 1.466667rem}
			.img9{width: 3.386667rem;height: 1.44rem;margin-left: 1.1rem;margin-bottom: 0.346667rem}
		}
		.btn{
			width: 6.4rem;
			height: 3.693333rem;
			margin: 0 auto;
			opacity: 0;
			transition:.8s all; 
			-webkit-transition:.8s all;
			img{
				width: 100%;
			}
		}
		.opacty{
			opacity: 1;
		}
		.unopacty{
			opacity: 0;
		}
	}
</style>