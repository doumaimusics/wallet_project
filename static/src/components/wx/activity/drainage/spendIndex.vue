<template>
    <div id="spendIndex">
        <div v-title>花吧</div>
        <ul>
            <li @click="toAppStore" v-for="(item,index) in goodsList" v-if="index < 4" :style="{background: 'url('+goodsList[index].picPath +') no-repeat'}" class="fl">
                <!-- <a href="http://android.myapp.com/myapp/detail.htm?apkName=com.rd.chux&ADTAG=mobile"></a> -->
            </li>
        </ul>
        <a class="tel" href="tel:400-135-338"></a>
        <div class="bottom">
            <div @click="toAppStore" v-btn class="btn">立即分期</div>
        </div>
    </div>
</template>

<script>
    export default{
    	data(){
    		return{
                goodsList:[]
    		}
    	},
    	methods:{
            getGoodsData(){
                this.notLogPost('/index/app/goods',(data)=>{
                    if(data.resCode){
                        this.goodsList = data.resData.goods;
                    }
                },{})
            },
            toAppStore(){
                window._czc.push(["_trackEvent",'H5花吧','下载按钮']);
                window.location.href = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.rd.chux&ADTAG=mobile';
            }
    	},
    	created(){
    		this.getGoodsData();
    	},
        mounted(){
            // 数据统计
            const script = document.createElement('script')
            script.src = 'https://s13.cnzz.com/z_stat.php?id=1275841048&web_id=1275841048'
            script.language = 'JavaScript'
            document.body.appendChild(script);
        }
    }
</script>

<style lang="scss" scoped>
    #spendIndex{
        height: 32.306667rem;
        background: url('https://aliyunsso.edspay.com/web/wx/activity/drainage/spendBG.png') no-repeat;
        background-size: 100% 100%;
        padding-top: 15.666667rem;
        ul{
            padding: 0 0.533333rem 0;
            li{
                height: 4.266667rem;
                width: 4.266667rem;
                background-size: 100% 100%!important;
                margin-bottom: 0.4rem;
                a{
                    display:block;
                    height: 100%;
                    width: 100%;
                }
            }
            li:nth-child(2n-1){
                margin-right: 0.4rem;
            }
        }
        .tel{
            height: 0.6rem;
            width: 2.666667rem;
            display: block;
            position: fixed;
            bottom: 2.35rem;
            left: 3.626667rem;
        }
        .bottom{
            background: #FFFFFF;
            box-shadow: 0 0 12px 0 rgba(0,0,0,0.10);
            height: 1.306667rem;
            width:100%;
            position: fixed;
            bottom: 0;
            left: 0;
            padding-top: 0.12rem;
            .btn{
                a{
                    display:block;
                    height: 100%;
                    width: 100%;
                    color: #fff;
                }
            }
        }
    }
</style>