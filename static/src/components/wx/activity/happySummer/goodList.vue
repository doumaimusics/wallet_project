<template>
    <div id="goodList">
    	<div v-title>领取记录</div>
    	<div class="goodListBox" ref="goodUl">
	    	<ul v-if="goodList.length != 0">
	    		<li v-for="item in goodList" class="bdr-b">
	    			<img :src="'https://aliyunsso.edspay.com/web/wx/activity/happySummer/goodList/goodlList'+item.commodityId+'.png'" alt="" class="goodImg fl">
	    			<div class="content fl">
	    				<div class="name">{{item.commodityName}}</div>
	    				<div class="time">{{item.addTime}}</div>
	    			</div>
	    		</li>
	    	</ul>
	    	<div v-else-if="hasGetData" class="null" :style="{height:fullHeight+'px'}" >
	    	    <div class="nullPic"></div>
	    	</div>
    	</div>
    </div>
</template>

<script>
	import wxToapp from '../../../../common/wx/wxToapp'; // app交互 
    export default{
    	mixins:[wxToapp],
    	data(){
    		return{
    			goodList:[],
    			hasGetData:false,
    			fullHeight:0,
    		}
    	},
    	methods:{
    		getGoodList(){
    			this.getAppData('/activity/happy/recordComm',(data)=>{
    				if(data.resCode){
    					this.hasGetData = true;
    					this.goodList = data.resData.happyRecordModels;
    				}
    			},{})
    		}
    	},
    	created(){
    		this.getGoodList();
    	},
    	mounted(){
    		this.PassValue('NavWhite_领取记录');
    		this.fullHeight = document.documentElement.clientHeight; //获取设备的宽度
    		this.$refs.goodUl.style.minHeight = this.fullHeight + 'px';
    	}
    }
</script>

<style lang="scss" scoped>
    #goodList{
		ul{
			padding: 0 0.533333rem;
			background:#fff;
			li{
				height: 2.4rem;
				position: relative;
				.goodImg{
					height:1.866667rem;
					width: 1.866667rem;
					margin: 0.266667rem 0.4rem 0 0;
				}
				.content{
					.name{
						padding-top: 0.8rem;
						line-height:0.4rem;
						font-size:0.4rem;
						color:#000;
					}
					.time{
						padding-top: 0.266667rem;
						font-size:0.32rem;
						line-height:0.32rem;
						color:#808080;
					}
				}

			}
		}
		.null{
		    background: #fff;
		    position: relative;
		    .nullPic{
		        width: 5.2rem;
		        height: 4.306667rem;
		        background: url(https://aliyunsso.edspay.com/web/wx/activity/twoYeay/null.png)no-repeat center center / 5.2rem 4.306667rem;
		        position: absolute;
		        top: 0;
		        right: 0;
		        bottom: 0;
		        left: 0;
		        margin: auto;
		    }
		}
    }
</style>