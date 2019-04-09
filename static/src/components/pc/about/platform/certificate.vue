<template>
    <div id="certificate">
        <div class="title">
            <div class="num_box">
                <img src="https://aliyunsso.edspay.com/web/about/pcPageRevision/num_01.png" alt="">
            </div>
            <span>行业资质</span>
        </div>
        <ul class="ulList active">
            <li v-for="(v, index) in pic" v-if="index < picIndex*picPage">
                <img :src="v.src">
                <div class="font_box">
                     <h3 class="font" v-html="v.title"></h3>
                     <p class="font-con">{{v.content}}</p>
                </div>
            </li>
            <div class="More" @click="picPage=picPage+1" v-if="pic.length > picIndex*picPage">查看更多<i class="el-icon-arrow-up"></i></div>
            <div class="More" @click="picPage=1" v-if="pic.length < picIndex*picPage+1 && picPage>1 ">点击收缩<i class="el-icon-arrow-up active"></i></div>
        </ul>
        <!--弹出框-->
        <div class="title" style="marginTop:30px;">
            <div class="num_box">
                <img src="https://aliyunsso.edspay.com/web/about/pcPageRevision/num_02.png" alt="">
            </div>
            <span>技术认证</span>
        </div>
        <ul class="ulList">
            <li v-for="(v, index) in pic1" @click="expand(v.src)" v-if="index < picIndex*picPage1">
                <img :src="v.src">
                <div class="font_box">
                     <h3 class="font" v-html="v.title"></h3>
                     <!-- <p class="font-con">{{v.content}}</p> -->
                </div>
               
            </li>
            <div class="More" @click="picPage1=picPage1+1" v-if="pic1.length > picIndex*picPage1">查看更多<i class="el-icon-arrow-up"></i></div>
            <div class="More" @click="picPage1=1" v-if="pic1.length < picIndex*picPage1+1 && picPage1>1 ">点击收缩<i class="el-icon-arrow-up active"></i></div>
        </ul>
        <div class="showPic" v-if="show" @click="show = false">
            <div class="imgBox">
                <img :src="showPic" alt="">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            show:false,
            showPic:'',
            picIndex:6,  // 每页展示个数
            picPage:1,   // 行业资质的页数
            picPage1:1,  // 技术认证的页数
            pic: [
                {
                    src: 'https://aliyunsso.edspay.com/web/about/new_certificate2.jpg',
                    title: '增值电信业务经营许可证',
                    content:'根据《中华人民共和国电信条例》及国家有关规定，由浙江省通信管理局审查颁发'
                },
                // {
                //     src: 'https://aliyunsso.edspay.com/web/about/new_certificate1.jpg',
                //     title: '信息安全等级保护第三级备案',
                //     content:'由国家信息安全等级保护工作协调小组办公室推荐测评机构现场评测，符合监管政策要求'
                // },
                {
                    src: 'https://aliyunsso.edspay.com/web/about/new_certificate5.jpg',
                    title: 'AAA级信用企业认证',
                    content:'由360搜索、水滴信用联合中国企业信用档案库颁发，企业诚信度获得认可'
                },
                {
                    src: 'https://aliyunsso.edspay.com/web/about/new_certificate6.jpg',
                    title: '2017年最具成长性网贷平台',
                    content:'由国内权威财经媒体《投资者报》和互联网金融第一大号《互金每日早知道》联合颁布'
                },
                // {
                //     src: 'https://aliyunsso.edspay.com/web/about/new_certificate7.jpg',
                //     title: '互联网金融行业示范单位',
                //     content:'由中国电子商务协会批准成立的互联网信用认证平台审核颁发'
                // },
                {
                    src: 'https://aliyunsso.edspay.com/web/about/new_certificate8.jpg',
                    title: '互联网金融信息服务平台</br>优秀成员单位',
                    content:'由网贷行业知名互联网金融门户网站网贷互联评选颁发'
                },
                {
                    src: 'https://aliyunsso.edspay.com/web/about/new_certificate3.jpg',
                    title: '浙江省投融资协会理事单位',
                    content:'经浙江省民政厅批准设立，致力于促进金融（类金融）机构和其他企业的发展'
                },
                {
                    src: 'https://aliyunsso.edspay.com/web/about/new_certificate4.jpg',
                    title: '浙江省大数据科技协会</br>理事单位',
                    content:'由浙江省从事大数据科技行业相关的企事业单位及个人组成，致力于推动社会经济发展'
                },
            ],
            pic1: [
                {
                    src: 'https://aliyunsso.edspay.com/web/about/new_certificate9.jpg',
                    title: 'E都市钱包Android客户端软著'
                },
                {
                    src: 'https://aliyunsso.edspay.com/web/about/new_certificate10.jpg',
                    title: 'E都市钱包IOS客户端软著'
                },
                {
                    src: 'https://aliyunsso.edspay.com/web/about/technical3.png',
                    title: 'E都市钱包大数据决策</br>系统V1.0'
                },
                {
                    src: 'https://aliyunsso.edspay.com/web/about/technical4.png',
                    title: 'E都市钱包风险预警系统V1.0'
                },
                {
                    src: 'https://aliyunsso.edspay.com/web/about/technical5.png',
                    title: 'E都市钱包实时安全监控</br>系统V1.0'
                },
                {
                    src: 'https://aliyunsso.edspay.com/web/about/technical6.png',
                    title: 'E都市钱包数据中心系统V1.0'
                },
                {
                    src: 'https://aliyunsso.edspay.com/web/about/technical7.png',
                    title: 'E都市钱包用户风险报告查询</br>系统V1.0'
                },
                {
                    src: 'https://aliyunsso.edspay.com/web/about/technical8.png',
                    title: 'E都市钱包智能贷后管理</br>系统V1.0'
                },
                {
                    src: 'https://aliyunsso.edspay.com/web/about/technical9.png',
                    title: 'E都市钱包智能推荐系统V1.0'
                },
                {
                    src: 'https://aliyunsso.edspay.com/web/about/technical10.png',
                    title: 'E都市钱包智能债权匹配</br>系统V1.0'
                },
                {
                    src: 'https://aliyunsso.edspay.com/web/about/technical11.png',
                    title: 'E都市钱包自动化账务处理</br>平台V1.0'
                }
            ]
        }
    },
    methods: {
        expand(src){
           this.showPic = src
           this.show = true
        }
    },
    mounted() {

    }
}
</script>

