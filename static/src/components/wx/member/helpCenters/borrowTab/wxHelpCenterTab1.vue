<template>
   <div id="wxCommonIssue" >       
       <ul class="bdr-b">
           <li v-for="(item,index) in headerData">
               <div class="headline-box">
                   <h3 class="bdr-b" :class="[{active:item.show}]" :style="{background:'url('+backgImg+') no-repeat 8.5rem center'}" @click="changeli(index,item)">
                       <i></i>
                       <span v-html="item.title"></span>   
                    </h3>
               </div>
               <p v-html="item.text" v-show="item.show"></p>
           </li>
       </ul>
   </div>
</template>

<script>
   export default{
       data(){
           return{
               
               backgImg:'https://aliyunsso.edspay.com/web/wx/helpCenter/Rectangle.png?v=1.0'
               
           }
       },
       props:['headerData'],
       methods:{ 
          changeli(ind,item){    // 手风琴效果
              let scrollTops = $('#wxCommonIssue ul li p').outerHeight();
              this.headerData.forEach( i => {
                if(i.show !== this.headerData[ind].show){
                    i.show = false;
                } 
              });
               item.show = !item.show;
               if(item.show == true && ind >= 7){
                    $('html,body').animate({
                       scrollTop:$(window).scrollTop()+scrollTops+'px'
                    },500)
               }
          },
       },
       mounted(){
          var heightStyle = document.documentElement.clientHeight;
          $('#wxCommonIssue').height(heightStyle);
          if (!this.osType) {
            $(document).scrollTop(0);
           }
       },
       
   }
    
</script>

<style lang="scss" scoped>
    #wxCommonIssue{
        width: 100%;
        background: #fff;
        position: relative;
        font-family: PingFangSC-Regular;
        ul{
            background: #fff;
            position: relative;
            li{
                width: 100%;
                .headline-box{
                    width: 100%;
                    height: 1.466667rem;
                    line-height: 1.466667rem;
                    background: #fff;
                    padding-left: .533333rem;
                
                h3{
                    position: relative;
                    font-size: .373333rem;
                    color: #333;
                    overflow: hidden;
                    background-size: .4rem .4rem!important;
                    background-position: 8.5rem center;
                    height: 100%;
                    i{
                        width: .4rem;
                        height: .4rem;
                        display: inline-block;
                        background: url('https://aliyunsso.edspay.com/web/wx/helpCenter/issoe.png?v=1.0') no-repeat;
                        background-size: cover;
                        position: absolute;
                        top: 0;bottom: 0;
                        margin: auto;
                    }
                    span{
                        margin-left: .533333rem;
                    }
                }
                h3.active{
                    background: url('https://aliyunsso.edspay.com/web/wx/helpCenter/RectangleUp.png?v=1.1') no-repeat!important;
                    background-size: .4rem .4rem!important;
                    background-position: 8.5rem center !important;
                }
                }
                p{
                    background: #F8F8F8;
                    padding:.4rem .533333rem .666667rem .533333rem;
                    font-size: .346667rem;
                    color: #8d8d8d;
                    line-height: .666667rem;
                }
            }
            li:last-child .headline-box h3.bdr-b:after{
                border: none;
            }
        }
    }
</style>