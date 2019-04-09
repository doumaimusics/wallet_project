<template>
	<div id="Message">
		<div v-title>消息中心</div>
		<ul>
			<li class="bdr-b clear" v-for="item in dataList" @click="toPages(item.type)">
				<div class="img1 fl">
					<img :src="listImg[item.type-1]" alt="">
				</div>
				<div class="fl contain">
					<p class="title_info clear">
						<span class="span1 fl">{{item.type==1 ? '用户通知':'平台公告'}}
							<i v-if="item.allRead==0 && item.type==1 && item.unreadCount < 100" :class="{twoNum:10 <= item.unreadCount && item.unreadCount <= 99}">{{item.unreadCount}}</i>
							<i v-else-if="item.allRead==0 && item.type==1 && item.unreadCount > 99" class="messegeMore">99+</i>
						</span>
						<span class="span2 fr" v-if="item.title">{{item.time}}</span></p>
					<p class="info">{{item.title ? item.title:'暂无消息'}}</p>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import wxTab from '../../../public/wx/wxTab';	//头部tab切换

	import { TabContainer, TabContainerItem } from 'mint-ui';
	export default {
		data(){
			return {
				dataList:[],//消息列表
				listImg:[
					'https://aliyunsso.edspay.com/web/wx/account/accountModify/msg_ico2.png',
					'https://aliyunsso.edspay.com/web/wx/account/accountModify/msg_ico1.png'
				],
			}
		},
		methods:{
			getData(){
				this.postData('/message/latestMessage',(res,data)=>{
					if(data.resCode){
						this.dataList = data.resData.list
					}
				},{})
			},
			toPages(type){
				if(type == 1){
					this.$router.push({path:'/wxMyAccount/wxMessageChild',query:{flag:2}})
				}else if(type == 2){
					this.$router.push({path:'/wxMyAccount/wxMessageChild',query:{flag:1}})
				}
			}
		},
		components:{
			wxTab,
		},
		created(){
			this.getData()
		}

	}
</script>

<style lang="scss" scoped>
	#Message{
		ul{
			background: #ffffff;
			position: relative;
			li{
				height: 1.906667rem;
				position: relative;
				div{
					height: 1.906667rem;
				}
				.img1{
					width: 1.6rem;
					padding: 0.506667rem 0 0 0.4rem;
					img{
						width: 0.933333rem;
						height: 0.933333rem;
					}
				}
				.contain{
					padding-top: 0.4rem;
					p .span1{
						font-size: 0.373333rem;
						color: #333333;
						i{
							font-family: PingFangSC-Medium;
							display: inline-block;
							height:0.373333rem;
							width:0.373333rem;
							font-size: 0.293333rem;
							color: #FFFFFF;
							text-align: center;
							border-radius:0.186667rem;
							background: #FF5B4C;
							position: relative;
    						margin-left: 0.066667rem;
    						line-height: 0.373333rem;
						}
						i.twoNum{
							width: 0.573333rem;
						}
						i.messegeMore{
							width: 0.7rem;
							height: 0.4rem;
							line-height: 0.4rem;
						}
					}
					p .span2{
						font-size: 0.293333rem;
						color: #808080;
					}
					p{
						font-size: 0.32rem;
						color: #808080;
						width: 7.946667rem;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
					p.title_info{
						margin-bottom: 0.133333rem;
					}
				}
			}
		}
		
	}
</style>