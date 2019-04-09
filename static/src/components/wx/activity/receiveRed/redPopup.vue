<template>
    <div v-layer id="redPop">
    	<div class="content">
    		<div @click="calse" class="calse"></div>
    		<div class="details">
    			<div class="img">
    				<img src="https://aliyunsso.edspay.com/web/wx/activity/receiveRed/Group.png" alt="">

    			</div>
    		</div>
    		<p>红包发放至用户账户，请在 <router-link :to="{path:'/'}">“我的-我的红包”</router-link>	中查看！</p>
			
    	</div>
    </div>
</template>

<script>
    export default{
    	data(){
    		return{

    		}
    	},
    	props:['showRed'],
    	methods:{
    		calse(){
    			this.showRed.isShow = false;
    		}
    	},
    	created(){
    		
    	}
    }
</script>

<style lang="scss" scoped>
    #redPop{
		.content{
			height:13.333333rem;
			width:8.0rem;
			margin: 0.6rem auto;
			background:  url(https://aliyunsso.edspay.com/web/wx/activity/receiveRed/tip3.png) no-repeat;
			background-size:8.0rem 6.0rem;
			padding-top:6rem;
			position: relative;
			.calse{
				position: absolute;
				right:0;
				top:1.173333rem;
				height:0.906667rem;
				width:0.906667rem;
				z-index:100
			}
			.title{
				font-size:0.4rem;
				line-height:0.533333rem;
				text-align:center;
			}
			.details{
				width:100%;
				height:7rem;
				background:#fff;
				overflow-y: auto;
				.img{
					height:11.466667rem;
					width:7.493333rem;
					margin: 0 auto;
					img{
						display:block;
						width:7.493333rem;
						height:11.466667rem;
					}
				}
			}
			p{
				background:#fff;
				font-size:0.32rem;
				line-height:0.453333rem;
				color:#808080;
				padding:0.22rem 0.746667rem 0.413333rem;
				border-bottom-left-radius: 0.16rem;
				border-bottom-right-radius: 0.16rem;

			}
		}
    }
</style>