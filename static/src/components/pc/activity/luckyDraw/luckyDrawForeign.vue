<template>
    <div class="luck">
    	<lucky-draw></lucky-draw>
    </div>
</template>

<script>
	import luckyDraw from '../../../wx/activity/luckyDraw/luckyDrawForeign.vue'
    export default{
    	data(){
    		return{

    		}
    	},
    	methods:{

    	},
    	components:{
    		luckyDraw,
    	},
    	created(){
    		
    	}
    }
</script>

<style lang="scss" scoped>
    .luck{
        width: 50%;
        margin: 0 auto;
    }
</style>