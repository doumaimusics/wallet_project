<template>
    <div id="main">
        <div v-title>关于余额智投</div>
        <ul>
            <li v-for="(itme,index) in textData">
                <h3 v-html="itme.title"></h3>
                <div class="text_content_box" v-html="itme.content"></div>
            </li>
        </ul>
    </div>
</template>

<script>
   import wxToapp from '../../../../common/wx/wxToapp';
   export default{
       mixins:[ wxToapp ],
       data(){
           return{
               textData:[
                   {
                       title:'什么是余额智投？',
                       content:'<p>余额智投是平台提供给用户的一种出借服务。用户可以根据自己的风险偏好以及出借习惯，自定义服务内容。一旦有符合条件的项目，系统将自动帮您进行出借。</p>'
                   },
                   {
                       title:'余额智投排队规则是什么？',
                       content:`<p>用户一旦开启服务后，则会进入排队状态，根据先到先得的方式排队进行。</p>
                                <p>以下情况可能会导致重新排队：</p>
                                <p>1.重新修改编辑服务内容</p>
                                <p>2.关闭服务后重新开启</p>
                                <p>3.账户余额不满足出借条件</p>
                                <p>4.出借成功后重新排队进行下一轮服务</p>
                                `
                   },
                   {
                       title:'什么是单次出借？',
                       content:'<p>当用户设置单次出借并开启成功后，系统只会按照出借金额自动出借一次，出借完成后系统自动为您关闭此功能，因此您需要保障账户可用余额充足。</p>'
                   },
                   {
                       title:'红包使用的规则是什么？',
                       content:'<p>当您选择使用红包并开启成功后，再每次自动出借时，系统根据您账户中可用的红包情况自动筛选收益最高的红包或加息券进行使用。若关闭则不会使用红包。</p>'
                   },
                   {
                       title:'如何查看我余额智投的记录？',
                       content:'<p>您可以通过进入“我的-出借记录”切换筛选条件为余额智投，可筛选出通过余额智投服务，我们为您匹配到的项目您也可以通过进入“我的-余额智投-智投记录”进行查看</p>'
                   }
               ]
           }
       }
   }
</script>

<style lang="scss">
body,html{
        background-color: #fff!important;
    }
    .text_content_box{
        p{
            line-height: .586667rem; 
        }
    }
   
</style>
<style lang="scss" scoped>
    
    #main{
        width: 100%;
        overflow: hidden;
        padding:.4rem;
        font-family: PingFangSC-Regular;
        ul{
            li{
                margin-bottom: .4rem;
                h3{
                    font-size: .373333rem;
                    color: #333;
                    margin-bottom: .133333rem;
                }
               h3::before {
                   content:'';
                   display: inline-block;
                   width: .053333rem;
                   height: .346667rem;
                   background: #FF5B4C;
                   margin-right: .266667rem;
                   vertical-align:text-bottom;
                   margin-bottom: 0.045rem;
                }
                .text_content_box{
                    font-size:.346667rem;
                    color: #8d8d8d;
                    p{
                        line-height: .586667rem; 
                    }
                }
            }
        }
    }
</style>