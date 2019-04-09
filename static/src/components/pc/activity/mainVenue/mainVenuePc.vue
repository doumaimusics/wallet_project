<template>
	<div id="main-venue">
		<div class="main-wrap">
			<div class="tab-menu clear">
				<div @click="tabTag('mainOne')" :class="{active: tabShow.mainOne}" class="div1">
					<p class="p2">11.1-11.10</p>
					<p class="p1">红包任你拿</p>
				</div>
				<div :class="{active: tabShow.mainTwo}">
					<p class="p2">11.11-11.22</p>
					<p class="p1">敬请期待</p>
				</div>
				<div :class="{active: tabShow.mainThree}">
					<p class="p2">11.23-11.30</p>
					<p class="p1">敬请期待</p>
				</div>
			</div>
			<div class="main-contain">
				<div class="venue1" :class="{showBox: tabShow.mainOne}">
					<div class="contain1" @click="showModal"></div>
					<div class="contain2" @click="showModal"></div>
				</div>
				<div class="venue2" :class="{showBox: tabShow.mainTwo}">分会场5</div>
				<div class="venue3" :class="{showBox: tabShow.mainThree}">分会场6</div>
				
			</div>
			<div class="dialog" v-if="showDialog">
				<div class="modal">
					<div class="close" @click.stop="closeDialog"></div>
				</div>
			</div>
		</div>
		
	</div>
</template>
<script>
  export default {
	data(){
      return {
          showDialog: false,
          tabShow: {
			mainOne: true,
			mainTwo: false,
			mainThree: false,
		  },
      }
    },
    methods: {
    	showModal(){
    		this.showDialog = true;
    	},
    	closeDialog() {
    		this.showDialog = false;	
    	},
    	tabTag(me) {
			for (var x in this.tabShow){
				this.tabShow[x] = false;
			}
			this.tabShow[me] = true;
		},
		scrollPage() {
			$(window).scroll(function() {
				let _height = $(window).scrollTop()
				if( _height >= 153 ) {
					$('.tab-menu').addClass('scroll')
				}else {
					$('.tab-menu').removeClass('scroll')
				}
			}); 
		}
    },
    created(){
        this.scrollPage()
    }
  }  
</script>
<style lang="scss" scoped>
	#main-venue{
		background: #f3f3f3;
		padding-top: 20px;
		padding-bottom: 20px;
		.main-wrap{
			width: 1200px;
			margin: 0 auto;
			position: relative;
			.tab-menu{
				width: 1200px;
				height: 96px;
				background: url(https://aliyunsso.edspay.com/web/activity/mainVenue/tab_pc.png) no-repeat;
				background-size: 100% 100%;
				position: absolute;
				z-index: 80;
				cursor: pointer;
				.div1{
					margin-left:207px; 
				}
				div{
					float: left;
					height: 96px;
					width: 270px;
					color:rgba(255,255,255,.5);
					p{
						text-align: center;
						font-size: 28px;
					}
					.p1{
						font-size: 22px;
					}
					.p2{
						padding-top: 13px;
					}
				}
				.active{
					color: #ffffff;
				}
			}
			.tab-menu.scroll{
				position: fixed;
				top: 0;
			}
			.main-contain{
				width: 1200px;
				position: relative;
			    top: 96px;
			    .venue1,.venue2,.venue3{
					display: none;
				}
			    .venue1{
			    	height: 3599px;
			    	.contain1{
			    		width: 1200px;
			    		height: 1691px;
			    		background: url(https://aliyunsso.edspay.com/web/activity/mainVenue/contain1-pc.png) no-repeat;
			    		background-size: 100% 100%;
			    	}
			    	.contain2{
			    		width: 1200px;
			    		height: 1812px;
			    		background: url(https://aliyunsso.edspay.com/web/activity/mainVenue/contain2-pc.png) no-repeat;
			    		background-size: 100% 100%;
			    	}
			    }
			    .showBox{
					display: block;
				}
			}
			.dialog{
			width: 100%;
			height: 100%;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 100;
			background:rgba(0,0,0,.5); 
			.modal{
				width: 552px;
				height: 533px;
				background: #ffffff;
				position: relative;
				margin: 10% auto;
				background: url(https://aliyunsso.edspay.com/web/activity/mainVenue/modal.png) no-repeat;
				background-size: 100%;
				.close{
					width: 50px;
					height: 50px;
					margin-left: 490px;
				}
			}
		}
		.display{
			display: block;
		}
		}
		
	}
</style>