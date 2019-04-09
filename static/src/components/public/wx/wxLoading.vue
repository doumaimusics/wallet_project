<template>
	<div id="loading">
		<mt-spinner type="fading-circle"></mt-spinner>
		<em>加载中....</em>
	</div>
</template>

<script>
import { InfiniteScroll } from 'mint-ui';
	
</script>

<style lang="scss" scoped>
	#loading{
		padding-top:0.133333rem;
		text-align:center;
		width:32%;
		margin: 0 auto;
		line-height:0.746667rem;
		em{
			font-size:0.346667rem;
			position:relative;
			top:-0.22rem;
			margin-left:0.133333rem;
		}
		span{
			display: inline-block;
		}
	}
</style>