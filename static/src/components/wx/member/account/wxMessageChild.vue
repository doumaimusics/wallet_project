<template>
	<div class="msg">
		<div v-if="messageList.length != 0">
			<mt-loadmore class="mtContent" :bottomPullText="''" :bottomDropText="''" :bottomLoadingText="''" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="autoFill">
				<ul class="notice">
					<li v-for="(item,inedx) in messageList" :class="{hasClick:flag == 2 && item.status == 1}"   @click="listClick(item)">
						<div class="title clear">
							<div class="text fl">{{item.title}} <div v-if="flag == 2 && item.status == 0" class="new"></div></div>
						</div>
						<div class="main_text" :class="{padd:flag == 2}"  v-if="flag == 2" v-html="item.content"></div>
						<div class="time">{{item.addTime}}</div>
					</li>
				</ul>
				<div class="footer-div" v-if="onOff">
					没有更多数据了
				</div>
			</mt-loadmore>
			<div class="out_box" v-if="messageList.length != 0 && flag == 2"><div class="allRead" :class="{actived:isGray==0 || allReads==1}" @click="allRead()">全部已读</div></div>
		</div>
		<account-null v-else-if="isGetData" :img="'https://aliyunsso.edspay.com/web/wxUpdate/signal_null.png'" :text="nullText"></account-null>
		
	</div>
</template>

<script>
	import { Loadmore } from 'mint-ui';
	import { TabContainer, TabContainerItem } from 'mint-ui';
	import accountNull from './wxNull'
	export default {
		data(){
			return {
				clickColor:false,
				autoFill:false,
				messageList:[],
				pages:1,
				pageNum:1,
				isover:true,
				allLoaded:false,
				isGray:1,// 0：全部已读 1：还有未读完
				listImg:[
					'https://aliyunsso.edspay.com/web/wx/account/accountModify/user_notice_ico2.png',
					'https://aliyunsso.edspay.com/web/wx/account/accountModify/user_notice_ico1.png'
				],
				dataUrl:['/index/noticelist','/message/messageList'],
				nullText:'',
				allReads:0,//点击每一项
				isGetData:false,//接口数据还没加载出来
				onOff:false,//显示列表最后一句提示语
			}
		},
		methods:{
			loadTop(){
				var that = this;
				this.pageNum = 1;
				setTimeout(function(){
					this.autoFill = true;
					that.allLoaded = false;
					that.getData(that.pageNum);
					that.$refs.loadmore.onTopLoaded();
				},800)
				console.log(this.allLoaded);
			},
			loadBottom(){
				var that = this;
				this.pageNum += 1;
				this.allLoaded = true;
				var timer = setTimeout(function(){
					that.$refs.loadmore.onBottomLoaded();
					if(that.pages >= that.pageNum){
						that.getData(that.pageNum);
						that.allLoaded = false;
					}else{
						that.onOff = true;
					}
					clearTimeout(timer)
				},500)
			},
            getData(num){
            	this.postData(this.dataUrl[this.flag-1],(res,data) =>{
            		if(data.resCode){
            			this.isGetData = true;
            			this.pages = data.resData.data.pages;
            			if(this.flag == 2){
            				this.isGray = data.resData.isGray
            			}
            			if(num == 1){
            				this.messageList = data.resData.data.list;
            			}else{
            				this.messageList = this.messageList.concat(data.resData.data.list);
            				console.log(this.messageList)
            			}
            		}
            	},{pageNum:num,pageSize:8});
            },
            listClick(item){
            	if(this.flag == 2 && item.status == 0){
            		this.postData('/message/batchUpdateMessage',(res,data) =>{
            			if(data.resCode){
            				this.allReads = data.resData.allRead
            				item.status = 1;
            			}
            			
            			
            		},{messageIds:item.id,status:1})
            	}else if(this.flag == 1){
            		this.$router.push({path:'/wxAnnouncement',query:{id:item.id}})
            	}
            },
            // 全部已读
            allRead(){
            	if(this.isGray == 1 || this.allReads==0){
            		this.postData('/message/allRead',(res,data) =>{
            			if(data.resCode){
            				if(data.resData.flag){
            					this.getData(this.pageNum)
            				}
            			}
            			
            		},{})
            	}
            }
		},
		created(){
			this.flag = this.$route.query.flag;
			if(this.$route.query.flag == 1){
				this.nullText = '暂无通告'
			}else if(this.$route.query.flag == 2){
				this.nullText = '暂无用户通知'
			}
			this.getData(this.pageNum)
		},
		components:{
			accountNull,
		},
	}
</script>

<style lang="scss" scoped>
	.msg{
		position: relative;
	}
	.mtContent{
		min-height:16.453333rem;
	}
	.hasClick{
		color:#808080!important;
	}
	.nothing{
		width: 100%;
		height: 1.6rem;
	}
	.notice{
		padding-top: 0.293333rem;
		li{
			background: #fff;
			margin-bottom: 0.293333rem;
			color:#333;
			padding-left:0.533333rem;
			padding-right: 0.533333rem;
			.title{
				padding: 0.48rem 0.16rem 0 0;
				font-size:0.4rem;
				line-height:0.373333rem;
				img{
					height:0.373333rem;
					width:0.8rem;
					float:left;
					margin-right: 0.186667rem;
				}
				.text{
					position:relative;
					font-size: 0.373333rem;
					color: #333333;
					.new{
						height:0.16rem;
						width:0.16rem;
						background:#ff5a4a;
						border-radius:50%;
						position:absolute;
						right:-0.25rem;
						top:0.106667rem;
					}
				}
			}
			.main_text{
				font-size: 0.32rem;
				color: #808080;
				padding-top: 0.266667rem;
				line-height: .55rem;
				text-align: justify;
			}
			.time{
				font-size: 0.293333rem;
				color: #808080;
				line-height:0.4rem;
				padding-top:0.266667rem;
				padding-bottom:0.293333rem;
				
			}
			.time.padd{
				padding-left: 0.933334rem;
			}
			.content{
				padding-bottom:0.32rem;
				font-size:0.4rem;
				line-height:0.48rem;
			}
		}
	}
	.out_box{
		position: relative;
		width: 100%;
		height: 1.6rem;
		.allRead{
			width: 100%;
			height: 1.6rem;
			line-height: 1.6rem;
			font-size: 0.426667rem;
			color: #FF5C4B;
			position: fixed;
			left: 0;
			bottom: 0;
			text-align: center;
			background: #FFFFFF;
			box-shadow: 0 0 12px 0 rgba(0,0,0,0.12);
		}
		.allRead.actived{
			color: #D0D0D0;
		}
	}
	.footer-div {
		font-size: .293333rem;
		color: #C1C1C1;
		line-height: .533333rem;
		text-align: center;
	    margin: 0.44rem 0rem 0.4rem 0rem;
	}
	
</style>