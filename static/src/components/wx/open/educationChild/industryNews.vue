<!-- 行业新闻 -->
<template>
	<div id="news">
		<mt-loadmore v-if="tradeNews.length" class="mtContent" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="autoFill">
			<ul>
				<li v-for="(item,index) in tradeNews" :class="{bdrB: index != tradeNews.length-1,marTop:index != 0}">
					<div class="news-header clear">
						<div class="news-face fl"><img :src="item.logoUrl" alt=""></div>
						<div class="fl news-origin">
							<p class="news-ori"><span v-html="item.titleView"></span> <i class="offical-ico"></i></p>
							<p class="news-addtime">{{item.startTime}}</p>
						</div>
					</div>
					<router-link :to="'/risk/wxAnnouncement?id=' + item.id + '&nid=tradeNews'">
						<div class="news-title"><span class="set-top" v-if="item.isTop == 1"></span>{{item.title}}</div>
						<p class="news-introdution">{{item.introduction}}... <span>全文</span></p>
						<div class="news-imgs clear" v-if="item.imgUrlOne">
							<div class="img-box" :class="{onlyOne:!item.imgUrlTwo && !item.imgUrlThree,onlyTwo:!item.imgUrlThree}"><img :src="item.imgUrlOne" alt=""></div>
							<div class="img-box" :class="{onlyTwo:!item.imgUrlThree}" v-if="item.imgUrlTwo"><img :src="item.imgUrlTwo" alt=""></div>
							<div class="img-box lastChild" v-if="item.imgUrlThree"><img :src="item.imgUrlThree" alt=""></div>
						</div>
					</router-link>
				</li>
			</ul>
		</mt-loadmore>
		<!-- 底部文字 -->
		<div class="nav" v-if="allLoaded">
		    <div class="navBox">
		        <div class="navLeft fl"></div>
		        <div class="navFont fl">没有更多了</div>
		        <div class="navRight fl"></div>
		    </div>
		</div>
	</div>
</template>
<script>
	import wxToapp from '../../../../common/wx/wxToapp.js';   // 与app交互
	export default {
		mixins: [wxToapp],
		data () {
			return {
				tradeNews:[],
				pages:1,
				pageNum:1,
				allLoaded:false,
				onOff:false,
				autoFill:false
			}
		},
		methods:{
            postFun(n){    // nid参数  返回条数
                this.notLogPost('/index/getLawRuleList',(data) =>{
					if(data.resCode){
                        this.pages = data.resData.data.pages;
                        if(n == 1){
                        	this.tradeNews = data.resData.data.list;
                        }else{
                        	this.tradeNews = this.tradeNews.concat(data.resData.data.list);
                        }

                        n == data.resData.data.pages ? this.allLoaded = true : this.allLoaded = false
					}
				},(this.osType ? {oauthToken:this.token, nid: 'tradeNews', pageNum: n, pageSize: 10}:{nid: 'tradeNews', pageNum: n, pageSize: 10}),1)
            },

            loadBottom(){
                this.pageNum++
                setTimeout(() => {
					this.postFun(this.pageNum);
					this.$refs.loadmore.onBottomLoaded();
				},500)
            }
		},
		created(){
			this.postFun(this.pageNum)
		}

	}
</script>
<style lang="scss" scoped>
	#news{
		position: relative;
		background:#ffffff;
		font-family: PingFangSC-Regular;
		ul{
			padding: 0.4rem 0.533333rem 0;
			background:#ffffff;
			li{
				position: relative;
				padding-bottom:0.666667rem;
				.news-header{
					height: 0.96rem;
					margin-bottom: 0.373333rem;
					.news-face{
						width: 0.96rem;
						height: 0.96rem;
						border-radius: 0.48rem;
						background:#ccc;
						margin-right: 0.266667rem;
						overflow: hidden;
						img{
							width: 0.96rem;
							height: 0.96rem;
						}
					}
					.news-origin{
						position: relative;
						.news-ori{
							font-size: 0.346667rem;
							color: #333333;
							position: relative;
							.offical-ico{
								display: inline-block;
								width: 0.693333rem;
								height: 0.32rem;
								background: url(https://aliyunsso.edspay.com/web/riskEducation/offical_ico.png) no-repeat;
								background-size: 0.693333rem 0.32rem;
							    top: 0.05rem;
							    position: relative;
							}
						}
						.news-addtime{
							font-size: 0.32rem;
							color: #808080;
						}
						
					}
				}
				.news-title{
					font-size: 0.4rem;
					color: #333333;
					margin-bottom: 0.133333rem;
					position: relative;
					.set-top{
						display: inline-block;
						width: 0.746667rem;
						height: 0.373333rem;
						background: url(https://aliyunsso.edspay.com/web/riskEducation/set_top_ico.png) no-repeat;
						background-size: 0.746667rem 0.373333rem;
						margin-right: 0.133333rem;
					}
				}
				.news-introdution{
					font-size: 0.346667rem;
					color: #808080;
					margin-bottom: 0.4rem;
					span{
						font-size: 0.346667rem;
						color: #508CEE;
					}
				}
				.news-imgs{
					position: relative;
					.img-box{
						width: 2.666667rem;
						height: 1.666667rem;
						margin-right: 0.266667rem;
						position: relative;
						z-index: 1;
						border-radius: 0.053333rem;
						float: left;
						z-index: 1;
						border-radius: 0.053333rem;
						overflow: hidden;
					}
					.img-box.onlyTwo{
						width: 4.0rem;
						height: 2.506667rem;
					}
					img{
						width: 100%;
						position: absolute;
						height: 100%;
						left: 0;
						top: 0;
					}
					.img-box.lastChild{
						margin-right: 0;
					}
					.img-box.onlyOne{
						width: 5.333333rem;
						height: 3.333333rem;
					}
					.more-img{
						position: absolute;
						background:rgba(0,0,0,.7);
						top: 0;
						left: 6.13rem;;
						z-index: 3;
						width: 2.667rem;
					    height: 2.666667rem;
					    text-align: center;
					    font-size: 0;
					    line-height: 2.666667rem;
					    border-radius: 0.053333rem;
					    span{
					    	display: inline-block;
					    	width: 0.133333rem;
					    	height: 0.133333rem;
					    	border-radius: 0.066667rem;
					    	background: #ffffff;
					    	margin-right: 0.133333rem;
					    }
					    span.lastSp{
					    	margin-right: 0;
					    }
					}
				}
			}
			li.marTop{
				padding-top: 0.64rem;
			}
			li.bdrB::after{
			    height: 1px;
			    content: '';
			    width: 100%;
			    border-bottom: 1px solid #e5e5e5;
			    position: absolute;
			    bottom: 0;
			    right: 0;
			    transform: scaleY(0.5);
			    -webkit-transform: scaleY(0.5);
			    z-index: 2;
			}
		}
		.nav{
		    width: 100%;
		    height: 1.706667rem;
		    text-align: center;
		    .navBox{
		        // height: 1010%;
		        margin: 0 auto;
		        display: inline-block;
		        .navLeft,.navRight{
		            width: 0.32rem;
		            height: 0.026667rem;
		            background: #c1c1c1;
		            margin-top: .84rem;
		            opacity: .8;
		        }
		        .navFont{
		            font-family: PingFangSC-Regular;
		            font-size: .266667rem;
		            color: #C1C1C1;
		            line-height: 1.706667rem;
		            margin: 0 .266667rem;
		        }
		    }
		}
	}
</style>