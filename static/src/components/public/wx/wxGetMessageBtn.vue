<template>
	<div class="messageBtn">
		<div class="message fl" v-if="showBtn" @click="send">{{btnText}}</div>
		<div class="message second fl" v-else>{{time}}秒</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {

			}
		},
		methods:{
			
		}
	}
</script>

<style lang="scss" scoped>
	.messageBtn{
		display:inline-block;
		.message{
			background:#FF5A54;
			color:#fff;
			float:right;
			border-radius:4px;
			font-size: 0.373333rem;
			line-height:0.693333rem;
			padding: 0 0.16rem;
		}
		.second{
			background:#f3f3f3;
			color:#508cee;
		}
	}
</style>