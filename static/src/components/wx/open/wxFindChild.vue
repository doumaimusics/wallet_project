<template>
	<div class="findList">
		<mt-loadmore v-if="findList.length" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="autoFill" ref="loadmore">
			<ul>
				<li v-for="item in findList">
					<a :href="item.url" v-if="item.url">
						<div class="text" :class="{preheat:item.period==0,on:item.period==1,off:item.period==2}">
							<h3>{{item.title}}</h3>
							<div class="time" v-if="flag == 'activity_area' && (item.activityStart || item.activityEnd)">{{item.activityStart}}至{{item.activityEnd}}</div>
							<div class="time" v-else-if="flag == 'activity_announce' && item.addTime">{{item.addTime}}</div>
						</div>
						<img :src="item.path" alt="">
					</a>
					<router-link :to="{path:'/wxAnnouncement',query:{id:item.id,nid:'activity_area'}}" v-else>
						<div class="text" :class="{preheat:item.period==0,on:item.period==1,off:item.period==2}">
							<h3>{{item.title}}</h3>
							<div class="time" v-if="flag == 'activity_area' && (item.activityStart || item.activityEnd)">{{item.activityStart}}至{{item.activityEnd}}</div>
							<div class="time" v-else-if="flag == 'activity_announce' && item.addTime">{{item.addTime}}</div>
						</div>
						<img :src="item.path" alt="">
						<!-- <p>{{item.addTime | divisionTime}}</p> -->
					</router-link>
				</li>
			</ul>
		</mt-loadmore>
		<wx-null v-else-if="isGetData" :img="'https://aliyunsso.edspay.com/web/wx/account/accountModify/null_bg.png'" :text="'暂无活动'"></wx-null>
		
	</div>
</template>

<script>
	import { Loadmore } from 'mint-ui';
	import wxNull from '../member/account/wxNull';
	export default {
		props:['flag','titleList'],
		data(){
			return {
				autoFill:false,
				pageNum:1,
				pages:1,
				findList:[],
				isover:true,
				isGetData:false,//接口数据还没加载出来
			}
		},
		computed:{
            allLoaded:{
            	get(){
	                console.log(this.flag+'=='+this.titleList.selected)
	                if(this.flag =='activity_area' && this.titleList.selected == 'tab-container1' && this.isover) return false  
	                else if(this.flag =='activity_announce' && this.titleList.selected == 'tab-container2' && this.isover) return false;   
	                else return true;
	            },
	            set(){}
            },
        },
		methods: {
			loadTop(){
				var that = this;
				this.pageNum = 1;
				setTimeout(function(){
					that.getData(that.pageNum);
					that.$refs.loadmore.onTopLoaded();
					that.isover = true;
				},800)
			},
			loadBottom(){
				var that = this;
				this.pageNum += 1;
				that.isover = false;
				var timer = setTimeout(function(){
					that.$refs.loadmore.onBottomLoaded();
					if(that.pages >= that.pageNum){
						that.getData(that.pageNum);
						that.isover = true;
					}
					clearTimeout(timer)
				},500)
			},
			getData(num){
				this.notLogPost('/article/selectlist',(data) =>{
					if(data.resCode){
						this.isGetData = true;
						if(num == 1){
							this.pages = data.resData.data.pages;
							this.findList = data.resData.data.list;
						}else{
							this.findList = this.findList.concat(data.resData.data.list);
						}
					}
				},{pageSize:10,pageNum:num,nid:this.flag})
			}
		},
		components:{
			wxNull,
		},
		created(){
	    	this.getData(this.pageNum) 
	    }
	}
</script>

<style lang="scss">
	.findList ul li{   		/*    lang="scss"    */
		border-radius: 0.106667rem;
		margin: 0.32rem auto;
		font-size: 0.293333rem;
		line-height: 0.813333rem;
		overflow: hidden;
		background: #fff;
		width: 9.466667rem;
		height: 4.746667rem;
		.text{
			width: 100%;
			height: 1.613333rem;
			padding-left: 0.266667rem;
			padding-top: 0.2rem;
			h3{
				font-size: 0.4rem;
				color: #333333;
				height: .5rem;
			}
			.time{
				font-size: 0.293333rem;
				color: #C5C5C5;
			}
		}
		.text.preheat{
			background: url(https://aliyunsso.edspay.com/web/wx/account/accountModify/ac_ico1.png) 7.933333rem 0rem no-repeat;
			background-size: 1.2rem 0.613333rem;
		}
		.text.on{
			background: url(https://aliyunsso.edspay.com/web/wx/account/accountModify/ac_ico2.png) 7.933333rem 0rem no-repeat;
			background-size: 1.2rem 0.613333rem;
		}
		.text.off{
			background: url(https://aliyunsso.edspay.com/web/wx/account/accountModify/ac_ico3.png) 7.933333rem 0rem no-repeat;
			background-size: 1.2rem 0.613333rem;
		}
		img{
			display: block;
			height: 3.133333rem;
			width: 100%;
		}
		p{
			padding-right: 0.266667rem;
		}

	}  
	
</style>

