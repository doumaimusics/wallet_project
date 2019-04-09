<template>
	<div id="make-public">
        <div v-if="barFixed" class="ti-ul"></div>
        <div class="dataContent">
            <transaction-data :numFormat="numFormat"></transaction-data>
            <!-- <div class="box-line"></div> -->
            <div class="asset" id="make-asset">
                <div class="title-box">
                    <div class="num_box">
                        <img src="https://aliyunsso.edspay.com/web/about/pcPageRevision/num_02.png" alt="">
                    </div>
                    <span>资产端数据</span>
                </div>
                <img src="https://aliyunsso.edspay.com/web/wx/makePublic/Assetpc-1.png" alt="">
            </div>
            <asset-data :numFormat="numFormat"></asset-data>
            <user-portrait :numFormat="numFormat"></user-portrait>
        </div>

	</div>
</template>

<script>
    import transactionData from '.././makePublic/transactionData.vue';
    import assetData from '.././makePublic/assetData';
	import userPortrait from '.././makePublic/userPortrait';
    export default{
    	data(){
    		return{
                tapData:[true,false,false,false],
                divOffsetTop:[0,0,0,0],
                barFixed:false,
                barOffsetTop:545,
                timer:null,
                timer2:null
    		}
        },
        props:['nums'],
    	methods:{
            getActive(num){
                console.log(num)
                for(var i=0;i<4;i++){
                    this.$set(this.tapData, i, false);
                }
                this.$set(this.tapData,num,true);
                if(num == 0){
                    document.body.scrollTop = this.divOffsetTop[num]-50;
                    document.documentElement.scrollTop = this.divOffsetTop[num]-50;
                    window.pageYOffset = this.divOffsetTop[num]-50;

                }else{
                    document.body.scrollTop = this.divOffsetTop[num]-50;
                    document.documentElement.scrollTop = this.divOffsetTop[num]-50;
                    window.pageYOffset = this.divOffsetTop[num]-50;
                    
                }
            },
            handleScroll(){
                var scrollTop = document.body.scrollTop
                if(this.barOffsetTop<scrollTop){
                    this.barFixed = true;
                }else{ this.barFixed = false}
            },
            createdFun(){

            },
            numFormat(money){
                if(money == 0){
                    return money;
                }else{
                    var n = 2;
                    money = parseFloat((money + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
                    var l = money.split(".")[0].split("").reverse(), r = money.split(".")[1];
                    var t = "";
                    for (var i = 0; i < l.length; i++) {
                    t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
                    }
                    return  t.split("").reverse().join("");
                }
            },
        },
        watch: {
            nums (val) {
                this.getActive(val)
            }
        },
        components:{
            transactionData,
            assetData,
            userPortrait
        },
    	created(){
    		clearTimeout(this.timer)
            window.removeEventListener('scroll',this.handleScroll )
    	},
        mounted(){
            var that = this;
            this.timer =  setTimeout(function(){
                that.barOffsetTop = document.querySelector('#make-public').offsetTop;

                that.divOffsetTop[0] = document.querySelector('#transaction').offsetTop;
                console.log(document.querySelector('#transaction').offsetTop)
                that.divOffsetTop[1] = document.querySelector('#make-asset').offsetTop;
                that.divOffsetTop[2] = document.querySelector('#moneyData').offsetTop;
                that.divOffsetTop[3] = document.querySelector('#user-portrait').offsetTop;
                
            },500)

            window.addEventListener('scroll', this.handleScroll)
        },
    }
</script>

<style lang="scss" scoped>
    #make-public{
        padding: 30px 0 0 45px;
        .ti-ul{height:48px;}
        .box-line{
            width:823px;
            height:1px;
            background:#ddd;
        }
        .title-box{
            width: 100%;
            font-family: PingFangSC;
            line-height: 34px;
            font-size: 18px;
            text-align: left;
            color: #333333;
            margin-bottom: 40px;
            margin-top: 30px;
            span{
            padding-left: 8px;
            font-weight: 700;
            }
            .num_box{   //改版后
                width: 87px;
                height: 54px;
                margin-bottom: 5px;
                img{
                    width: 100%;
                    height: 100%;
                    margin: 0;
                }
            }
        }
        .header-tap{
            height:36px;
            width:866px;
            background:#fff;
            li{
                cursor: pointer;
                float: left;
                line-height:36px;
                margin-right: 50px;
                p{
                    line-height: 36px;
                    padding: 0px 11px;
                   font-size: 16px;
                    color: #333333;
                }
                .active{background: #4CB1FF;
border-radius: 4px;color:#fff;}
            }
        }
        .asset{
            padding: 10px 0 30px;
            img{
                width:710px;
                display:block;
                margin:0 0 0 98px;
            }
        }
        .barFixed{
            position:fixed;
            top:0;
            left:50%;
            margin-left:-285px;
            z-index:10;
        }
    }
</style>