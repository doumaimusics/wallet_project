<template>
    <div id="websiteMap">
        <div class="content">
            <div class="title"><i></i>网站地图</div>
            <ul class="map">
                <li v-for="(item,index) in ulData" class="item">
                    <div class="name">{{item.title}}</div>
                    <ul class="liData">
                        <router-link v-for="(li,ind) in item.liData" :to="li.url" class="fl" tag="li">
                            {{li.name}}
                            <div v-if="ind<(item.liData.length-1)" class="line"></div>
                        </router-link>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default{
    	data(){
    		return{
                ulData:[
                    {
                        title:'网站首页',
                        liData:[
                            {
                                name:'E都市钱包首页',
                                url:'/'
                            }
                        ]
                    },
                    {
                        title:'成为E都市钱包用户',
                        liData:[
                            {
                                name:'注册/登录E都市钱包',
                                url:'/?pop=LG'
                            },
                            {
                                name:'新手指引',
                                url:'/guide'
                            }
                        ]
                    },
                    {
                        title:'出借项目',
                        liData:[
                            {
                                name:'出借项目',
                                url:'/invest'
                            },
                            {
                                name:'新手出借',
                                url:'/activity/myEnroll'
                            },
                            // {
                            //     name:'白拿商城',
                            //     url:'/store'
                            // }
                        ]
                    },
                    {
                        title:'安全保障',
                        liData:[
                            {
                                name:'银行存管',
                                url:'/info/security/custody?num=0'
                            },
                            {
                                name:'保障措施',
                                url:'/info/security/custody?num=1'
                            }
                        ]
                    },
                    {
                        title:'关于我们',
                        liData:[
                            {
                                name:'平台简介',
                                url:'/info/about/abstract?num=1'
                            },
                            {
                                name:'管理团队',
                                url:'/info/about/abstract?num=3'
                            },
                            {
                                name:'媒体报道',
                                url:'/info/dynamic/coverage?num=0'
                            },
                            {
                                name:'法律法规',
                                url:'/info/notice/laws'
                            },
                            {
                                name:'官方公告',
                                url:'/info/notice/announcement?num=0'
                            },
                            {
                                name:'资质证书',
                                url:'/info/about/abstract?num=4'
                            },
                            {
                                name:'发展进程',
                                url:'/info/dynamic/coverage?num=1'
                            },
                            {
                                name:'运营数据',
                                url:'/info/data/makePublic?num=1'
                            },
                            {
                                name:'联系我们',
                                url:'/info/contactUs?num=0'
                            },
                        ]
                    },
                    {
                        title:'帮助中心',
                        liData:[
                            {
                                name:'账户',
                                url:'/help/qa?sideBarType=1'
                            },
                            {
                                name:'注册',
                                url:'/help/qa?sideBarType=2'
                            },
                            {
                                name:'出借类',
                                url:'/help/qa?sideBarType=3'
                            },
                            {
                                name:'充值提现',
                                url:'/help/qa?sideBarType=4'
                            },
                            {
                                name:'红包优惠券',
                                url:'/help/qa?sideBarType=5'
                            },
                            {
                                name:'费用',
                                url:'/help/qa?sideBarType=6'
                            },
                            {
                                name:'银行存管',
                                url:'/help/qa?sideBarType=8'
                            },
                            {
                                name:'名词解释',
                                url:'/help/qa?sideBarType=7'
                            },
                        ]
                    }

                ]
    		}
    	},
    	methods:{

    	},
    	created(){
    		
    	}
    }
</script>

<style lang="scss" scoped>
    #websiteMap{
        background: #F5F5F5;
        padding-top: 30px;
        color:#333;
        .content{
            background:#fff;
            width: 1200px;
            padding:30px 36px 38px 30px;
            margin:0 auto;
            box-shadow: 0 6px 20px 0 rgba(204,204,204,0.26);
            .map{
                .item{
                    width:1132px;
                    height:120px;
                    padding-left: 40px;
                    .name{
                        font-size:18px;
                        line-height:25px;
                        color: #4CB1FF;
                        padding:31px 0 14px 0;
                    }
                    .liData{
                        li{
                            font-size:14px;
                            line-height:20px;
                            cursor: pointer;
                            .line{
                                height:13px;
                                width:1px;
                                display:inline-block;
                                margin:0 19px;
                                background:#999;
                            }
                        }
                    }
                }
                .item:nth-child(odd){
                    background: #F7FCFF;
                }
            }
        }
       .title {
            width: 100%;
            height: 34px;
            font-family: PingFangSC;
            line-height: 34px;
            font-size: 24px;
            font-weight: 500;
            text-align: left;
            color: #333333;
            margin: 0 0 40px 0;
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
    }
</style>