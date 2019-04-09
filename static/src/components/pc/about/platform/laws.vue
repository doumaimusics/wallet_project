<template>
    <div id="laws">
        <!-- <div class="banner"></div> -->
        <div class="title">
            <i></i>法律法规</div>
        <ul class="list">
            <li v-for="(item, index) in siteLaws" class="information">
                <a :href='item.href' target="_blank">
                    <div class="describe">
                        <h3>{{item.title}}</h3>
                        <span>{{item.time}}</span>
                    </div>
                </a>
            </li>
        </ul>
         <!--分页 
        <div class="fenye">
            <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="parseInt(total)" :page-size='6'>
            </el-pagination>
        </div> -->
    </div>
</template>

<script>
export default {
    data(){
        return{
            siteLaws:[{
                href:'http://zfxxgk.zj.gov.cn/xxgk/jcms_files/jcms1/web59/site/art/2017/12/18/art_5755_1982464.html',
                title:'《浙江省网络借贷信息中介机构业务活动管理实施办法（试行）》',
                time:'2017-12-18'
            },{
                href:'http://www.cbrc.gov.cn/govView_C8D68D4C980A4410B9F4E21BA593B4F2.html',
                title:'《网络借贷信息中介机构业务活动信息披露指引》',
                time:'2017-08-24'
            },{
                href:'http://www.cbrc.gov.cn/govView_4201EF03472544038242EED1878597CB.html',
                title:'《网络借贷资金存管业务指引》',
                time:'2017-02-22'
            },{
                href:'http://www.cbrc.gov.cn/govView_37D312933F1A4CECBC18F9A96293F450.html',
                title:'《网络借贷信息中介机构业务活动管理暂行办法》',
                time:'2016-08-24'
            },{
                href:'http://www.miit.gov.cn/n1146285/n1146352/n3054355/n3057254/n3057259/c3868973/content.html',
                title:'《中华人民共和国电子签名法》',
                time:'2015-08-30'
            },{
                href:'http://www.court.gov.cn/zixun-xiangqing-15146.html',
                title:'《最高人民法院关于审理民间借贷案件适用法律若干问题的规定》',
                time:'2015-08-06'
            },{
                href:'http://www.gov.cn/xinwen/2015-07/18/content_2899360.htm',
                title:'《关于促进互联网金融健康发展的指导意见》',
                time:'2015-07-18'
            },{
                href:'http://www.gov.cn/xinwen/2015-04/25/content_2852914.htm',
                title:'《中华人民共和国广告法》',
                time:'2015-04-25'
            }]
        }
    }
}
</script>

<style lang="scss" scoped>
#laws {
    padding-bottom: 50px;
    .title {
        padding: 0 40px;
        width: 100%;
        height: 34px;
        font-family: PingFangSC;
        line-height: 34px;
        font-size: 24px;
        font-weight: 500;
        text-align: left;
        color: #333333;
        margin-bottom: 45px;
        margin-top: 60px;
        i {
            display: inline-block;
            width: 4px;
            height: 24px;
            background: #fc4147;
            margin-top: 4px;
            margin-right: 10px;
            vertical-align: top;
        }
    }
    .banner {
        width: 900px;
        height: 218px;
        background: url(https://aliyunsso.edspay.com/web/about/notice.png);
        background-size: 100% 100%;
        margin-left: -6px;
    }
    ul.list {
        overflow: hidden;
        padding-right: 65px;
        padding-left: 40px;
        margin-bottom: 50px;
        li.information {
            position: relative;
            width: 100%;
            height: 60px;
            line-height: 60px;
            border-bottom: dashed 1px #e5e5e5;
            padding-right: 40px;
            a {
                display: block;
                width: 100%;
                height: 100%;
            }
            .describe {
                width: 100%;
                height: 59px;
                background-color: #ffffff;
                position: absolute;
                line-height: 59px;
                left: 0;
                bottom: 0;
                h3 {
                    float: left;
                    width: 360px;
                    height: 50px;
                    font-size: 16px;
                    line-height: 50px;
                    text-align: left;
                    color: #333;
                    margin-left: 15px;
                    display: block;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                span {
                    display: block;
                    float: right;
                    width: 30%;
                    height: 50px;
                    font-size: 16px;
                    line-height: 50px;
                    text-align: right;
                    color: #333;
                    margin-right: 20px;
                }
            }
        }
    }
    .fenye {
        margin-top: 0;
        margin-bottom: 20px;
    }
}
</style>
