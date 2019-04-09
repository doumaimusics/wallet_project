<template>
	<div class="password">
		<div class="wrraper">
			<ul class="key">
				<li v-for="(item,index) in keyList" @click="keyCheck(index,item)" class="bdr-b bdr-lf">{{item.keyText}}</li>
				<li class="bg" @click="delePwd"></li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				keyList: [
					{keyText: '1'},
					{keyText: '2'},
					{keyText: '3'},
					{keyText: '4'},
					{keyText: '5'},
					{keyText: '6'},
					{keyText: '7'},
					{keyText: '8'},
					{keyText: '9'},
					{keyText: ''},
					{keyText: '0'},
				],
			}
		},
		props:['keyCheck','delePwd','closeBth'],
		created() {
		}
	}
</script>

<style lang="scss" scoped>
	.password{
		font-family: PingFangSC-Regular;
		.wrraper{
			position: absolute;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 5.7rem;
			background: #f8f8f8;
			.complete{
				width: 100%;
				height: 1.173333rem;
				background: #f5f5f7;
				position: relative;
				span{
					font-size: 0.4rem;
					color:#000000;
					float: right;
					line-height: 1.173333rem;
					margin-right: 0.44rem;
				}
			}
			.key{
				width: 100%;
				height: 5.76rem;
				background: #ffffff;
				li{
					width: 33.3%;
					height: 1.44rem;
					text-align: center;
					line-height: 1.44rem;
					float: left;
					font-size: 0.533333rem;
					color:#000000;
					position: relative;
					-webkit-tap-highlight-color: #e5e5e5 !important;
				}
				li.bg,li:nth-child(10){
					background-color: #d1d5db;
					border-bottom: 0;
				}
				li.bg{
					background: #d1d5db url(https://aliyunsso.edspay.com/web/wx/pointToPoint/guanbi.png) center center no-repeat;
					background-size: 0.626667rem 0.453333rem;
				}
				li:nth-child(11){
					border-bottom: 0;
				}
				li:nth-child(1):before,li:nth-child(4):before,li:nth-child(7):before,li:nth-child(10):before{
					border-left:0;
				}
			}
		}
		.bdr-bt:after {
		    height: 1px;
		    content: '';
		    width: 100%;
		    border-bottom: 1px solid #e5e5e5;
		    position: absolute;
		    top: 0;
		    right: 0;
		    transform: scaleY(0.5);
		    -webkit-transform: scaleY(0.5);
		    z-index: 10;
		}
		.bdr-lf:before {
		    height: 100%;
		    content: '';
		    width: 1px;
		    border-left: 1px solid #e5e5e5;
		    position: absolute;
		    top: 0;
		    left: 0px;
		    transform: scaleX(0.5);
		    -webkit-transform: scaleX(0.5);
		    z-index: 10;
		}
	}
</style>