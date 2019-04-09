<template>
	<div class="pop">
		<div id="layer">
			<div class="contain">
				<div class="complete bdr-b">
					<span class="close" @click="complete"></span>
					<span class="comp_btn" @click="complete">完成</span>
				</div>
				<div>
					<mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
				</div>
			</div>
			
		</div>
	</div>
</template>
<script>
	import { Picker } from 'mint-ui';
	export default {
		props:['thisShow','values'],
		data(){
			return{
				// slots: [
			 //        {
			 //          flex: 1,
			 //          values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
			 //          className: 'slot1',
			 //          textAlign: 'right'
			 //        }, {
			 //          flex: 1,
			 //          values: ['2016-01', '2016-02', '2016-03', '2016-04', '2016-05', '2016-06'],
			 //          className: 'slot2',
			 //          // textAlign: 'middle'
			 //        }, {
			 //          flex: 1,
			 //          values: ['2017-01', '2017-02', '2017-03', '2017-04', '2017-05', '2017-06'],
			 //          className: 'slot3',
			 //          textAlign: 'left'
			 //        }
			 //    ]
			}
		},
		methods:{
			complete(){
				this.thisShow.show = false

			},
			// onValuesChange(picker, values){
			// 	console.log(values[0])
			// 	console.log(values[1])
			// 	console.log(values[2])
			// 	this.values.province = values[0]
			// 	this.values.city = values[1]
			// 	this.values.county = values[2]
			// }
		}
	}
</script>
<style lang="scss" scoped>
	.pop{
		#layer{
			width:100%;
			height:100%;
			background:rgba(0,0,0,.5);
			position:fixed;
			top:0;
			z-index:888;
			.contain{
				width: 100%;
			    height: 9.453333rem;
				position: absolute;
				left: 0;
				bottom: 0;
				background:#ffffff;
				z-index: 999;
			}
			.complete{
				height: 1.2rem;
				background:#ffffff;
				position: relative;
				padding-left: 0.4rem;
				padding-right: 0.4rem;
				.close{
					display: inline-block;
					width: 0.426667rem;
					height: 0.466667rem;
					background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/addr_close.png) no-repeat;
					background-size: 100%;
					position: relative;
					top: 0.4rem;
				}
				.comp_btn{
					font-family: PingFangSC-Medium;
					font-size: 0.453333rem;
					color: #508CEE;
					display: inline-block;
					float: right;
					line-height: 1.2rem;
				}
			}
		}
	}
</style>