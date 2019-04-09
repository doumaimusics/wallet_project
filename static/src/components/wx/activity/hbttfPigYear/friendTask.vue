
<!-- 分享出去的页面 -->
<template>
	<div id="task" :style="{height:fullHeight.minHeight}">
		<div v-title>好友红包</div>
		<div class="wrap">
			<!-- 滚动信息 -->
			<div class="k_scroll_box">
			    <div class="scroll_box clear">
			        <div class="scroll-div fl">
			            <ul>
			                <li v-for="item in scrollInfo" ref="messageList">{{item}}</li>
			            </ul>
			        </div>
			    </div>
			</div>
			<div class="timeFont" v-if="!gameTimeLimit && timeStatus == '3'">{{countdownTime.hr}}时{{countdownTime.min}}分{{countdownTime.secd}}秒 之后失效，仅能领取1个</div>
			<div class="timeFont" v-else>猪年红包已失效</div>

			<div class="down_app" :class="{overTime:gameTimeLimit || timeStatus != '3'}">
				<a href="http://android.myapp.com/myapp/detail.htm?apkName=com.rd.chux&ADTAG=mobile"></a>
			</div>
			
		</div>
		
	</div>
</template>
<script>
	import wxToapp from '../../../../common/wx/wxToapp';
	import jiami from 'js-base64';
	import { MessageBox } from 'mint-ui';
	import { Toast } from 'mint-ui'
	export default{
		mixins:[wxToapp],
		data(){
			return{
				friendId:'',//好友id
				coundTime:'',//倒计时差值
				countdownTime:{//倒计时
					hr:'00',
					min:'00',
					secd:'00',
				},
				scrollInfo:[
					'186****1930 获得30元现金',
					'185****9834 获得50元现金',
					'134****4839 获得100元现金',
					'135****2038 获得100元现金',
					'136****4320 获得50元现金',
					'137****4732 获得30元现金',
					'138****4938 获得100元现金',
					'130****2839 获得50元现金',
					'131****2098 获得100元现金',
					'132****2349 获得50元现金',
					'155****2930 获得30元现金',
					'156****2231 获得50元现金',
					'139****3940 获得50元现金',
					'150****4024 获得30元现金',
					'151****2034 获得50元现金',
					'152****3029 获得50元现金',
					'157****2158 获得100元现金',
					'159****0098 获得50元现金',
					'182****4572 获得50元现金',
					'183****3424 获得30元现金',
					'188****5384 获得50元现金',
					'187****4839 获得50元现金',
					'186****3408 获得50元现金',
					'185****5932 获得30元现金'
				],
				timer:null,
				fullHeight:{
					minHeight:document.documentElement.clientHeight+'px'
				},
				activityStatus:'',//活动时间状态
				timeStatus:'',//倒计时状态
				gameTimeLimit:false,//活动是否已结束
				beforeEndSt:true,//活动提前结束标注
			}
		},
		methods:{
			getData(){
				this.friendId = Base64.decode(this.$route.query.friendUi)
				console.log(this.friendId)
				this.getNotlogData('/pigred/friend',(data) =>{
					if( data.resCode == 1 ){
						this.coundTime = data.resData.between;
						this.timeStatus = data.resData.status;

						if( this.timeStatus == '3' ){
							this.startDate(this.coundTime);
						}else{
							clearInterval(this.interval);
						}
					}
				},{friendId:this.friendId},1)
			},

            countDown(val){   // 倒计时
				let t = Math.floor(val / 1000);  // 毫秒 => 秒
				let h = Math.floor(t / 3600)  // 时
				let m = Math.floor(t % 3600 / 60)  // 分
				let s = t % 60;  // 秒
				this.countdownTime.hr = h < 10 ? '0' + h : h;
				this.countdownTime.min = m < 10 ? '0' + m : m;				
				this.countdownTime.secd = s < 10 ? '0' + s : s;
            },
            startDate(T){
                this.interval = setInterval(() => {   // 倒计时
                    if(T < 1000){
                        clearInterval(this.interval);
                        this.getData();
                        this.acTimeOut = setTimeout(() => {
							this._getActivityTime()
                        },1000)
                    }

                    this.countDown(T);
                    T -= 1000;
   
                }, 1000);
            },
			// 活动时间
			_getActivityTime(){// 获取活动时间状态
				this.notLogPost('/activity/two/getActivityTime',data => {
					if(data.resCode){
						// this.activityStatus = data.resData.active;
						// if(data.resData.active != 1){
						// 	this.gameTimeLimit = true
						// }
						// this.ActivityPrompt()
						if(data.resData.active != 1){
							this.gameTimeLimit = true;
							this.beforeEndSt = false;
							this.ActivityPrompt()
						}else if(data.resData.active == 1){ // 因为活动提前下线，所以增加这个else if判断，正常情况是直接走if中的代码
							this.beforeEndSt = true;
							MessageBox.alert('亲，猪年红包已发完，活动结束！', '提示', {
							  confirmButtonClass: 'confirmButtonClass'
							})
						}
					}
				},{activityId:'pig_red_everyday'})
			},
			ActivityPrompt(type) { //显示弹框方法 type = 3 不判断活动结束
			  if (this.activityStatus == 2) {
			    MessageBox.alert('亲，活动尚未开始哦!', '提示', {
			      confirmButtonClass: 'confirmButtonClass'
			    })
			  } else if (this.activityStatus == 3 && type != 3) {
			    MessageBox.alert('亲，活动已经结束啦!', '提示', {
			      confirmButtonClass: 'confirmButtonClass'
			    })
			  } else if (this.activityStatus == 4) {
			    MessageBox.alert('亲，活动已经失效啦!', '提示', {
			      confirmButtonClass: 'confirmButtonClass'
			    })
			  }
			},
		},
		mounted() {
			var that = this;
			$(document).ready(function(){
			    clearInterval(that.timer)
			    that.timer = window.setInterval(function(){
		            $('.scroll-div').find("ul:first").animate({
		                marginTop: -that.$refs.messageList[0].offsetHeight + 'px'
		            },500,function(){
		                $(this).css({marginTop:"0"}).find("li:first").appendTo(this);
		            });
			    },3000);
			});
		},
		created(){
			this._getActivityTime();
			this.getData();
		},
		destroyed(){
		    clearInterval(this.timer);
		},
	}
