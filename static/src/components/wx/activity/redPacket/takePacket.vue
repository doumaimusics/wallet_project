<template>
	<div id="packet">
		<wx-header v-if="!osType" :logo="'银行存管重磅上线'"></wx-header>
		<div class="main_wrap">
			<ul>
				<li v-for="(item,index) in packets">
					<p>今日剩余<span>{{item.remain}}</span>张</p>
					<div v-if="item.remain == 0" class="btn btn_over" @click="getOver()"></div>
					<div v-else-if=" item.isGet == 0 " class="btn" @click="toLogin(item.id,index)"></div>
					<div v-else-if=" item.isGet == 1 " class="btn btn_unuse" @click="getUnuse()"></div>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import wxHeader from '../../../wxHeader'; //头部引入
	import wxToapp from '../../../../common/wx/wxToapp';
	import { MessageBox } from 'mint-ui';
	
	export default {
		mixins:[wxToapp],
		data(){
			return {
				packets: [],
				arr:{},
				rank: ['20','60','88','460','680','188']

			}
		},
		methods: {
			getData(){
				this.notLogPost('/activity/doubleFestCele',(data) =>{

					if(data.resCode){
						this.packets = data.resData.remainList
					}
				},(this.osType ? {oauthToken:this.token}:{}),1);
			},
			toLogin(num,redP){
				if( !this.userId && !this.getCookie('userToken') ){
					MessageBox.confirm('快去登录,领取红包哦 ！').then(action => {
					  this.toApp('LG',{path:'/wxLogin',query:{thisUrl:this.$route.fullPath}})
					},action =>{});
					return
				}else if( this.userId || this.getCookie('userToken') ) {
					if(this.osType) this.arr.oauthToken = this.token;
					this.arr.ruleId = num
					this.notLogPost('/activity/getDoubleFestRedEnvelope',(data) =>{
						if(data.resCode){
							if(data.resCode == -1){
								MessageBox.confirm('快去登录,领取红包哦 ！').then(action => {
								  this.toApp('LG',{path:'/wxLogin',query:{thisUrl:this.$route.fullPath}})
								},action =>{});
							}else if(data.resCode == 6){
								  MessageBox.confirm('恭喜您已成功领取 ' + this.rank[redP] + '元出借红包', '提示',{
								  confirmButtonText: '去使用',
								  cancelButtonText: '取消'
								}).then(action => {
									this.toApp('WIP',{path:'/wxInvest',query:{thisUrl:this.$route.fullPath}},)
								  
								},action =>{
									this.getData()
								});
							}else if(data.resCode == 5){
								MessageBox.confirm('您还有领取的红包未使用，请使用后再领取', '提示',{
								  confirmButtonText: '去使用',
								  cancelButtonText: '取消'
								}).then(action => {
									this.toApp('WIP',{path:'/wxInvest',query:{thisUrl:this.$route.fullPath}},)
								  
								},action =>{});
							}else if( data.resCode == 2 ){
								MessageBox.alert('亲！当前活动还未开始。', '提示');
							}else if( data.resCode == 3 ){
								MessageBox.alert('亲！当前活动已经结束，请及时关注其他活动。', '提示');
							}else if( data.resCode == 4 ){
								MessageBox.alert('亲！当前红包为非法红包。', '提示');
							}
						}
					},this.arr,1)
				}
			},
			getUnuse(){
				MessageBox.confirm('使用该红包后才能领取其他红包。', '提示',{
				  confirmButtonText: '去使用',
				  cancelButtonText: '取消'
				}).then(action => {
					this.toApp('WIP',{path:'/wxInvest',query:{thisUrl:this.$route.fullPath}},)
				  
				},action =>{});
			},
			getOver(){
				MessageBox.alert('亲！今天发放红包已领完，请明天及时领取', '提示');
			},
		},
		components:{
			wxHeader,
		},
		created(){
			this. getData()
		},

	}
</script>
<style lang="scss" scoped>
	#packet{
		.main_wrap{
			width: 100%;
			height: 38.0rem;
			background: url(https://aliyunsso.edspay.com/web/wx/activity/redPacket/redPacketBg2.png?v1.4) no-repeat;
			background-size: 100%;
			ul{
				width: 90%;
				height: 20.306667rem;
				position: relative;
				top: 6.466667rem;
				left: 5%;
				li{
					width: 100%;
					height: 2.933333rem;
					margin-bottom: 0.533333rem;
					padding-top: 0.266667rem;
					position: relative;
					p{
						height: 1.226667rem;
						line-height: 1.226667rem;
						font-size: 0.32rem;
						color: #C9241E;
						text-align: right;
						padding-right: 0.533333rem;
						span{
							height: 1.226667rem;
						    color: #9D0C07;
						    line-height: 1.226667rem;
						    font-size: 0.48rem;
						    font-style: normal;
						}
					}
					.btn{
						background: url(https://aliyunsso.edspay.com/web/wx/activity/redPacket/take.png) no-repeat;
					    background-size: 100% 100%;
					    width: 1.906667rem;
					    height: 0.8rem;
					    position: absolute;
					    right: 0.533333rem;
					    top: 1.533333rem;
					}
					.btn_unuse{
						background: url(https://aliyunsso.edspay.com/web/wx/activity/redPacket/unuse.png) no-repeat;
					    background-size: 100% 100%;
					}
					.btn_over{
						background: url(https://aliyunsso.edspay.com/web/wx/activity/redPacket/over.png) no-repeat;
					    background-size: 100% 100%;
					}
				}
			}
		}
	}
</style>
