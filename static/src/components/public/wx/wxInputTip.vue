<template>
	<div id="tip">
		<div class="main">
		    <span></span>
		    <div class="child shadow">{{errorMsg}}</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		props:['errorMsg'],
		methods:{
			
		},
		mounted(){
			var width = $("#inputTip").width();
			$('#inputTip').css('margin-left',-width/2+'px');

		}
	}
</script>

<style lang="scss" scoped>
	.main{
		text-align:center;
		height:1.013333rem;
		width:100%;
		line-height: 1.013333rem;
		position: fixed;
		top:1.733333rem;
		font-size:0.373333rem;
		span{
			display: inline-block;;
			width: 0;
			height: 100%;
			vertical-align: middle;
			zoom: 1;/*BFC*/
			*display: inline;
		}
		.child{
			display: inline-block;
			color: #fff;
			zoom: 1;
			padding: 0 0.533333rem;
		}
		.shadow{
			background-image:-webkit-linear-gradient(to right, #FF6554 , #FF3F38);
		    background-image:linear-gradient(to right,#FF6554 ,#FF3F38);
		    border-radius:0.48rem;
		    -webkit-box-shadow: #FF5247 0px 0px 0.16rem;
		    -moz-box-shadow: #FF5247 0px 0px 0.16rem;
		}
	}
</style>