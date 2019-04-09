<template>
  <div id="wxHelpCenterTab">
    <div class="tab-title">
        <!-- class="bdr-b" -->
        <swiper :options="swiperOption" class="bdr-b" :class="{isMedia:num == 4}">
            <swiper-slide v-for="(item,index) in  titleList"  :class="{activeLi:index==num}">
                <p @click="num=index">{{item}}</p>
                <span v-if="index==num"></span>
            </swiper-slide>
        </swiper>
    </div>
    <wxHelpCenterTab1 v-if="num==0"></wxHelpCenterTab1>
    <wxHelpCenterTab2 v-else-if="num==1"></wxHelpCenterTab2>
    <wxHelpCenterTab3 v-else-if="num==2"></wxHelpCenterTab3>
    <wxHelpCenterTab4 v-else-if="num==3"></wxHelpCenterTab4>
    <wxHelpCenterTab5 v-else-if="num==4"></wxHelpCenterTab5>
    <wxHelpCenterTab6 v-else-if="num==5"></wxHelpCenterTab6>
  </div>
</template>

<script>
    import wxToapp from '../../../../common/wx/wxToapp';
    import wxHelpCenterTab1 from './wxHelpCenterTab1';
    import wxHelpCenterTab2 from './wxHelpCenterTab2';
    import wxHelpCenterTab3 from './wxHelpCenterTab3';
    import wxHelpCenterTab4 from './wxHelpCenterTab4';
    import wxHelpCenterTab5 from './wxHelpCenterTab5';
    import wxHelpCenterTab6 from './wxHelpCenterTab6';
    export default{
        mixins:[wxToapp],
        data(){
            return{
                titleList: ['银行存管','资金管理','产品介绍','会员帮助','红包优惠','积分商城'],      // 标题内容
                num: 0,
				swiperOption: {
					pagination: '.swiper-pagination',
					slidesPerView: 'auto',
					paginationClickable: true,
				}
            }
        },
        methods:{
           getQuert() {     //  从首页点击进来跳到对应的页面
				if(this.$route.query.num){
                    this.num = this.$route.query.num
                };
			}
        },
        mounted(){
            var heightStyle = document.documentElement.clientHeight;
            $('#wxHelpCenterTab').height(heightStyle);
             var widthStyle = $('.swiper-slide').outerWidth();  // 动态获取元素宽度
            if(this.num == 4 ){  // 当从外面点进来让当前的标题显示出来
                $('.swiper-wrapper').css('transform','translate3d('+-widthStyle+'px,0,0)')
            } else if(this.num == 5){
                $('.swiper-wrapper').css('transform','translate3d('+-widthStyle*1.4+'px,0,0)')
            }
        },
        created() { // 调用函数
             this.getQuert();
		},
        components:{
            wxHelpCenterTab1,
            wxHelpCenterTab2,
            wxHelpCenterTab3,
            wxHelpCenterTab4,
            wxHelpCenterTab5,
            wxHelpCenterTab6
        }

    }
    
</script>
<style>
</style>

<style lang="scss" scoped>
    #wxHelpCenterTab{
		width: 100%;
        background: #fff;
        .swiper-container{
            position: fixed;
             background: #fff;
             z-index: 3;
             width: 100%;
        }
        .swiper-slide{
			padding: .266667rem .32rem;
			width: auto;
			font-size: .373333rem;
            color: #7A8898;
            position: relative;
			p{
				line-height: .533333rem;
				letter-spacing: .013333rem;
			}
            span{
              height:0.053333rem;
              width:0.666667rem;
              position: absolute;
              bottom: 0;
              left: 50%;
              margin-left: -0.306667rem;
              background: #4C7DE9;
            }
		}
        .tab-title {
			padding: 0;
			height: 1.066667rem;
			width: 100%;
			z-index:10;
			margin:0 auto;
             background: #fff;
			.activeLi {
				color: #4C7DE9;
			}
		}
		.tabContent{
			margin-top: 1.066666rem;	
		}
    }
</style>