</script>
<style lang="scss" scoped>
	#task{
		position: relative;
		width: 100%;
		min-height: 16.08rem;
		background: url(https://aliyunsso.edspay.com/web/wx/activity/sendRedPacket/task.jpg?v1.1) no-repeat;
		background-size: 100%;
		.wrap{
		    padding-top: 2.85rem;
			width: 100%;
			height: 16.08rem;
		}
		.down_app{
			width: 5.56rem;
			height: 1.24rem;
			background: url(https://aliyunsso.edspay.com/web/wx/activity/sendRedPacket/downBtn.gif) no-repeat;
			background-size: 100%;
			position: relative;
			left: 2.266667rem;
			top: 6.5rem;
			a{
				display: inline-block;
				width: 100%;
				height: 100%;
			}
		}
		.down_app.overTime{
			background: url(https://aliyunsso.edspay.com/web/wx/activity/sendRedPacket/down_off.gif) no-repeat;
			background-size: 100%;
		}
		.timeFont{
			font-family: SourceHanSansCN-Regular;
			font-size: 0.266667rem;
			color: #ac6d01;
			text-align: center;
		}
		.k_scroll_box{
		    position: relative;
		    height: 0.506667rem;
		    margin-bottom: 3.5rem
		}
		.scroll_box{
		    position: relative;
		    height: 0.506667rem;
		    width: 4.826667rem;
		    margin: 0 auto;
		    padding-top: .03rem;
		}
		.scroll-div{
		    position: relative;
		    width: 100%;
		    height: 0.506667rem;
		    text-align: center;
		    font-family: SourceHanSansCN-Regular;
		    font-size: 0.293333rem;
		    color: #fefefe;
		    overflow: hidden;
		    li{
		        width: 100%;
		        white-space: nowrap;
		        overflow: hidden;
		        height: .613333rem;
		        text-overflow: ellipsis;
		    }
		}
	}
</style>