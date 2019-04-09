<template>
    <div class="example">
        <div v-title>材料示例</div>
        <img src="https://aliyunsso.edspay.com/web/wx/account/amend/example.png" alt="">
    </div>
</template>

<script>
    import wxHeader from '../../../../wxHeader'
    import wxToapp from '../../../../../common/wx/wxToapp';    //引入表单验证
    export default{
        mixins:[wxToapp],
    	data(){
    		return{

    		}
    	},
    	methods:{

    	},
        components:{
            wxHeader
        },
    	created(){
    		
    	}
    }
</script>

<style lang="scss" scoped>
    .example{
        img{
            width: 100%;
        }
    }
</style>