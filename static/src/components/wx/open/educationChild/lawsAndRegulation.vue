<!-- 法律法规 -->
<template>
	<div id="laws">
		<mt-loadmore v-if="lawRule.length" class="mtContent" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="autoFill">
		    <ul>
		        <li v-for="(item, index) in lawRule" :class="{bdrB: index != lawRule.length-1}">
		            <a :href="item.content">
		                <div class="title">{{item.title}}</div>
		                <div class="time">{{item.startTime ? item.startTime:'0' | divisionTime }}</div>
		            </a>
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
		data () {
			return {
				lawRule:[],
				pages:1,
				pageNum:1,
				allLoaded:false,
				onOff:false,
				autoFill:false
			}
		},
		methods:{
            postFun(n){    // 返回条数
                this.notLogPost('/index/getLawRuleList',(data) =>{
					if(data.resCode){
						this.pages = data.resData.data.pages;
                        if(n == 1){
                        	this.lawRule = data.resData.data.list;
                        }else{
                        	this.lawRule = this.lawRule.concat(data.resData.data.list);
                        }
                        n == data.resData.data.pages ? this.allLoaded = true : this.allLoaded = false
					}
				},(this.osType ? {oauthToken:this.token, nid: 'lawRule', pageNum: n, pageSize: 10}:{nid: 'lawRule', pageNum: n, pageSize: 10}),1)
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
	#laws{
		position: relative;
		ul{
			padding: 0 0.533333rem;
			background:#ffffff;
			a{
				display: block;
			}
			li{
				height: 1.733333rem;
				padding-top: 0.32rem;
				position: relative;
				clear: both;
				background: url(https://aliyunsso.edspay.com/web/riskEducation/right_go.png) 8.64rem 0.733333rem no-repeat;
				background-size: 0.32rem 0.32rem;
				.title{
					width: 7.306667rem;
					height: 0.533333rem;
					line-height: 0.533333rem;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					font-family: PingFangSC-Medium;
					font-size: 0.373333rem;
					color: #333333;
					margin-bottom: 0.133333rem;
				}
				.time{
					font-family: PingFangSC-Regular;
					font-size: 0.32rem;
					color: #808080;
				}
			}
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