<style lang="scss" scoped>
#certificate {
    // padding: 0 44px 80px 35px;
    width: 100%;
    overflow: hidden;
    .title {
         width: 100%;
        font-family: PingFangSC;
        line-height: 34px;
        font-size: 18px;
        text-align: left;
        color: #333333;
        margin-bottom: 40px;
        margin-top: 30px;
        padding-left: 44px;
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
            }
        }
    }
    .ulList{
        width: 100%;
        padding-right:28px;
        padding-left: 50px;
        margin-top: 10px; 
        overflow: hidden;
        padding-bottom: 40px;
        li {
            float: left;
            width: 220px;
            height: 230px;
            cursor:pointer;
            margin-right: 50px;
            margin-bottom: 40px;
            background: #FFFFFF;
            box-shadow: 0 6px 20px 0 rgba(204,204,204,0.26);
            img{
                width: 100%;
                height: 160px;
                display: block;
            }
            .font_box{
                display: table-cell;
                vertical-align: middle;
                width: 220px;
                height: 70px;
                .font{
                    width: 100%;
                    height: auto;
                    font-family: PingFangSC-Regular;
                    font-size: 14px;
                    color: #333333;
                    display: block;
                    text-align: center;
                    margin: auto;
                    padding: 0px 12px;
                }
                .font-con{
                    display: none;
                    font-family: PingFangSC-Medium;
                    font-size: 14px;
                    color: #FFFFFF;
                    letter-spacing: 0.9px;
                    text-align: justify;
                    text-shadow: 0 2px 4px rgba(240,140,60,0.90);
                }
            }
        }
        li:nth-child(3n){
            margin-right: 0;
        }
        .More{
            cursor:pointer;
            float: left;
            width: 100%;
            text-align: right;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            padding-right: 55px;
            color: #508CEE;
            i{
                font-size: 12px;
                transform: rotate(180deg);
                transition: all 1s ease;
                margin-left: 5px;
            }
            i.active{
                transform: rotate(0deg);
            }
        }
    }
    .ulList.active{
        padding-bottom: 0px;
        li{
            cursor:default;
        }
        li:hover{
            background: url(https://aliyunsso.edspay.com/web/about/picHover.png) no-repeat center center;
            padding: 27px 18px 0;
            img{
                display: none;
            }
            .font_box{
                display: block;
                width: 100%;
                height: auto;
                .font{
                    text-align: left;
                    font-size: 16px;
                    color: #FFF9F9;
                    text-shadow: 0 2px 4px rgba(240,140,60,0.90);
                    margin-bottom: 40px;
                    padding: 0;
                }
                .font-con{
                    font-size: 14px;
                    color: #FFFFFF;
                    display: block;
                }
            }
        }
    }
    .showPic {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        background: rgba(0, 0, 0, 0.7);
        z-index: 9999;
        .imgBox {
            position: absolute;
            top: 50px;
            bottom:50px;
            left: 50%;
            transform: translateX(-50%);
            text-align: center;
            img {
                height: 100%;
            }
        }
    }
}
</style>

