<template>
    <div id="gesture">
        <div @click="nextPage(index)" v-for="(item,index) in  6" v-show="guidance[index]"  :class="'guidance li'+index">
            <div class="imgTips imgTips1" :style="{background: 'url(https://aliyunsso.edspay.com/web/wx/vip/treasure2/gesture'+ index +'.png?v=12) 0px '+ (index>1 ? 'top':'bottom') +'  no-repeat'}"></div>
        </div>
        
    </div>
</template>

<script>
    import wxToapp from '../../../../../../common/wx/wxToapp';
    export default{
        mixins: [wxToapp],
    	data(){
    		return{
                guidance:[1,0,0,0,0,0],
                layerHeight:0,
                layerBottomHeight:0,
                pageHeight:0
    		}
    	},
        props:['showLeft','showGesture','openFlag'],
    	methods:{
            nextPage(index){
                if(index == 2){
                    this.closeLeft();
                }
                if(index == 5){
                    this.showGesture.showThis = false;
                    this.getAppData('/sailSea/changeHandGuide',(data)=>{//更新引导
                        if(data.resCode){

                        }
                    },{})
                    return;
                }
                this.clearLayer();
                this.$set(this.guidance,index+1,1);
                
            },
            closeLeft(){//打开右侧
                this.$emit('changeLeft',true);
            },
            clearLayer(){
                for(var i=0;i<6;i++){
                    this.$set(this.guidance,i,0);
                }
            }
    	},
    	created(){
        },
        mounted(){
            this.pageHeight = document.documentElement.clientHeight;
        }
    }
</script>

<style lang="scss" scoped>
    #gesture{
        height: 100%;
        width:100%;
        position: fixed;
        top:0;
        left:0;
        z-index:999;
        .layer,.layerBottom{
            height:8.0rem;
            background: rgba(0,0,0,0.5);
        }
        .layerBottom{
            position: absolute;
            width:100%;
            bottom:0
        }
        .guidance{
            height: 100%;
            width: 100%;
            position: absolute;
            top:0;
            left:0;
            img{
                width:100%;
                display:block;
                position: absolute;
                left:0;
            }
            .imgTips{
                width:100%;
                height:126%;
                background-size: 100%!important;
                position: absolute;
                left:0;
            }

        }
        .li0{
            .imgTips{
                bottom: -2.45rem;
            }
        }
        .li1{
            .imgTips{
                bottom: -2.45rem;
            }
        }
        .li2{
            .imgTips{
                top:-2.6rem;
            }
        }
        .li3{
            .imgTips{
                top:-1.75rem;
            }
        }
        .li4{
            .imgTips{
                top:-1.75rem;
            }
        }
        .li5{
            .imgTips{
                top:-1.75rem;
            }
        }
    }
</style>