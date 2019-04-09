<template>
	<div id="Announcement">
		<div v-title>{{title}}</div>
		<div class="header" v-if="title == '行业新闻'">
			<div class="news-title"><span v-if="dataContent.isTop == 1"></span>{{dataContent.title}}</div>
			<div class="news-face clear">
				<span class="face"><img :src="dataContent.logoUrl" alt=""></span>
				<span class="origin"> <span v-html="dataContent.titleView"></span><i></i></span>
				<span class="time">{{dataContent.startTime}}</span>
			</div>
			<div class="line bdr-b"></div>
		</div>
		<div class="content" :class="{top1:title == '行业新闻'}">
			<div class="title" v-if="title != '行业新闻'">{{dataContent.title}}</div>
			<div class="addTime" v-if="title != '行业新闻'">{{dataContent.startTime}}</div>
			<div v-html="dataContent.content"></div>
		</div>
	</div>
</template>

<script>
	import wxToapp from '../../../common/wx/wxToapp';
	export default{
		mixins:[wxToapp],
		data(){
			return{
				title:'',
				dataContent:'',
				newsId:''
			}
		},
		components:{
			
		},
		methods:{
			getListData(){
				let _nid = ''
				if (this.$route.query.nid) {
					if(this.$route.query.nid == 'news') {
						this.title = '媒体报道'
					} else if(this.$route.query.nid == 'e_friend') {
						this.title = 'E友见面会'
					}else if(this.$route.query.nid == 'tradeNews') {
						this.title = '行业新闻'
					} else {
						this.title = '活动详情'
					}
					_nid = this.$route.query.nid
				} else{
					this.title = '平台公告'
					_nid = 'notice'
				}
				this.notLogPost('/index/article',(data) =>{
					if(data.resCode){
						this.dataContent= data.resData.data.nowArticle;
					}
				},{id:this.$route.query.id,nid:_nid},1)
			}
		},
		created(){
			this.getListData()
		},
		mounted(){
			var height = document.documentElement.clientHeight; //获取设备的宽度
			//动态的为根元素设置字体的大小
			$('#Announcement').css('min-height',height)
		},
		activated(){
			if(this.newsId != this.$route.query.id){
				this.newsId = this.$route.query.id
				this.getListData()
			}
		},
	}
</script>

<style lang="scss">

	#Announcement{
		background: #fff;
		text-align: justify;
		overflow: hidden;
		.content{
			padding: .933333rem .666667rem;
			.title{
				width: 8.333333rem;
				line-height: .6rem;
				text-align: center;
				font-family: PingFangSC-Regular;
				font-size: .426667rem;
				color: #333333;
				letter-spacing: .01rem;
				margin: 0 auto .373333rem;
			}
			.addTime{
				font-family: PingFangSC-Regular;
				font-size: .293333rem;
				color: #666666;
				letter-spacing: 0;
				line-height: .4rem;
				margin-bottom: .626667rem;
			}
			p{
				font-family: PingFangSC-Regular;
				font-size: .346667rem;
				color: #666666;
				/*letter-spacing: 0;*/
				line-height: .666667rem;
				margin-bottom: .4rem;
				text-indent: 2em;
				overflow: hidden;
				width: 100%;
			}
			video{
				width: 100%;
				height: 100%;
			}
			center{
			    display: block;
			    margin-bottom: .4rem;
			}
		}
		.content.top1{
			padding: 0.4rem .666667rem .933333rem;
		}
		img{
			float: left;
			width: 100%!important;
		}
		.header{
			padding: 0.533333rem 0.533333rem 0rem;
			position: relative;
			.news-title{
				position: relative;
				font-family: PingFangSC-Medium;
				font-size: 0.48rem;
				color: #333333;
				line-height: 0.8rem;
				margin-bottom: 0.4rem;
				span{
					display: inline-block;
					width: 0.746667rem;
					height: 0.373333rem;
					background: url(https://aliyunsso.edspay.com/web/riskEducation/set_top_ico.png) no-repeat;
					background-size: 0.746667rem 0.373333rem;
					margin-right: 0.133333rem;
				}
			}
			.news-face{
				height: 0.72rem;
				position: relative;
				margin-bottom: 0.4rem;
				.face{
					display: inline-block;
					width: 0.72rem;
					height: 0.72rem;
					border-radius: 0.36rem;
					overflow: hidden;
					img{
						width: 0.72rem;
						height: 0.72rem;
					}
				}
				.origin{
					font-family: PingFangSC-Regular;
					font-size: 0.32rem;
					color: #333333;
					// line-height: 0.72rem;
					position: relative;
				    top: -.253rem;
				    margin-right: 0.133333rem;
					i{
						display: inline-block;
						width: 0.693333rem;
						height: 0.32rem;
						background: url(https://aliyunsso.edspay.com/web/riskEducation/offical_ico.png) no-repeat;
						background-size: 0.693333rem 0.32rem;
					    top: 0.05rem;
					    position: relative;
						margin-left: 0.133333rem;
					}
				}
				.time{
					font-family: PingFangSC-Regular;
					font-size: 0.32rem;
					color: #808080;
					line-height: .72rem;
					position: absolute;
					right: 0;
				    // top: -.2rem;
				}
			}
			.line{
				height: 2px;
				position: relative;	
			}
		}
	}
</style>