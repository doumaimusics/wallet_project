<template>
    <div class="list bdr-b clear">
    	<div class="lift fl clear">
    		<div class="p1 clear">
    			<em ref="borEm"><span class="ic2" ref="borSpan">{{listData.name}}</span></em>
    			<span ref="borSpanTwo" class="get_name">{{listData.remark}}</span>
    		</div>
    		<p class="time">{{listData.addTime}}</p>
    	</div>
    	<div class="lirt fl" :class="{lostInt:listData.paymentsType == 2 || listData.paymentsType == 3}">
    		{{listData.scoreString}}
    	</div>
    </div>
</template>

<script>
    import wxToapp from '../../../../../common/wx/wxToapp'
    export default{
        mixins:[wxToapp],
        data(){
            return{
                emWidth: 0,//em ico宽度
                spanWidth:0//span ico宽度
            }
        },
        props:['listData'],
        methods:{
            
        },
        created(){
            
        },
        mounted(){
            this.emWidth = this.$refs.borEm.offsetWidth;
            this.spanWidth = this.$refs.borSpan.offsetWidth;
            this.$refs.borSpan.style.left = -(this.emWidth)/4 + 'px'
            this.$refs.borSpanTwo.style.marginLeft = (-(this.emWidth/2) + 5) +'px';
        }
    }
</script>

<style lang="scss" scoped>
    .list{
       	width: 100%;
       	height: 1.706667rem;
       	position: relative;
       	background: #ffffff;
       	.p1{
       		padding-top: .4rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 100%;
          height: .87rem;
          position: relative;
          line-height: 0.45rem;
       	}
       	div .get_name{
          max-width: 6.1rem;
       		font-size: 0.373333rem;
       		color: #494743;
       		display: inline-block;
       		position: absolute;
       		// top: -.28rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
       	}
       	em{
       	    height:0.4rem;
       	    position: relative;
       	    display:inline-block;
       	    span{
       	        height:0.8rem;
       	        display:inline-block;
       	        border: 1px solid #FF5B4C;
       	        border-radius: 2px;
       	        font-size:0.586667rem;
       	        line-height:0.8rem;
       	        color:#FF5B4C;
       	        padding:0 0.266667rem;
       	        transform: scale(0.5);
       	        -webkit-transform: scale(0.5);
       	        position: relative;
       	        left:-16px;
   	            top: -0.18rem;
       	    }
       	}
       	
       	// p .ico_bor{
       	// 	font-size: 0.293333rem;
       	// 	color: #FF5B4C;
       	// 	border: 1px solid #FF5B4C;
       	// 	border-radius: 2px;
       	// 	padding-left: 0.133333rem;
       	// 	padding-right: 0.133333rem;
       	// 	margin-right: 0.08rem;
       	// }
       	.time{
       		font-size: 0.32rem;
       		color: #8E8E8E;
       	}
       	.lift{
       		width: 75%;
       	}
       	.lirt{
       		width: 25%;
       		font-size: 0.373333rem;
       		color: #508CEE;
       		text-align:right;
       		height: 1.706667rem;
       		line-height:1.706667rem; 
       		padding-right: 0.533333rem;
       		
       	}
       	.lirt.lostInt{
       		color: #FF5B4C;
       	}
    }
</style>