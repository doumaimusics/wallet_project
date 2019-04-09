<template>
	<div id="wxFind">
		<wx-header :type="type" :logo="'运营报告'" v-if="!osType"></wx-header>
		<div class="findList">
			<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="autoFill" ref="loadmore">
				<ul>
					<li v-for="(item, index) in findList">
						<a @click="toWxUrl('/info/newReportDetails','time',timeArr[index],'id',item.id)" v-if="item.oldAndNew">
							<img :src="item.picPath" alt="">
							<p>{{item.title}}</p>
						</a>
						<a :href="item.picUrl" v-else-if="item.picUrl">
							<img :src="item.picPath" alt="">
							<p>{{item.title}}</p>
						</a>
                        <!-- <a :to="{ path: '/info/reportDetails', query: { time:timeArr[index],id:item.id}}" v-else> -->
                        <a @click="next(timeArr[index], item.id)" v-else>
                            <img :src="item.picPath" alt="">
							<p>{{item.title}}</p>
                        </a>
					</li>
				</ul>
			</mt-loadmore>
			<div class="falFooter"></div>
		</div>
	</div>
</template>

<script>
	import wxToapp from "../../../../common/wx/wxToapp"; // APP交互函数
    import wxHeader from '../../../wxHeader';
	import { Loadmore } from 'mint-ui';
	export default {
		mixins:[wxToapp],
		data(){
			return {
                osType: '',	//是否在app
				allLoaded:false,
				autoFill:false,
				pageNum:1,
				pages:1,
				findList:[],
                timeArr:[],              // 新生成的时间数组用于详情页的查询依据
			}
        },
        props:['type'],
        // filters: {
        //     timeSing(time){
        //         let year = time.substr(0,4)+"年"
        //         let month = time.substr(5,2)
        //         parseInt(month) < 10 ? month = month.substr(1,1):''
        //         return year+month+"月份运营报告"
        //     }
        // },
		methods: {
			next(index, id){
				let query = this.$route.query
				query.time = index
				query.id = id
				this.$router.push({ path: '/info/reportDetails', query: query})
			},
            queryTime(time){
                var time1 = time.substr(0,7)
                var time2 = time1.replace("-","")
                return time2
            },
			loadTop(){
				var that = this;
				this.pageNum = 1;
				setTimeout(function(){
					that.getData(that.pageNum);
					that.$refs.loadmore.onTopLoaded();
					that.allLoaded = false;
				},800)
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
					}
					clearTimeout(timer)
				},500)
			},
			getData(num){
                let _this = this
				this.notLogPost('/index/getOperationList',(data) =>{
					if(data.resCode){
						if(num == 1){
							this.pages = data.resData.data.operationList.total;
							this.findList = data.resData.data.operationList.list;
                            this.findList.map(item => {_this.timeArr.push(_this.queryTime(item.addTime))})
						}else{
                            this.findList = this.findList.concat(data.resData.data.operationList.list);
                            _this.timeArr = []
                            this.findList.map(item => {_this.timeArr.push(_this.queryTime(item.addTime))})
                            console.log(_this.timeArr)
						}
					}
				},{size:6,num:num,view_client:1})
			}
		},
		components:{
			wxHeader,
		},
		created(){
            this.osType = this.$route.query.mobileType;
		    if (this.$route.query.osType) this.osType = this.$route.query.osType;
            this.getData(this.pageNum)  
	    }
	}
</script>

<style lang="scss">
	#wxFind{
		background: #F0EFF5;
		.falFooter{
			height:1.333333rem;
		}
		.findList ul li{   		/*    lang="scss"    */
			border-radius: .066667rem;
			margin: .266667rem ;
			font-size: .346667rem;
			line-height: .666667rem;
			text-align: right;
			overflow: hidden;
			background: #fff;
			img{
				display: block;
				height: 2.8rem;
				width: 100%;
			}
			p{
				padding-right: .266667rem;
			}
		}
	}  
	
</style>

